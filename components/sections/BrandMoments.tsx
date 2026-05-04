"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const moments = [
  {
    category: "MUSIC",
    title: "Afrobeats & Ice Cold",
    description: "The soundtrack of Nigeria runs on Coke. From Burna Boy to Wizkid — every concert, every stage, every moment.",
    stat: "50M+",
    statLabel: "Streams Powered",
    color: "#F40009",
  },
  {
    category: "CULTURE",
    title: "Lagos Never Sleeps",
    description: "The city that never stops. Neither do we. Coca-Cola is woven into the fabric of Nigerian nightlife and culture.",
    stat: "200+",
    statLabel: "Cultural Events",
    color: "#8B0000",
  },
  {
    category: "LIFESTYLE",
    title: "The Perfect Moment",
    description: "Jollof rice. Suya. Pepper soup. Every iconic Nigerian meal has one perfect companion.",
    stat: "1B+",
    statLabel: "Meals Shared",
    color: "#C0000A",
  },
];

export default function BrandMoments() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee animation
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current.querySelector(".marquee-inner"), {
          x: "-50%",
          duration: 20,
          ease: "none",
          repeat: -1,
        });
      }

      // Cards entrance
      gsap.fromTo(
        ".moment-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".moments-grid",
            start: "top 75%",
          },
        }
      );

      // Horizontal scroll effect for cards
      gsap.fromTo(
        ".moment-card",
        { x: (i) => i * 30 },
        {
          x: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".moments-grid",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0A0A0A 0%, #0F0505 50%, #0A0A0A 100%)" }}
    >
      {/* Marquee */}
      <div ref={marqueeRef} className="overflow-hidden mb-24 py-6 border-y" style={{ borderColor: "rgba(244,0,9,0.15)" }}>
        <div className="marquee-inner flex items-center gap-16 whitespace-nowrap" style={{ width: "200%" }}>
          {Array(8).fill(null).map((_, i) => (
            <div key={i} className="flex items-center gap-16">
              <span
                className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white/10"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
              >
                OPEN HAPPINESS
              </span>
              <span className="text-[#F40009] text-2xl">✦</span>
              <span
                className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white/10"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
              >
                TASTE THE FEELING
              </span>
              <span className="text-[#F40009] text-2xl">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#F40009]" />
            <span className="text-[#F40009] text-xs font-semibold tracking-[0.3em] uppercase">
              Brand Moments
            </span>
          </div>
          <h2
            className="text-[clamp(3rem,6vw,6rem)] font-black leading-none text-white"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
          >
            Culture.
            <br />
            <span className="text-white/20">Music.</span>
            <br />
            <span className="text-gradient-red">Life.</span>
          </h2>
        </div>

        {/* Moments grid */}
        <div className="moments-grid grid md:grid-cols-3 gap-6">
          {moments.map((moment, i) => (
            <div
              key={i}
              className="moment-card group relative overflow-hidden rounded-2xl cursor-pointer"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Top color bar */}
              <div
                className="h-1 w-full transition-all duration-500 group-hover:h-2"
                style={{ background: moment.color }}
              />

              <div className="p-8">
                {/* Category */}
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="text-xs font-semibold tracking-[0.3em] uppercase"
                    style={{ color: moment.color }}
                  >
                    {moment.category}
                  </span>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 group-hover:translate-x-0"
                    style={{ background: moment.color }}
                  >
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-2xl font-black text-white leading-tight mb-4 transition-colors duration-300 group-hover:text-white"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                >
                  {moment.title}
                </h3>

                {/* Description */}
                <p className="text-white/40 text-sm leading-relaxed mb-8">
                  {moment.description}
                </p>

                {/* Stat */}
                <div className="pt-6 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div
                    className="text-4xl font-black leading-none mb-1"
                    style={{ fontFamily: "var(--font-display)", color: moment.color, letterSpacing: "-0.03em" }}
                  >
                    {moment.stat}
                  </div>
                  <div className="text-white/30 text-xs tracking-widest uppercase">
                    {moment.statLabel}
                  </div>
                </div>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 100%, ${moment.color}15 0%, transparent 70%)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
