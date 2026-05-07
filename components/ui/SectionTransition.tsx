"use client";
/**
 * SectionTransition — adds morphing clip-path transitions between sections.
 * Wraps each section with a reveal animation that triggers on scroll.
 * Uses IntersectionObserver for performance (no ScrollTrigger overhead).
 */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function SectionTransition() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Add clip-path reveal to every section
    const sections = document.querySelectorAll("section[id]:not(#experience)");

    sections.forEach((sec, i) => {
      gsap.fromTo(sec,
        {
          clipPath: "inset(0 0 8% 0)",
          opacity: 0.7,
        },
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Add smooth color transition to body background as sections change
    const colorMap: Record<string, string> = {
      "experience":      "#ffffff",
      "3d-experience":   "#F5F5F0",
      "nigeria-moments": "#F5F5F0",
      "coke-quiz":       "#EEEDE8",
      "brand-moments":   "#F5F5F0",
      "brands":          "#EEEDE8",
      "campaigns":       "#F5F5F0",
      "impact":          "#EEEDE8",
      "about":           "#F5F5F0",
    };

    Object.entries(colorMap).forEach(([id, color]) => {
      const el = document.getElementById(id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        onEnter: () => {
          gsap.to("body", { backgroundColor: color, duration: 0.8, ease: "power2.out" });
        },
        onEnterBack: () => {
          gsap.to("body", { backgroundColor: color, duration: 0.8, ease: "power2.out" });
        },
      });
    });

  }, []);

  return null;
}
