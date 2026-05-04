"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const campaigns = [
  {
    id: "01",
    title: "Taste the Feeling",
    subtitle: "Nigeria Edition",
    description:
      "Every sip tells a story. From Lagos to Abuja, Kano to Port Harcourt — the feeling is universal.",
    color: "#F40009",
    accent: "#FF4444",
    year: "2024",
    tag: "CAMPAIGN",
  },
  {
    id: "02",
    title: "Share a Coke",
    subtitle: "With Nigeria",
    description:
      "Personalized bottles. Personalized moments. Find your name, share your story.",
    color: "#C0000A",
    accent: "#F40009",
    year: "2024",
    tag: "ACTIVATION",
  },
  {
    id: "03",
    title: "Real Magic",
    subtitle: "Happens Here",
    description:
      "Magic isn't in the extraordinary. It's in the everyday moments that bring us together.",
    color: "#8B0000",
    accent: "#C0000A",
    year: "2023",
    tag: "BRAND STORY",
  },
];

export default function CampaignShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance
      gsap.fromTo(
        ".campaign-eyebrow",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".campaign-headline",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Scroll-based campaign switching
      campaigns.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `.campaign-panel-${i}`,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current.querySelectorAll(".animate-in"),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "expo.out" }
    );
  }, [active]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(244,0,9,0.4), transparent)" }}
      />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="mb-20">
          <div className="campaign-eyebrow flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#F40009]" />
            <span className="text-[#F40009] text-xs font-semibold tracking-[0.3em] uppercase">
              Campaign Stories
            </span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <h2
              className="campaign-headline text-[clamp(3rem,6vw,6rem)] font-black leading-none text-white"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
            >
              Moments That
              <br />
              <span className="text-gradient-red">Move Nigeria.</span>
            </h2>
            <p className="text-white/40 max-w-xs text-sm leading-relaxed">
              Campaigns crafted for the Nigerian spirit — bold, vibrant, and deeply human.
            </p>
          </div>
        </div>

        {/* Campaign panels */}
        <div className="grid lg:grid-cols-2 gap-0 lg:gap-16 items-start">
          {/* Left: Sticky visual */}
          <div className="hidden lg:block sticky top-32 h-[60vh]">
            <div
              className="relative w-full h-full rounded-2xl overflow-hidden transition-all duration-700"
              style={{ background: campaigns[active].color }}
            >
              {/* Animated background pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 40px,
                    rgba(255,255,255,0.05) 40px,
                    rgba(255,255,255,0.05) 41px
                  )`,
                }}
              />

              {/* Campaign number */}
              <div
                className="absolute top-8 left-8 text-[8rem] font-black leading-none text-white/10"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {campaigns[active].id}
              </div>

              {/* Content */}
              <div ref={contentRef} className="absolute bottom-8 left-8 right-8">
                <div className="animate-in text-white/60 text-xs tracking-[0.3em] uppercase mb-3">
                  {campaigns[active].tag} · {campaigns[active].year}
                </div>
                <h3
                  className="animate-in text-4xl font-black text-white leading-tight mb-2"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
                >
                  {campaigns[active].title}
                </h3>
                <p className="animate-in text-white/70 text-sm leading-relaxed">
                  {campaigns[active].description}
                </p>
              </div>

              {/* Glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 80% 20%, ${campaigns[active].accent}40 0%, transparent 60%)`,
                }}
              />
            </div>
          </div>

          {/* Right: Scrollable panels */}
          <div className="space-y-6">
            {campaigns.map((campaign, i) => (
              <div
                key={campaign.id}
                className={`campaign-panel-${i} group relative p-8 rounded-2xl cursor-pointer transition-all duration-500 border ${
                  active === i
                    ? "border-[#F40009]/40 bg-[#F40009]/08"
                    : "border-white/06 bg-white/02 hover:border-white/12"
                }`}
                onClick={() => setActive(i)}
              >
                {/* Mobile visual */}
                <div
                  className="lg:hidden w-full h-40 rounded-xl mb-6 relative overflow-hidden"
                  style={{ background: campaign.color }}
                >
                  <div
                    className="absolute bottom-4 left-4 text-5xl font-black text-white/20"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {campaign.id}
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${
                          active === i ? "text-[#F40009]" : "text-white/30"
                        }`}
                      >
                        {campaign.tag}
                      </span>
                      <span className="text-white/20 text-xs">{campaign.year}</span>
                    </div>
                    <h3
                      className={`text-2xl font-black leading-tight mb-3 transition-colors duration-300 ${
                        active === i ? "text-white" : "text-white/60"
                      }`}
                      style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                    >
                      {campaign.title}
                      <br />
                      <span className={active === i ? "text-[#F40009]" : "text-white/30"}>
                        {campaign.subtitle}
                      </span>
                    </h3>
                    <p
                      className={`text-sm leading-relaxed transition-all duration-500 ${
                        active === i ? "text-white/60 max-h-20" : "text-white/30 max-h-0 overflow-hidden lg:max-h-20"
                      }`}
                    >
                      {campaign.description}
                    </p>
                  </div>

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                      active === i ? "bg-[#F40009]" : "bg-white/06"
                    }`}
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Progress bar */}
                {active === i && (
                  <div className="mt-6 h-px bg-white/10 relative overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-[#F40009]"
                      style={{ animation: "progressBar 5s linear forwards" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
