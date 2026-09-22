import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  Menu,
  MessageCircle,
  Moon,
  Sparkles,
  Sun,
  Trophy,
  X,
} from "lucide-react";

import Chat from "./components/Chat";
import InteractiveLabs from "./components/InteractiveLabs";

type Topic = {
  number: string;
  title: string;
  description: string;
};

const topics: Topic[] = [
  {
    number: "01",
    title: "Indian Number System",
    description:
      "Explore decimal notation, place value and the development of numerical representation.",
  },
  {
    number: "02",
    title: "Zero & Place Value",
    description:
      "Understand zero as a number, placeholder and fundamental idea in positional notation.",
  },
  {
    number: "03",
    title: "Aryabhata",
    description:
      "Discover the mathematical and astronomical work associated with Aryabhata.",
  },
  {
    number: "04",
    title: "Brahmagupta",
    description:
      "Study systematic arithmetic involving zero, negative numbers and algebraic ideas.",
  },
  {
    number: "05",
    title: "Bhaskara II",
    description:
      "Explore algebra, arithmetic and mathematical problem-solving traditions.",
  },
  {
    number: "06",
    title: "Katapayadi",
    description:
      "Learn how letters were used as a traditional numerical mnemonic system.",
  },
  {
    number: "07",
    title: "Pingala",
    description:
      "Explore combinatorial patterns and binary-like representations in prosody.",
  },
  {
    number: "08",
    title: "Modular Arithmetic",
    description:
      "Connect ancient numerical thinking with remainders, cycles and modern computing.",
  },
];

const suggestions = [
  "Who was Aryabhata?",
  "Explain zero and place value",
  "How does Katapayadi work?",
];

function HeritageMark() {
  return (
    <div className="heritage-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const openChat = () => {
    setChatOpen(true);
    setMenuOpen(false);
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className={darkMode ? "app-shell dark-mode" : "app-shell"}>
      {/* NAVIGATION */}
      <header className="site-header">
        <div className="nav-inner">
          <button
            className="brand"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Bharat Numerika home"
          >
            <div className="brand-symbol">
              <HeritageMark />
            </div>

            <div className="brand-copy">
              <strong>Bharat Numerika</strong>
              <span>INDIAN MATHEMATICAL HERITAGE</span>
            </div>
          </button>

          <nav className="desktop-nav">
            <button onClick={() => scrollTo("archive")}>Explore</button>
            <button onClick={() => scrollTo("labs")}>Labs</button>
            <button onClick={() => scrollTo("challenge")}>Quiz</button>
            <button onClick={() => scrollTo("about")}>About</button>
          </nav>

          <div className="nav-actions">
            <button
              className="theme-button"
              onClick={() => setDarkMode((value) => !value)}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button className="learning-button" onClick={openChat}>
              Start Learning
              <ArrowRight size={16} />
            </button>

            <button
              className="mobile-menu-button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Open menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-nav">
            <button onClick={() => scrollTo("archive")}>Explore</button>
            <button onClick={() => scrollTo("labs")}>Labs</button>
            <button onClick={() => scrollTo("challenge")}>Quiz</button>
            <button onClick={() => scrollTo("about")}>About</button>
            <button onClick={openChat}>Start Learning</button>
          </div>
        )}
      </header>

      {/* HERO */}
      <main>
        <section className="hero-section">
          <div className="hero-inner">
            <div className="hero-content">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                INDIAN KNOWLEDGE SYSTEMS
              </div>

              <h1>
                Explore India&apos;s
                <span>mathematical</span>
                <span>heritage.</span>
              </h1>

              <p className="hero-description">
                Bharat Numerika is an interactive learning companion for
                discovering Indian mathematics, mathematicians, numerical
                systems and their connections to modern computing.
              </p>

              <div className="hero-actions">
                <button className="primary-button" onClick={openChat}>
                  <MessageCircle size={18} />
                  Ask Bharat Numerika
                  <ArrowRight size={17} />
                </button>

                <button
                  className="secondary-button"
                  onClick={() => scrollTo("archive")}
                >
                  Explore Topics
                  <ChevronRight size={17} />
                </button>
              </div>

              <div className="hero-benefits">
                <span>
                  <CheckCircle2 size={15} />
                  Syllabus aligned
                </span>

                <span>
                  <CheckCircle2 size={15} />
                  Interactive learning
                </span>

                <span>
                  <CheckCircle2 size={15} />
                  Student focused
                </span>
              </div>
            </div>

            {/* AI TUTOR CARD */}
            <aside className="hero-tutor-card">
              <div className="tutor-card-header">
                <div>
                  <div className="small-label">
                    <span className="label-dot" />
                    AI TUTOR
                  </div>

                  <h2>What would you like to discover?</h2>
                </div>

                <div className="tutor-icon">
                  <Sparkles size={21} />
                </div>
              </div>

              <div className="question-list">
                {suggestions.map((question) => (
                  <button
                    key={question}
                    className="question-button"
                    onClick={openChat}
                  >
                    <span>{question}</span>
                    <ChevronRight size={17} />
                  </button>
                ))}
              </div>

              <div className="tutor-bottom">
                <div className="tutor-bottom-title">
                  <Sparkles size={17} />
                  <span>Learn through conversation</span>
                </div>

                <p>
                  Ask questions, request simple explanations, explore examples
                  and prepare for your IKS examination.
                </p>

                <button onClick={openChat}>
                  Open AI Tutor
                  <ArrowRight size={16} />
                </button>
              </div>
            </aside>
          </div>

          <div className="hero-line-art hero-line-art-one" />
          <div className="hero-line-art hero-line-art-two" />
        </section>

        {/* STATS */}
        <section className="stats-strip">
          <div className="stat-item">
            <strong>08+</strong>
            <span>CORE TOPICS</span>
          </div>

          <div className="stat-item">
            <strong>03</strong>
            <span>MATHEMATICIANS</span>
          </div>

          <div className="stat-item">
            <strong>04</strong>
            <span>LEARNING TOOLS</span>
          </div>

          <div className="stat-item">
            <strong>01</strong>
            <span>AI TUTOR</span>
          </div>
        </section>

        {/* ARCHIVE */}
        <section id="archive" className="archive-section">
          <div className="section-container">
            <div className="section-heading">
              <div>
                <div className="section-kicker">THE ARCHIVE</div>
                <h2>Start with a topic.</h2>
              </div>

              <p>
                Explore the mathematical ideas, people and systems that form
                the foundation of this IKS learning experience.
              </p>
            </div>

            <div className="topic-grid">
              {topics.map((topic) => (
                <button
                  key={topic.number}
                  className="topic-card"
                  onClick={() => setSelectedTopic(topic)}
                >
                  <div className="topic-number">{topic.number}</div>

                  <div className="topic-art">
                    <HeritageMark />
                  </div>

                  <div className="topic-card-content">
                    <h3>{topic.title}</h3>
                    <p>{topic.description}</p>

                    <span className="topic-link">
                      Explore
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* TOOL STRIP */}
        <section className="tool-section">
          <div className="section-container">
            <div className="tool-grid">
              <button className="tool-card tool-card-dark" onClick={openChat}>
                <div className="tool-icon">
                  <Sparkles size={23} />
                </div>

                <div>
                  <span className="tool-kicker">LEARN WITH THE SCHOLAR</span>
                  <h3>AI Tutor</h3>
                  <p>
                    Ask questions, get explanations and study at your own
                    pace.
                  </p>

                  <span className="tool-link">
                    Start Chat <ArrowRight size={15} />
                  </span>
                </div>
              </button>

              <button
                className="tool-card tool-card-indigo"
                onClick={() => scrollTo("labs")}
              >
                <div className="tool-icon">
                  <FlaskConical size={23} />
                </div>

                <div>
                  <span className="tool-kicker">PRACTICE & BUILD</span>
                  <h3>Labs</h3>
                  <p>
                    Work with interactive tools, visualizations and hands-on
                    exercises.
                  </p>

                  <span className="tool-link">
                    Explore Labs <ArrowRight size={15} />
                  </span>
                </div>
              </button>

              <button
                className="tool-card tool-card-red"
                onClick={() => scrollTo("challenge")}
              >
                <div className="tool-icon">
                  <Trophy size={23} />
                </div>

                <div>
                  <span className="tool-kicker">TEST YOUR KNOWLEDGE</span>
                  <h3>Quiz & Viva</h3>
                  <p>
                    Challenge yourself with revision questions and viva
                    preparation.
                  </p>

                  <span className="tool-link">
                    Start Quiz <ArrowRight size={15} />
                  </span>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* ZERO FEATURE */}
        <section className="zero-section">
          <div className="zero-symbol-panel">
            <div className="zero-orbit orbit-one" />
            <div className="zero-orbit orbit-two" />
            <div className="zero-orbit orbit-three" />

            <div className="zero-symbol">0</div>
            <span className="zero-devanagari">शून्य</span>
          </div>

          <div className="zero-content">
            <div className="section-kicker">FEATURED IDEA</div>

            <h2>The idea of zero</h2>

            <p>
              Zero is both a number and a placeholder within positional
              notation. Its development was part of a longer mathematical
              history, with systematic arithmetic rules involving zero
              articulated by Indian mathematicians such as Brahmagupta.
            </p>

            <button className="primary-button" onClick={openChat}>
              Explore the idea
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="zero-facts">
            <div>
              <strong>0</strong>
              <span>Symbol</span>
            </div>

            <div>
              <strong>20</strong>
              <span>Place Value</span>
            </div>

            <div>
              <strong>200</strong>
              <span>Possibility</span>
            </div>
          </div>
        </section>

        {/* LABS */}
        <section id="labs" className="labs-section">
          <div className="section-container">
            <div className="section-heading labs-heading">
              <div>
                <div className="section-kicker">EXPLORE THROUGH PRACTICE</div>
                <h2>The Mathematical Laboratory</h2>
              </div>

              <p>
                Move beyond reading. Change values, inspect patterns and see
                mathematical ideas behave in real time.
              </p>
            </div>

            <div className="labs-wrapper">
              <InteractiveLabs />
            </div>
          </div>
        </section>

        {/* CHALLENGE */}
        <section id="challenge" className="challenge-section">
          <div className="challenge-inner">
            <div className="challenge-icon">
              <Trophy size={25} />
            </div>

            <div>
              <div className="section-kicker">TEST YOUR MEMORY</div>
              <h2>Scholar&apos;s Challenge</h2>
              <p>
                Revise the important ideas covered throughout the Bharat
                Numerika archive.
              </p>
            </div>

            <button className="secondary-button" onClick={openChat}>
              Start Viva
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="about-section">
          <div className="section-container">
            <div className="about-grid">
              <div>
                <div className="section-kicker">ABOUT BHARAT NUMERIKA</div>
                <h2>Mathematics, heritage and technology.</h2>
              </div>

              <div>
                <p>
                  Bharat Numerika presents selected ideas from Indian
                  mathematical traditions through a modern educational
                  interface.
                </p>

                <p>
                  The project connects historical knowledge with computational
                  thinking, interactive exploration and AI-assisted learning.
                </p>
              </div>

              <div className="about-points">
                <div>
                  <BookOpen size={20} />
                  <strong>Discover</strong>
                  <span>Explore historical ideas.</span>
                </div>

                <div>
                  <FlaskConical size={20} />
                  <strong>Experiment</strong>
                  <span>Learn through interaction.</span>
                </div>

                <div>
                  <Sparkles size={20} />
                  <strong>Connect</strong>
                  <span>Relate heritage to modern IT.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="brand-symbol small">
              <HeritageMark />
            </div>

            <div>
              <strong>Bharat Numerika</strong>
              <span>INDIAN MATHEMATICAL HERITAGE</span>
            </div>
          </div>

          <span>Ancient Wisdom · Modern Learning</span>
        </div>
      </footer>

      {/* TOPIC MODAL */}
      {selectedTopic && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedTopic(null)}
        >
          <div
            className="topic-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedTopic(null)}
              aria-label="Close"
            >
              <X size={19} />
            </button>

            <div className="section-kicker">ARCHIVE {selectedTopic.number}</div>

            <h2>{selectedTopic.title}</h2>

            <p>{selectedTopic.description}</p>

            <button
              className="primary-button"
              onClick={() => {
                setSelectedTopic(null);
                openChat();
              }}
            >
              Ask the AI Tutor
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      )}

      {/* CHAT */}
      {chatOpen && <Chat onClose={() => setChatOpen(false)} />}
    </div>
  );
}

export default App;