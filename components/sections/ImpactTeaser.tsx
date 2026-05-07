"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: 5000, suffix: "+", label: "Jobs Created", description: "Direct employment across Nigeria" },
  { value: 2, suffix: "M+", label: "Farmers Supported", description: "Agricultural supply chain partners" },
  { value: 40, suffix: "%", label: "Water Efficiency", description: "Reduction in water usage since 2010" },
  { value: 100, suffix: "%", label: "Recyclable Packaging", description: "Target by 2030" },
];

function AnimatedCounter({ target, suffix, duration = 2 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const animate = () => {
            const elapsed = (Date.now() - start) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
            else setCount(target);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function ImpactTeaser() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".impact-stat",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".impact-grid",
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
      style={{ background: "#F5F5F0" }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(244,0,9,0.3), transparent)" }}
      />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#F40009]" />
              <span className="text-[#F40009] text-xs font-semibold tracking-[0.3em] uppercase">
                Impact & Sustainability
              </span>
            </div>
            <h2
              className="text-[clamp(3rem,5vw,5rem)] font-black leading-none text-coke-black mb-8"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
            >
              Better Business.
              <br />
              <span className="text-gradient-red">Better World.</span>
            </h2>
            <p className="text-coke-black/40 text-base leading-relaxed mb-10 max-w-md">
              Our commitment to Nigeria goes beyond refreshment. We invest in communities,
              protect the environment, and build a sustainable future for generations to come.
            </p>
            <a
              href="#impact"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-500 hover:scale-105 group"
              style={{ border: "1px solid rgba(244,0,9,0.4)", color: "#F40009" }}
            >
              Our Impact Story
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right: Stats */}
          <div className="impact-grid grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="impact-stat p-6 rounded-2xl relative overflow-hidden group"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-none text-coke-black mb-2"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[#F40009] text-xs font-semibold tracking-widest uppercase mb-2">
                  {stat.label}
                </div>
                <div className="text-coke-black/30 text-xs leading-relaxed">
                  {stat.description}
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 50% 100%, rgba(244,0,9,0.08) 0%, transparent 70%)",
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "#F40009" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
