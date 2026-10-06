import { useRef, useEffect } from "react";
import { Send, Paperclip } from "lucide-react";

export default function ChatInput({ value, onChange, onSend, loading }) {
  const ref = useRef(null);

  // Auto-grow
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = Math.min(ref.current.scrollHeight, 200) + "px";
    }
  }, [value]);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="px-4 md:px-8 pb-6 pt-2">
      <div className="max-w-3xl mx-auto">
        <div className="relative flex items-end gap-2 bg-white border border-leaf-200 rounded-2xl shadow-sm hover:shadow-md focus-within:border-leaf-400 focus-within:shadow-md transition">
          <button
            type="button"
            className="m-2 w-9 h-9 rounded-xl hover:bg-leaf-50 flex items-center justify-center text-leaf-500 hover:text-leaf-700 transition"
            title="Attach (coming soon)"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <textarea
            ref={ref}
            rows={1}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Message Plant Doctor AI..."
            className="flex-1 resize-none bg-transparent py-3 pr-2 focus:outline-none text-leaf-900 placeholder-leaf-400 max-h-[200px]"
          />

          <button
            onClick={onSend}
            disabled={loading || !value.trim()}
            className="m-2 w-9 h-9 rounded-xl bg-gradient-to-br from-leaf-600 to-emerald-700 hover:from-leaf-700 hover:to-emerald-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white shadow-sm transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-leaf-900 text-center mt-2">
          AI can make mistakes. Verify important plant care info.
        </p>
      </div>
    </div>
  );
}