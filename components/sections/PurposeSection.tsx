"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function PurposeSection() {
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Title */
      gsap.fromTo(".purpose-title",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: secRef.current, start: "top 78%" } }
      );

      /* Left image — clip wipe */
      gsap.fromTo(".purpose-img-left",
        { clipPath: "inset(0 100% 0 0)", scale: 1.08 },
        { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: ".purpose-grid", start: "top 78%" } }
      );

      /* Right image — clip wipe delayed */
      gsap.fromTo(".purpose-img-right",
        { clipPath: "inset(0 0 0 100%)", scale: 1.08 },
        { clipPath: "inset(0 0 0 0%)", scale: 1, duration: 1.2, ease: "expo.out", delay: 0.2,
          scrollTrigger: { trigger: ".purpose-grid", start: "top 78%" } }
      );

      /* Text blocks */
      gsap.fromTo(".purpose-text-block",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "expo.out",
          scrollTrigger: { trigger: ".purpose-grid", start: "top 72%" } }
      );

      /* Parallax on images */
      gsap.to(".purpose-img-left img", {
        y: -40, ease: "none",
        scrollTrigger: { trigger: ".purpose-grid", start: "top bottom", end: "bottom top", scrub: 1.5 },
      });
      gsap.to(".purpose-img-right img", {
        y: -60, ease: "none",
        scrollTrigger: { trigger: ".purpose-grid", start: "top bottom", end: "bottom top", scrub: 2 },
      });

    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="relative py-28 overflow-hidden" style={{ background: "#F5F5F0" }}>
      <div className="divider-red mb-0" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 pt-16">
          <div className="purpose-title section-label mb-5">Our Purpose & Company Vision</div>
          <h2 className="purpose-title text-[clamp(2.5rem,5vw,5rem)] font-black leading-none text-[#0A0A0A]"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}>
            Refresh the World.
            <br /><span className="text-red-gradient">Make a Difference.</span>
          </h2>
        </div>

        {/* Grid — mirrors reference layout */}
        <div className="purpose-grid grid md:grid-cols-2 gap-6 mb-16">
          {/* Left image */}
          <div className="purpose-img-left relative overflow-hidden rounded-2xl aspect-[4/3]"
            style={{ clipPath: "inset(0 100% 0 0)" }}>
            <Image src="/media/images/img-12.png" alt="Coca-Cola Purpose" fill
              className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-[#0A0A0A]/60 text-xs tracking-widest uppercase mb-2">WIN WAYS</div>
              <p className="text-[#0A0A0A] text-sm leading-relaxed">
                We win by being the best beverage company, growing a portfolio of brands people love.
              </p>
            </div>
          </div>

          {/* Right image */}
          <div className="purpose-img-right relative overflow-hidden rounded-2xl aspect-[4/3]"
            style={{ clipPath: "inset(0 0 0 100%)" }}>
            <Image src="/media/images/img-11.png" alt="Coca-Cola Vision" fill
              className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-[#0A0A0A]/60 text-xs tracking-widest uppercase mb-2">LATEST IN NIGERIA</div>
              <p className="text-[#0A0A0A] text-sm leading-relaxed">
                Discover how Coca-Cola is shaping culture, community, and commerce across Nigeria.
              </p>
            </div>
          </div>
        </div>

        {/* Purpose pillars */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🌍", title: "Refresh the World", desc: "Inspire moments of optimism and happiness through our brands and actions." },
            { icon: "💡", title: "Create Value", desc: "Create value and make a difference for our consumers, customers, communities and planet." },
            { icon: "🤝", title: "Loved Brands", desc: "Grow a portfolio of brands that people love and that satisfy their desires and needs." },
          ].map((p, i) => (
            <div key={i} className="purpose-text-block p-7 rounded-2xl border transition-all duration-400 hover:border-[#F40009]/30 group"
              style={{ background: "rgba(10,10,10,0.07)", borderColor: "rgba(10,10,10,0.13)" }}>
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="text-lg font-black text-[#0A0A0A] mb-3" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>{p.title}</h3>
              <p className="text-[#0A0A0A]/70 text-sm leading-relaxed">{p.desc}</p>
              <div className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500" style={{ background: "#E8001A" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
