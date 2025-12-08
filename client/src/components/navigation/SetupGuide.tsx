// src/components/SetupGuide.tsx
import React from "react";
import { Download, Terminal, MessageSquare } from "lucide-react";

const OllamaStep: React.FC<{
  step: number;
  title: string;
  content: React.ReactNode;
}> = ({ step, title, content }) => (
  <div className="p-6 bg-white shadow-lg rounded-xl text-left border-l-4 border-purple-600">
    <div className="text-xl font-bold text-purple-600 mb-2">Step {step}:</div>
    <h3 className="text-2xl font-semibold mb-3">{title}</h3>
    {content}
  </div>
);

export default function SetupGuide() {
  return (
    <section
      id="about-ollama"
      className="min-h-screen flex items-center justify-center text-center py-20"
    >
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl font-bold mb-10 text-gray-800">
          Ollama Installation: Your Local LLM Engine
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-black">
          {/* Step 1 */}
          <OllamaStep
            step={1}
            title="Download Ollama"
            content={
              <>
                <p className="text-gray-600 mb-4">
                  Ollama is the essential tool for running open-source models on
                  your local machine.
                </p>
                <a
                  href="https://ollama.com/download"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  <Download className="h-5 w-5" />
                  Download for your OS
                </a>
              </>
            }
          />

          {/* Step 2 */}
          <OllamaStep
            step={2}
            title="Pull the Model"
            content={
              <>
                <p className="text-gray-600 mb-4">
                  Open your terminal and pull the specific model this
                  application uses.
                </p>
                <div className="p-3 bg-gray-800 text-cyan-400 mt-10.5 rounded-lg font-mono text-sm overflow-x-auto">
                  ollama pull llama2-uncensored
                </div>
              </>
            }
          />

          {/* Step 3 */}
          <OllamaStep
            step={3}
            title="Run the Application"
            content={
              <>
                <p className="text-gray-600 mb-4">
                  Once Ollama is running and the model is pulled, start the
                  frontend/backend.
                </p>
                <a
                  href="#features"
                  className="flex items-center justify-center gap-2 p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                >
                  <MessageSquare className="h-5 w-5" />
                  View App Features
                </a>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}
