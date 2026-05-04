"use client";

import { useEffect, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-2 h-2 rounded-full bg-[#F40009] animate-ping" />
    </div>
  ),
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animation
      const tl = gsap.timeline({ delay: 0.8 });

      tl.fromTo(
        ".hero-line",
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "expo.out",
        }
      )
        .fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "expo.out" },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" },
          "-=0.5"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=0.3"
        );

      // Parallax on scroll
      if (sectionRef.current) {
        gsap.to(headlineRef.current, {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(bgRef.current, {
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center"
      style={{ background: "#0A0A0A" }}
    >
      {/* Animated background gradient */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 50%, rgba(244,0,9,0.18) 0%, rgba(139,0,0,0.08) 40%, transparent 70%)",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 3D Canvas — right side */}
      <div className="absolute right-0 top-0 w-full lg:w-[55%] h-full z-10">
        <HeroScene />
      </div>

      {/* Gradient fade over 3D on left */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, #0A0A0A 30%, rgba(10,10,10,0.7) 55%, transparent 75%)",
        }}
      />

      {/* Content */}
      <div
        ref={headlineRef}
        className="relative z-20 max-w-[1600px] mx-auto px-8 lg:px-16 w-full"
      >
        <div className="max-w-[700px]">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#F40009]" />
            <span
              className="text-[#F40009] text-xs font-semibold tracking-[0.3em] uppercase"
            >
              Coca-Cola Nigeria
            </span>
          </div>

          {/* Main headline */}
          <div className="overflow-hidden mb-2">
            <div
              className="hero-line text-[clamp(4rem,9vw,9rem)] font-black leading-none tracking-tight text-white"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
            >
              Open
            </div>
          </div>
          <div className="overflow-hidden mb-6">
            <div
              className="hero-line text-[clamp(4rem,9vw,9rem)] font-black leading-none text-gradient-red"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
            >
              Happiness.
            </div>
          </div>

          {/* Sub headline */}
          <div className="overflow-hidden mb-4">
            <div
              className="hero-line text-[clamp(1.5rem,3vw,2.8rem)] font-light text-white/50 leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Recipe for Wonder
            </div>
          </div>

          <p
            ref={subRef}
            className="text-white/40 text-base lg:text-lg leading-relaxed max-w-[420px] mb-12"
          >
            More than a drink. A feeling. A moment. A culture.
            Nigeria's most iconic brand experience.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex items-center gap-6 flex-wrap">
            <Link
              href="/brands"
              className="group relative flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase overflow-hidden transition-all duration-500 hover:scale-105"
              style={{ background: "#F40009", color: "white" }}
            >
              <span className="relative z-10">Explore Experience</span>
              <svg
                className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"
                style={{ background: "#C0000A" }}
              />
            </Link>

            <Link
              href="/about"
              className="flex items-center gap-3 text-sm font-semibold tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-300 group"
            >
              Our Story
              <span className="w-8 h-px bg-white/30 group-hover:bg-white group-hover:w-12 transition-all duration-500" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-white/30 text-xs tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-1/2 bg-[#F40009]"
            style={{ animation: "scrollLine 2s ease-in-out infinite" }}
          />
        </div>
      </div>

      {/* Bottom stats bar */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-5 flex items-center justify-between">
          <div className="flex items-center gap-12">
            {[
              { value: "130+", label: "Years of Joy" },
              { value: "200+", label: "Countries" },
              { value: "1.9B", label: "Daily Servings" },
            ].map((stat) => (
              <div key={stat.label} className="hidden sm:block">
                <div
                  className="text-xl font-black text-white"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                >
                  {stat.value}
                </div>
                <div className="text-white/30 text-xs tracking-widest uppercase mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <div className="text-white/20 text-xs tracking-widest uppercase">
            Est. 1886
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
