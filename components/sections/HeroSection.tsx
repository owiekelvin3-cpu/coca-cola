"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SketchfabEmbed = dynamic(() => import("@/components/three/SketchfabEmbed"), { ssr: false });

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const PAGES = [
  { num: 1, script: "taste the", word1: "Fee",  word2: "ling",  model: "3e2d38a14d4345608a95843b73d869b6" },
  { num: 2, script: "open",      word1: "Hap",  word2: "piness",model: "34075fedb0ef40d9a172231134849914" },
  { num: 3, script: "taste the", word1: "Fee",  word2: "ling",  model: "3e2d38a14d4345608a95843b73d869b6" },
  { num: 4, script: "real",      word1: "Ma",   word2: "gic",   model: "30178d8ee92949499854f6edaac8574f" },
];

export default function HeroSection() {
  const secRef     = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const canRef     = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(2);
  const [switching, setSwitching] = useState(false);

  const p = PAGES[page];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Don't touch canRef opacity via gsap.set — the iframe needs to be visible
      // to load. Only animate text elements initially hidden.
      gsap.set([".hw1", ".hw2", ".h-script", ".h-bottom"], { opacity: 0 });

      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(overlayRef.current, { opacity: 0, duration: 1.0, ease: "power2.out" });
      tl.to(".hw1",      { x: "0%", opacity: 1, duration: 1.1, ease: "expo.out" }, 0.4);
      tl.to(".hw2",      { x: "0%", opacity: 1, duration: 1.1, ease: "expo.out" }, 0.4);
      tl.to(".h-script", { y: 0,    opacity: 1, duration: 0.8, ease: "expo.out" }, 0.5);
      tl.to(".h-bottom", { y: 0,    opacity: 1, duration: 0.7, stagger: 0.08, ease: "expo.out" }, 0.9);

      // Scroll-driven 3D interaction
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: secRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      scrollTl
        .to(canRef.current, { rotate: -22, scale: 1.18, y: -30, x: 60, ease: "none" }, 0)
        .to(canRef.current, { rotate: -5, scale: 0.85, y: -80, x: 120, opacity: 0.3, ease: "none" }, 0.4);

      gsap.to(".hero-text-layer", {
        y: -50, opacity: 0.1, ease: "none",
        scrollTrigger: {
          trigger: secRef.current,
          start: "top top", end: "55% top", scrub: 1,
        },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  const switchPage = (n: number) => {
    if (switching || n === page) return;
    setSwitching(true);
    gsap.to([".hw1", ".hw2", ".h-script"], {
      opacity: 0, y: -20, duration: 0.25, ease: "power2.in",
      onComplete: () => {
        setPage(n);
        gsap.fromTo([".hw1", ".hw2", ".h-script"],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: "expo.out",
            onComplete: () => setSwitching(false) }
        );
      },
    });
    gsap.to(canRef.current, {
      opacity: 0, scale: 0.9, duration: 0.25, ease: "power2.in",
      onComplete: () => {
        gsap.fromTo(canRef.current,
          { opacity: 0, scale: 0.88, rotate: -12 },
          { opacity: 1, scale: 1, rotate: -8, duration: 0.9, ease: "expo.out" }
        );
      },
    });
  };

  return (
    <section
      ref={secRef}
      id="experience"
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        minHeight: "700px",
        background: "#F5F5F0",
      }}
    >
      {/* Entrance overlay */}
      <div ref={overlayRef} style={{ position: "absolute", inset: 0, zIndex: 30, background: "#F5F5F0", pointerEvents: "none" }} />

      {/* "COCA COLA" watermark */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", pointerEvents: "none", gap: "4vw",
      }}>
        {["COCA", "COLA"].map((w, i) => (
          <span key={i} style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(6rem,18vw,20rem)",
            fontWeight: 900,
            color: "rgba(10,10,10,0.06)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            userSelect: "none",
          }}>{w}</span>
        ))}
      </div>

      {/* Thin horizontal line */}
      <div style={{
        position: "absolute", top: "50%", left: 0, right: 0,
        height: "1px", background: "rgba(10,10,10,0.06)",
        zIndex: 1, pointerEvents: "none",
      }} />

      {/* 3D Can */}
      <div
        ref={canRef}
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%) rotate(-8deg)",
          width: "clamp(240px, 34vw, 500px)",
          height: "clamp(240px, 34vw, 500px)",
          zIndex: 5,
          pointerEvents: "none",
          opacity: 1,
          filter: "drop-shadow(8px 16px 40px rgba(0,0,0,0.18))",
          willChange: "transform",
          transformOrigin: "center center",
          overflow: "visible",
        }}
      >
        <SketchfabEmbed
          key={`${p.model}-${page}`}
          modelId={p.model}
          title="Coca-Cola"
          className="w-full h-full"
          autostart transparent
          ui_infos={false} ui_controls={false}
          autospin={3} animation_autoplay
        />
      </div>

      {/* Main text layer */}
      <div
        className="hero-text-layer"
        style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", flexDirection: "column",
          justifyContent: "center",
          padding: "0 clamp(24px,5vw,72px)",
          pointerEvents: "none",
        }}
      >
        <div className="h-script" style={{
          display: "flex", alignItems: "center", gap: "10px",
          marginBottom: "clamp(4px,0.8vw,10px)", opacity: 0,
        }}>
          <div style={{
            width: "clamp(10px,1.4vw,18px)", height: "clamp(10px,1.4vw,18px)",
            borderRadius: "50%", background: "#E8001A", flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "var(--font-script)",
            fontSize: "clamp(1rem,2.2vw,1.8rem)",
            color: "#0A0A0A", letterSpacing: "-0.01em",
          }}>
            {p.script}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 0, lineHeight: 0.82 }}>
          <h1 className="hw1" style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(5.5rem,15vw,16rem)",
            fontWeight: 900, color: "#0A0A0A",
            letterSpacing: "-0.055em", lineHeight: 0.82, margin: 0, opacity: 0,
          }}>
            {p.word1}
          </h1>

          <div style={{ width: "clamp(180px,26vw,380px)", flexShrink: 0 }} />

          <h1 className="hw2" style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(5.5rem,15vw,16rem)",
            fontWeight: 900, color: "transparent",
            WebkitTextStroke: "2.5px #0A0A0A",
            letterSpacing: "-0.055em", lineHeight: 0.82, margin: 0, opacity: 0,
          }}>
            {p.word2}
            <sup style={{
              fontSize: "0.28em", verticalAlign: "super",
              WebkitTextStroke: "1px #0A0A0A", letterSpacing: 0,
            }}>®</sup>
          </h1>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "clamp(12px,2vh,20px) clamp(24px,5vw,72px)",
        borderTop: "1px solid rgba(10,10,10,0.18)",
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(10px)",
      }}>
        <div className="h-bottom" style={{ opacity: 0, textAlign: "center" }}>
          <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.75)", letterSpacing: "0.03em", lineHeight: 1.4 }}>
            © 2024 The Coca-Cola<br />Company. All rights reserved.
          </p>
        </div>

        <div className="h-bottom" style={{ opacity: 0, display: "flex", alignItems: "center", gap: "10px" }}>
          {PAGES.map((pg, n) => (
            <button
              key={n}
              onClick={() => switchPage(n)}
              data-hover
              style={{
                background: "none", border: "none", cursor: "pointer", padding: "2px 4px",
                fontSize: "12px", fontWeight: page === n ? 700 : 400,
                color: page === n ? "#0A0A0A" : "rgba(10,10,10,0.8)",
                transition: "all 0.3s", position: "relative",
              }}
            >
              {pg.num}
              {n < PAGES.length - 1 && (
                <span style={{ position: "absolute", right: "-8px", color: "rgba(255,255,255,0.85)", fontWeight: 400 }}>·</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 3D badge */}
      <div className="h-bottom" style={{
        position: "absolute",
        bottom: "clamp(56px,9vh,80px)", left: "50%",
        transform: "translateX(-50%)",
        zIndex: 20, opacity: 0,
      }}>
        <div
          data-hover
          style={{
            width: "44px", height: "44px", borderRadius: "50%",
            border: "1.5px solid rgba(10,10,10,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.8)", cursor: "pointer",
            transition: "border-color 0.3s, color 0.3s",
            background: "#F5F5F0",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#E8001A"; (e.currentTarget as HTMLElement).style.color = "#E8001A"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(10,10,10,0.15)"; (e.currentTarget as HTMLElement).style.color = "rgba(10,10,10,0.65)"; }}
        >
          3D
        </div>
      </div>
    </section>
  );
}
