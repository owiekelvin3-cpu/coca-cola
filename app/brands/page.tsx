"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Footer from "@/components/sections/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const brands = [
  {
    id: "coca-cola",
    name: "Coca-Cola",
    tagline: "The Original. The Iconic.",
    description:
      "Since 1886, Coca-Cola has been more than a drink — it's a feeling. The unmistakable taste that has united generations, cultures, and continents. In Nigeria, it's the heartbeat of every celebration, every meal, every moment worth remembering.",
    color: "#F40009",
    darkColor: "#8B0000",
    bg: "linear-gradient(135deg, #F40009 0%, #8B0000 60%, #3D0000 100%)",
    flavors: ["Classic", "Zero Sugar", "Light", "Vanilla"],
    year: "1886",
    fact: "The most recognized brand in the world",
  },
  {
    id: "fanta",
    name: "Fanta",
    tagline: "Taste the Fun.",
    description:
      "Fanta is the spirit of youth bottled. Bursting with vibrant fruit flavors, it's the drink that refuses to take itself too seriously. In Nigeria, Fanta Orange is a cultural icon — the taste of childhood, of parties, of pure, unfiltered joy.",
    color: "#FF6B00",
    darkColor: "#CC4400",
    bg: "linear-gradient(135deg, #FF6B00 0%, #CC4400 60%, #661A00 100%)",
    flavors: ["Orange", "Pineapple", "Strawberry", "Grape"],
    year: "1940",
    fact: "Available in 100+ flavors worldwide",
  },
  {
    id: "sprite",
    name: "Sprite",
    tagline: "Obey Your Thirst.",
    description:
      "Sprite doesn't follow trends — it sets them. The crisp, clean lemon-lime taste that cuts through the noise. In Nigeria's heat, nothing hits like an ice-cold Sprite. Clear. Honest. Refreshing.",
    color: "#00A651",
    darkColor: "#006633",
    bg: "linear-gradient(135deg, #00A651 0%, #006633 60%, #003319 100%)",
    flavors: ["Original", "Zero Sugar", "Cranberry", "Tropical"],
    year: "1961",
    fact: "The world's leading lemon-lime soft drink",
  },
  {
    id: "schweppes",
    name: "Schweppes",
    tagline: "Distinctly Different.",
    description:
      "Schweppes is sophistication in a bottle. The world's original mixer, crafted for those who appreciate the finer things. From tonic water to ginger ale, Schweppes elevates every occasion with its distinctive, premium character.",
    color: "#C9A84C",
    darkColor: "#8B6914",
    bg: "linear-gradient(135deg, #C9A84C 0%, #8B6914 60%, #3D2D00 100%)",
    flavors: ["Tonic Water", "Ginger Ale", "Club Soda", "Bitter Lemon"],
    year: "1783",
    fact: "The world's oldest carbonated beverage brand",
  },
];

function BrandSection({ brand, index }: { brand: typeof brands[0]; index: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll(".brand-animate") ?? [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id={brand.id}
      className="relative py-32 overflow-hidden"
      style={{
        background: index % 2 === 0 ? "#0A0A0A" : "#080808",
      }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 60% at ${isEven ? "80%" : "20%"} 50%, ${brand.color}12 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? "lg:grid-flow-dense" : ""}`}>
          {/* Visual */}
          <div className={`brand-animate ${!isEven ? "lg:col-start-2" : ""}`}>
            <div
              className="relative rounded-3xl overflow-hidden aspect-square flex items-center justify-center"
              style={{ background: brand.bg }}
            >
              {/* Pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    -45deg,
                    transparent,
                    transparent 30px,
                    rgba(255,255,255,0.05) 30px,
                    rgba(255,255,255,0.05) 31px
                  )`,
                }}
              />

              {/* Brand name large */}
              <div
                className="text-[clamp(4rem,10vw,8rem)] font-black text-white/20 text-center leading-none select-none"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.05em" }}
              >
                {brand.name.toUpperCase()}
              </div>

              {/* Year badge */}
              <div
                className="absolute top-8 left-8 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
                style={{ background: "rgba(0,0,0,0.4)", color: "rgba(255,255,255,0.7)" }}
              >
                Est. {brand.year}
              </div>

              {/* Glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 50%, ${brand.color}30 0%, transparent 60%)`,
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div className={!isEven ? "lg:col-start-1 lg:row-start-1" : ""}>
            <div className="brand-animate flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: brand.color }} />
              <span
                className="text-xs font-semibold tracking-[0.3em] uppercase"
                style={{ color: brand.color }}
              >
                {brand.tagline}
              </span>
            </div>

            <h2
              className="brand-animate text-[clamp(3.5rem,6vw,6rem)] font-black leading-none text-white mb-6"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
            >
              {brand.name}
            </h2>

            <p className="brand-animate text-white/50 text-base leading-relaxed mb-10 max-w-lg">
              {brand.description}
            </p>

            {/* Fact */}
            <div
              className="brand-animate p-5 rounded-xl mb-10"
              style={{
                background: `${brand.color}10`,
                border: `1px solid ${brand.color}25`,
              }}
            >
              <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: brand.color }}>
                Did You Know
              </div>
              <div className="text-white/70 text-sm">{brand.fact}</div>
            </div>

            {/* Flavors */}
            <div className="brand-animate mb-10">
              <div className="text-white/30 text-xs tracking-widest uppercase mb-4">Available Variants</div>
              <div className="flex flex-wrap gap-3">
                {brand.flavors.map((flavor) => (
                  <span
                    key={flavor}
                    className="px-4 py-2 rounded-full text-sm font-medium text-white/60 transition-all duration-300 hover:text-white cursor-default"
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    {flavor}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={`/campaigns`}
              className="brand-animate inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-500 hover:scale-105 group"
              style={{ background: brand.color, color: "white" }}
            >
              Explore Campaigns
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BrandsPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".brands-hero-text",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "expo.out", delay: 0.3 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* Hero */}
      <div
        ref={heroRef}
        className="relative pt-40 pb-24 overflow-hidden"
        style={{ background: "#0A0A0A" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(244,0,9,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
          <div className="brands-hero-text flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#F40009]" />
            <span className="text-[#F40009] text-xs font-semibold tracking-[0.3em] uppercase">
              Brand Ecosystem
            </span>
          </div>
          <h1
            className="brands-hero-text text-[clamp(4rem,9vw,9rem)] font-black leading-none text-white mb-6"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
          >
            Our
            <br />
            <span className="text-gradient-red">Brands.</span>
          </h1>
          <p className="brands-hero-text text-white/40 text-lg max-w-lg leading-relaxed">
            Four iconic brands. Each with its own personality, its own story, its own place in Nigerian culture.
          </p>
        </div>

        {/* Brand nav */}
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 mt-16 relative z-10">
          <div className="flex flex-wrap gap-4">
            {brands.map((brand) => (
              <a
                key={brand.id}
                href={`#${brand.id}`}
                className="px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105"
                style={{
                  background: `${brand.color}15`,
                  border: `1px solid ${brand.color}30`,
                  color: brand.color,
                }}
              >
                {brand.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Brand sections */}
      {brands.map((brand, i) => (
        <BrandSection key={brand.id} brand={brand} index={i} />
      ))}

      <Footer />
    </main>
  );
}
