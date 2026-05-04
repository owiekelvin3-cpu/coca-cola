"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const brands = [
  {
    name: "Coca-Cola",
    tagline: "The Original",
    color: "#F40009",
    bg: "linear-gradient(135deg, #F40009 0%, #8B0000 100%)",
    description: "The world's most recognized taste. Bold, refreshing, timeless.",
    href: "/brands#coca-cola",
    letter: "C",
  },
  {
    name: "Fanta",
    tagline: "Taste the Fun",
    color: "#FF6B00",
    bg: "linear-gradient(135deg, #FF6B00 0%, #CC4400 100%)",
    description: "Vibrant flavors for vibrant people. Pure, unapologetic fun.",
    href: "/brands#fanta",
    letter: "F",
  },
  {
    name: "Sprite",
    tagline: "Obey Your Thirst",
    color: "#00A651",
    bg: "linear-gradient(135deg, #00A651 0%, #006633 100%)",
    description: "Crisp. Clean. Refreshing. The clear choice for the bold.",
    href: "/brands#sprite",
    letter: "S",
  },
  {
    name: "Schweppes",
    tagline: "Distinctly Different",
    color: "#C9A84C",
    bg: "linear-gradient(135deg, #C9A84C 0%, #8B6914 100%)",
    description: "Premium mixers and tonics. Sophistication in every sip.",
    href: "/brands#schweppes",
    letter: "S",
  },
];

export default function BrandsTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".brand-card",
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".brands-grid",
            start: "top 75%",
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
      style={{ background: "#0A0A0A" }}
    >
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#F40009]" />
              <span className="text-[#F40009] text-xs font-semibold tracking-[0.3em] uppercase">
                Brand Ecosystem
              </span>
            </div>
            <h2
              className="text-[clamp(3rem,6vw,6rem)] font-black leading-none text-white"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
            >
              Four Brands.
              <br />
              <span className="text-white/20">One Family.</span>
            </h2>
          </div>
          <Link
            href="/brands"
            className="flex items-center gap-3 text-sm font-semibold tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-300 group"
          >
            View All Brands
            <span className="w-8 h-px bg-white/20 group-hover:bg-white group-hover:w-12 transition-all duration-500" />
          </Link>
        </div>

        {/* Brands grid */}
        <div className="brands-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {brands.map((brand, i) => (
            <Link
              key={brand.name}
              href={brand.href}
              className="brand-card group relative overflow-hidden rounded-2xl aspect-[3/4] flex flex-col justify-end p-8 cursor-pointer"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Background gradient on hover */}
              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                  background: brand.bg,
                  opacity: hovered === i ? 0.15 : 0,
                }}
              />

              {/* Large letter */}
              <div
                className="absolute top-6 right-6 text-[8rem] font-black leading-none transition-all duration-700"
                style={{
                  fontFamily: "var(--font-display)",
                  color: brand.color,
                  opacity: hovered === i ? 0.2 : 0.06,
                  transform: hovered === i ? "scale(1.1) translateY(-5px)" : "scale(1)",
                }}
              >
                {brand.letter}
              </div>

              {/* Color dot */}
              <div
                className="w-3 h-3 rounded-full mb-6 transition-all duration-500 group-hover:scale-150"
                style={{ background: brand.color }}
              />

              {/* Content */}
              <div>
                <div
                  className="text-xs font-semibold tracking-[0.3em] uppercase mb-2 transition-colors duration-300"
                  style={{ color: hovered === i ? brand.color : "rgba(255,255,255,0.3)" }}
                >
                  {brand.tagline}
                </div>
                <h3
                  className="text-3xl font-black text-white mb-3 transition-all duration-300"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
                >
                  {brand.name}
                </h3>
                <p
                  className="text-white/40 text-sm leading-relaxed transition-all duration-500"
                  style={{
                    maxHeight: hovered === i ? "80px" : "0px",
                    overflow: "hidden",
                    opacity: hovered === i ? 1 : 0,
                  }}
                >
                  {brand.description}
                </p>
              </div>

              {/* Arrow */}
              <div
                className="absolute bottom-8 right-8 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500"
                style={{
                  background: hovered === i ? brand.color : "rgba(255,255,255,0.06)",
                  transform: hovered === i ? "scale(1)" : "scale(0.8)",
                  opacity: hovered === i ? 1 : 0.5,
                }}
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>

              {/* Bottom border glow */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px transition-all duration-500"
                style={{
                  background: hovered === i ? brand.color : "transparent",
                  boxShadow: hovered === i ? `0 0 20px ${brand.color}` : "none",
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
