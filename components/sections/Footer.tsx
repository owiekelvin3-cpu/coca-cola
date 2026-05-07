"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const scroll = (href: string) => {
  const el = document.getElementById(href.replace("#", ""));
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0A0A0A",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Giant COCA-COLA — the hero of the footer ── */}
      <div
        style={{
          position: "relative",
          paddingTop: "clamp(60px,10vh,100px)",
          overflow: "hidden",
        }}
      >
        {/* Red horizontal rule */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "2px",
          background: "linear-gradient(to right, #E8001A 0%, #E8001A 60%, transparent 100%)",
        }} />

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(5.5rem,17vw,20rem)",
            fontWeight: 900,
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(255,255,255,0.12)",
            letterSpacing: "-0.04em",
            lineHeight: 0.82,
            textAlign: "center",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          COCA-COLA
        </motion.div>

        {/* Red slash through the type */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            top: "55%",
            left: 0, right: 0,
            height: "3px",
            background: "#E8001A",
            transformOrigin: "left",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── Content row ── */}
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "clamp(32px,5vh,56px) clamp(40px,8vw,120px) clamp(28px,4vh,44px)",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: "clamp(24px,4vw,48px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left — logo + tagline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src="/media/images/logo.png"
            alt="Coca-Cola"
            width={80}
            height={32}
            style={{ objectFit: "contain", height: "auto", filter: "brightness(0) invert(1)", marginBottom: "12px" }}
          />
          <p style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: "12px",
            lineHeight: 1.7,
            maxWidth: "220px",
          }}>
            Refreshing Nigeria since 1953.
          </p>
        </motion.div>

        {/* Center — nav links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", gap: "clamp(16px,3vw,40px)", flexWrap: "wrap", justifyContent: "center" }}>
            {[
              ["Brands", "#brands"],
              ["Campaigns", "#campaigns"],
              ["Impact", "#impact"],
              ["About", "#about"],
            ].map(([label, href]) => (
              <motion.a
                key={label}
                href={href}
                onClick={e => { e.preventDefault(); scroll(href); }}
                whileHover={{ color: "#E8001A" }}
                transition={{ duration: 0.2 }}
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                {label}
              </motion.a>
            ))}
          </div>

          <p style={{
            color: "rgba(255,255,255,0.18)",
            fontSize: "10px",
            letterSpacing: "0.05em",
          }}>
            © 2024 The Coca-Cola Company. All rights reserved.
          </p>
        </motion.div>

        {/* Right — socials + back to top */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "16px",
          }}
        >
          {/* Social icons */}
          <div style={{ display: "flex", gap: "8px" }}>
            {["IG", "TW", "FB", "YT"].map(s => (
              <motion.a
                key={s}
                href="#"
                whileHover={{ background: "#E8001A", borderColor: "#E8001A", color: "#ffffff" }}
                transition={{ duration: 0.2 }}
                style={{
                  width: "34px", height: "34px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "9px", fontWeight: 700,
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                }}
              >
                {s}
              </motion.a>
            ))}
          </div>

          {/* Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ color: "#E8001A" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: "none", border: "none",
              color: "rgba(255,255,255,0.3)",
              fontSize: "10px", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Back to top
            <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile */}
      <style>{`
        @media (max-width: 768px) {
          footer > div:last-child {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          footer > div:last-child > div:last-child {
            align-items: center !important;
          }
        }
      `}</style>
    </footer>
  );
}
