/* eslint-disable no-undef */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

// Environment Configuration
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error("OPENAI_API_KEY is missing.");
  process.exit(1);
}

// Express App Setup
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// OpenAI Client
const openai = new OpenAI({
  apiKey,
});

// AI Chat Endpoint
app.post("/api/ai-chat", async (req, res) => {
  try {
    const { message, language, studyData, skillData } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required.",
      });
    }

    const isArabic = language === "ar";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are Planova AI.

You are a modern productivity AI assistant inside a student planner app.

User Study Data:
${JSON.stringify(studyData, null, 2)}

User Skill Data:
${JSON.stringify(skillData, null, 2)}

Strict Rules:
- Reply in ${isArabic ? "Arabic" : "English"}.
- Keep responses short.
- Maximum 120 words.
- Use emoji section titles.
- Use bullet points.
- Give personalized suggestions only.
- Do not write long introductions or conclusions.
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.4,
    });

    return res.json({
      reply:
        completion.choices?.[0]?.message?.content || "No response generated.",
    });
  } catch (error) {
    console.error("AI Error:", error);

    return res.status(500).json({
      error: "AI request failed.",
    });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Planova AI server running on http://localhost:${port}`);
});