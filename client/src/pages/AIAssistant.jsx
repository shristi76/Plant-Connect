import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import ChatSidebar from "../components/chat/ChatSidebar";
import ChatMessage from "../components/chat/ChatMessage";
import ChatInput from "../components/chat/ChatInput";
import WelcomeScreen from "../components/chat/WelcomeScreen";
import AccountMenu from "../components/chat/AccountMenu";

const newChatId = () => Date.now().toString();

export default function AIAssistant() {
  const { user, logout } = useAuth();

  // Sidebar / UI state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Chat state
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);

  const activeChat = chats.find((c) => c.id === activeChatId);
  const messages = activeChat?.messages || [];

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, loading]);

  // Create a fresh chat
  const startNewChat = () => {
    const id = newChatId();
    setChats((c) => [{ id, title: "New chat", messages: [] }, ...c]);
    setActiveChatId(id);
    setInput("");
  };

  const selectChat = (id) => {
    setActiveChatId(id);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const deleteChat = (id) => {
    setChats((c) => c.filter((ch) => ch.id !== id));
    if (activeChatId === id) setActiveChatId(null);
    toast.success("Chat deleted");
  };

  // Send message
  const send = async (text) => {
    const question = (text || input).trim();
    if (!question || loading) return;

    if (!user) {
      toast.error("Please login first");
      return;
    }

    // Ensure active chat exists
    let chatId = activeChatId;
    if (!chatId) {
      chatId = newChatId();
      setChats((c) => [
        { id: chatId, title: question.slice(0, 40), messages: [] },
        ...c,
      ]);
      setActiveChatId(chatId);
    }

    const userMsg = { role: "user", text: question };
    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId
          ? {
              ...c,
              title:
                c.messages.length === 0
                  ? question.slice(0, 40) + (question.length > 40 ? "..." : "")
                  : c.title,
              messages: [...c.messages, userMsg],
            }
          : c
      )
    );
    setInput("");
    setLoading(true);

    try {
      const { data } = await api.post("/ai/chat", {
        question,
        city: user.city || "India",
      });
      const aiMsg = { role: "ai", text: data.answer };
      setChats((prev) =>
        prev.map((c) =>
          c.id === chatId ? { ...c, messages: [...c.messages, aiMsg] } : c
        )
      );
    } catch {
      toast.error("AI is busy. Try again!");
      setChats((prev) =>
        prev.map((c) =>
          c.id === chatId
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  {
                    role: "ai",
                    text: "😔 Sorry, I couldn't process that. Please try again.",
                  },
                ],
              }
            : c
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const regenerate = (msgIndex) => {
    // Find last user message before this AI message
    for (let i = msgIndex - 1; i >= 0; i--) {
      if (messages[i].role === "user") {
        send(messages[i].text);
        return;
      }
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    setSettingsOpen(false);
  };

  const updateUser = (updates) => {
    // Update locally — in real app, persist to backend
    if (user) Object.assign(user, updates);
  };

  return (
    <div className="h-[calc(100vh-80px)] flex bg-white overflow-hidden relative">
      {/* Sidebar */}
      <ChatSidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={selectChat}
        onNewChat={startNewChat}
        onDeleteChat={deleteChat}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((s) => !s)}
        user={user}
        onLogout={handleLogout}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 md:px-6 py-3 border-b border-leaf-100 bg-white/80 backdrop-blur-sm">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-leaf-50 text-leaf-700 transition"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold text-leaf-900 truncate">
              {activeChat?.title || "Plant Doctor AI"}
            </h1>
          
          </div>
         
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto scroll-smooth"
        >
          {messages.length === 0 && !loading ? (
            <WelcomeScreen onSend={send} />
          ) : (
            <div className="max-w-3xl mx-auto">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <ChatMessage
                    key={i}
                    message={m}
                    onRegenerate={
                      m.role === "ai" ? () => regenerate(i) : null
                    }
                  />
                ))}
              </AnimatePresence>

              {loading && (
                <div className="px-4 md:px-8 py-5 flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
                    <span className="text-white text-xs">🌿</span>
                  </div>
                  <div className="flex items-center gap-1.5 pt-2">
                    {[0, 0.15, 0.3].map((d, i) => (
                      <motion.span
                        key={i}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{
                          duration: 0.9,
                          repeat: Infinity,
                          delay: d,
                        }}
                        className="w-2 h-2 bg-leaf-500 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input */}
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={send}
          loading={loading}
        />
      </div>

      {/* Account settings modal */}
      <AccountMenu
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        user={user}
        onLogout={handleLogout}
        onUpdate={updateUser}
      />
    </div>
  );
}