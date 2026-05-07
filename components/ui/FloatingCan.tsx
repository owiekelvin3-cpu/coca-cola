"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const SketchfabEmbed = dynamic(() => import("@/components/three/SketchfabEmbed"), { ssr: false });

export default function FloatingCan() {
  const canRef   = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const onScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollY    = window.scrollY;
      const total      = document.body.scrollHeight - window.innerHeight;

      setVisible(scrollY > heroHeight * 0.8);

      const can = canRef.current;
      if (!can) return;

      const progress = Math.min(Math.max((scrollY - heroHeight) / (total - heroHeight), 0), 1);
      const bobY     = Math.sin(progress * Math.PI * 8) * 5;
      const rot      = -12 + Math.sin(progress * Math.PI * 5) * 8;
      const opacity  = progress > 0.88 ? 1 - (progress - 0.88) / 0.12 : 1;

      can.style.transform = `translateY(${bobY}px) rotate(${rot}deg)`;
      can.style.opacity   = String(Math.max(0, opacity));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "24px",
      right: "24px",
      zIndex: 50,
      width: "160px",
      height: "160px",
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? "auto" : "none",
      transition: "opacity 0.5s ease",
    }}>
      <div
        ref={canRef}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        title="Back to top"
        style={{
          width: "100%",
          height: "100%",
          cursor: "pointer",
          transform: "rotate(-12deg)",
          filter: "drop-shadow(4px 8px 20px rgba(0,0,0,0.2))",
          willChange: "transform, opacity",
          transformOrigin: "center bottom",
        }}
      >
        {visible && (
          <SketchfabEmbed
            modelId="3e2d38a14d4345608a95843b73d869b6"
            title="Coca-Cola Can"
            className="w-full h-full"
            autostart
            transparent
            ui_infos={false}
            ui_controls={false}
            autospin={3}
            animation_autoplay
          />
        )}
      </div>

      <div style={{
        position: "absolute",
        bottom: "-18px",
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "9px",
        fontWeight: 700,
        letterSpacing: "0.14em",
        color: "rgba(10,10,10,0.4)",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        pointerEvents: "none",
      }}>
        Back to top ↑
      </div>
    </div>
  );
}
