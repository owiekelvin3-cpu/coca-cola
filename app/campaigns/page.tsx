"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/sections/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const campaigns = [
  {
    id: "01",
    title: "Taste the Feeling",
    subtitle: "Nigeria Edition 2024",
    description:
      "A cinematic celebration of everyday Nigerian moments. From the first sip at sunrise to the last toast at midnight — every feeling has a Coke.",
    category: "BRAND CAMPAIGN",
    year: "2024",
    color: "#F40009",
    featured: true,
    tags: ["TV", "Digital", "OOH", "Experiential"],
  },
  {
    id: "02",
    title: "Share a Coke",
    subtitle: "Find Your Name",
    description:
      "Personalized Coca-Cola bottles featuring the most popular Nigerian names. A campaign that made every bottle personal, every sip meaningful.",
    category: "ACTIVATION",
    year: "2024",
    color: "#C0000A",
    featured: false,
    tags: ["Retail", "Social", "Experiential"],
  },
  {
    id: "03",
    title: "Real Magic",
    subtitle: "Happens in Nigeria",
    description:
      "Magic isn't in the extraordinary. It's in the everyday moments that bring us together — the shared meals, the laughter, the connections.",
    category: "BRAND STORY",
    year: "2023",
    color: "#8B0000",
    featured: false,
    tags: ["Film", "Digital", "Social"],
  },
  {
    id: "04",
    title: "Coke Studio Africa",
    subtitle: "Nigeria Sessions",
    description:
      "Where music meets magic. Nigeria's biggest artists, one studio, infinite possibilities. The sound of a generation, powered by Coca-Cola.",
    category: "MUSIC",
    year: "2023",
    color: "#F40009",
    featured: false,
    tags: ["Music", "Digital", "Events"],
  },
  {
    id: "05",
    title: "Open That Coca-Cola",
    subtitle: "Ramadan Edition",
    description:
      "A special campaign celebrating the spirit of Ramadan — togetherness, gratitude, and the joy of breaking fast with loved ones.",
    category: "SEASONAL",
    year: "2023",
    color: "#C0000A",
    featured: false,
    tags: ["TV", "Digital", "Community"],
  },
  {
    id: "06",
    title: "Happiness Factory",
    subtitle: "Lagos Pop-Up",
    description:
      "An immersive brand experience in the heart of Lagos. Visitors stepped inside the world of Coca-Cola — interactive, sensory, unforgettable.",
    category: "EXPERIENTIAL",
    year: "2022",
    color: "#8B0000",
    featured: false,
    tags: ["Experiential", "Events", "PR"],
  },
];

function CampaignCard({ campaign, index }: { campaign: typeof campaigns[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  if (campaign.featured) {
    return (
      <div
        className="col-span-full relative overflow-hidden rounded-3xl cursor-pointer group"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Visual */}
          <div
            className="relative h-80 lg:h-auto min-h-[400px] overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${campaign.color} 0%, #3D0000 100%)` }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.05) 40px, rgba(255,255,255,0.05) 41px)`,
              }}
            />
            <div
              className="absolute bottom-8 left-8 text-[8rem] font-black text-white/10 leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {campaign.id}
            </div>
            <div
              className="absolute top-8 left-8 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{ background: "rgba(0,0,0,0.4)", color: "rgba(255,255,255,0.8)" }}
            >
              FEATURED
            </div>
          </div>

          {/* Content */}
          <div className="p-10 lg:p-16 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: campaign.color }}>
                {campaign.category}
              </span>
              <span className="text-white/20 text-xs">{campaign.year}</span>
            </div>
            <h2
              className="text-[clamp(2.5rem,4vw,4rem)] font-black leading-none text-white mb-3"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
            >
              {campaign.title}
            </h2>
            <p className="text-white/40 text-lg mb-6" style={{ letterSpacing: "-0.01em" }}>
              {campaign.subtitle}
            </p>
            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-md">
              {campaign.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {campaign.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium text-white/40"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              className="inline-flex items-center gap-3 text-sm font-bold tracking-widest uppercase group/btn"
              style={{ color: campaign.color }}
            >
              View Campaign
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="campaign-card relative overflow-hidden rounded-2xl cursor-pointer group"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Visual */}
      <div
        className="relative h-48 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${campaign.color} 0%, #1A0000 100%)` }}
      >
        <div
          className="absolute bottom-4 left-4 text-[5rem] font-black text-white/10 leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {campaign.id}
        </div>
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${campaign.color}40 0%, transparent 70%)`,
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: campaign.color }}>
            {campaign.category}
          </span>
          <span className="text-white/20 text-xs">{campaign.year}</span>
        </div>
        <h3
          className="text-xl font-black text-white leading-tight mb-2"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
        >
          {campaign.title}
        </h3>
        <p className="text-white/30 text-sm mb-4">{campaign.subtitle}</p>
        <p className="text-white/40 text-xs leading-relaxed mb-5">{campaign.description}</p>
        <div className="flex flex-wrap gap-2">
          {campaign.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-xs text-white/30"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-all duration-500"
        style={{ background: hovered ? campaign.color : "transparent" }}
      />
    </div>
  );
}

export default function CampaignsPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".campaigns-hero-text",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "expo.out", delay: 0.3 }
      );

      gsap.fromTo(
        ".campaign-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".campaigns-grid",
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
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(244,0,9,0.1) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
          <div className="campaigns-hero-text flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#F40009]" />
            <span className="text-[#F40009] text-xs font-semibold tracking-[0.3em] uppercase">
              Interactive Campaigns
            </span>
          </div>
          <h1
            className="campaigns-hero-text text-[clamp(4rem,9vw,9rem)] font-black leading-none text-white mb-6"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
          >
            Stories That
            <br />
            <span className="text-gradient-red">Move You.</span>
          </h1>
          <p className="campaigns-hero-text text-white/40 text-lg max-w-lg leading-relaxed">
            Campaigns crafted for the Nigerian spirit. Bold, emotional, and deeply human.
          </p>
        </div>
      </div>

      {/* Campaigns grid */}
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 pb-32">
        <div className="campaigns-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign, i) => (
            <CampaignCard key={campaign.id} campaign={campaign} index={i} />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
