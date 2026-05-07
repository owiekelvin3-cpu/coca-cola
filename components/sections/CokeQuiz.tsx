"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
  {
    q: "What's your vibe?",
    options: [
      { label: "Celebrating", emoji: "🎉", value: "celebrate" },
      { label: "Chilling",    emoji: "😌", value: "chill"     },
      { label: "Energized",   emoji: "🔥", value: "energy"    },
      { label: "With friends",emoji: "🤝", value: "social"    },
    ],
  },
  {
    q: "Where are you?",
    options: [
      { label: "Outdoors",      emoji: "🏖️", value: "outdoor" },
      { label: "At home",       emoji: "🏠", value: "home"    },
      { label: "At an event",   emoji: "🎵", value: "event"   },
      { label: "Restaurant",    emoji: "🍽️", value: "dining"  },
    ],
  },
  {
    q: "What are you eating?",
    options: [
      { label: "Jollof Rice", emoji: "🍚", value: "jollof" },
      { label: "Suya / BBQ",  emoji: "🥩", value: "suya"   },
      { label: "Fast food",   emoji: "🍕", value: "fast"   },
      { label: "Light snack", emoji: "🥗", value: "light"  },
    ],
  },
];

const RESULTS: Record<string, { title: string; tagline: string; product: string; color: string; desc: string }> = {
  default:  { title: "Classic Coca-Cola",    tagline: "The Original. Always Perfect.",    product: "Coca-Cola Classic", color: "#ffffff", desc: "Nothing beats the original. Ice cold, perfectly carbonated — this is your moment." },
  chill:    { title: "Coca-Cola Zero Sugar",  tagline: "All the Taste. Zero Compromise.",  product: "Coke Zero",         color: "#ffffff", desc: "Laid back but never boring. Zero sugar, full flavour — made for your chill moments." },
  energy:   { title: "Fanta Orange",          tagline: "Taste the Fun.",                   product: "Fanta",             color: "#FF6B00", desc: "High energy, vibrant flavour. Fanta matches your unstoppable energy." },
  outdoor:  { title: "Sprite",                tagline: "Obey Your Thirst.",                product: "Sprite",            color: "#00A651", desc: "Crisp, clean, refreshing. Sprite cuts through the heat like nothing else." },
  jollof:   { title: "Classic Coca-Cola",     tagline: "The Perfect Pair.",                product: "Coca-Cola Classic", color: "#ffffff", desc: "Jollof rice and Coca-Cola — Nigeria's most iconic combination. Est. 1953." },
};

function getResult(answers: string[]) {
  for (const a of answers) if (RESULTS[a]) return RESULTS[a];
  return RESULTS.default;
}

type Stage = "intro" | "quiz" | "result";

export default function CokeQuiz() {
  const secRef = useRef<HTMLElement>(null);
  const [stage,   setStage]   = useState<Stage>("intro");
  const [step,    setStep]    = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result,  setResult]  = useState<(typeof RESULTS)[string] | null>(null);

  const startQuiz = () => { setStage("quiz"); setStep(0); setAnswers([]); };

  const answer = (val: string) => {
    const next = [...answers, val];
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setStep(s => s + 1);
    } else {
      setResult(getResult(next));
      setStage("result");
    }
  };

  const reset = () => { setStage("intro"); setStep(0); setAnswers([]); setResult(null); };

  const q = QUESTIONS[step];

  return (
    <section
      ref={secRef}
      id="coke-quiz"
      style={{
        position: "relative",
        minHeight: "100svh",
        background: "#E8001A",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ── Background texture — faint Coca-Cola script watermark ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        display: "flex", alignItems: "center", justifyContent: "flex-end",
        overflow: "hidden", pointerEvents: "none",
      }}>
        <span style={{
          fontFamily: "var(--font-script)",
          fontSize: "clamp(12rem,28vw,32rem)",
          color: "rgba(255,255,255,0.06)",
          lineHeight: 1,
          userSelect: "none",
          whiteSpace: "nowrap",
          transform: "rotate(-8deg) translateX(10%)",
        }}>
          Coca-Cola
        </span>
      </div>

      {/* ── Subtle radial light ── */}
      <div style={{
        position: "absolute", top: "-20%", left: "-10%",
        width: "70vw", height: "70vw",
        background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── Main layout ── */}
      <div style={{
        position: "relative", zIndex: 1,
        width: "100%",
        maxWidth: "1440px",
        margin: "0 auto",
        padding: "clamp(80px,12vh,120px) clamp(40px,8vw,120px)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(40px,6vw,80px)",
        alignItems: "center",
      }}>

        {/* ── LEFT — editorial text ── */}
        <div>
          {/* Coca-Cola logo script */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "clamp(32px,5vh,56px)" }}
          >
            <span style={{
              fontFamily: "var(--font-script)",
              fontSize: "clamp(1.4rem,2.5vw,2rem)",
              color: "rgba(255,255,255,0.9)",
            }}>
              Coca-Cola
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem,7vw,8rem)",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              margin: "0 0 clamp(20px,3vh,32px)",
            }}
          >
            Find Your<br />Perfect Sip.
          </motion.h2>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "clamp(0.95rem,1.3vw,1.1rem)",
              lineHeight: 1.75,
              maxWidth: "380px",
              marginBottom: "clamp(32px,5vh,48px)",
            }}
          >
            Give a little happiness, and share a Coke with your friends, or family.
            3 quick questions. Your perfect Coca-Cola moment.
          </motion.p>

          {/* CTA — only shown on intro */}
          <AnimatePresence>
            {stage === "intro" && (
              <motion.button
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                onClick={startQuiz}
                whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.95)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "16px 36px",
                  background: "rgba(255,255,255,0.15)",
                  border: "2px solid rgba(255,255,255,0.6)",
                  borderRadius: "100px",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  backdropFilter: "blur(8px)",
                  transition: "color 0.25s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#E8001A")}
                onMouseLeave={e => (e.currentTarget.style.color = "#ffffff")}
              >
                Find your name
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Step indicator during quiz */}
          {stage === "quiz" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: "flex", gap: "8px", marginTop: "8px" }}
            >
              {QUESTIONS.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: i === step ? "32px" : "8px",
                    background: i <= step ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ height: "4px", borderRadius: "2px" }}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* ── RIGHT — quiz card ── */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <AnimatePresence mode="wait">

            {/* INTRO */}
            {stage === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: "100%",
                  maxWidth: "480px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
                  position: "relative",
                  aspectRatio: "4/5",
                }}
              >
                {/* Autoplay video */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  src="/media/videos/coke-share-with.mp4"
                  style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Gradient overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
                }} />

                {/* Bottom content */}
                <div style={{
                  position: "absolute",
                  bottom: 0, left: 0, right: 0,
                  padding: "clamp(24px,4vw,36px)",
                  zIndex: 2,
                }}>
                  <div style={{
                    fontSize: "10px", fontWeight: 700,
                    letterSpacing: "0.25em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.6)",
                    marginBottom: "8px",
                  }}>
                    Your Coke Moment
                  </div>
                  <p style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "14px", lineHeight: 1.65,
                    marginBottom: "20px",
                    maxWidth: "320px",
                  }}>
                    3 questions. Your perfect Coca-Cola moment.
                  </p>
                  <motion.button
                    onClick={startQuiz}
                    whileHover={{ scale: 1.04, background: "#C0001A" }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "14px 28px",
                      background: "#E8001A",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "100px",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "background 0.25s",
                    }}
                  >
                    Start Quiz
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* QUIZ */}
            {stage === "quiz" && (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: "100%",
                  maxWidth: "480px",
                  background: "#ffffff",
                  borderRadius: "20px",
                  padding: "clamp(32px,5vw,48px)",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
                }}
              >
                {/* Progress */}
                <div style={{ display: "flex", gap: "6px", marginBottom: "28px" }}>
                  {QUESTIONS.map((_, i) => (
                    <div key={i} style={{
                      flex: 1, height: "3px", borderRadius: "2px",
                      background: i <= step ? "#E8001A" : "rgba(10,10,10,0.08)",
                      transition: "background 0.3s",
                    }} />
                  ))}
                </div>

                <div style={{
                  fontSize: "10px", fontWeight: 700,
                  letterSpacing: "0.25em", textTransform: "uppercase",
                  color: "#E8001A", marginBottom: "12px",
                }}>
                  {step + 1} / {QUESTIONS.length}
                </div>

                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem,2.5vw,2rem)",
                  fontWeight: 900, color: "#0A0A0A",
                  letterSpacing: "-0.03em", lineHeight: 1,
                  marginBottom: "28px",
                }}>
                  {q.q}
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {q.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      onClick={() => answer(opt.value)}
                      whileHover={{ y: -3, borderColor: "#E8001A", background: "#fff5f5" }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        padding: "20px 16px",
                        background: "#F5F5F0",
                        border: "1.5px solid rgba(10,10,10,0.08)",
                        borderRadius: "12px",
                        color: "#0A0A0A",
                        fontSize: "14px",
                        fontWeight: 600,
                        cursor: "pointer",
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span style={{ fontSize: "26px" }}>{opt.emoji}</span>
                      <span>{opt.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* RESULT */}
            {stage === "result" && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: "100%",
                  maxWidth: "480px",
                  background: "#ffffff",
                  borderRadius: "20px",
                  padding: "clamp(32px,5vw,48px)",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
                  textAlign: "center",
                }}
              >
                <div style={{
                  display: "inline-block",
                  padding: "6px 18px",
                  background: "#E8001A",
                  borderRadius: "100px",
                  fontSize: "10px", fontWeight: 700,
                  letterSpacing: "0.25em", textTransform: "uppercase",
                  color: "#ffffff",
                  marginBottom: "20px",
                }}>
                  Your Match
                </div>

                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem,4vw,3rem)",
                  fontWeight: 900, color: "#0A0A0A",
                  letterSpacing: "-0.04em", lineHeight: 0.95,
                  marginBottom: "10px",
                }}>
                  {result.title}
                </h3>

                <div style={{
                  fontFamily: "var(--font-script)",
                  fontSize: "clamp(1rem,1.8vw,1.3rem)",
                  color: "#E8001A",
                  marginBottom: "16px",
                }}>
                  {result.tagline}
                </div>

                <p style={{
                  color: "rgba(10,10,10,0.6)",
                  fontSize: "14px", lineHeight: 1.75,
                  marginBottom: "32px",
                }}>
                  {result.desc}
                </p>

                <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                  <motion.a
                    href="#brands"
                    onClick={e => { e.preventDefault(); document.getElementById("brands")?.scrollIntoView({ behavior: "smooth" }); }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: "14px 28px",
                      background: "#E8001A",
                      color: "#ffffff",
                      borderRadius: "100px",
                      fontSize: "11px", fontWeight: 700,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      textDecoration: "none", cursor: "pointer",
                    }}
                  >
                    Explore {result.product}
                  </motion.a>
                  <motion.button
                    onClick={reset}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: "14px 28px",
                      background: "transparent",
                      color: "rgba(10,10,10,0.6)",
                      borderRadius: "100px",
                      border: "1.5px solid rgba(10,10,10,0.15)",
                      fontSize: "11px", fontWeight: 700,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      cursor: "pointer",
                    }}
                  >
                    Try Again
                  </motion.button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: stack */}
      <style>{`
        @media (max-width: 768px) {
          #coke-quiz > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
