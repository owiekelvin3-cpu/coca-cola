"use client";
import { useEffect } from "react";
import { gsap } from "gsap";

export default function ReducedMotion() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = (reduced: boolean) => {
      if (reduced) {
        // Kill all GSAP animations, disable scroll triggers
        gsap.globalTimeline.timeScale(10); // speed everything up to instant
        document.documentElement.style.setProperty("--animation-duration", "0.01s");
      } else {
        gsap.globalTimeline.timeScale(1);
        document.documentElement.style.removeProperty("--animation-duration");
      }
    };

    apply(mq.matches);
    mq.addEventListener("change", (e) => apply(e.matches));
    return () => mq.removeEventListener("change", (e) => apply(e.matches));
  }, []);

  return null;
}
