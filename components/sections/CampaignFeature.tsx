"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CampaignFeature() {
  const secRef  = useRef<HTMLElement>(null);
  const vidRef  = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const { scrollYProgress } = useScroll({
    target: secRef,
    offset: ["start start", "end start"],
  });
  const vidScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.08]);

  const togglePlay = () => {
    if (!vidRef.current) return;
    if (playing) { vidRef.current.pause(); setPlaying(false); }
    else          { vidRef.current.play();  setPlaying(true);  }
  };

  const DETAILS = [
    { label: "Campaign",  value: "Share a Coke" },
    { label: "Market",    value: "Nigeria" },
    { label: "Year",      value: "2024" },
    { label: "Category",  value: "Brand Activation" },
  ];

  return (
    <section
      ref={secRef}
      id="campaign-feature"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "100svh",
        background: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* ── LEFT — video panel ─────────────────────────────── */}
      <div style={{ position: "relative", background: "#F0EEEB", overflow: "hidden" }}>

        {/* Video */}
        <motion.video
          ref={vidRef}
          src="/media/videos/coke-share-with.mp4"
          autoPlay muted loop playsInline
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            scale: vidScale,
          }}
        />

        {/* Subtle light overlay so it reads as a "product panel" */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(240,238,235,0.15) 0%, rgba(240,238,235,0.05) 60%, rgba(0,0,0,0.25) 100%)",
          pointerEvents: "none",
        }} />

        {/* Top-left — logo mark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            position: "absolute", top: "clamp(24px,4vh,40px)", left: "clamp(24px,4vw,48px)",
            zIndex: 10,
            padding: "6px 12px",
            background: "#0A0A0A",
            display: "inline-flex", alignItems: "center",
          }}
        >
          <span style={{
            fontSize: "11px", fontWeight: 900,
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: "#ffffff",
          }}>
            Coca-Cola
          </span>
        </motion.div>

        {/* Play/pause toggle */}
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: "absolute", top: "clamp(24px,4vh,40px)", right: "clamp(24px,4vw,48px)",
            zIndex: 10,
            width: "36px", height: "36px",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#ffffff",
          }}
        >
          {playing
            ? <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="1" width="3" height="10" rx="1"/><rect x="7" y="1" width="3" height="10" rx="1"/></svg>
            : <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M3 1.5l7 4.5-7 4.5V1.5z"/></svg>
          }
        </motion.button>

        {/* Vertical label — like KITH's "COCA-COLA" rotated text */}
        <div style={{
          position: "absolute", right: "clamp(16px,2.5vw,28px)", top: "50%",
          transform: "translateY(-50%) rotate(90deg)",
          zIndex: 10,
          fontSize: "9px", fontWeight: 700,
          letterSpacing: "0.4em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.6)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}>
          Share a Coke · Nigeria · 2024
        </div>

        {/* Bottom counter — like KITH's "01 —— 06" */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            position: "absolute", bottom: "clamp(24px,4vh,40px)",
            left: "clamp(24px,4vw,48px)", right: "clamp(24px,4vw,48px)",
            zIndex: 10,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.05em" }}>01</span>
            <div style={{ width: "40px", height: "1px", background: "rgba(255,255,255,0.4)" }} />
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em" }}>04</span>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            {["Share", "Watch", "Explore"].map((label) => (
              <span key={label} style={{
                fontSize: "9px", fontWeight: 600,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                cursor: "pointer",
              }}>{label}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── RIGHT — editorial text panel ──────────────────── */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(32px,5vh,56px) clamp(40px,6vw,80px)",
        background: "#ffffff",
        borderLeft: "1px solid rgba(10,10,10,0.08)",
        position: "relative",
      }}>

        {/* Top nav — like KITH's MEN / WOMEN / KIDS */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex", alignItems: "center",
            gap: "clamp(20px,3vw,40px)",
            borderBottom: "1px solid rgba(10,10,10,0.08)",
            paddingBottom: "clamp(16px,2.5vh,24px)",
          }}
        >
          {["Campaign", "Story", "Activate"].map((item, i) => (
            <span key={item} style={{
              fontSize: "11px", fontWeight: i === 0 ? 700 : 400,
              letterSpacing: "0.08em",
              color: i === 0 ? "#0A0A0A" : "rgba(10,10,10,0.4)",
              cursor: "pointer",
              borderBottom: i === 0 ? "2px solid #0A0A0A" : "none",
              paddingBottom: "4px",
              transition: "color 0.2s",
            }}>{item}</span>
          ))}

          {/* Right side — vertical "Summer 2024" like KITH */}
          <div style={{
            marginLeft: "auto",
            fontSize: "9px", fontWeight: 600,
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: "rgba(10,10,10,0.3)",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            lineHeight: 1,
          }}>
            Nigeria 2024
          </div>
        </motion.div>

        {/* Main headline — KITH-style massive bold */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(32px,5vh,56px) 0" }}>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem,5.5vw,6rem)",
              fontWeight: 900,
              color: "#0A0A0A",
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
              margin: "0 0 clamp(24px,4vh,40px) 0",
            }}
          >
            Share a Coke.<br />
            Find Your<br />
            <span style={{ color: "#E8001A" }}>Name.</span>
          </motion.h2>

          {/* Details grid — like KITH's product specs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(12px,2vh,20px) clamp(20px,3vw,40px)",
              marginBottom: "clamp(28px,4vh,44px)",
              paddingTop: "clamp(20px,3vh,32px)",
              borderTop: "1px solid rgba(10,10,10,0.08)",
            }}
          >
            {DETAILS.map((d) => (
              <div key={d.label}>
                <div style={{ fontSize: "10px", color: "rgba(10,10,10,0.4)", letterSpacing: "0.1em", marginBottom: "4px" }}>{d.label}</div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#0A0A0A", letterSpacing: "0.02em" }}>{d.value}</div>
              </div>
            ))}
          </motion.div>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              fontSize: "clamp(0.9rem,1.2vw,1rem)",
              lineHeight: 1.8,
              color: "rgba(10,10,10,0.6)",
              maxWidth: "400px",
            }}
          >
            Personalized bottles. Personalized moments. Find your name and share your story across Nigeria.
          </motion.p>
        </div>

        {/* Bottom CTA bar — like KITH's "Extra Large · Add to Cart · $95.00" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0",
            borderTop: "1px solid rgba(10,10,10,0.08)",
          }}
        >
          {/* Watch Campaign */}
          <motion.a
            href="#campaigns"
            onClick={(e) => { e.preventDefault(); document.getElementById("campaigns")?.scrollIntoView({ behavior: "smooth" }); }}
            whileHover={{ background: "#E8001A" }}
            transition={{ duration: 0.25 }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "10px",
              padding: "clamp(18px,3vh,24px) clamp(20px,3vw,32px)",
              background: "#0A0A0A",
              color: "#ffffff",
              fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Watch Campaign
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>

          {/* All Campaigns */}
          <motion.a
            href="#campaigns"
            onClick={(e) => { e.preventDefault(); document.getElementById("campaigns")?.scrollIntoView({ behavior: "smooth" }); }}
            whileHover={{ background: "rgba(10,10,10,0.05)" }}
            transition={{ duration: 0.25 }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "10px",
              padding: "clamp(18px,3vh,24px) clamp(20px,3vw,32px)",
              background: "transparent",
              color: "#0A0A0A",
              fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase",
              textDecoration: "none",
              cursor: "pointer",
              borderLeft: "1px solid rgba(10,10,10,0.08)",
            }}
          >
            All Campaigns
          </motion.a>
        </motion.div>
      </div>

      {/* Mobile: stack */}
      <style>{`
        @media (max-width: 768px) {
          #campaign-feature {
            grid-template-columns: 1fr !important;
          }
          #campaign-feature > div:first-child {
            min-height: 55vw;
          }
        }
      `}</style>
    </section>
  );
}
