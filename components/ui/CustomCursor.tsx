"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const mouseX    = useRef(0);
  const mouseY    = useRef(0);
  const ringX     = useRef(0);
  const ringY     = useRef(0);
  const raf       = useRef(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring   = ringRef.current;
    if (!cursor || !ring) return;

    const onMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top  = `${e.clientY}px`;
    };

    const onEnter = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
      ring.style.opacity = "0.6";
      ring.style.transform = "translate(-50%, -50%) scale(1.4)";
    };
    const onLeave = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      ring.style.opacity = "0.25";
      ring.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const animate = () => {
      const ease = 0.1;
      ringX.current += (mouseX.current - ringX.current) * ease;
      ringY.current += (mouseY.current - ringY.current) * ease;
      ring.style.left = `${ringX.current}px`;
      ring.style.top  = `${ringY.current}px`;
      raf.current = requestAnimationFrame(animate);
    };
    animate();

    document.addEventListener("mousemove", onMove, { passive: true });

    const attach = () => {
      document.querySelectorAll("a,button,[data-hover]").forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attach();

    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      {/* Coca-Cola circle logo as cursor */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%) scale(1)",
          transition: "transform 0.2s ease",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          overflow: "hidden",
          background: "#E8001A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 12px rgba(232,0,26,0.4)",
        }}
      >
        {/* Coca-Cola "C" wave SVG — simplified iconic mark */}
        <svg
          viewBox="0 0 32 32"
          width="32"
          height="32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* White Coca-Cola script-style wave */}
          <path
            d="M8 16 C8 11, 12 8, 16 8 C20 8, 24 11, 24 16 C24 21, 20 24, 16 24 C12 24, 8 21, 8 16Z"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          />
          <path
            d="M10 16 Q13 12 16 14 Q19 16 22 13"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M10 18 Q13 14 16 16 Q19 18 22 15"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Trailing ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%) scale(1)",
          transition: "transform 0.3s ease, opacity 0.3s ease",
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          border: "1.5px solid rgba(232,0,26,0.25)",
          opacity: 0.25,
        }}
      />
    </>
  );
}
