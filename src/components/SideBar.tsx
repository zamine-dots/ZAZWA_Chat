// src/components/SideBar.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Plus, MessageSquare, Trash2 } from "lucide-react"; // Import Trash2
import { useChatStore } from "@/hooks/useChatStore";

export default function SideBar() {
  const { chats, createChat, setActiveChat, activeChatId, deleteChat } =
    useChatStore(); // Destructure deleteChat

  // Handler for the delete operation
  const handleDelete = (e: React.MouseEvent, id: string) => {
    // Prevent the click from triggering the setActiveChat handler (the parent button)
    e.stopPropagation();

    if (window.confirm("Are you sure you want to delete this chat?")) {
      deleteChat(id);
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        {/* NEW CHAT BUTTON */}
        <SidebarGroup>
          <SidebarGroupLabel>Conversations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button
                    onClick={() => createChat()}
                    className="flex items-center gap-2 w-full bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="font-semibold">New Chat</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* LIST OF CHATS */}
        <SidebarGroup>
          <SidebarGroupLabel>History</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton asChild>
                    {/* The main button handles setting the active chat */}
                    <button
                      onClick={() => setActiveChat(chat.id)}
                      className={`flex items-center justify-between gap-2 w-full text-left p-2 rounded truncate group ${
                        activeChatId === chat.id
                          ? "bg-gray-200 font-medium"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <MessageSquare className="h-4 w-4 opacity-70 flex-shrink-0" />
                        <span className="truncate">{chat.name}</span>
                      </span>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => handleDelete(e, chat.id)}
                        className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 
                            ${
                              activeChatId === chat.id
                                ? "opacity-100 bg-gray-300"
                                : ""
                            }
                            hover:bg-red-200 text-red-600 ml-auto
                        `}
                        title="Delete Chat"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
