"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import DiscussionService from "@/services/DiscussionService";
import { useParams } from "next/navigation";

interface User {
  id: number;
  full_name: string;
  avatar: string;
}

interface Message {
  id: number;
  user: User;
  message: string;
  created_at: string;
}

export default function DiscussionPage() {
  const params = useParams();
  const discussionId = Number(params.id);

  const [input, setInput] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const data = await DiscussionService.getUserProfile(discussionId);
        setChat(data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    fetchMessages();
  }, [discussionId]);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    setSending(true);
    setSendError(null);
    try {
      const newMsg = await DiscussionService.postDiscussionMessage(
        input,
        discussionId
      );
      setChat((prev) => [...prev, newMsg]);
      setInput("");
    } catch (err: any) {
      setSendError(err?.message || err?.detail || "Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      <main className="flex-1 flex flex-col">
        <header className="px-6 py-4 border-b border-gray-300 bg-gray-200 shadow">
          <h1 className="text-xl font-semibold">Discussion Forum</h1>
        </header>
        <section className="flex-1 overflow-y-auto p-6 space-y-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            chat.map((msg) => (
              <div key={msg.id} className="flex items-start gap-4">
                <img
                  src={msg.user.avatar}
                  alt={msg.user.full_name}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-xs text-black">
                      {msg.user.full_name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="mt-1 bg-white shadow rounded-lg px-4 py-2 text-black max-w-xl text-xs">
                    {msg.message}
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
        <footer className="px-6 py-4 border-t border-gray-300 bg-white">
          <div className="flex flex-col gap-2">
            {sendError && (
              <div className="text-red-500 text-xs mb-1">{sendError}</div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 bg-white border text-sm border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:border-gray-400"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={sending}
              />
              <button
                onClick={handleSend}
                className="bg-black text-sm hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
                disabled={sending}
              >
                {sending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
