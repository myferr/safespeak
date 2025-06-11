import { OllamaConfig } from "./config";

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 2000;
const OLLAMA_URL = `${OllamaConfig.protocol}://${OllamaConfig.hostname}${OllamaConfig.localhostPort.port}${OllamaConfig.apiRoute}`;
const LOG_FILE = path.join(__dirname, "logs.jsonl");

app.use(cors());

app.get(
  "/api",
  async (
    req: { query: { message: string; showMessage: string } },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { error: string }): void; new (): any };
      };
      json: (arg0: {
        tags: string[];
        content?: string | undefined;
        score: number;
      }) => void;
    }
  ) => {
    const message = req.query.message as string;
    const showMessage = req.query.showMessage === "true";

    if (!message) {
      res.status(400).json({ error: "Missing 'message' query parameter" });
      return;
    }

    const prompt = `
You are a content moderation assistant designed to assess the profanity and offensiveness level of a message.

Rate the following message on a scale from 0 to 100, where:
- 0 = completely clean and respectful
- 1–20 = slightly informal or mildly inappropriate language
- 21–40 = sarcastic, rude, or passive-aggressive tone with light profanity
- 41–60 = moderately offensive, insulting, or contains clear profane words
- 61–80 = highly offensive, explicit profanity, or strongly abusive tone
- 81–100 = extreme profanity, hate speech, threats, or severely toxic language

Only respond with the numeric score. Do not explain your reasoning. Do not include any text, labels, headers, or formatting—only return the score as a raw number that can be parsed as an integer by JavaScript.

Message: "${message}"

Score:
`;

    try {
      const response = await axios.post(OLLAMA_URL, {
        model: OllamaConfig.model,
        prompt,
        stream: OllamaConfig.stream,
      });

      const raw = response.data.response;
      const scoreMatch = raw.match(/\d+/);
      const rawScore = scoreMatch ? parseInt(scoreMatch[0], 10) : 0;

      const score = +(rawScore / 100).toFixed(2); // e.g., 0.73
      const tags: string[] = []; // You can add tag logic later

      const result = {
        score,
        ...(showMessage ? { content: message } : {}),
        tags,
      };

      // Append to logs.jsonl
      const logLine =
        JSON.stringify({
          timestamp: new Date().toISOString(),
          message,
          score,
          tags,
        }) + "\n";

      fs.appendFile(LOG_FILE, logLine, (err: any) => {
        if (err) console.error("Error writing to log:", err);
      });

      res.json(result);
    } catch (err) {
      console.error("Ollama error:", err);
      res.status(500).json({ error: "Failed to get score from Ollama" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`🚀 API running at http://localhost:${PORT}/api?message=...`);
});
