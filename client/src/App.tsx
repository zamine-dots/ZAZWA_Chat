import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Chat from "./components/Chat";
// IMPORTANT: Ensure this path and filename match your component
import LandingPage from "./components/LandingPage";
import { useChatStore } from "@/hooks/useChatStore";
import "./App.css";

function App() {
  const { chats, createChat, activeChatId } = useChatStore();

  // State to track if the store has finished hydrating (loading from Local Storage)
  const [isHydrated, setIsHydrated] = useState(false);

  // useEffect to handle hydration status
  useEffect(() => {
    // Zustand's persist middleware often exposes a listener for when loading is complete.
    // We use onFinishHydration to prevent the LandingPage from flashing on returning users.
    const unsubHydrate = useChatStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    // Check immediately if the store is already hydrated on mount
    if (useChatStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return () => {
      unsubHydrate();
    };
  }, []);

  // --- 1. INITIAL LOADING/HYDRATION STATE ---
  if (!isHydrated) {
    // Show a minimal loading screen while the store restores data from Local Storage.
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-900 text-purple-400 text-xl">
        Loading private workspace... 🤖
      </div>
    );
  }

  // --- 2. LANDING PAGE STATE ---
  // If the store is ready and there are NO chats, show the LandingPage.
  // This completely removes the SideBar and main layout elements, allowing
  // the LandingPage to occupy 100% of the viewport.
  if (chats.length === 0) {
    return <LandingPage onCreateChat={createChat} />;
  }

  // --- 3. MAIN APPLICATION STATE (Workspace) ---
  // Renders the main chat interface only when chats exist.
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        {/* Sidebar for navigation */}
        <SideBar />

        <main className="flex-1 flex flex-col h-full  relative">
          {/* Render the Chat component only if an active chat is selected */}
          {activeChatId ? (
            <Chat />
          ) : (
            // Fallback screen if chats exist but no activeChatId is set
            <div className="flex items-center justify-center  h-full text-gray-400 bg-gray-50">
              Select a conversation or create a new one.
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}

export default App;
