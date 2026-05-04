"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const tl = gsap.timeline();
    tl.fromTo(
      overlay,
      { scaleY: 1, transformOrigin: "top" },
      { scaleY: 0, duration: 0.8, ease: "expo.inOut" }
    );
  }, [pathname]);

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] pointer-events-none"
        style={{ background: "#F40009", transformOrigin: "top", scaleY: 0 }}
      />
      {children}
    </>
  );
}
