// src/hooks/useChatStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Message type
export type ChatMessage = {
  role: "user" | "assistant" | "system";
  text: string;
};

// One chat object
export type Chat = {
  id: string;
  name: string;
  messages: ChatMessage[];
  context: string;
  createdAt: number;
};

// Zustand store
type ChatStore = {
  chats: Chat[];
  activeChatId: string | null;

  createChat: () => string;
  updateChat: (id: string, partial: Partial<Chat>) => void;
  renameChat: (id: string, name: string) => void;
  setActiveChat: (id: string) => void;
  getActiveChat: () => Chat | undefined;
  // NEW FUNCTION
  deleteChat: (id: string) => void;
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      activeChatId: null,

      createChat: () => {
        const id = crypto.randomUUID();
        const newChat: Chat = {
          id,
          name: "New Chat",
          messages: [],
          context: "",
          createdAt: Date.now(),
        };

        set((s) => ({ chats: [...s.chats, newChat], activeChatId: id }));
        return id;
      },

      updateChat: (id, partial) =>
        set((state) => ({
          chats: state.chats.map((c) =>
            c.id === id ? { ...c, ...partial } : c
          ),
        })),

      renameChat: (id, name) =>
        set((state) => ({
          chats: state.chats.map((c) => (c.id === id ? { ...c, name } : c)),
        })),

      setActiveChat: (id) => set({ activeChatId: id }),

      getActiveChat: () => {
        const { chats, activeChatId } = get();
        return chats.find((c) => c.id === activeChatId);
      },

      // NEW LOGIC: Delete a chat and manage the activeChatId
      deleteChat: (id) => {
        set((state) => {
          const filteredChats = state.chats.filter((chat) => chat.id !== id);
          let newActiveChatId = state.activeChatId;

          // If the deleted chat was the active one, find a new active chat
          if (state.activeChatId === id) {
            newActiveChatId =
              filteredChats.length > 0 ? filteredChats[0].id : null;
          }

          return {
            chats: filteredChats,
            activeChatId: newActiveChatId,
          };
        });
      },
      // END NEW LOGIC
    }),
    { name: "local-chat-storage" }
  )
);
