import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, RefreshCw, User, Leaf } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import toast from "react-hot-toast";

export default function ChatMessage({ message, onRegenerate }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const copy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    toast.success("Copied");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group flex gap-4 px-4 md:px-8 py-5 ${
        isUser ? "" : "bg-leaf-50/40"
      }`}
    >
      {/* Avatar */}
      <div
        className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${
          isUser
            ? "bg-gradient-to-br from-leaf-500 to-leaf-700"
            : "bg-gradient-to-br from-emerald-400 to-teal-600"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Leaf className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 max-w-3xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm text-leaf-900">
            {isUser ? "You" : "Plant Doctor AI"}
          </span>
        </div>

        {isUser ? (
          <p className="text-leaf-900 whitespace-pre-wrap leading-relaxed">
            {message.text}
          </p>
        ) : (
          <div className="prose prose-sm max-w-none text-leaf-900
            prose-headings:text-leaf-800 prose-headings:font-bold
            prose-strong:text-leaf-900 prose-p:my-2 prose-ul:my-2 prose-ol:my-2
            prose-li:my-0.5 prose-code:text-emerald-700 prose-code:bg-leaf-100
            prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-[#0f1a14] prose-pre:text-leaf-100">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.text}
            </ReactMarkdown>
          </div>
        )}

        {/* Actions for AI messages */}
        {!isUser && (
          <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition">
            <button
              onClick={copy}
              className="text-xs text-leaf-600 hover:text-leaf-900 hover:bg-leaf-100 flex items-center gap-1 px-2 py-1 rounded transition"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
            {onRegenerate && (
              <button
                onClick={onRegenerate}
                className="text-xs text-leaf-600 hover:text-leaf-900 hover:bg-leaf-100 flex items-center gap-1 px-2 py-1 rounded transition"
              >
                <RefreshCw className="w-3 h-3" /> Regenerate
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}