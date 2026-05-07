"use client";
/**
 * AnimationProvider — mounts once at the app level.
 * Adds advanced scroll animations, section intros, and outros
 * to every section on the page using GSAP ScrollTrigger.
 *
 * Works alongside existing per-section animations without conflict.
 */
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function AnimationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Wait for DOM to settle
    const t = setTimeout(() => {
      setupAnimations();
    }, 300);
    return () => {
      clearTimeout(t);
      ScrollTrigger.getAll().forEach(st => {
        // Only kill the ones we created (tagged with our id prefix)
        if (st.vars?.id?.toString().startsWith("ap-")) st.kill();
      });
    };
  }, []);

  return <>{children}</>;
}

function setupAnimations() {
  // ── 1. SECTION INTRO — every section gets a subtle reveal ──────
  // Red accent line draws in from left at the top of each section
  document.querySelectorAll(".divider-red, .divider-white").forEach((el, i) => {
    gsap.fromTo(el,
      { scaleX: 0, transformOrigin: "left" },
      {
        scaleX: 1, duration: 1.2, ease: "expo.out",
        scrollTrigger: {
          id: `ap-divider-${i}`,
          trigger: el,
          start: "top 90%",
        },
      }
    );
  });

  // ── 2. SECTION LABEL — the small red eyebrow text ──────────────
  document.querySelectorAll(".section-label").forEach((el, i) => {
    gsap.fromTo(el,
      { x: -20, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: {
          id: `ap-label-${i}`,
          trigger: el,
          start: "top 88%",
        },
      }
    );
  });

  // ── 3. HEADINGS — split into lines, each line reveals ──────────
  document.querySelectorAll("h2, h3").forEach((el, i) => {
    // Skip if already animated by component
    if (el.closest("[data-no-anim]")) return;
    if (el.classList.contains("purpose-title") ||
        el.classList.contains("moments-title") ||
        el.classList.contains("brands-title") ||
        el.classList.contains("camp-title") ||
        el.classList.contains("impact-title") ||
        el.classList.contains("about-title") ||
        el.classList.contains("news-title")) return;

    gsap.fromTo(el,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: "expo.out",
        scrollTrigger: {
          id: `ap-heading-${i}`,
          trigger: el,
          start: "top 85%",
        },
      }
    );
  });

  // ── 4. CARDS — any rounded card that isn't already animated ────
  document.querySelectorAll(".rounded-2xl, .rounded-xl").forEach((el, i) => {
    // Skip if already handled
    if (el.classList.contains("purpose-text-block") ||
        el.classList.contains("moment-card") ||
        el.classList.contains("camp-card") ||
        el.classList.contains("pillar") ||
        el.classList.contains("leader") ||
        el.classList.contains("global-n") ||
        el.classList.contains("impact-stat") ||
        el.classList.contains("brand-viewer") ||
        el.closest(".brand-viewer") ||
        el.closest(".camp-featured") ||
        el.closest(".news-video-panel")) return;

    // Only animate if not already visible
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return; // already in view

    gsap.fromTo(el,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: {
          id: `ap-card-${i}`,
          trigger: el,
          start: "top 88%",
        },
      }
    );
  });

  // ── 5. SECTION OUTRO — content fades as next section enters ────
  const sections = document.querySelectorAll("section[id]");
  sections.forEach((sec, i) => {
    if (i === 0) return; // skip hero
    const next = sections[i + 1];
    if (!next) return;

    gsap.to(sec, {
      opacity: 0.4,
      ease: "none",
      scrollTrigger: {
        id: `ap-outro-${i}`,
        trigger: next,
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
      },
    });
  });

  // ── 6. HORIZONTAL SCROLL HINT on image grids ───────────────────
  document.querySelectorAll(".grid").forEach((el, i) => {
    const children = Array.from(el.children);
    if (children.length < 3) return;
    if (el.closest(".brand-tabs")) return;

    // Already animated grids
    if (el.classList.contains("pillars") ||
        el.classList.contains("impact-stats") ||
        el.classList.contains("globals") ||
        el.classList.contains("leaders") ||
        el.classList.contains("camp-grid") ||
        el.classList.contains("purpose-grid")) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return;

    gsap.fromTo(children,
      { y: 35, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: "expo.out",
        scrollTrigger: {
          id: `ap-grid-${i}`,
          trigger: el,
          start: "top 82%",
        },
      }
    );
  });

  // ── 7. FOOTER REVEAL — big COKE text scales up ─────────────────
  const footerBg = document.querySelector("footer .text-\\[22vw\\]");
  if (footerBg) {
    gsap.fromTo(footerBg,
      { scale: 0.85, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 1.5, ease: "expo.out",
        scrollTrigger: {
          id: "ap-footer-bg",
          trigger: "footer",
          start: "top 80%",
        },
      }
    );
  }

  // Footer links stagger
  const footerLinks = document.querySelectorAll("footer li");
  if (footerLinks.length) {
    gsap.fromTo(footerLinks,
      { x: -10, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: "expo.out",
        scrollTrigger: {
          id: "ap-footer-links",
          trigger: "footer",
          start: "top 75%",
        },
      }
    );
  }

  // ── 8. PARALLAX on standalone images ───────────────────────────
  document.querySelectorAll(".gal-item img, .purpose-img-left img, .purpose-img-right img").forEach((el, i) => {
    // Already handled in components — skip
  });

  // ── 9. ABOUT IMAGE STRIP — stagger reveal ──────────────────────
  const strip = document.querySelectorAll(".grid.grid-cols-4 .rounded-xl");
  if (strip.length === 4) {
    gsap.fromTo(strip,
      { clipPath: "inset(0 100% 0 0)", scale: 1.05 },
      {
        clipPath: "inset(0 0% 0 0)", scale: 1,
        duration: 0.8, stagger: 0.12, ease: "expo.out",
        scrollTrigger: {
          id: "ap-strip",
          trigger: strip[0],
          start: "top 82%",
        },
      }
    );
  }

  // ── 10. QUOTE BLOCK — border draws in ──────────────────────────
  const quote = document.querySelector(".border.border-\\[\\#F40009\\]\\/12");
  if (quote) {
    gsap.fromTo(quote,
      { opacity: 0, scale: 0.97 },
      {
        opacity: 1, scale: 1, duration: 1, ease: "expo.out",
        scrollTrigger: {
          id: "ap-quote",
          trigger: quote,
          start: "top 82%",
        },
      }
    );
  }

  // ── 11. BRAND LOGOS ROW — stagger in ───────────────────────────
  const brandLogos = document.querySelectorAll(".brand-tabs ~ div button");
  if (brandLogos.length) {
    gsap.fromTo(brandLogos,
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)",
        scrollTrigger: {
          id: "ap-brand-logos",
          trigger: brandLogos[0],
          start: "top 85%",
        },
      }
    );
  }

  // ── 12. SECTION BACKGROUND PARALLAX ───────────────────────────
  // Subtle background shift as sections scroll
  document.querySelectorAll("section[id]").forEach((sec, i) => {
    if (i === 0) return;
    gsap.fromTo(sec,
      { backgroundPositionY: "0%" },
      {
        backgroundPositionY: "5%",
        ease: "none",
        scrollTrigger: {
          id: `ap-bg-${i}`,
          trigger: sec,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      }
    );
  });
}
