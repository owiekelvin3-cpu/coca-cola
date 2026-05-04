"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const onMouseEnterLink = () => {
      if (!ring || !dot) return;
      ring.style.width = "60px";
      ring.style.height = "60px";
      ring.style.borderColor = "rgba(244, 0, 9, 1)";
      ring.style.background = "rgba(244, 0, 9, 0.1)";
      dot.style.transform = "translate(-50%, -50%) scale(0)";
    };

    const onMouseLeaveLink = () => {
      if (!ring || !dot) return;
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.borderColor = "rgba(244, 0, 9, 0.6)";
      ring.style.background = "transparent";
      dot.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const animate = () => {
      const ease = 0.12;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;
      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top = `${ringPos.current.y}px`;
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();
    document.addEventListener("mousemove", onMouseMove);

    const links = document.querySelectorAll("a, button, [data-cursor-hover]");
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ position: "fixed", pointerEvents: "none", zIndex: 9999 }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ position: "fixed", pointerEvents: "none", zIndex: 9998 }}
      />
    </>
  );
}
