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

const groq = process.env.GROQ_API_KEY
  ? new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    })
  : null;

app.use(express.json({ limit: "1mb" }));

const SYSTEM_INSTRUCTIONS = `
You are Bharat Numerika, an educational AI tutor for a college
Indian Knowledge Systems project called "Bharat Numerika: An IKS-Based
Chatbot on Ancient Indian Mathematics."

Main subjects:
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

Teaching style:
- Friendly
- Clear
- College-level
- Exam-friendly
- Step-by-step for calculations
- Give examples when useful
- Avoid unnecessary jargon

Historical accuracy is essential.

Never say Brahmagupta invented zero.
Explain that zero developed through a longer historical process and
that Brahmagupta gave systematic arithmetic rules involving zero.

Never say Pingala invented modern binary computing.
Explain that Pingala's short/long syllable patterns can be compared
conceptually with binary-like two-state patterns.

Never claim Katapayadi was a direct ancestor of modern computers.
Describe it as a traditional mnemonic and encoding practice.

Do not invent historical facts, quotations, dates, or sources.

For exam questions, use clear headings, key points, examples,
and a short conclusion where appropriate.
`;

function buildKnowledgeContext(knowledge) {
  if (!Array.isArray(knowledge) || knowledge.length === 0) {
    return "No specific knowledge-base context was provided.";
  }

  return knowledge
    .slice(0, 4)
    .map(
      (item) => `
TOPIC: ${item.title || ""}

SUMMARY:
${item.summary || ""}

EXPLANATION:
${item.explanation || ""}

EXAMPLES:
${Array.isArray(item.examples) ? item.examples.join("\n") : ""}

EXAM POINTS:
${Array.isArray(item.examPoints) ? item.examPoints.join("\n") : ""}

MODERN CONNECTION:
${item.modernConnection || ""}
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
    .slice(-10)
    .map((message) => ({
      role: message.role,
      content: message.text.slice(0, 5000),
    }));
}

function numberToIndianWords(value) {
  const number = Number(
    String(value)
      .replace(/,/g, "")
      .replace(/[^\d.-]/g, ""),
  );

  if (!Number.isFinite(number)) return null;

  const ones = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];

  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  function underThousand(n) {
    if (n < 20) return ones[n];

    if (n < 100) {
      return tens[Math.floor(n / 10)] + (n % 10 ? `-${ones[n % 10]}` : "");
    }

    return (
      `${ones[Math.floor(n / 100)]} hundred` +
      (n % 100 ? ` ${underThousand(n % 100)}` : "")
    );
  }

  if (number === 0) return "zero";

  if (number < 0) {
    return `minus ${numberToIndianWords(Math.abs(number))}`;
  }

  if (!Number.isSafeInteger(number)) return null;

  const groups = [
    ["crore", 10000000],
    ["lakh", 100000],
    ["thousand", 1000],
    ["", 1],
  ];

  let remaining = number;
  const parts = [];

  for (const [name, divisor] of groups) {
    const count = Math.floor(remaining / divisor);

    if (count > 0) {
      parts.push(
        `${underThousand(count)}${name ? ` ${name}` : ""}`,
      );
      remaining %= divisor;
    }
  }

  return parts.join(" ");
}

function indianNumberFallback(question) {
  const match = question.match(
    /\b\d{1,3}(?:,\d{2})*(?:,\d{3})?\b|\b\d{5,12}\b/,
  );

  if (
    match &&
    /(word|words|write|number|numeral)/i.test(question)
  ) {
    const value = match[0];
    const words = numberToIndianWords(value);

    if (words) {
      return `### ${value} in words

**${words}**

This uses the Indian numbering system:

- 1 thousand = 1,000
- 1 lakh = 1,00,000
- 1 crore = 1,00,00,000

For example, **12,34,56,789** is:

**twelve crore thirty-four lakh fifty-six thousand seven hundred eighty-nine.**`;
    }
  }

  return null;
}

function localTutorAnswer(question) {
  const q = question.toLowerCase();

  const numberAnswer = indianNumberFallback(question);
  if (numberAnswer) return numberAnswer;

  if (
    q.includes("grouping") &&
    (q.includes("indian") || q.includes("digit") || q.includes("number"))
  ) {
    return `### Grouping of digits in the Indian number system

The Indian system groups digits differently from the international system.

After the first three digits from the right, digits are grouped in pairs:

**12,34,56,789**

This is read as:

**12 crore 34 lakh 56 thousand 789**

The main place-value groups are:

- Ones
- Thousands
- Lakhs
- Crores

### Example

**5,43,21,678**

= 5 crore 43 lakh 21 thousand 678

This grouping makes large numbers easier to read and is a major feature of the Indian place-value system.`;
  }

  if (q.includes("zero")) {
    return `### Zero in Indian mathematics

Zero is both a number and a placeholder in the place-value system.

A particularly important historical development was the formulation of arithmetic rules involving zero by **Brahmagupta** in the 7th century.

For example:

- a number + 0 = the same number
- a number − 0 = the same number
- a number × 0 = 0

It is important not to describe Brahmagupta simply as the "inventor of zero." The development of zero took place through a longer mathematical and historical process.`;
  }

  if (q.includes("aryabhata")) {
    return `### Aryabhata

**Aryabhata** was a major Indian mathematician and astronomer.

Important contributions associated with his work include:

- systematic work with arithmetic and mathematics
- methods involving large numbers
- work on algebraic and astronomical calculations
- use of sophisticated computational techniques

His work is important in the history of Indian mathematical and astronomical thought.`;
  }

  if (q.includes("brahmagupta")) {
    return `### Brahmagupta

**Brahmagupta** was a major Indian mathematician of the 7th century.

His work is especially important for:

- arithmetic involving zero
- rules for positive and negative numbers
- algebraic methods
- systematic mathematical procedures

He should not be described as simply the inventor of zero. His major historical importance includes giving systematic rules for arithmetic involving zero.`;
  }

  if (q.includes("bhaskara") || q.includes("bhāskara")) {
    return `### Bhaskara II

**Bhaskara II**, also known as Bhaskaracharya, was a major Indian mathematician and astronomer.

His mathematical work included:

- arithmetic
- algebra
- equations
- geometry
- astronomical calculations

His works demonstrate the advanced computational and mathematical traditions of medieval India.`;
  }

  if (q.includes("katapayadi") || q.includes("katapayādi")) {
    return `### Katapayadi system

The **Katapayadi system** is a traditional Indian mnemonic and encoding method.

It associates consonants with numerical values so that numbers can be represented through meaningful syllables or words.

Its importance includes:

- helping memorise numerical information
- connecting language and numbers
- demonstrating an algorithmic way of encoding numerical data

It should not be described as a direct ancestor of modern computers.`;
  }

  if (q.includes("pingala")) {
    return `### Pingala and binary-like patterns

**Pingala** is associated with the ancient Indian tradition of prosody.

His work on combinations of short and long syllables can be understood as a **binary-like two-state pattern**:

- short syllable → one state
- long syllable → another state

This provides an interesting conceptual connection to modern binary thinking, but Pingala should not be described as having invented modern binary computing.`;
  }

  if (q.includes("modular") || q.includes("modulo") || q.includes("remainder")) {
    return `### Modular arithmetic

Modular arithmetic studies numbers according to their remainders after division.

For example:

**17 mod 5 = 2**

because 17 divided by 5 leaves a remainder of 2.

A useful way to think about it is a clock:

- 12 + 3 ≡ 3 (mod 12)
- 10 + 5 ≡ 3 (mod 12)

Modular arithmetic is useful in computer science, cryptography, calendars, and cyclic systems.`;
  }

  if (
    q.includes("algorithm") ||
    q.includes("algorithmic thinking")
  ) {
    return `### Algorithmic thinking

Algorithmic thinking means solving a problem through a clear sequence of steps.

A basic process is:

1. Understand the problem.
2. Identify the required inputs.
3. Define the steps.
4. Perform the steps in order.
5. Check the result.

This connects naturally with mathematical procedures because many traditional mathematical methods are expressed as repeatable step-by-step calculations.`;
  }

  if (
    q.includes("indian number system") ||
    q.includes("number system")
  ) {
    return `### Indian Number System

The Indian number system is a decimal place-value system.

Its important place-value groups include:

**Ones → Thousands → Lakhs → Crores**

For example:

**12,34,56,789**

is read as:

**twelve crore thirty-four lakh fifty-six thousand seven hundred eighty-nine.**

The distinctive feature is the grouping pattern: after the first three digits from the right, digits are grouped in pairs.`;
  }

  return `### Bharat Numerika Tutor

I can help you study:

- Indian Number System
- Place Value and Zero
- Aryabhata
- Brahmagupta
- Bhaskara II
- Katapayadi
- Pingala
- Modular Arithmetic
- Algorithmic Thinking

Try asking a specific question such as:

**"Explain the Indian number system."**

or

**"What was Brahmagupta's contribution to zero?"**`;
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "Bharat Numerika AI",
    provider: groq ? "Groq" : "Local Tutor",
  });
});

app.post("/api/chat", async (req, res) => {
  const { question, history, knowledge } = req.body;

  if (typeof question !== "string" || !question.trim()) {
    return res.status(400).json({
      error: "A question is required.",
    });
  }

  const cleanQuestion = question.trim();
  const knowledgeContext = buildKnowledgeContext(knowledge);
  const conversationHistory = cleanHistory(history);

  if (groq) {
    try {
      const messages = [
        {
          role: "system",
          content: `${SYSTEM_INSTRUCTIONS}

Relevant Bharat Numerika knowledge:

${knowledgeContext}`,
        },
        ...conversationHistory,
        {
          role: "user",
          content: cleanQuestion,
        },
      ];

      const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages,
        max_tokens: 1200,
        temperature: 0.4,
      });

      const answer =
        response.choices?.[0]?.message?.content?.trim();

      if (answer) {
        return res.json({
          answer,
          provider: "Groq",
        });
      }
    } catch (error) {
      console.error("Groq API error:", error?.message || error);
      console.log("Falling back to local Bharat Numerika tutor.");
    }
  }

  return res.json({
    answer: localTutorAnswer(cleanQuestion),
    provider: "Bharat Numerika Local Tutor",
  });
});

app.use(express.static(DIST_PATH));

app.get("/{*splat}", (_req, res) => {
  res.sendFile(path.join(DIST_PATH, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Bharat Numerika server running on port ${PORT}`,
  );
});
