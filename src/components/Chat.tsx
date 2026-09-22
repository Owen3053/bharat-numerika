import { useMemo, useState } from "react";
import {
  ArrowUp,
  CheckCircle2,
  ChevronDown,
  Copy,
  GraduationCap,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";

import { searchKnowledge } from "../data/knowledge";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

export type ChatProps = {
  onClose: () => void;
};

type VivaQuestion = {
  question: string;
  answer: string;
};

const SUGGESTIONS = [
  "Explain zero in Indian mathematics",
  "Who was Aryabhata?",
  "How does the Katapayadi system work?",
  "Explain Pingala and binary-like patterns",
];

const VIVA_BANK: VivaQuestion[] = [
  {
    question: "Who was Brahmagupta?",
    answer:
      "Brahmagupta was a major Indian mathematician and astronomer of the 7th century. He is especially known for giving systematic arithmetic rules involving zero, positive and negative numbers in his work Brahmasphutasiddhanta.",
  },
  {
    question: "What is the importance of zero?",
    answer:
      "Zero has two important roles: it can represent the absence of quantity as a number, and it acts as a placeholder in positional notation. This makes numbers such as 205 and 250 distinguishable.",
  },
  {
    question: "Who was Aryabhata?",
    answer:
      "Aryabhata was an influential Indian mathematician and astronomer associated with the 5th century. His Aryabhatiya discusses arithmetic, algebraic methods, geometry, trigonometry and astronomy.",
  },
  {
    question: "What is Katapayadi?",
    answer:
      "Katapayadi is a traditional Indian mnemonic and encoding system in which consonants can be associated with numerical values. It was used to help remember numerical information.",
  },
  {
    question: "What is associated with Pingala?",
    answer:
      "Pingala is associated with the study of Sanskrit prosody. His work includes systematic treatment of patterns formed from short and long syllables. These can be compared conceptually with two-state or binary-like patterns.",
  },
  {
    question: "What is modular arithmetic?",
    answer:
      "Modular arithmetic studies numbers in terms of their remainders after division by a modulus. For example, 17 mod 5 is 2. It is useful for cycles, clocks, algorithms and computer science.",
  },
  {
    question: "What is place value?",
    answer:
      "Place value means that the value of a digit depends on its position. In 2654, the 2 represents 2000, the 6 represents 600, the 5 represents 50 and the 4 represents 4.",
  },
];

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function formatText(text: string) {
  return text
    .replace(/\\\[/g, "")
    .replace(/\\\]/g, "")
    .replace(/\\\(/g, "")
    .replace(/\\\)/g, "")
    .replace(/\$\$/g, "")
    .replace(/\$/g, "");
}

function renderRichText(text: string) {
  const cleaned = formatText(text);

  return cleaned.split("\n").map((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      return <div key={index} className="bn-chat-space" />;
    }

    if (/^#{1,3}\s/.test(trimmed)) {
      return (
        <h3 key={index} className="bn-chat-heading">
          {trimmed.replace(/^#{1,3}\s/, "")}
        </h3>
      );
    }

    if (/^[-*]\s/.test(trimmed)) {
      return (
        <div key={index} className="bn-chat-bullet">
          <span />
          <div>{trimmed.replace(/^[-*]\s/, "")}</div>
        </div>
      );
    }

    if (/^\d+\.\s/.test(trimmed)) {
      return (
        <div key={index} className="bn-chat-numbered">
          <strong>{trimmed.match(/^\d+\./)?.[0]}</strong>
          <div>{trimmed.replace(/^\d+\.\s/, "")}</div>
        </div>
      );
    }

    return (
      <p key={index} className="bn-chat-paragraph">
        {trimmed}
      </p>
    );
  });
}

function findLocalAnswer(question: string) {
  const normalized = question.toLowerCase();

  if (
    normalized.includes("zero") ||
    normalized.includes("shunya") ||
    normalized.includes("śūnya")
  ) {
    return `## Zero in Indian Mathematics

Zero is one of the most important ideas in the history of mathematics.

It has two major roles:

- **Number:** zero represents a quantity of none.
- **Placeholder:** zero shows that a particular positional place is empty.

For example, in **205**, the zero tells us that there are no tens. Without that positional information, the structure of the number would change.

Indian mathematical traditions played an important role in the development of systematic arithmetic involving zero. Brahmagupta, in particular, described arithmetic rules involving zero in the *Brahmasphutasiddhanta*.

It is more accurate to describe zero as the result of a longer historical development rather than saying that one person simply "invented" it.

### Why it matters today

Positional notation and zero are fundamental to modern arithmetic, algorithms, programming and digital systems.`;
  }

  if (normalized.includes("aryabhata")) {
    return `## Aryabhata

Aryabhata was an influential Indian mathematician and astronomer associated with the 5th century.

His *Aryabhatiya* contains work on:

- arithmetic
- algebraic methods
- geometry
- trigonometry
- astronomy

Aryabhata is particularly important for understanding how mathematical calculation and astronomical observation were connected in classical Indian scholarship.

### Modern connection

His work demonstrates an important idea that remains relevant in computing today: mathematical methods can be organized into systematic procedures for solving problems.`;
  }

  if (normalized.includes("katapayadi")) {
    return `## Katapayadi System

Katapayadi is a traditional Indian mnemonic and numerical encoding system.

Consonants can be associated with numerical values, allowing numbers to be represented through words or syllables.

### Why was it useful?

The system could make long numerical information easier to remember because meaningful words were easier to memorize than a sequence of digits.

### Modern connection

Katapayadi can be studied as an example of information encoding. It should not be described as a direct ancestor of modern computers, but its basic idea of representing numerical information through another symbolic system is interesting from an information-science perspective.`;
  }

  if (normalized.includes("pingala") || normalized.includes("binary")) {
    return `## Pingala and Binary-like Patterns

Pingala is associated with Sanskrit prosody, particularly the systematic study of patterns made from short and long syllables.

A pattern can be represented using two states:

**Short → 0**  
**Long → 1**

For example, a four-position pattern could have forms such as:

0000  
0001  
0010  
0011  
0100  
0101

This creates a combinatorial system of two-state patterns.

### Important distinction

Pingala should not be described as having invented modern binary computing. The comparison is conceptual: both involve systematic arrangements of two possible states.

### Modern connection

Two-state representations are central to digital logic and computing, which makes Pingala's combinatorial ideas an interesting historical connection to algorithmic thinking.`;
  }

  if (normalized.includes("brahmagupta")) {
    return `## Brahmagupta

Brahmagupta was a major Indian mathematician and astronomer of the 7th century.

His *Brahmasphutasiddhanta* contains systematic mathematical rules involving:

- zero
- positive numbers
- negative numbers
- arithmetic
- algebraic procedures

A key historical point is that Brahmagupta should not simply be described as the "inventor of zero." The development of zero took place over a longer period.

His importance lies in the systematic treatment of arithmetic involving zero and signed numbers.`;
  }

  if (
    normalized.includes("modular") ||
    normalized.includes("remainder") ||
    normalized.includes("mod ")
  ) {
    return `## Modular Arithmetic

Modular arithmetic focuses on remainders.

For example:

17 ÷ 5 leaves a remainder of 2.

Therefore:

**17 mod 5 = 2**

It is useful for representing repeating cycles such as:

- clocks
- calendars
- periodic patterns
- cyclic algorithms
- computer science problems

The important idea is that numbers can be grouped according to the remainder they produce under a chosen modulus.`;
  }

  if (
    normalized.includes("place value") ||
    normalized.includes("positional")
  ) {
    return `## Place Value

In a positional number system, a digit's value depends on its position.

For example:

**2654**

can be expanded as:

2 × 1000 + 6 × 100 + 5 × 10 + 4

So:

**2654 = 2000 + 600 + 50 + 4**

This is why the same digit can represent different values depending on where it appears.

For example:

5 in 500 = 500  
5 in 50 = 50  
5 in 5 = 5

Zero is especially important because it can mark an empty positional place.`;
  }

  return `I can explain that topic using the Bharat Numerika knowledge base. Try asking me for a definition, historical explanation, worked example, comparison, or exam-style answer.`;
}

function MessageContent({
  message,
  onCopy,
}: {
  message: ChatMessage;
  onCopy: (text: string) => void;
}) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={
        isAssistant
          ? "bn-message-row assistant"
          : "bn-message-row user"
      }
    >
      {isAssistant && (
        <div className="bn-avatar">
          <Sparkles size={15} />
        </div>
      )}

      <div
        className={
          isAssistant
            ? "bn-message assistant-message"
            : "bn-message user-message"
        }
      >
        {isAssistant ? (
          <>
            <div className="bn-message-content">
              {renderRichText(message.text)}
            </div>

            <button
              className="bn-copy-button"
              onClick={() => onCopy(message.text)}
              aria-label="Copy response"
              title="Copy response"
            >
              <Copy size={13} />
            </button>
          </>
        ) : (
          <div className="bn-message-content">
            <p className="bn-chat-paragraph">{message.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Chat({ onClose }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: makeId(),
      role: "assistant",
      text: `## Namaste 👋

I'm Bharat Numerika, your AI tutor for Indian mathematical heritage.

Ask me about **zero, Aryabhata, Brahmagupta, place value, Katapayadi, Pingala, modular arithmetic**, or any other topic from your IKS syllabus.

You can also ask for an exam-style explanation or a worked example.`,
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [vivaMode, setVivaMode] = useState(false);
  const [vivaIndex, setVivaIndex] = useState(0);
  const [vivaScore, setVivaScore] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentViva = useMemo(
    () => VIVA_BANK[vivaIndex % VIVA_BANK.length],
    [vivaIndex],
  );

  const resetChat = () => {
    setMessages([
      {
        id: makeId(),
        role: "assistant",
        text: `## Chat reset

Welcome back to Bharat Numerika.

What would you like to explore?`,
      },
    ]);

    setInput("");
    setVivaMode(false);
    setVivaIndex(0);
    setVivaScore(0);
  };

  const copyResponse = async (text: string) => {
    try {
      await navigator.clipboard.writeText(formatText(text));
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1400);
    } catch {
      // Clipboard can be unavailable in some browser contexts.
    }
  };

  const sendQuestion = async (question: string) => {
    const trimmed = question.trim();

    if (!trimmed || loading) return;

    const userMessage: ChatMessage = {
      id: makeId(),
      role: "user",
      text: trimmed,
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setLoading(true);

    if (vivaMode) {
      const answer = currentViva.answer;

      window.setTimeout(() => {
        setMessages((previous) => [
          ...previous,
          {
            id: makeId(),
            role: "assistant",
            text: `### Viva answer

${answer}

**Score:** ${vivaScore + 1} / ${vivaIndex + 1}`,
          },
        ]);

        setVivaScore((score) => score + 1);
        setVivaIndex((index) => index + 1);
        setLoading(false);
      }, 500);

      return;
    }

    try {
      const knowledge = searchKnowledge(trimmed);

      const history = [...messages, userMessage]
        .slice(-10)
        .map((message) => ({
          role: message.role,
          text: message.text,
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: trimmed,
          history,
          knowledge,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "The AI service could not process the request.",
        );
      }

      setMessages((previous) => [
        ...previous,
        {
          id: makeId(),
          role: "assistant",
          text:
            typeof data.answer === "string"
              ? data.answer
              : findLocalAnswer(trimmed),
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((previous) => [
        ...previous,
        {
          id: makeId(),
          role: "assistant",
          text: findLocalAnswer(trimmed),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const startViva = () => {
    setVivaMode(true);
    setVivaIndex(0);
    setVivaScore(0);

    setMessages((previous) => [
      ...previous,
      {
        id: makeId(),
        role: "assistant",
        text: `## Viva mode

I'll ask you short questions from the Bharat Numerika syllabus.

**Question 1**

${VIVA_BANK[0].question}

Type your answer below.`,
      },
    ]);
  };

  const handleSubmit = () => {
    void sendQuestion(input);
  };

  return (
    <div className="bn-chat-overlay">
      <div className="bn-chat-shell">
        <header className="bn-chat-header">
          <div className="bn-chat-brand">
            <div className="bn-chat-brand-icon">
              <Sparkles size={17} />
            </div>

            <div>
              <strong>Bharat Numerika</strong>
              <span>AI LEARNING COMPANION</span>
            </div>
          </div>

          <div className="bn-chat-header-actions">
            <button
              className={
                vivaMode
                  ? "bn-header-action active"
                  : "bn-header-action"
              }
              onClick={startViva}
              title="Start viva mode"
            >
              <Trophy size={15} />
              <span>Viva</span>
            </button>

            <button
              className="bn-header-icon"
              onClick={resetChat}
              title="Reset conversation"
              aria-label="Reset conversation"
            >
              <RotateCcw size={16} />
            </button>

            <button
              className="bn-header-icon"
              onClick={onClose}
              title="Close tutor"
              aria-label="Close tutor"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {vivaMode && (
          <div className="bn-viva-bar">
            <div className="bn-viva-left">
              <Trophy size={15} />
              <span>Viva mode</span>
              <strong>
                {vivaScore} / {vivaIndex}
              </strong>
            </div>

            <button
              onClick={() => {
                setVivaMode(false);
                setInput("");
              }}
            >
              Exit
            </button>
          </div>
        )}

        <div className="bn-chat-body">
          <div className="bn-chat-inner">
            {messages.map((message) => (
              <MessageContent
                key={message.id}
                message={message}
                onCopy={copyResponse}
              />
            ))}

            {loading && (
              <div className="bn-message-row assistant">
                <div className="bn-avatar">
                  <Sparkles size={15} />
                </div>

                <div className="bn-message assistant-message">
                  <div className="bn-thinking">
                    <span />
                    <span />
                    <span />
                    <em>Thinking</em>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {!loading && messages.length <= 1 && !vivaMode && (
          <div className="bn-suggestion-area">
            <div className="bn-suggestion-label">
              <Sparkles size={13} />
              Suggested questions
            </div>

            <div className="bn-suggestions">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => void sendQuestion(suggestion)}
                >
                  {suggestion}
                  <ArrowUp size={13} />
                </button>
              ))}
            </div>
          </div>
        )}

        {vivaMode && (
          <div className="bn-viva-question">
            <div className="bn-viva-question-icon">
              <GraduationCap size={18} />
            </div>

            <div>
              <span>Current question</span>
              <strong>{currentViva.question}</strong>
            </div>

            <ChevronDown size={16} />
          </div>
        )}

        <footer className="bn-chat-composer">
          <div className="bn-composer-shell">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder={
                vivaMode
                  ? "Type your viva answer..."
                  : "Ask about Indian mathematics..."
              }
              rows={1}
              disabled={loading}
            />

            <button
              className="bn-send-button"
              onClick={handleSubmit}
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <ArrowUp size={17} />
            </button>
          </div>

          <div className="bn-composer-footer">
            <span>
              <CheckCircle2 size={12} />
              AI tutor for IKS learning
            </span>

            {copied && (
              <span className="bn-copied">
                <Copy size={12} />
                Copied
              </span>
            )}

            <span className="bn-composer-hint">
              Enter to send · Shift + Enter for new line
            </span>
          </div>
        </footer>
      </div>

      <style>{`
        .bn-chat-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: rgba(24, 23, 20, 0.42);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: stretch;
          justify-content: flex-end;
        }

        .bn-chat-shell {
          width: min(760px, 100%);
          height: 100%;
          background: #f8f6f1;
          color: #211f1b;
          display: flex;
          flex-direction: column;
          box-shadow: -20px 0 60px rgba(0, 0, 0, 0.16);
          border-left: 1px solid rgba(33, 31, 27, 0.08);
        }

        .bn-chat-header {
          height: 70px;
          flex-shrink: 0;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #dedbd3;
          background: rgba(248, 246, 241, 0.96);
        }

        .bn-chat-brand {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .bn-chat-brand-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: #211f1b;
          color: #f5f1e8;
        }

        .bn-chat-brand strong {
          display: block;
          font-size: 13px;
          letter-spacing: -0.02em;
        }

        .bn-chat-brand span {
          display: block;
          margin-top: 3px;
          font-size: 7px;
          letter-spacing: 0.18em;
          color: #88837b;
        }

        .bn-chat-header-actions {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .bn-header-action,
        .bn-header-icon {
          height: 36px;
          border: 1px solid #dedbd3;
          background: #fff;
          color: #211f1b;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          transition: 160ms ease;
        }

        .bn-header-action {
          padding: 0 12px;
          font-size: 11px;
          font-weight: 600;
        }

        .bn-header-action:hover,
        .bn-header-icon:hover {
          border-color: #aaa59c;
          transform: translateY(-1px);
        }

        .bn-header-action.active {
          background: #211f1b;
          border-color: #211f1b;
          color: white;
        }

        .bn-header-icon {
          width: 36px;
        }

        .bn-viva-bar {
          min-height: 43px;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f0ebe0;
          border-bottom: 1px solid #ddd5c8;
          font-size: 10px;
        }

        .bn-viva-left {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #6d675e;
        }

        .bn-viva-left svg {
          color: #9f4635;
        }

        .bn-viva-left strong {
          margin-left: 5px;
          color: #211f1b;
        }

        .bn-viva-bar button {
          border: 0;
          background: transparent;
          color: #9f4635;
          font-size: 10px;
          font-weight: 700;
        }

        .bn-chat-body {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #cbc6bc transparent;
        }

        .bn-chat-inner {
          width: min(650px, calc(100% - 40px));
          margin: 0 auto;
          padding: 32px 0 42px;
        }

        .bn-message-row {
          display: flex;
          gap: 11px;
          margin-bottom: 25px;
        }

        .bn-message-row.user {
          justify-content: flex-end;
        }

        .bn-avatar {
          width: 31px;
          height: 31px;
          flex-shrink: 0;
          margin-top: 2px;
          border-radius: 9px;
          display: grid;
          place-items: center;
          background: #211f1b;
          color: #e9d09a;
        }

        .bn-message {
          position: relative;
          max-width: min(570px, 88%);
          border-radius: 16px;
        }

        .assistant-message {
          padding: 18px 20px;
          background: #fff;
          border: 1px solid #e0ddd6;
          box-shadow: 0 5px 18px rgba(33, 31, 27, 0.035);
        }

        .user-message {
          padding: 13px 16px;
          background: #211f1b;
          color: white;
          border-radius: 16px 16px 4px 16px;
        }

        .bn-message-content {
          font-size: 13px;
          line-height: 1.72;
        }

        .bn-chat-paragraph {
          margin: 0 0 10px;
        }

        .bn-chat-paragraph:last-child {
          margin-bottom: 0;
        }

        .bn-chat-heading {
          margin: 0 0 14px;
          font-family: "Libre Baskerville", Georgia, serif;
          font-size: 18px;
          line-height: 1.4;
          font-weight: 700;
          letter-spacing: -0.025em;
        }

        .bn-chat-bullet,
        .bn-chat-numbered {
          display: flex;
          gap: 9px;
          margin: 7px 0;
        }

        .bn-chat-bullet span {
          width: 5px;
          height: 5px;
          margin-top: 9px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #9f4635;
        }

        .bn-chat-numbered strong {
          min-width: 21px;
          color: #9f4635;
        }

        .bn-chat-space {
          height: 5px;
        }

        .bn-copy-button {
          position: absolute;
          right: 10px;
          bottom: 9px;
          width: 27px;
          height: 27px;
          border: 1px solid #e1ded7;
          border-radius: 7px;
          background: #fff;
          color: #817c74;
          display: grid;
          place-items: center;
          opacity: 0;
          transition: 150ms ease;
        }

        .assistant-message:hover .bn-copy-button {
          opacity: 1;
        }

        .bn-copy-button:hover {
          color: #211f1b;
          border-color: #bbb6ae;
        }

        .bn-thinking {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #8c877f;
          font-size: 11px;
        }

        .bn-thinking span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #9f4635;
          animation: bnPulse 1.2s infinite ease-in-out;
        }

        .bn-thinking span:nth-child(2) {
          animation-delay: 0.15s;
        }

        .bn-thinking span:nth-child(3) {
          animation-delay: 0.3s;
        }

        .bn-thinking em {
          margin-left: 5px;
          font-style: normal;
        }

        @keyframes bnPulse {
          0%, 70%, 100% {
            opacity: 0.3;
            transform: translateY(0);
          }

          35% {
            opacity: 1;
            transform: translateY(-2px);
          }
        }

        .bn-suggestion-area {
          width: min(650px, calc(100% - 40px));
          margin: 0 auto;
          padding: 0 0 18px;
        }

        .bn-suggestion-label {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 10px;
          color: #8b867e;
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 700;
        }

        .bn-suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .bn-suggestions button {
          border: 1px solid #dedbd3;
          border-radius: 999px;
          padding: 9px 12px;
          background: #fff;
          color: #514d47;
          font-size: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: 150ms ease;
        }

        .bn-suggestions button:hover {
          border-color: #aaa59d;
          color: #211f1b;
          transform: translateY(-1px);
        }

        .bn-viva-question {
          width: min(650px, calc(100% - 40px));
          margin: 0 auto 14px;
          padding: 13px 15px;
          border: 1px solid #ded6c8;
          background: #f4efe5;
          border-radius: 13px;
          display: grid;
          grid-template-columns: 34px 1fr auto;
          align-items: center;
          gap: 11px;
        }

        .bn-viva-question-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: #211f1b;
          color: #e4c27b;
          display: grid;
          place-items: center;
        }

        .bn-viva-question span {
          display: block;
          color: #8a8379;
          font-size: 8px;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .bn-viva-question strong {
          display: block;
          font-size: 11px;
          line-height: 1.5;
          font-weight: 600;
        }

        .bn-viva-question > svg {
          color: #8d867c;
        }

        .bn-chat-composer {
          flex-shrink: 0;
          padding: 13px 20px 17px;
          border-top: 1px solid #dedbd3;
          background: rgba(248, 246, 241, 0.97);
        }

        .bn-composer-shell {
          width: min(650px, 100%);
          margin: 0 auto;
          min-height: 54px;
          padding: 6px 6px 6px 16px;
          border: 1px solid #d7d3ca;
          border-radius: 15px;
          background: #fff;
          display: flex;
          align-items: flex-end;
          gap: 9px;
          box-shadow: 0 6px 20px rgba(33, 31, 27, 0.045);
        }

        .bn-composer-shell:focus-within {
          border-color: #aaa49a;
          box-shadow: 0 8px 25px rgba(33, 31, 27, 0.07);
        }

        .bn-composer-shell textarea {
          flex: 1;
          min-width: 0;
          max-height: 130px;
          min-height: 39px;
          padding: 10px 0;
          border: 0;
          outline: 0;
          resize: none;
          background: transparent;
          color: #211f1b;
          font-size: 12px;
          line-height: 1.55;
        }

        .bn-composer-shell textarea::placeholder {
          color: #aaa59d;
        }

        .bn-send-button {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          border: 0;
          border-radius: 11px;
          background: #211f1b;
          color: white;
          display: grid;
          place-items: center;
          transition: 150ms ease;
        }

        .bn-send-button:hover:not(:disabled) {
          transform: translateY(-1px);
          background: #35312b;
        }

        .bn-send-button:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .bn-composer-footer {
          width: min(650px, 100%);
          margin: 8px auto 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          color: #a19c94;
          font-size: 8px;
        }

        .bn-composer-footer span {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .bn-copied {
          color: #155c52 !important;
        }

        @media (max-width: 650px) {
          .bn-chat-shell {
            width: 100%;
          }

          .bn-chat-header {
            padding: 0 15px;
          }

          .bn-header-action span {
            display: none;
          }

          .bn-header-action {
            width: 36px;
            padding: 0;
          }

          .bn-chat-inner,
          .bn-suggestion-area,
          .bn-viva-question {
            width: calc(100% - 28px);
          }

          .bn-chat-inner {
            padding-top: 22px;
          }

          .bn-message {
            max-width: 92%;
          }

          .bn-chat-composer {
            padding-left: 14px;
            padding-right: 14px;
          }

          .bn-composer-footer {
            display: none;
          }

          .bn-suggestions {
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 4px;
          }

          .bn-suggestions button {
            white-space: nowrap;
          }
        }
      `}</style>
    </div>
  );
}