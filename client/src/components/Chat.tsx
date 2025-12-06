// src/components/Chat.tsx
import React, { useState, useEffect, useRef } from "react";
import { useChatStore } from "@/hooks/useChatStore";
import ContextMenu from "./ContextMenue";
import { Trash2 } from "lucide-react"; // Import for the new Clear Context button

export default function Chat() {
  const { getActiveChat, updateChat, activeChatId } = useChatStore();

  const chat = getActiveChat();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  /**
   * FIX: This function now accumulates new context with the existing context.
   */
  const handleContextLoaded = (newContextText: string) => {
    // 1. Ensure we have an active chat to update
    if (!activeChatId || !chat) {
      alert("Error: No active chat to load context into.");
      return;
    }

    // 2. Retrieve the existing context, defaulting to an empty string
    const existingContext = chat.context || "";

    // 3. Define a clear separator for readability in the prompt
    // This separator is only added if there was existing context.
    const separator =
      existingContext.length > 0
        ? "\n\n--- ADDITIONAL CONTEXT START ---\n\n"
        : "";

    // 4. Concatenate the old context with the new text
    const fullContext = existingContext + separator + newContextText;

    // 5. Update the store with the newly concatenated context
    updateChat(activeChatId, { context: fullContext });

    alert(
      `Context added! Total context size: ${fullContext.length} characters.`
    );
  };

  const handleSend = async () => {
    if (!input.trim() || !chat || !activeChatId) return;

    // 1. Add User Message
    const userMsg = { role: "user" as const, text: input };
    const newMessages = [...chat.messages, userMsg];

    updateChat(activeChatId, { messages: newMessages });
    setInput("");
    setLoading(true);

    try {
      // 2. Call Backend API
      const response = await fetch("http://localhost:3000/api/a2b", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: userMsg.text,
          context: chat.context, // Ensure this sends the accumulated context
        }),
      });

      if (!response.body) throw new Error("No response body");

      // 3. Prepare Assistant Message Placeholder
      const assistantMsg = { role: "assistant" as const, text: "" };
      let updatedMessages = [...newMessages, assistantMsg];

      // 4. Stream Response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: true });

        // Append chunk to the last message (assistant)
        assistantMsg.text += chunkValue;

        // Update store with new partial text
        updateChat(activeChatId, { messages: [...updatedMessages] });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select or create a chat to begin.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-xl font-bold">{chat.name}</h2>
      </div>

      {/* MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {chat.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-[80%] ${
              msg.role === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-black self-start"
            }`}
          >
            <p className="whitespace-pre-wrap">{msg.text}</p>
          </div>
        ))}
        {loading && <div className="text-sm text-gray-500">Thinking...</div>}
        <div ref={bottomRef} />
      </div>

      {/* INPUT AREA */}
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          disabled={loading}
        />
        <ContextMenu onContextLoaded={handleContextLoaded} />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
