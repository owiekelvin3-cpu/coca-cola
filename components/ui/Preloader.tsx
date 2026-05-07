"use client";
import { useEffect, useRef, useState, useCallback, Suspense } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";

const ParticleCanvas    = dynamic(() => import("./ParticleCanvas"),                          { ssr: false });
const PreloaderBottle   = dynamic(() => import("@/components/three/PreloaderBottle"),        { ssr: false });

const PRELOAD_MODELS = [
  "34075fedb0ef40d9a172231134849914",
  "3e2d38a14d4345608a95843b73d869b6",
  "30178d8ee92949499854f6edaac8574f",
];

// Coke bottle shown in the preloader (same as hero)
const HERO_MODEL_ID = "34075fedb0ef40d9a172231134849914";

const MAX_WAIT = 18000;

function buildUrl(id: string) {
  const p = new URLSearchParams({
    autostart: "1", transparent: "1",
    ui_infos: "0", ui_controls: "0",
    ui_watermark: "0", ui_watermark_link: "0",
    ui_ar: "0", ui_help: "0", ui_settings: "0",
    ui_vr: "0", ui_fullscreen: "0", ui_annotations: "0",
    camera: "0", preload: "1", dnt: "1",
    autospin: "0.25", animation_autoplay: "1",
  });
  return `https://sketchfab.com/models/${id}/embed?${p.toString()}`;
}

interface Props { onComplete: () => void; }

export default function Preloader({ onComplete }: Props) {
  const rootRef     = useRef<HTMLDivElement>(null);
  const curtainRef  = useRef<HTMLDivElement>(null);
  const glowRef     = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLDivElement>(null);
  const sketchRef   = useRef<HTMLDivElement>(null);
  const skipRef     = useRef<HTMLDivElement>(null);

  const converge = useRef(0);
  const pOpacity = useRef(1);

  const [showParticles, setShowParticles] = useState(false);
  const [loadedCount, setLoadedCount]     = useState(0);

  const canExitRef   = useRef(false);
  const tlDoneRef    = useRef(false);
  const exitFiredRef = useRef(false);

  // ── Exit ─────────────────────────────────────────────────
  const tryExit = useCallback(() => {
    if (exitFiredRef.current) return;
    if (!canExitRef.current || !tlDoneRef.current) return;
    exitFiredRef.current = true;

    gsap.to([particleRef.current, glowRef.current, skipRef.current, sketchRef.current], {
      opacity: 0, duration: 0.4, ease: "power2.in",
    });

    gsap.fromTo(curtainRef.current,
      { yPercent: -100 },
      {
        yPercent: 0, duration: 0.5, ease: "expo.in", delay: 0.3,
        onComplete: () => {
          gsap.to(curtainRef.current, {
            yPercent: 100, duration: 0.8, ease: "expo.inOut",
            onComplete: () => {
              document.body.style.overflow = "";
              if (rootRef.current) rootRef.current.style.pointerEvents = "none";
              onComplete();
            },
          });
        },
      }
    );
  }, [onComplete]);

  // ── Preload tracking ─────────────────────────────────────
  useEffect(() => {
    if (loadedCount >= PRELOAD_MODELS.length) {
      canExitRef.current = true;
      tryExit();
    }
  }, [loadedCount, tryExit]);

  // ── Timeline ─────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const mountTimer = setTimeout(() => setShowParticles(true), 80);

    const tl = gsap.timeline({ paused: true });

    // Glow in
    tl.fromTo(glowRef.current,
      { scale: 0.4, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
      0
    );

    // Particles fade in
    tl.fromTo(particleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
      0.2
    );

    // Particles converge into bottle
    tl.to(converge, {
      current: 1, duration: 2.0, ease: "power3.inOut",
    }, 0.6);

    // Particles fade out as 3D bottle takes over
    tl.to(particleRef.current, {
      opacity: 0, duration: 0.6, ease: "power2.in",
    }, 2.4);

    // 3D Coke bottle fades in
    tl.fromTo(sketchRef.current,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 1.0, ease: "expo.out" },
      2.6
    );

    // Skip hint
    tl.fromTo(skipRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      3.2
    );

    // Hold for 4 seconds showing the 3D bottle — gives Sketchfab hero time to load
    tl.call(() => {
      tlDoneRef.current = true;
      tryExit();
    }, [], 7.0);

    tl.play();

    const safety = setTimeout(() => {
      canExitRef.current = true;
      tryExit();
    }, MAX_WAIT);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(safety);
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [tryExit]);

  const skip = () => {
    canExitRef.current = true;
    tlDoneRef.current  = true;
    tryExit();
  };

  return (
    <div
      ref={rootRef}
      style={{ position: "fixed", inset: 0, zIndex: 300, pointerEvents: "all", background: "#F5F5F0", overflow: "hidden" }}
    >
      {/* Hidden preload iframes */}
      <div style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", opacity: 0, pointerEvents: "none", zIndex: 0 }}>
        {PRELOAD_MODELS.map(id => (
          <iframe key={id} title={`pl-${id}`} src={buildUrl(id)}
            style={{ width: "1px", height: "1px", border: "none" }}
            onLoad={() => setLoadedCount(c => c + 1)} />
        ))}
      </div>

      {/* Radial glow */}
      <div ref={glowRef} style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(ellipse 65% 65% at 50% 50%, rgba(232,0,26,0.12) 0%, rgba(232,0,26,0.04) 50%, transparent 72%)",
        opacity: 0,
      }} />

      {/* Particles */}
      <div ref={particleRef} style={{ position: "absolute", inset: 0, zIndex: 2, opacity: 0 }}>
        {showParticles && (
          <Suspense fallback={null}>
            <ParticleCanvas converge={converge} opacity={pOpacity} />
          </Suspense>
        )}
      </div>

      {/* 3D Coke bottle — fades in after particles converge */}
      <div ref={sketchRef} style={{
        position: "absolute", inset: 0, zIndex: 3, opacity: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {/* Constrained box so the bottle fills it properly */}
        <div style={{
          width: "clamp(280px, 40vw, 520px)",
          height: "clamp(280px, 40vw, 520px)",
          position: "relative",
        }}>
          <Suspense fallback={null}>
            <PreloaderBottle style={{ width: "100%", height: "100%" }} />
          </Suspense>
        </div>
      </div>

      {/* Corner brackets */}
      {([
        { top: "20px",    left: "20px",  d: "M0 20 L0 0 L20 0" },
        { top: "20px",    right: "20px", d: "M20 20 L20 0 L0 0" },
        { bottom: "20px", right: "20px", d: "M20 0 L20 20 L0 20" },
        { bottom: "20px", left: "20px",  d: "M0 0 L0 20 L20 20" },
      ] as const).map((b, i) => (
        <div key={i} style={{ position: "absolute", zIndex: 6, width: "20px", height: "20px", opacity: 0.18, ...b }}>
          <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
            <path d={b.d} stroke="#F40009" strokeWidth="1.5" />
          </svg>
        </div>
      ))}

      {/* Skip */}
      <div ref={skipRef} onClick={skip} style={{
        position: "absolute",
        bottom: "clamp(28px, 5vh, 48px)",
        right: "clamp(20px, 3vw, 40px)",
        zIndex: 6, opacity: 0, cursor: "pointer",
        display: "flex", alignItems: "center", gap: "6px",
        color: "rgba(255,255,255,0.2)",
        fontSize: "10px", fontWeight: 600,
        letterSpacing: "0.25em", textTransform: "uppercase",
        transition: "color 0.3s",
      }}
        onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
      >
        Skip
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Red curtain exit */}
      <div ref={curtainRef} style={{
        position: "absolute", inset: 0,
        background: "#F40009", zIndex: 10,
        transform: "translateY(-100%)",
      }} />
    </div>
  );
}
