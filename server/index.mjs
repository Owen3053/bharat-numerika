import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";

const app = express();

const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_PATH = path.resolve(__dirname, "../dist");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json({ limit: "1mb" }));

const SYSTEM_INSTRUCTIONS = `
You are Bharat Numerika, an educational AI tutor for a college
Indian Knowledge Systems project called "Bharat Numerika: An IKS-Based
Chatbot on Ancient Indian Mathematics."

Your main subjects are:
- Indian Number System
- Decimal and place value
- Zero
- Aryabhata
- Brahmagupta
- Bhaskara II
- Katapayadi
- Pingala and binary-like patterns
- Modular arithmetic
- Algorithmic thinking
- Indian mathematics and modern IT

Give clear, accurate, college-level explanations.

Historical accuracy is important:

1. Do not say Brahmagupta invented zero.
   Explain that zero developed through a longer historical process and
   that Brahmagupta gave systematic arithmetic rules involving zero.

2. Do not say Pingala invented modern binary computing.
   Explain that short/long syllable patterns can be compared conceptually
   with binary-like two-state patterns.

3. Do not claim Katapayadi was a direct ancestor of modern computers.
   Describe it as a traditional mnemonic/encoding practice.

4. Do not invent historical facts, quotations, dates, or sources.

5. Use the supplied Bharat Numerika knowledge context whenever relevant.

Teaching style:
- Friendly
- Clear
- Exam-friendly
- College-level
- Step-by-step for calculations
- Examples whenever useful
- Avoid unnecessary jargon

For exam questions, structure answers clearly with headings,
key points, examples and a conclusion where appropriate.
`;

function buildKnowledgeContext(knowledge) {
  if (!Array.isArray(knowledge) || knowledge.length === 0) {
    return "No specific knowledge-base context was provided.";
  }

  return knowledge
    .slice(0, 4)
    .map(
      (item) => `
TOPIC: ${item.title}

SUMMARY:
${item.summary}

EXPLANATION:
${item.explanation}

EXAMPLES:
${Array.isArray(item.examples) ? item.examples.join("\n") : ""}

EXAM POINTS:
${Array.isArray(item.examPoints) ? item.examPoints.join("\n") : ""}

MODERN CONNECTION:
${item.modernConnection}
`,
    )
    .join("\n--------------------\n");
}

function cleanHistory(history) {
  if (!Array.isArray(history)) return [];

  return history
    .filter(
      (message) =>
        message &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.text === "string",
    )
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.text.slice(0, 6000),
    }));
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "Bharat Numerika AI",
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { question, history, knowledge } = req.body;

    if (typeof question !== "string" || !question.trim()) {
      return res.status(400).json({
        error: "A question is required.",
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "OPENAI_API_KEY is missing from environment variables.",
      });
    }

    const knowledgeContext = buildKnowledgeContext(knowledge);
    const conversationHistory = cleanHistory(history);

    const input = [
      {
        role: "developer",
        content: `${SYSTEM_INSTRUCTIONS}

Relevant Bharat Numerika knowledge:

${knowledgeContext}`,
      },
      ...conversationHistory,
      {
        role: "user",
        content: question.trim(),
      },
    ];

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      input,
      max_output_tokens: 1200,
    });

    const answer =
      response.output_text?.trim() ||
      "I couldn't generate an answer right now.";

    res.json({ answer });
  } catch (error) {
    console.error("AI ERROR:", error);

    res.status(500).json({
      error:
        error?.message ||
        "The AI service could not process your request.",
    });
  }
});

/*
 * Serve the production React build.
 */
app.use(express.static(DIST_PATH));

/*
 * React SPA fallback.
 * All non-API routes return the React application.
 */
app.get("/{*splat}", (_req, res) => {
  res.sendFile(path.join(DIST_PATH, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Bharat Numerika server running on port ${PORT}`,
  );
});