import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/a2b", async (req, res) => {
  try {
    const { text, context } = req.body;

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    // Combine context + prompt
    const fullPrompt = `Context:\n${context || ""}\n\nQuestion: ${text}`;

    // Request streaming from Ollama
    const ollamaRes = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama2-uncensored",
        prompt: fullPrompt,
        stream: true,
      }),
    });

    if (!ollamaRes.ok || !ollamaRes.body) {
      res.write("Error: Ollama is not running.\n");
      return res.end();
    }

    // STREAM CHUNKS SAFELY
    const decoder = new TextDecoder();
    for await (const chunk of ollamaRes.body) {
      const textChunk = decoder.decode(chunk);

      // Ollama sends multiple JSON lines per chunk
      const lines = textChunk.split("\n");

      for (const line of lines) {
        if (!line.trim()) continue;

        try {
          const json = JSON.parse(line);
          if (json.response) {
            res.write(json.response);
          }
        } catch {
          /* Ignore invalid lines */
        }
      }
    }

    res.end();
  } catch (err) {
    console.error(err);
    res.write("Internal server error.\n");
    res.end();
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
