"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/sections/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const pillars = [
  {
    icon: "🌍",
    title: "Climate Action",
    description:
      "Reducing our carbon footprint across the entire value chain. From manufacturing to distribution, we're committed to net-zero by 2040.",
    stats: [
      { value: "40%", label: "Carbon reduction since 2010" },
      { value: "100%", label: "Renewable energy target by 2030" },
    ],
    color: "#00A651",
  },
  {
    icon: "💧",
    title: "Water Stewardship",
    description:
      "Water is life. We're committed to replenishing every drop we use, protecting watersheds, and ensuring clean water access for Nigerian communities.",
    stats: [
      { value: "1.5L", label: "Replenished per liter produced" },
      { value: "50+", label: "Community water projects" },
    ],
    color: "#0066CC",
  },
  {
    icon: "♻️",
    title: "Packaging & Recycling",
    description:
      "A world without waste. We're designing packaging that can be recycled, refilled, or reused — and building the infrastructure to make it happen.",
    stats: [
      { value: "100%", label: "Recyclable packaging by 2030" },
      { value: "75%", label: "Recycled content target" },
    ],
    color: "#F40009",
  },
  {
    icon: "🤝",
    title: "Community Investment",
    description:
      "Nigeria is our home. We invest in the communities that make us who we are — through education, economic empowerment, and social programs.",
    stats: [
      { value: "₦2B+", label: "Community investment annually" },
      { value: "500K+", label: "Lives impacted" },
    ],
    color: "#C9A84C",
  },
];

const sdgs = [
  { number: "6", title: "Clean Water", color: "#0066CC" },
  { number: "8", title: "Decent Work", color: "#8B0000" },
  { number: "12", title: "Responsible Consumption", color: "#CC6600" },
  { number: "13", title: "Climate Action", color: "#006633" },
  { number: "17", title: "Partnerships", color: "#003399" },
];

function DataBar({ value, label, color }: { value: number; label: string; color: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          if (barRef.current) {
            gsap.fromTo(
              barRef.current,
              { width: "0%" },
              { width: `${value}%`, duration: 1.5, ease: "expo.out" }
            );
          }
        }
      },
      { threshold: 0.5 }
    );

    if (barRef.current?.parentElement) observer.observe(barRef.current.parentElement);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white/60 text-sm">{label}</span>
        <span className="text-white font-bold text-sm">{value}%</span>
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{ background: color, width: "0%" }}
        />
      </div>
    </div>
  );
}

export default function ImpactPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".impact-hero-text",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "expo.out", delay: 0.3 }
      );

      gsap.fromTo(
        ".pillar-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".pillars-grid",
            start: "top 75%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main style={{ background: "#0A0A0A" }}>
      {/* Hero */}
      <div
        ref={heroRef}
        className="relative pt-40 pb-24 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,166,81,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
          <div className="impact-hero-text flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#F40009]" />
            <span className="text-[#F40009] text-xs font-semibold tracking-[0.3em] uppercase">
              Impact & Sustainability
            </span>
          </div>
          <h1
            className="impact-hero-text text-[clamp(4rem,9vw,9rem)] font-black leading-none text-white mb-6"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
          >
            Better Business.
            <br />
            <span className="text-gradient-red">Better World.</span>
          </h1>
          <p className="impact-hero-text text-white/40 text-lg max-w-xl leading-relaxed">
            Our commitment to Nigeria goes beyond refreshment. We're building a sustainable future
            for communities, the environment, and generations to come.
          </p>
        </div>
      </div>

      {/* Progress section */}
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2
              className="text-[clamp(2.5rem,4vw,4rem)] font-black leading-none text-white mb-8"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
            >
              2030 Goals
              <br />
              <span className="text-white/20">Progress</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-10">
              Tracking our progress against ambitious sustainability targets. Every percentage point represents real change in the real world.
            </p>
          </div>
          <div>
            <DataBar value={68} label="Carbon Reduction Progress" color="#F40009" />
            <DataBar value={82} label="Water Replenishment" color="#0066CC" />
            <DataBar value={74} label="Recyclable Packaging" color="#00A651" />
            <DataBar value={55} label="Renewable Energy Usage" color="#C9A84C" />
            <DataBar value={91} label="Community Program Reach" color="#F40009" />
          </div>
        </div>
      </div>

      {/* Pillars */}
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 pb-32">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#F40009]" />
            <span className="text-[#F40009] text-xs font-semibold tracking-[0.3em] uppercase">
              Our Pillars
            </span>
          </div>
          <h2
            className="text-[clamp(3rem,5vw,5rem)] font-black leading-none text-white"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
          >
            Four Commitments.
            <br />
            <span className="text-white/20">One Future.</span>
          </h2>
        </div>

        <div className="pillars-grid grid md:grid-cols-2 gap-6">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="pillar-card group relative p-8 rounded-2xl overflow-hidden cursor-default"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Icon */}
              <div className="text-4xl mb-6">{pillar.icon}</div>

              {/* Title */}
              <h3
                className="text-2xl font-black text-white mb-4"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
              >
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                {pillar.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                {pillar.stats.map((stat, j) => (
                  <div key={j}>
                    <div
                      className="text-2xl font-black leading-none mb-1"
                      style={{ fontFamily: "var(--font-display)", color: pillar.color, letterSpacing: "-0.02em" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-white/30 text-xs leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 100%, ${pillar.color}10 0%, transparent 70%)`,
                }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: pillar.color }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* SDGs */}
      <div
        className="py-24 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-px bg-[#F40009]" />
            <span className="text-[#F40009] text-xs font-semibold tracking-[0.3em] uppercase">
              UN Sustainable Development Goals
            </span>
          </div>
          <div className="flex flex-wrap gap-4">
            {sdgs.map((sdg) => (
              <div
                key={sdg.number}
                className="flex items-center gap-3 px-5 py-3 rounded-xl"
                style={{
                  background: `${sdg.color}15`,
                  border: `1px solid ${sdg.color}25`,
                }}
              >
                <span
                  className="text-2xl font-black"
                  style={{ fontFamily: "var(--font-display)", color: sdg.color }}
                >
                  {sdg.number}
                </span>
                <span className="text-white/60 text-sm">{sdg.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
