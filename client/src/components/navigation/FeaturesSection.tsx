// src/components/FeaturesSection.tsx
import React from "react";
import { Code, BarChart, Rocket } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="min-h-screen flex items-center justify-center  text-center py-20"
    >
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl font-bold mb-10 text-gray-800">
          Core Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 bg-white shadow-lg rounded-xl border-t-4 border-blue-500">
            <Code className="h-8 w-8 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Local Code Analysis</h3>
            <p className="text-gray-600">
              Debug, explain, and generate code snippets entirely offline using
              the power of local LLMs.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-white shadow-lg rounded-xl border-t-4 border-cyan-400">
            <BarChart className="h-8 w-8 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Data Privacy First</h3>
            <p className="text-gray-600">
              Your documents and chat history never leave your machine, ensuring
              maximum privacy and security.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-white shadow-lg rounded-xl border-t-4 border-purple-500">
            <Rocket className="h-8 w-8 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Contextual Chat</h3>
            <p className="text-gray-600">
              Upload PDF or TXT files to give the AI real-time, custom context
              for deep, relevant answers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
