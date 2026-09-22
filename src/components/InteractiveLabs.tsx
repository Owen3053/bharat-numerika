import { useMemo, useState } from "react";
import {
  Calculator,
  ChevronDown,
  Hash,
  Lightbulb,
  RotateCcw,
  Sparkles,
} from "lucide-react";

type LabId =
  | "place-value"
  | "position"
  | "modular"
  | "patterns"
  | "algorithm";

const labs = [
  {
    id: "place-value" as LabId,
    number: "01",
    title: "Place Value Explorer",
    description: "See how each digit changes meaning according to its position.",
  },
  {
    id: "position" as LabId,
    number: "02",
    title: "Why Position Matters",
    description: "Compare the same digit across different places.",
  },
  {
    id: "modular" as LabId,
    number: "03",
    title: "Modular Arithmetic",
    description: "Explore numbers through remainders and repeating cycles.",
  },
  {
    id: "patterns" as LabId,
    number: "04",
    title: "Pattern Explorer",
    description: "Generate binary-like two-state patterns.",
  },
  {
    id: "algorithm" as LabId,
    number: "05",
    title: "Algorithmic Thinking",
    description: "Break mathematical problems into simple ordered steps.",
  },
];

function getPlaceValues(number: number) {
  const digits = String(number).padStart(4, "0").split("").map(Number);

  return digits.map((digit, index) => {
    const power = 3 - index;
    const place = 10 ** power;

    return {
      digit,
      place,
      value: digit * place,
      label:
        power === 3
          ? "Thousands"
          : power === 2
            ? "Hundreds"
            : power === 1
              ? "Tens"
              : "Ones",
    };
  });
}

function buildPatterns(length: number) {
  const total = 2 ** length;

  return Array.from({ length: total }, (_, index) =>
    index.toString(2).padStart(length, "0"),
  );
}

export default function InteractiveLabs() {
  const [activeLab, setActiveLab] = useState<LabId>("place-value");

  const [number, setNumber] = useState("2654");
  const [modNumber, setModNumber] = useState("17");
  const [modulus, setModulus] = useState("5");
  const [patternLength, setPatternLength] = useState(4);

  const placeValues = useMemo(
    () => getPlaceValues(Math.min(9999, Math.max(0, Number(number) || 0))),
    [number],
  );

  const remainder = useMemo(() => {
    const a = Number(modNumber);
    const b = Number(modulus);

    if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) {
      return null;
    }

    return ((a % b) + b) % b;
  }, [modNumber, modulus]);

  const patterns = useMemo(
    () => buildPatterns(patternLength),
    [patternLength],
  );

  const resetLab = () => {
    setNumber("2654");
    setModNumber("17");
    setModulus("5");
    setPatternLength(4);
  };

  const active = labs.find((lab) => lab.id === activeLab) ?? labs[0];

  return (
    <div className="bn-labs">
      <div className="bn-labs-shell">
        {/* =====================================================
            LAB NAVIGATION
            ===================================================== */}

        <aside className="bn-labs-sidebar">
          <div className="bn-labs-sidebar-top">
            <div className="bn-labs-label">
              <Sparkles size={12} />
              Interactive learning
            </div>

            <h3>Explore the ideas.</h3>

            <p>
              Experiment with the mathematical concepts behind the Bharat
              Numerika syllabus.
            </p>
          </div>

          <div className="bn-lab-list">
            {labs.map((lab) => (
              <button
                key={lab.id}
                className={
                  activeLab === lab.id
                    ? "bn-lab-tab active"
                    : "bn-lab-tab"
                }
                onClick={() => setActiveLab(lab.id)}
              >
                <span className="bn-lab-tab-number">{lab.number}</span>

                <span className="bn-lab-tab-copy">
                  <strong>{lab.title}</strong>
                  <small>{lab.description}</small>
                </span>

                <ChevronDown size={14} />
              </button>
            ))}
          </div>

          <button className="bn-reset-button" onClick={resetLab}>
            <RotateCcw size={13} />
            Reset experiments
          </button>
        </aside>

        {/* =====================================================
            LAB CONTENT
            ===================================================== */}

        <main className="bn-lab-main">
          <div className="bn-lab-main-header">
            <div>
              <span className="bn-lab-number">{active.number}</span>

              <h2>{active.title}</h2>

              <p>{active.description}</p>
            </div>

            <div className="bn-lab-symbol">
              <Hash size={19} />
            </div>
          </div>

          {/* =================================================
              PLACE VALUE
              ================================================= */}

          {activeLab === "place-value" && (
            <section className="bn-experiment">
              <div className="bn-experiment-heading">
                <div>
                  <span>Experiment</span>
                  <h3>Break a number apart.</h3>
                </div>

                <Calculator size={19} />
              </div>

              <div className="bn-input-card">
                <label htmlFor="place-value-number">
                  Enter a number from 0 to 9999
                </label>

                <input
                  id="place-value-number"
                  value={number}
                  inputMode="numeric"
                  maxLength={4}
                  onChange={(event) => {
                    const next = event.target.value.replace(/\D/g, "");
                    setNumber(next.slice(0, 4));
                  }}
                />
              </div>

              <div className="bn-place-number">
                {(number || "0").padStart(4, "0").split("").map((digit, index) => (
                  <div key={`${digit}-${index}`} className="bn-place-digit">
                    <strong>{digit}</strong>
                    <span>
                      {placeValues[index]?.label ?? "Ones"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bn-place-equation">
                {placeValues.map((item, index) => (
                  <div key={`${item.label}-${index}`} className="bn-equation-item">
                    <strong>{item.digit}</strong>
                    <span>× {item.place}</span>
                    <small>= {item.value}</small>
                  </div>
                ))}
              </div>

              <div className="bn-result-card">
                <Lightbulb size={17} />

                <div>
                  <span>Expanded form</span>

                  <strong>
                    {placeValues.map((item) => item.value).join(" + ")}
                  </strong>
                </div>
              </div>
            </section>
          )}

          {/* =================================================
              POSITION
              ================================================= */}

          {activeLab === "position" && (
            <section className="bn-experiment">
              <div className="bn-experiment-heading">
                <div>
                  <span>Experiment</span>
                  <h3>The digit stays. Its value changes.</h3>
                </div>

                <Hash size={19} />
              </div>

              <div className="bn-position-grid">
                {[
                  { digit: "5", place: "Hundreds", value: "500" },
                  { digit: "5", place: "Tens", value: "50" },
                  { digit: "5", place: "Ones", value: "5" },
                ].map((item) => (
                  <div className="bn-position-card" key={item.place}>
                    <span>{item.place}</span>

                    <strong>{item.digit}</strong>

                    <div>
                      <span>Value</span>
                      <b>{item.value}</b>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bn-result-card">
                <Lightbulb size={17} />

                <div>
                  <span>Key idea</span>

                  <strong>
                    In positional notation, location determines value.
                  </strong>
                </div>
              </div>
            </section>
          )}

          {/* =================================================
              MODULAR ARITHMETIC
              ================================================= */}

          {activeLab === "modular" && (
            <section className="bn-experiment">
              <div className="bn-experiment-heading">
                <div>
                  <span>Experiment</span>
                  <h3>Think in remainders.</h3>
                </div>

                <Calculator size={19} />
              </div>

              <div className="bn-mod-inputs">
                <div className="bn-input-card">
                  <label htmlFor="mod-number">Number</label>

                  <input
                    id="mod-number"
                    value={modNumber}
                    inputMode="numeric"
                    onChange={(event) =>
                      setModNumber(
                        event.target.value.replace(/[^0-9-]/g, ""),
                      )
                    }
                  />
                </div>

                <div className="bn-mod-symbol">mod</div>

                <div className="bn-input-card">
                  <label htmlFor="modulus">Modulus</label>

                  <input
                    id="modulus"
                    value={modulus}
                    inputMode="numeric"
                    onChange={(event) =>
                      setModulus(
                        event.target.value.replace(/[^0-9]/g, ""),
                      )
                    }
                  />
                </div>
              </div>

              <div className="bn-mod-result">
                <span>
                  {modNumber || "0"} mod {modulus || "0"}
                </span>

                <strong>{remainder ?? "—"}</strong>

                <small>remainder</small>
              </div>

              <div className="bn-result-card">
                <Lightbulb size={17} />

                <div>
                  <span>Modern connection</span>

                  <strong>
                    Modular arithmetic is useful for cycles, clocks,
                    cryptography and algorithms.
                  </strong>
                </div>
              </div>
            </section>
          )}

          {/* =================================================
              PATTERNS
              ================================================= */}

          {activeLab === "patterns" && (
            <section className="bn-experiment">
              <div className="bn-experiment-heading">
                <div>
                  <span>Experiment</span>
                  <h3>Generate two-state patterns.</h3>
                </div>

                <Sparkles size={19} />
              </div>

              <div className="bn-pattern-control">
                <div>
                  <span>Pattern length</span>
                  <strong>{patternLength} positions</strong>
                </div>

                <div className="bn-range-wrap">
                  <input
                    type="range"
                    min="2"
                    max="5"
                    value={patternLength}
                    onChange={(event) =>
                      setPatternLength(Number(event.target.value))
                    }
                  />
                </div>
              </div>

              <div className="bn-pattern-grid">
                {patterns.map((pattern) => (
                  <div className="bn-pattern" key={pattern}>
                    {pattern.split("").map((bit, index) => (
                      <span
                        key={`${pattern}-${index}`}
                        className={bit === "1" ? "on" : ""}
                      >
                        {bit}
                      </span>
                    ))}
                  </div>
                ))}
              </div>

              <div className="bn-result-card">
                <Lightbulb size={17} />

                <div>
                  <span>Historical connection</span>

                  <strong>
                    Pingala's prosodic patterns can be compared conceptually
                    with two-state combinations.
                  </strong>
                </div>
              </div>
            </section>
          )}

          {/* =================================================
              ALGORITHMIC THINKING
              ================================================= */}

          {activeLab === "algorithm" && (
            <section className="bn-experiment">
              <div className="bn-experiment-heading">
                <div>
                  <span>Experiment</span>
                  <h3>Turn a problem into steps.</h3>
                </div>

                <Lightbulb size={19} />
              </div>

              <div className="bn-algorithm">
                {[
                  {
                    number: "01",
                    title: "Understand",
                    text: "Identify the input, the required output and the rules of the problem.",
                  },
                  {
                    number: "02",
                    title: "Break down",
                    text: "Separate the problem into smaller operations that can be handled one at a time.",
                  },
                  {
                    number: "03",
                    title: "Calculate",
                    text: "Apply the mathematical operation or procedure in the correct order.",
                  },
                  {
                    number: "04",
                    title: "Verify",
                    text: "Check the result against the original problem and correct any mistakes.",
                  },
                ].map((step) => (
                  <div className="bn-algorithm-step" key={step.number}>
                    <span>{step.number}</span>

                    <div>
                      <strong>{step.title}</strong>
                      <p>{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bn-result-card">
                <Lightbulb size={17} />

                <div>
                  <span>Why it matters</span>

                  <strong>
                    Algorithmic thinking connects mathematical procedures
                    with structured problem-solving in computing.
                  </strong>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      <style>{`
        .bn-labs {
          width: 100%;
        }

        .bn-labs-shell {
          display: grid;
          grid-template-columns: 285px minmax(0, 1fr);
          border: 1px solid var(--border);
          border-radius: 22px;
          overflow: hidden;
          background: var(--surface);
          box-shadow: var(--soft-shadow);
        }

        .bn-labs-sidebar {
          min-height: 650px;
          padding: 25px 18px;
          border-right: 1px solid var(--border);
          background: var(--surface-soft);
          display: flex;
          flex-direction: column;
        }

        .bn-labs-label {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--green);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .bn-labs-sidebar-top h3 {
          margin: 19px 0 7px;
          font-family: "Libre Baskerville", Georgia, serif;
          font-size: 23px;
          line-height: 1.15;
          letter-spacing: -.045em;
        }

        .bn-labs-sidebar-top p {
          margin: 0;
          color: var(--muted);
          font-size: 9px;
          line-height: 1.7;
        }

        .bn-lab-list {
          display: grid;
          gap: 5px;
          margin-top: 28px;
        }

        .bn-lab-tab {
          width: 100%;
          min-height: 62px;
          padding: 9px;
          border: 1px solid transparent;
          border-radius: 11px;
          background: transparent;
          color: var(--ink);
          display: grid;
          grid-template-columns: 27px minmax(0, 1fr) 13px;
          align-items: center;
          gap: 8px;
          text-align: left;
          transition:
            background 160ms ease,
            border-color 160ms ease,
            transform 160ms ease;
        }

        .bn-lab-tab:hover {
          transform: translateX(2px);
          background: var(--surface);
        }

        .bn-lab-tab.active {
          border-color: var(--border);
          background: var(--surface);
          box-shadow: 0 4px 13px rgba(33,31,27,.04);
        }

        .bn-lab-tab-number {
          color: var(--red);
          font-size: 8px;
          font-weight: 700;
        }

        .bn-lab-tab-copy {
          min-width: 0;
        }

        .bn-lab-tab-copy strong {
          display: block;
          overflow: hidden;
          color: var(--ink);
          font-size: 9px;
          font-weight: 700;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .bn-lab-tab-copy small {
          display: block;
          overflow: hidden;
          margin-top: 3px;
          color: var(--muted);
          font-size: 7px;
          line-height: 1.35;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .bn-lab-tab > svg {
          color: var(--muted);
          transform: rotate(-90deg);
        }

        .bn-lab-tab.active > svg {
          color: var(--red);
        }

        .bn-reset-button {
          margin-top: auto;
          min-height: 38px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: transparent;
          color: var(--muted);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-size: 8px;
          font-weight: 700;
          transition:
            color 160ms ease,
            border-color 160ms ease,
            background 160ms ease;
        }

        .bn-reset-button:hover {
          color: var(--ink);
          border-color: #aaa59d;
          background: var(--surface);
        }

        .bn-lab-main {
          min-width: 0;
          padding: 32px;
        }

        .bn-lab-main-header {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding-bottom: 27px;
          border-bottom: 1px solid var(--border);
        }

        .bn-lab-number {
          color: var(--red);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: .15em;
        }

        .bn-lab-main-header h2 {
          margin: 7px 0 7px;
          font-family: "Libre Baskerville", Georgia, serif;
          font-size: 27px;
          line-height: 1.15;
          letter-spacing: -.045em;
        }

        .bn-lab-main-header p {
          max-width: 520px;
          margin: 0;
          color: var(--muted);
          font-size: 10px;
          line-height: 1.65;
        }

        .bn-lab-symbol {
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          border: 1px solid var(--border);
          border-radius: 11px;
          background: var(--surface-soft);
          color: var(--ink);
          display: grid;
          place-items: center;
        }

        .bn-experiment {
          padding-top: 27px;
        }

        .bn-experiment-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 22px;
        }

        .bn-experiment-heading > div span {
          color: var(--muted);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .bn-experiment-heading h3 {
          margin: 5px 0 0;
          font-family: "Libre Baskerville", Georgia, serif;
          font-size: 18px;
          line-height: 1.25;
          letter-spacing: -.035em;
        }

        .bn-experiment-heading > svg {
          color: var(--red);
        }

        .bn-input-card {
          padding: 16px;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--surface-soft);
        }

        .bn-input-card label {
          display: block;
          margin-bottom: 8px;
          color: var(--muted);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .bn-input-card input {
          width: 100%;
          height: 48px;
          padding: 0 13px;
          border: 1px solid var(--border);
          border-radius: 9px;
          outline: none;
          background: var(--surface);
          color: var(--ink);
          font-family: "Libre Baskerville", Georgia, serif;
          font-size: 18px;
          transition: border-color 160ms ease;
        }

        .bn-input-card input:focus {
          border-color: #aaa59d;
        }

        .bn-place-number {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 7px;
          margin-top: 10px;
        }

        .bn-place-digit {
          padding: 15px 10px;
          border: 1px solid var(--border);
          border-radius: 11px;
          background: var(--surface);
          text-align: center;
        }

        .bn-place-digit strong {
          display: block;
          font-family: "Libre Baskerville", Georgia, serif;
          font-size: 25px;
        }

        .bn-place-digit span {
          display: block;
          margin-top: 5px;
          color: var(--muted);
          font-size: 7px;
          text-transform: uppercase;
          letter-spacing: .1em;
        }

        .bn-place-equation {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 7px;
          margin-top: 10px;
        }

        .bn-equation-item {
          padding: 12px 9px;
          border-radius: 9px;
          background: var(--surface-soft);
          text-align: center;
        }

        .bn-equation-item strong {
          font-size: 12px;
        }

        .bn-equation-item span {
          display: block;
          margin-top: 3px;
          color: var(--muted);
          font-size: 8px;
        }

        .bn-equation-item small {
          display: block;
          margin-top: 5px;
          color: var(--red);
          font-size: 8px;
          font-weight: 700;
        }

        .bn-result-card {
          margin-top: 17px;
          padding: 14px;
          border: 1px solid #dcd4c4;
          border-radius: 11px;
          background: #f5f0e6;
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .bn-result-card > svg {
          flex-shrink: 0;
          color: #9f4635;
        }

        .bn-result-card span {
          display: block;
          color: #8a8175;
          font-size: 7px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .bn-result-card strong {
          display: block;
          margin-top: 4px;
          color: #211f1b;
          font-size: 10px;
          line-height: 1.5;
        }

        .bn-position-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 9px;
        }

        .bn-position-card {
          padding: 17px;
          border: 1px solid var(--border);
          border-radius: 13px;
          background: var(--surface);
        }

        .bn-position-card > span {
          color: var(--muted);
          font-size: 7px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .bn-position-card > strong {
          display: block;
          margin: 20px 0 22px;
          font-family: "Libre Baskerville", Georgia, serif;
          font-size: 38px;
          letter-spacing: -.06em;
        }

        .bn-position-card > div {
          padding-top: 10px;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .bn-position-card > div span {
          color: var(--muted);
          font-size: 8px;
        }

        .bn-position-card > div b {
          color: var(--red);
          font-size: 12px;
        }

        .bn-mod-inputs {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 10px;
        }

        .bn-mod-symbol {
          padding-top: 19px;
          color: var(--red);
          font-family: "Libre Baskerville", Georgia, serif;
          font-size: 14px;
        }

        .bn-mod-result {
          margin-top: 10px;
          padding: 25px;
          border: 1px solid var(--border);
          border-radius: 14px;
          background: var(--surface-soft);
          text-align: center;
        }

        .bn-mod-result > span {
          display: block;
          color: var(--muted);
          font-size: 10px;
        }

        .bn-mod-result > strong {
          display: block;
          margin-top: 7px;
          font-family: "Libre Baskerville", Georgia, serif;
          font-size: 47px;
          line-height: 1;
          letter-spacing: -.08em;
        }

        .bn-mod-result > small {
          display: block;
          margin-top: 8px;
          color: var(--red);
          font-size: 7px;
          font-weight: 700;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .bn-pattern-control {
          padding: 15px;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--surface-soft);
        }

        .bn-pattern-control > div:first-child {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .bn-pattern-control span {
          color: var(--muted);
          font-size: 8px;
        }

        .bn-pattern-control strong {
          font-size: 9px;
        }

        .bn-range-wrap {
          margin-top: 12px;
        }

        .bn-range-wrap input {
          width: 100%;
          accent-color: var(--red);
        }

        .bn-pattern-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 7px;
          margin-top: 10px;
        }

        .bn-pattern {
          min-height: 47px;
          padding: 7px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: var(--surface);
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 3px;
        }

        .bn-pattern span {
          width: 18px;
          height: 25px;
          border-radius: 4px;
          background: var(--surface-soft);
          color: var(--muted);
          display: grid;
          place-items: center;
          font-size: 8px;
          font-weight: 700;
        }

        .bn-pattern span.on {
          background: var(--black);
          color: var(--bg);
        }

        .bn-algorithm {
          display: grid;
          gap: 0;
          border-top: 1px solid var(--border);
        }

        .bn-algorithm-step {
          display: grid;
          grid-template-columns: 42px 1fr;
          gap: 12px;
          padding: 17px 0;
          border-bottom: 1px solid var(--border);
        }

        .bn-algorithm-step > span {
          color: var(--red);
          font-size: 8px;
          font-weight: 700;
        }

        .bn-algorithm-step strong {
          display: block;
          font-family: "Libre Baskerville", Georgia, serif;
          font-size: 13px;
        }

        .bn-algorithm-step p {
          max-width: 540px;
          margin: 5px 0 0;
          color: var(--muted);
          font-size: 9px;
          line-height: 1.65;
        }

        @media (max-width: 900px) {
          .bn-labs-shell {
            grid-template-columns: 1fr;
          }

          .bn-labs-sidebar {
            min-height: auto;
            border-right: 0;
            border-bottom: 1px solid var(--border);
          }

          .bn-lab-list {
            grid-template-columns: repeat(2, 1fr);
          }

          .bn-reset-button {
            margin-top: 16px;
          }
        }

        @media (max-width: 620px) {
          .bn-lab-main {
            padding: 22px 17px;
          }

          .bn-lab-list {
            grid-template-columns: 1fr;
          }

          .bn-place-number,
          .bn-place-equation {
            grid-template-columns: repeat(2, 1fr);
          }

          .bn-position-grid {
            grid-template-columns: 1fr;
          }

          .bn-pattern-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .bn-mod-inputs {
            grid-template-columns: 1fr;
          }

          .bn-mod-symbol {
            display: none;
          }

          .bn-lab-main-header h2 {
            font-size: 23px;
          }
        }
      `}</style>
    </div>
  );
}