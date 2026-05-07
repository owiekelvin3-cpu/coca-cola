"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

// ── Live counter ──────────────────────────────────────────────────
function useLiveCount() {
  const [count, setCount] = useState(2_687_116_352);
  useEffect(() => {
    const base  = 2_687_116_352;
    const start = Date.now();
    const id    = setInterval(() => {
      setCount(Math.floor(base + ((Date.now() - start) / 1000) * 22000));
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return count;
}

// ── Animated counter that counts up from 0 on viewport entry ─────
function AnimatedCounter({ value }: { value: number }) {
  const ref      = useRef<HTMLSpanElement>(null);
  const inView   = useInView(ref, { once: true, margin: "-100px" });
  const motVal   = useMotionValue(0);
  const spring   = useSpring(motVal, { stiffness: 40, damping: 18 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) motVal.set(value);
  }, [inView, value, motVal]);

  useEffect(() => {
    return spring.on("change", (v) => {
      setDisplay(Math.floor(v).toLocaleString());
    });
  }, [spring]);

  return <span ref={ref}>{display}</span>;
}

const MOMENTS = [
  {
    tag:   "December · Lagos",
    title: "Detty December",
    body:  "Lagos never sleeps. Coca-Cola fuels every celebration.",
    video: "/media/videos/coke-pool-party.mp4",
    color: "#E8001A",
  },
  {
    tag:   "Music · Culture",
    title: "Taste of Africa",
    body:  "Nigeria's biggest artists. One studio. Infinite possibilities.",
    video: "/media/videos/coke-wozzaah.mp4",
    color: "#C0001A",
  },
  {
    tag:   "October · Nigeria",
    title: "Independence Day",
    body:  "63 years of Nigeria. 70 years of Coca-Cola Nigeria.",
    video: "/media/videos/coke-for-everyone.mp4",
    color: "#8B0010",
  },
];

export default function NigeriaMoments() {
  const secRef   = useRef<HTMLElement>(null);
  const count    = useLiveCount();
  const [active, setActive] = useState(0);

  // Auto-cycle moments
  useEffect(() => {
    const id = setInterval(() => setActive(i => (i + 1) % MOMENTS.length), 4000);
    return () => clearInterval(id);
  }, []);

  const m = MOMENTS[active];

  return (
    <section
      ref={secRef}
      id="nigeria-moments"
      style={{
        position: "relative",
        minHeight: "100svh",
        background: "#E8001A",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ── Watermark ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        display: "flex", alignItems: "center", justifyContent: "flex-end",
        overflow: "hidden", pointerEvents: "none",
      }}>
        <span style={{
          fontFamily: "var(--font-script)",
          fontSize: "clamp(12rem,28vw,32rem)",
          color: "rgba(255,255,255,0.05)",
          lineHeight: 1,
          userSelect: "none",
          whiteSpace: "nowrap",
          transform: "rotate(-8deg) translateX(10%)",
        }}>
          Nigeria
        </span>
      </div>

      {/* ── Radial light ── */}
      <div style={{
        position: "absolute", top: "-20%", right: "-10%",
        width: "70vw", height: "70vw",
        background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── Main grid ── */}
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

        {/* ── LEFT — video card with counter ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            aspectRatio: "4/5",
            boxShadow: "0 40px 100px rgba(0,0,0,0.35)",
          }}
        >
          {/* Videos — crossfade */}
          {MOMENTS.map((mo, i) => (
            <video
              key={mo.video}
              src={mo.video}
              autoPlay muted loop playsInline
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover",
                opacity: i === active ? 1 : 0,
                transition: "opacity 1s ease",
                filter: "brightness(0.55) saturate(1.1)",
              }}
            />
          ))}

          {/* Gradient */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
            zIndex: 1,
          }} />

          {/* Counter — stadium scoreboard */}
          <div style={{
            position: "absolute",
            top: "clamp(24px,4vh,36px)",
            left: "clamp(24px,4vw,36px)",
            right: "clamp(24px,4vw,36px)",
            zIndex: 2,
          }}>
            <div style={{
              fontSize: "10px", fontWeight: 700,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "6px",
            }}>
              Cokes served today
            </div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem,3.5vw,2.8rem)",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}>
              <AnimatedCounter value={count} />
            </div>
          </div>

          {/* Bottom moment info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
              style={{
                position: "absolute",
                bottom: "clamp(24px,4vh,36px)",
                left: "clamp(24px,4vw,36px)",
                right: "clamp(24px,4vw,36px)",
                zIndex: 2,
              }}
            >
              <div style={{
                fontSize: "10px", fontWeight: 700,
                letterSpacing: "0.25em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                marginBottom: "6px",
              }}>
                {m.tag}
              </div>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.4rem,2.5vw,2rem)",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                marginBottom: "6px",
              }}>
                {m.title}
              </div>
              <div style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.5,
              }}>
                {m.body}
              </div>

              {/* Red accent bar */}
              <div style={{
                height: "3px",
                background: "#ffffff",
                marginTop: "16px",
                width: "40px",
                borderRadius: "2px",
              }} />
            </motion.div>
          </AnimatePresence>

          {/* Moment dots */}
          <div style={{
            position: "absolute",
            bottom: "clamp(24px,4vh,36px)",
            right: "clamp(24px,4vw,36px)",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}>
            {MOMENTS.map((_, i) => (
              <motion.div
                key={i}
                onClick={() => setActive(i)}
                animate={{
                  height: i === active ? "24px" : "6px",
                  background: i === active ? "#ffffff" : "rgba(255,255,255,0.3)",
                }}
                transition={{ duration: 0.3 }}
                style={{ width: "4px", borderRadius: "2px", cursor: "pointer" }}
              />
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT — editorial text ── */}
        <div>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: "flex", alignItems: "center", gap: "14px",
              marginBottom: "clamp(24px,4vh,40px)",
            }}
          >
            <div style={{ width: "40px", height: "2px", background: "rgba(255,255,255,0.4)" }} />
            <span style={{
              fontSize: "10px", fontWeight: 700,
              letterSpacing: "0.35em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
            }}>
              Nigeria Moments
            </span>
          </motion.div>

          {/* Headline — word by word */}
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem,7vw,8rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            marginBottom: "clamp(24px,4vh,40px)",
          }}>
            {["Every", "Moment.", "Every", "Sip."].map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "block",
                  color: i % 2 === 0 ? "#ffffff" : "rgba(255,255,255,0.25)",
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "clamp(0.95rem,1.3vw,1.1rem)",
              lineHeight: 1.8,
              maxWidth: "400px",
              marginBottom: "clamp(36px,5vh,56px)",
            }}
          >
            From Lagos to Abuja, Kano to Port Harcourt — Coca-Cola is woven into
            every celebration, every meal, every Nigerian moment that matters.
          </motion.p>

          {/* Moment selector pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {MOMENTS.map((mo, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "16px 20px",
                  background: i === active ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
                  border: `1px solid ${i === active ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: "12px",
                  cursor: "pointer",
                  textAlign: "left",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.3s ease",
                }}
              >
                <motion.div
                  animate={{ background: i === active ? "#ffffff" : "rgba(255,255,255,0.3)" }}
                  style={{ width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0 }}
                />
                <div>
                  <div style={{
                    fontSize: "9px", fontWeight: 700,
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    color: i === active ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.35)",
                    marginBottom: "2px",
                  }}>
                    {mo.tag}
                  </div>
                  <div style={{
                    fontSize: "14px", fontWeight: 700,
                    color: i === active ? "#ffffff" : "rgba(255,255,255,0.55)",
                    letterSpacing: "-0.01em",
                  }}>
                    {mo.title}
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.a
            href="#brands"
            onClick={e => { e.preventDefault(); document.getElementById("brands")?.scrollIntoView({ behavior: "smooth" }); }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.95)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "clamp(28px,4vh,40px)",
              padding: "14px 32px",
              background: "rgba(255,255,255,0.12)",
              border: "1.5px solid rgba(255,255,255,0.4)",
              borderRadius: "100px",
              color: "#ffffff",
              fontSize: "12px", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              textDecoration: "none",
              backdropFilter: "blur(8px)",
              transition: "color 0.25s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#E8001A")}
            onMouseLeave={e => (e.currentTarget.style.color = "#ffffff")}
          >
            Explore Brands
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </div>
      </div>

      {/* Mobile */}
      <style>{`
        @media (max-width: 768px) {
          #nigeria-moments > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
