import { useEffect } from "react";
import SideBar from "./components/SideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Chat from "./components/Chat"; // Ensure this path matches your folder structure
import { useChatStore } from "@/hooks/useChatStore";
import "./App.css";

function App() {
  // 1. Get chats and createChat from the store
  const { chats, createChat, activeChatId } = useChatStore();

  // 2. Automatically create a chat if none exist
  useEffect(() => {
    // Only create if we have loaded the store (persisted) and it's empty
    if (chats.length === 0) {
      createChat();
    }
  }, [chats.length, createChat]);

  return (
    <SidebarProvider>
      <div className="flex w-full h-screen overflow-hidden">
        <SideBar />
        <main className="flex-1 flex flex-col h-full relative">
          {/* 3. Only render Chat if we have an active ID, otherwise show loading */}
          {activeChatId ? (
            <Chat />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Loading workspace...
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}

export default App;
