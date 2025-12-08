import React, { useEffect, useRef } from "react";
import { Send, Zap } from "lucide-react";

// Assuming these are located in a 'navigation' folder under components or src
// Adjust paths if needed (e.g., './SetupGuide' if they are peers)
import SetupGuide from "./navigation/SetupGuide";
import FeaturesSection from "./navigation/FeaturesSection";

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface LandingPageProps {
  // Function passed from App.tsx to create the first chat and switch view
  onCreateChat: () => string;
}

function LandingPage({ onCreateChat }: LandingPageProps) {
  const text =
    "Unlock true privacy and power with a self-hosted, local Large Language Model (LLM). Zero data leaves your machine. Scroll down to get started.";

  // Function to handle the start chat button click
  const handleStartChat = () => {
    onCreateChat();
  };

  // ---- TYPED REFS & LOGIC (Kept exactly as you provided) ----
  const typedTextRef = useRef<HTMLSpanElement | null>(null);
  const cursorRef = useRef<HTMLSpanElement | null>(null);

  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const restartTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let index = 0;

    function typeCharacter() {
      if (index < text.length && typedTextRef.current) {
        typedTextRef.current.textContent += text.charAt(index++);
        typingTimeout.current = setTimeout(typeCharacter, 30);
      } else {
        if (cursorRef.current) cursorRef.current.style.display = "none";

        restartTimeout.current = setTimeout(() => {
          if (typedTextRef.current) typedTextRef.current.textContent = "";
          if (cursorRef.current) cursorRef.current.style.display = "inline";
          index = 0;
          typeCharacter();
        }, 3000);
      }
    }

    typeCharacter();

    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
      if (restartTimeout.current) clearTimeout(restartTimeout.current);
    };
  }, []);
  // ---- END TYPED REFS & LOGIC ----

  return (
    <>
      {/* --- NAVIGATION BAR: Fixed, Full Width --- */}
      <NavigationMenu className="fixed top-0 left-0 w-full bg-white   shadow-lg z-20 border-b border-gray-200">
        <div className="flex justify-between items-center w-full max-w-7xl  px-8 py-3">
          {/* LOGO */}
          <div className="text-2xl font-bold mr-6 text-gray-800 flex items-center gap-2">
            <Zap className="h-6 w-6 text-purple-600" />
            ZazwaChat
          </div>

          {/* Navigation Links */}
          <NavigationMenuList className="flex space-x-2">
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                href="#home"
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                href="#about-ollama"
              >
                Setup Guide
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                href="#features"
              >
                Features
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>

          {/* Start App Button */}
          <button
            onClick={handleStartChat}
            className="hidden sm:inline-flex items-center gap-2 ml-5 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm rounded-lg transition font-semibold"
          >
            <Send className="h-4 w-4" />
            Start App
          </button>
        </div>
      </NavigationMenu>

      {/* --- HOME SECTION (Hero) --- */}
      <section
        id="home"
        // Added pt-20 to push content below the fixed navbar
        className="min-h-screen w-full flex flex-col items-center justify-center text-center  text-white pt-20"
      >
        <div className="container max-w-4xl">
          <h1 className="display-3 text-9xl mb-15 fw-bolder mb-4 text-purple-900">
            ZazwaChat
          </h1>
          <h1 className="display-3 fw-bolder mb-4 text-purple-500">
            Private AI, Local Power.
          </h1>

          <p className="lead mb-5 text-gray-400 min-h-[50px]">
            <span ref={typedTextRef} className="text-xl"></span>
            <span
              ref={cursorRef}
              className="blinking-cursor text-xl font-light ml-1"
            >
              |
            </span>
          </p>

          <button
            onClick={handleStartChat}
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 text-lg rounded-lg transition font-semibold flex items-center gap-2 mx-auto"
          >
            <Send className="h-5 w-5" />
            Start Setup & Chat
          </button>
        </div>
      </section>

      {/* --- SETUP GUIDE --- */}
      <SetupGuide />

      {/* --- FEATURES SECTION --- */}
      <FeaturesSection />
    </>
  );
}

export default LandingPage;
