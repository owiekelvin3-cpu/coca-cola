"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";

const SketchfabEmbed = dynamic(
  () => import("@/components/three/SketchfabEmbed"),
  { ssr: false }
);

const MODELS = [
  {
    id: "34075fedb0ef40d9a172231134849914",
    name: "Coca-Cola Bottle",
    label: "The Contour Bottle",
    desc: "Patented in 1915. Recognized by touch alone. The most iconic bottle shape in the world.",
    year: "1915",
    color: "#F40009",
  },
  {
    id: "3e2d38a14d4345608a95843b73d869b6",
    name: "Soda Can",
    label: "The Classic Can",
    desc: "Sleek. Portable. Instantly recognizable. The Coca-Cola can — refreshment in your hand.",
    year: "1960",
    color: "#C0000A",
  },
  {
    id: "30178d8ee92949499854f6edaac8574f",
    name: "Softdrinks Collection",
    label: "The Full Range",
    desc: "From Coca-Cola to Fanta, Sprite to Schweppes — the complete family of refreshment.",
    year: "2024",
    color: "#8B0000",
  },
];

export default function ThreeDPage() {
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(".td-title",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "expo.out", delay: 0.3 }
    );
    gsap.fromTo(".td-model-btn",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "expo.out", delay: 0.6 }
    );
  }, []);

  const switchModel = (i: number) => {
    if (i === active) return;
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        opacity: 0, y: 10, duration: 0.25, ease: "power2.in",
        onComplete: () => {
          setActive(i);
          gsap.to(panelRef.current, {
            opacity: 1, y: 0, duration: 0.4, ease: "expo.out",
          });
        },
      });
    } else {
      setActive(i);
    }
  };

  const model = MODELS[active];

  return (
    <div style={{ background: "#000", height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>

      {/* ── Back nav ─────────────────────────────────────────── */}
      <div style={{ position: "fixed", top: "24px", left: "24px", zIndex: 50 }}>
        <Link href="/" className="flex items-center gap-3 group" data-hover>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:border-[#F40009] group-hover:bg-[#F40009]/10"
            style={{ borderColor: "rgba(255,255,255,0.15)" }}
          >
            <svg className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-300"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <span className="text-white/40 text-[11px] tracking-[0.2em] uppercase group-hover:text-white/70 transition-colors duration-300">
            Back
          </span>
        </Link>
      </div>

      {/* ── Logo ─────────────────────────────────────────────── */}
      <div style={{ position: "fixed", top: "20px", right: "24px", zIndex: 50 }}>
        <Image
          src="/media/images/logo.png"
          alt="Coca-Cola"
          width={44}
          height={44}
          className="object-contain"
          style={{ filter: "drop-shadow(0 0 16px rgba(244,0,9,0.5))" }}
          priority
        />
      </div>

      {/* ── Red top accent ───────────────────────────────────── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: "3px",
        background: "linear-gradient(to right, #F40009, #FF4444 50%, transparent 100%)",
      }} />

      {/* ── Header ───────────────────────────────────────────── */}
      <div style={{
        padding: "clamp(72px, 9vh, 96px) clamp(24px, 6vw, 80px) 0",
        flexShrink: 0,
      }}>
        <div className="td-title" style={{
          color: "#F40009", fontSize: "11px", fontWeight: 700,
          letterSpacing: "0.35em", textTransform: "uppercase",
          marginBottom: "10px",
          display: "flex", alignItems: "center", gap: "10px",
        }}>
          <div style={{ width: "24px", height: "1px", background: "#F40009" }} />
          3D Experience
        </div>
        <h1 className="td-title" style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
          fontWeight: 900, color: "#fff",
          letterSpacing: "-0.04em", lineHeight: 0.92,
        }}>
          Explore the{" "}
          <span style={{ color: "#F40009" }}>Coca-Cola</span>
          <br />Universe in 3D
        </h1>
      </div>

      {/* ── Main: 3D viewer + info panel ─────────────────────── */}
      <div style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "1fr clamp(240px, 26vw, 360px)",
        overflow: "hidden",
        minHeight: 0,
      }}>

        {/* 3D Viewer */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
            background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${model.color}18 0%, transparent 70%)`,
            transition: "background 0.8s ease",
          }} />

          <SketchfabEmbed
            key={model.id}
            modelId={model.id}
            title={model.name}
            className="w-full h-full"
            autostart
            transparent
            ui_infos={false}
            ui_controls={true}
            autospin={0.2}
            animation_autoplay
          />

          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "100px", pointerEvents: "none", zIndex: 1,
            background: "linear-gradient(to top, #000, transparent)",
          }} />
        </div>

        {/* Info panel */}
        <div
          ref={panelRef}
          style={{
            borderLeft: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.02)",
            display: "flex", flexDirection: "column",
            justifyContent: "center",
            padding: "clamp(20px, 3vw, 40px)",
            gap: "28px",
            overflowY: "auto",
          }}
        >
          {/* Model info */}
          <div>
            <div style={{
              color: model.color, fontSize: "10px", fontWeight: 700,
              letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "10px",
            }}>
              Est. {model.year}
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 2vw, 1.9rem)",
              fontWeight: 900, color: "#fff",
              letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "14px",
            }}>
              {model.label}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", lineHeight: 1.7 }}>
              {model.desc}
            </p>
          </div>

          <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />

          {/* Model switcher */}
          <div>
            <div style={{
              color: "rgba(255,255,255,0.25)", fontSize: "10px", fontWeight: 700,
              letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "14px",
            }}>
              Switch Model
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              {MODELS.map((m, i) => (
                <button
                  key={m.id}
                  onClick={() => switchModel(i)}
                  className="td-model-btn"
                  data-hover
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "11px 13px", borderRadius: "10px",
                    border: `1px solid ${active === i ? m.color + "50" : "rgba(255,255,255,0.07)"}`,
                    background: active === i ? `${m.color}0D` : "transparent",
                    cursor: "pointer", transition: "all 0.3s ease", textAlign: "left",
                  }}
                >
                  <div style={{
                    width: "7px", height: "7px", borderRadius: "50%", flexShrink: 0,
                    background: active === i ? m.color : "rgba(255,255,255,0.2)",
                    transition: "background 0.3s",
                  }} />
                  <span style={{
                    color: active === i ? "#fff" : "rgba(255,255,255,0.45)",
                    fontSize: "12px", fontWeight: 600, letterSpacing: "0.02em",
                    transition: "color 0.3s",
                  }}>
                    {m.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />

          {/* Controls hint */}
          <div style={{ color: "rgba(255,255,255,0.18)", fontSize: "11px", lineHeight: 1.7 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              </svg>
              Drag to rotate
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2v8M2 6h8" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" />
              </svg>
              Scroll to zoom
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────── */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "10px clamp(24px, 6vw, 80px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexShrink: 0,
      }}>
        <span style={{
          color: "rgba(255,255,255,0.18)", fontSize: "10px",
          letterSpacing: "0.25em", textTransform: "uppercase",
        }}>
          Coca-Cola Nigeria — 3D Experience
        </span>
        <Link href="/" style={{
          color: "#F40009", fontSize: "10px", fontWeight: 700,
          letterSpacing: "0.25em", textTransform: "uppercase",
          textDecoration: "none", display: "flex", alignItems: "center", gap: "6px",
        }} data-hover>
          Back to Site
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M7 3l3 3-3 3" stroke="#F40009" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
