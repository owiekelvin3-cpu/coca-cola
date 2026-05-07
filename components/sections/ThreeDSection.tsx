"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  { id: 0, label: "Wozzaah",     sub: "Taste of Africa",   year: "2023", video: "/media/videos/coke-wozzaah.mp4"      },
  { id: 1, label: "Real Magic",  sub: "Coca-Cola · 2023",  year: "2023", video: "/media/videos/coke-real-story.mp4"   },
  { id: 2, label: "Share Coke",  sub: "Find Your Name",    year: "2024", video: "/media/videos/coke-share-with.mp4"   },
  { id: 3, label: "For Everyone",sub: "Open Happiness",    year: "2024", video: "/media/videos/coke-for-everyone.mp4" },
  { id: 4, label: "Pool Party",  sub: "Summer Vibes",      year: "2023", video: "/media/videos/coke-pool-party.mp4"   },
  { id: 5, label: "Odogwu",      sub: "Spoil Your Own",    year: "2023", video: "/media/videos/coke-odogwu.mp4"       },
  { id: 6, label: "Scan & Win",  sub: "Recipe for Wonder", year: "2024", video: "/media/videos/coke-scan-win.mp4"     },
];

export default function ThreeDSection() {
  const [active, setActive] = useState(2);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const centerRef = useRef<HTMLVideoElement | null>(null);

  // Play ALL videos on mount — keep them all running silently
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (v) v.play().catch(() => {});
    });
  }, []);

  const go = (i: number) => {
    if (i === active) return;
    setActive(i);
    // Ensure the newly centered video is playing
    const v = videoRefs.current[i];
    if (v) v.play().catch(() => {});
  };

  // Positions relative to active
  const getOffset = (i: number) => {
    let d = i - active;
    if (d > SLIDES.length / 2)  d -= SLIDES.length;
    if (d < -SLIDES.length / 2) d += SLIDES.length;
    return d;
  };

  return (
    <section
      id="3d-experience"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        background: "#F5F5F0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "clamp(80px,12vh,120px) 0 clamp(60px,8vh,100px)",
      }}
    >
      {/* Ambient red glow behind center */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "50vw", height: "50vw",
        background: "radial-gradient(circle, rgba(232,0,26,0.07) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── Header ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          position: "relative", zIndex: 2,
          textAlign: "center",
          marginBottom: "clamp(40px,6vh,64px)",
        }}
      >
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "14px",
          marginBottom: "14px",
        }}>
          <div style={{ width: "32px", height: "1px", background: "#E8001A" }} />
          <span style={{
            fontSize: "10px", fontWeight: 700,
            letterSpacing: "0.35em", textTransform: "uppercase",
            color: "rgba(10,10,10,0.45)",
          }}>Campaign Experience</span>
          <div style={{ width: "32px", height: "1px", background: "#E8001A" }} />
        </div>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem,4vw,3.5rem)",
          fontWeight: 900, color: "#0A0A0A",
          letterSpacing: "-0.04em", lineHeight: 0.95,
          margin: 0,
        }}>
          Stories That <span style={{ color: "#E8001A" }}>Move You.</span>
        </h2>
      </motion.div>

      {/* ── Fan carousel ───────────────────────────────────── */}
      <div style={{
        position: "relative", zIndex: 2,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "clamp(340px,50vh,520px)",
      }}>
        {SLIDES.map((slide, i) => {
          const offset = getOffset(i);
          const isCenter = offset === 0;
          const absOff = Math.abs(offset);

          // Only render cards within ±3 of active
          if (absOff > 3) return null;

          // Layout math — mirrors the reference image
          const CARD_W_CENTER = "clamp(260px,28vw,380px)";
          const CARD_W_SIDE   = "clamp(52px,5.5vw,72px)";
          const CARD_H        = "clamp(320px,46vh,480px)";

          // X position: center=0, each side card steps out
          const xStep = absOff === 1 ? 260 : absOff === 2 ? 380 : 470;
          const xPos  = offset * (xStep / absOff || 1);

          // Rotation: side cards tilt slightly inward
          const rotate = offset * 2.5;

          // Scale: center biggest, falls off
          const scale = isCenter ? 1 : absOff === 1 ? 0.88 : absOff === 2 ? 0.78 : 0.68;

          // Z-index: center on top
          const zIndex = 10 - absOff;

          // Brightness: side cards darker
          const brightness = isCenter ? 1 : absOff === 1 ? 0.55 : 0.35;

          return (
            <motion.div
              key={slide.id}
              onClick={() => go(i)}
              animate={{
                x: xPos,
                scale,
                rotate,
                zIndex,
                opacity: absOff > 2 ? 0.4 : 1,
              }}
              transition={{ duration: 0.55, ease: [0.32, 0, 0.67, 0] }}
              style={{
                position: "absolute",
                width: isCenter ? CARD_W_CENTER : CARD_W_SIDE,
                height: CARD_H,
                borderRadius: "8px",
                overflow: "hidden",
                cursor: isCenter ? "default" : "pointer",
                flexShrink: 0,
                transformOrigin: "center center",
              }}
            >
              {/* Video */}
              <video
                ref={el => {
                  videoRefs.current[i] = el;
                  if (isCenter) centerRef.current = el;
                }}
                src={slide.video}
                autoPlay muted loop playsInline
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  filter: `brightness(${brightness}) saturate(1.1)`,
                  transition: "filter 0.4s ease",
                }}
              />

              {/* Dark overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: isCenter
                  ? "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)"
                  : "rgba(0,0,0,0.45)",
              }} />

              {/* Side card — rotated label */}
              {!isCenter && (
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(11px,1.2vw,14px)",
                    fontWeight: 900,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.85)",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    lineHeight: 1,
                  }}>
                    {slide.label}
                  </span>
                </div>
              )}

              {/* Center card — content */}
              {isCenter && (
                <>

                  {/* Bottom info */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        position: "absolute",
                        bottom: "clamp(20px,3vh,28px)",
                        left: "clamp(20px,3vw,28px)",
                        right: "clamp(20px,3vw,28px)",
                        zIndex: 5,
                      }}
                    >
                      <div style={{
                        fontSize: "10px", fontWeight: 700,
                        letterSpacing: "0.2em", textTransform: "uppercase",
                        color: "#E8001A", marginBottom: "4px",
                      }}>
                        {slide.year}
                      </div>
                      <div style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.3rem,2.2vw,1.8rem)",
                        fontWeight: 900, color: "#ffffff",
                        letterSpacing: "-0.03em", lineHeight: 1,
                        marginBottom: "4px",
                      }}>
                        {slide.label}
                      </div>
                      <div style={{
                        fontSize: "11px", color: "rgba(255,255,255,0.6)",
                        letterSpacing: "0.05em",
                      }}>
                        {slide.sub}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Red bottom accent */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    height: "3px", background: "#E8001A", zIndex: 5,
                  }} />
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ── Dot nav ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          position: "relative", zIndex: 2,
          display: "flex", alignItems: "center", gap: "10px",
          marginTop: "clamp(32px,5vh,48px)",
        }}
      >
        {/* Prev */}
        <motion.button
          onClick={() => go((active - 1 + SLIDES.length) % SLIDES.length)}
          whileHover={{ background: "#E8001A", borderColor: "#E8001A" }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          style={{
            width: "36px", height: "36px", borderRadius: "50%",
            border: "1.5px solid rgba(10,10,10,0.15)",
            background: "transparent", color: "#0A0A0A",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            marginRight: "8px",
          }}
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        {SLIDES.map((_, i) => (
          <motion.div
            key={i}
            onClick={() => go(i)}
            animate={{
              width: i === active ? "28px" : "6px",
              background: i === active ? "#E8001A" : "rgba(10,10,10,0.15)",
            }}
            transition={{ duration: 0.3 }}
            style={{ height: "6px", borderRadius: "3px", cursor: "pointer" }}
          />
        ))}

        {/* Next */}
        <motion.button
          onClick={() => go((active + 1) % SLIDES.length)}
          whileHover={{ background: "#E8001A", borderColor: "#E8001A" }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          style={{
            width: "36px", height: "36px", borderRadius: "50%",
            border: "1.5px solid rgba(10,10,10,0.15)",
            background: "transparent", color: "#0A0A0A",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            marginLeft: "8px",
          }}
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </motion.div>
    </section>
  );
}
