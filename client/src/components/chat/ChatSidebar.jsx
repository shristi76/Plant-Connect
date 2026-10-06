import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquarePlus,
  MessageSquare,
  Trash2,
  Leaf,
  Settings,
  LogOut,
  ChevronLeft,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useState } from "react";

export default function ChatSidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  open,
  onToggle,
  user,
  onLogout,
  onOpenSettings,
}) {
  const [search, setSearch] = useState("");

  const filtered = chats.filter((c) =>
    c.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: open ? 280 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className={`fixed lg:relative z-40 top-0 left-0 h-screen lg:h-[calc(100vh-80px)]
          bg-[#0f1a14] text-leaf-50 flex flex-col overflow-hidden
          border-r border-leaf-900/40 ${open ? "" : "lg:w-0"}`}
      >
        <div className="w-[280px] flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-leaf-500 to-emerald-700 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">PlantConnect</span>
            </div>
            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg hover:bg-white/10 text-leaf-200 transition"
              title="Close sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          {/* New chat button */}
          <div className="p-3">
            <button
              onClick={onNewChat}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/15 hover:bg-white/10 text-sm font-medium text-white transition"
            >
              <MessageSquarePlus className="w-4 h-4" />
              New chat
            </button>
          </div>

          {/* Search */}
          <div className="px-3 pb-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5">
              <Search className="w-3.5 h-3.5 text-leaf-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search chats..."
                className="flex-1 bg-transparent text-sm text-white placeholder-leaf-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Chat list */}
          <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
            <p className="px-3 py-2 text-xs font-semibold text-leaf-400 uppercase tracking-wider">
              Recent
            </p>
            {filtered.length === 0 && (
              <p className="px-3 py-4 text-xs text-leaf-500 text-center">
                No chats yet
              </p>
            )}
            {filtered.map((c) => (
              <div
                key={c.id}
                onClick={() => onSelectChat(c.id)}
                className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition ${
                  activeChatId === c.id
                    ? "bg-white/10 text-white"
                    : "hover:bg-white/5 text-leaf-200"
                }`}
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span className="text-sm truncate flex-1">{c.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(c.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 hover:text-red-400 transition"
                  title="Delete chat"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Account section */}
          <div className="border-t border-white/5 p-3">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-leaf-500 to-emerald-700 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name || "Guest"}
                </p>
                <p className="text-xs text-leaf-400 truncate">
                  {user?.email || "Not signed in"}
                </p>
              </div>
              <button
                onClick={onOpenSettings}
                className="p-1.5 rounded-lg hover:bg-white/10 text-leaf-300 transition"
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Toggle open button (when sidebar closed on desktop) */}
      {!open && (
        <button
          onClick={onToggle}
          className="hidden lg:flex fixed left-4 top-24 z-30 p-2 rounded-lg bg-white border border-leaf-200 shadow-md hover:bg-leaf-50 transition"
          title="Open sidebar"
        >
          <PanelLeftOpen className="w-4 h-4 text-leaf-700" />
        </button>
      )}
    </>
  );
}