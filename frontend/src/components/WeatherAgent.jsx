"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, User } from "lucide-react";

export default function WeatherAgent({ messages, onSendMessage, loading, onClose }) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      setShowSuggestions(false);
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleSuggestion = (text) => {
    if (!loading) {
      onSendMessage(text);
      setShowSuggestions(false);
    }
  };

  const suggestions = [
    "Do I need a jacket?",
    "Should I take an umbrella?",
    "Can I go for a bike ride?",
    "Best time to travel?",
    "Weather alerts?",
    "How does it feel outside?",
  ];

  const followUps = [
    "Tell me more",
    "What about tomorrow?",
    "Should I go now?",
    "Any precautions?",
  ];

  const formatMessage = (content) => {
    let formatted = content.replace(/\*\*/g, "").replace(/\*/g, "").replace(/`/g, "");
    return formatted.trim();
  };

  const AiLogo = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4 text-white"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/75 shadow-2xl backdrop-blur-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_38%)]" />

      {/* Header */}
      <div className="relative px-4 py-3 border-b border-white/5 flex items-center justify-between bg-[#0d0d0d]/90">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center ring-1 ring-white/10">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-black bg-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Weather Agent</h3>
            <p className="text-[10px] text-gray-500">Powered by OpenRouter</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-500 transition-colors hover:bg-white/10 hover:text-white">
            <span>✕</span>
          </button>
        )}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="relative px-4 py-2 border-b border-white/5 bg-black/30">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Thinking...</span>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="relative p-4 max-h-128 overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <p className="text-sm text-white mb-1 font-medium">Weather AI Agent</p>
            <p className="text-xs text-gray-500 mb-4">Ask me about weather.</p>

            {showSuggestions && (
              <div className="flex flex-wrap gap-2 justify-center px-2">
                {suggestions.map((text, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestion(text)}
                    disabled={loading}
                    className="px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-full text-gray-300 transition-colors hover:bg-white/10 hover:border-white/20 hover:text-white disabled:opacity-50"
                  >
                    {text}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
                    <AiLogo />
                  </div>
                )}
                <div className="max-w-[85%]">
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-white text-black rounded-br-md"
                      : "bg-white/5 text-gray-100 border border-white/10 rounded-bl-md"
                  }`}>
                    {formatMessage(msg.content)}
                  </div>
                  {msg.role === "assistant" && messages[messages.length - 1]?.id === msg.id && !loading && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {followUps.map((text) => (
                        <button
                          key={text}
                          type="button"
                          onClick={() => handleSuggestion(text)}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-gray-300 transition-colors hover:bg-white/10 hover:border-white/20 hover:text-white"
                        >
                          {text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
                  <AiLogo />
                </div>
                <div className="flex items-center gap-1.5 px-4 py-3 bg-white/5 rounded-2xl border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  <span className="text-xs text-gray-500 ml-1">Processing...</span>
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="relative p-3 border-t border-white/5 bg-black/60">
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about weather..."
              disabled={loading}
              className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder:text-gray-600 transition-colors focus:outline-none focus:border-white/20 focus:bg-white/8"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-4 py-2.5 bg-white/10 text-white rounded-xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-colors hover:bg-white/15"
          >
            ➤
          </button>
        </form>
      </div>
    </div>
  );
}