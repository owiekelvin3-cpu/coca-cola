"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const t0 = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - t0) / 2000, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          setN(Math.floor(ease * target));
          if (p < 1) requestAnimationFrame(tick); else setN(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function Bar({ pct, color, label }: { pct: number; color: string; label: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  const done   = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        gsap.fromTo(barRef.current, { width: "0%" }, { width: `${pct}%`, duration: 1.6, ease: "expo.out" });
      }
    }, { threshold: 0.5 });
    if (barRef.current?.parentElement) obs.observe(barRef.current.parentElement);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-1.5">
        <span className="text-[#0A0A0A]/50 text-xs">{label}</span>
        <span className="text-[#0A0A0A] text-xs font-bold">{pct}%</span>
      </div>
      <div className="h-px bg-[#F5F5F0]/08 relative overflow-hidden">
        <div ref={barRef} className="absolute inset-y-0 left-0" style={{ background: color, width: "0%" }} />
      </div>
    </div>
  );
}

export default function ImpactSection() {
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".impact-title",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: secRef.current, start: "top 78%" } }
      );
      gsap.fromTo(".impact-stat",
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "expo.out",
          scrollTrigger: { trigger: ".impact-stats", start: "top 80%" } }
      );
      gsap.fromTo(".pillar",
        { y: 55, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "expo.out",
          scrollTrigger: { trigger: ".pillars", start: "top 78%" } }
      );
      /* Image parallax */
      gsap.to(".impact-img", {
        y: -50, ease: "none",
        scrollTrigger: { trigger: ".impact-img", start: "top bottom", end: "bottom top", scrub: 1.5 },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} id="impact" className="relative py-28 overflow-hidden" style={{ background: "#F5F5F0" }}>
      <div className="divider-red mb-0" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-16">
        {/* Header */}
        <div className="mb-16">
          <div className="impact-title section-label mb-5">Impact & Sustainability</div>
          <h2 className="impact-title text-[clamp(2.5rem,5vw,5rem)] font-black leading-none text-[#0A0A0A]"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}>
            Better Business.
            <br /><span className="text-red-gradient">Better World.</span>
          </h2>
        </div>

        {/* Stats + image + bars */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Stats */}
          <div className="impact-stats grid grid-cols-2 gap-4">
            {[
              { v: 5000, s: "+", l: "Jobs Created" },
              { v: 2,    s: "M+", l: "Farmers Supported" },
              { v: 40,   s: "%",  l: "Water Efficiency" },
              { v: 100,  s: "%",  l: "Recyclable Packaging" },
            ].map(st => (
              <div key={st.l} className="impact-stat p-5 rounded-xl"
                style={{ background: "rgba(10,10,10,0.07)", border: "1px solid rgba(10,10,10,0.13)" }}>
                <div className="text-[clamp(1.8rem,3vw,2.5rem)] font-black text-[#0A0A0A] leading-none mb-1"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>
                  <Counter target={st.v} suffix={st.s} />
                </div>
                <div className="text-[#F40009] text-[10px] font-bold tracking-widest uppercase">{st.l}</div>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="impact-img relative rounded-2xl overflow-hidden" style={{ minHeight: "280px", height: "280px" }}>
            <Image src="/media/images/img-03.png" alt="Sustainability" fill
              className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="text-[#0A0A0A]/50 text-[10px] tracking-widest uppercase mb-1">Our Commitment</div>
              <div className="text-[#0A0A0A] text-sm font-bold leading-tight">Building a sustainable future for Nigeria and the world.</div>
            </div>
          </div>

          {/* Progress bars */}
          <div className="flex flex-col justify-center">
            <div className="text-[#0A0A0A] font-black text-lg mb-6" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>2030 Goals Progress</div>
            <Bar pct={68} color="#E8001A"  label="Carbon Reduction" />
            <Bar pct={82} color="#0066CC"  label="Water Replenishment" />
            <Bar pct={74} color="#00A651"  label="Recyclable Packaging" />
            <Bar pct={55} color="#C9A84C"  label="Renewable Energy" />
            <Bar pct={91} color="#E8001A"  label="Community Reach" />
          </div>
        </div>

        {/* Pillars */}
        <div className="pillars grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon:"🌍", title:"Climate Action",       color:"#00A651", desc:"Net-zero by 2040 across our entire value chain." },
            { icon:"💧", title:"Water Stewardship",    color:"#0066CC", desc:"Replenishing every drop we use in Nigerian communities." },
            { icon:"♻️", title:"Packaging & Recycling",color:"#E8001A", desc:"100% recyclable packaging by 2030." },
            { icon:"🤝", title:"Community Investment", color:"#C9A84C", desc:"₦2B+ invested in Nigerian communities annually." },
          ].map((p, i) => (
            <div key={i} className="pillar group p-6 rounded-2xl border transition-all duration-400 hover:border-opacity-50"
              style={{ background: "rgba(10,10,10,0.07)", borderColor: "rgba(10,10,10,0.13)" }}>
              <div className="text-3xl mb-4">{p.icon}</div>
              <h4 className="text-base font-black text-[#0A0A0A] mb-2"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>{p.title}</h4>
              <p className="text-[#0A0A0A]/65 text-xs leading-relaxed">{p.desc}</p>
              <div className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500" style={{ background: p.color }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
