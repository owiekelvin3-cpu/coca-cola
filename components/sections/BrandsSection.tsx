"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const SketchfabEmbed = dynamic(() => import("@/components/three/SketchfabEmbed"), { ssr: false });

const brands = [
  {
    id: "coca-cola", name: "Coca-Cola", tagline: "The Original. The Iconic.",
    desc: "Since 1886, Coca-Cola has been more than a drink — it's a feeling. The unmistakable taste that has united generations, cultures, and continents. In Nigeria, it's the heartbeat of every celebration.",
    color: "#E8001A", bg: "linear-gradient(135deg,#F40009 0%,#8B0000 60%,#1A0000 100%)",
    flavors: ["Classic","Zero Sugar","Light","Vanilla"],
    year: "1886", fact: "The most recognized brand in the world",
    modelId: "34075fedb0ef40d9a172231134849914",
    image: "/media/images/img-09.png",
  },
  {
    id: "fanta", name: "Fanta", tagline: "Taste the Fun.",
    desc: "Fanta is the spirit of youth bottled. Bursting with vibrant fruit flavors, it's the drink that refuses to take itself too seriously. In Nigeria, Fanta Orange is a cultural icon.",
    color: "#FF6B00", bg: "linear-gradient(135deg,#FF6B00 0%,#CC4400 60%,#331100 100%)",
    flavors: ["Orange","Pineapple","Strawberry","Grape"],
    year: "1940", fact: "Available in 100+ flavors worldwide",
    modelId: "3e2d38a14d4345608a95843b73d869b6",
    image: "/media/images/img-05.png",
  },
  {
    id: "sprite", name: "Sprite", tagline: "Obey Your Thirst.",
    desc: "Sprite doesn't follow trends — it sets them. The crisp, clean lemon-lime taste that cuts through the noise. In Nigeria's heat, nothing hits like an ice-cold Sprite.",
    color: "#00A651", bg: "linear-gradient(135deg,#00A651 0%,#006633 60%,#001A0D 100%)",
    flavors: ["Original","Zero Sugar","Cranberry","Tropical"],
    year: "1961", fact: "The world's leading lemon-lime soft drink",
    modelId: "3e2d38a14d4345608a95843b73d869b6",
    image: "/media/images/img-14.png",
  },
  {
    id: "schweppes", name: "Schweppes", tagline: "Distinctly Different.",
    desc: "Schweppes is sophistication in a bottle. The world's original mixer, crafted for those who appreciate the finer things. From tonic water to ginger ale.",
    color: "#C9A84C", bg: "linear-gradient(135deg,#C9A84C 0%,#8B6914 60%,#1A1000 100%)",
    flavors: ["Tonic Water","Ginger Ale","Club Soda","Bitter Lemon"],
    year: "1783", fact: "The world's oldest carbonated beverage brand",
    modelId: "30178d8ee92949499854f6edaac8574f",
    image: "/media/images/img-04.png",
  },
];

export default function BrandsSection() {
  const secRef  = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const prev     = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".brands-title",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: secRef.current, start: "top 78%" } }
      );
      gsap.fromTo(".brand-tab",
        { y: 30, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: "back.out(1.4)",
          scrollTrigger: { trigger: ".brand-tabs", start: "top 82%" } }
      );
      gsap.fromTo(".brand-viewer",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.4, ease: "expo.out",
          scrollTrigger: { trigger: ".brand-viewer", start: "top 80%" } }
      );
    }, secRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!panelRef.current || prev.current === active) return;
    prev.current = active;
    gsap.fromTo(panelRef.current.querySelectorAll(".bp-item"),
      { y: 24, opacity: 0, x: 8 },
      { y: 0, opacity: 1, x: 0, duration: 0.45, stagger: 0.06, ease: "expo.out" }
    );
  }, [active]);

  const b = brands[active];

  return (
    <section ref={secRef} id="brands" className="relative py-28 overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="divider-red mb-0" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-16">
        {/* Header */}
        <div className="mb-14">
          <div className="brands-title section-label mb-5">Brand Ecosystem</div>
          <h2 className="brands-title text-[clamp(2.5rem,5vw,5rem)] font-black leading-none text-[#0A0A0A]"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}>
            Four Brands.
            <br /><span className="text-[#0A0A0A]/50">One Family.</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="brand-tabs flex flex-wrap gap-3 mb-14">
          {brands.map((br, i) => (
            <button key={br.id} onClick={() => setActive(i)} data-hover
              className={`brand-tab px-6 py-2.5 rounded-full text-xs font-bold tracking-[0.12em] uppercase transition-all duration-400 ${active === i ? "text-[#0A0A0A] scale-105" : "text-black/70 hover:text-[#0A0A0A]/70"}`}
              style={{
                background: active === i ? br.color : "rgba(10,10,10,0.07)",
                border: `1px solid ${active === i ? br.color : "rgba(10,10,10,0.14)"}`,
                boxShadow: active === i ? `0 0 24px ${br.color}40` : "none",
              }}>
              {br.name}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* 3D viewer */}
          <div className="brand-viewer relative rounded-3xl overflow-hidden" style={{ aspectRatio: "1/1", background: b.bg }}>
            <div className="absolute inset-0 opacity-[0.08]"
              style={{ backgroundImage: "repeating-linear-gradient(-45deg,transparent,transparent 28px,rgba(10,10,10,0.18) 28px,rgba(10,10,10,0.18) 29px)" }} />
            <div className="absolute inset-0 z-10">
              <SketchfabEmbed key={b.id} modelId={b.modelId} title={b.name}
                autostart transparent ui_infos={false} ui_controls={false}
                autospin={0.1} animation_autoplay />
            </div>
            <div className="absolute top-5 left-5 z-20 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase"
              style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.75)" }}>
              Est. {b.year}
            </div>
            <div className="absolute inset-0 pointer-events-none z-0"
              style={{ background: `radial-gradient(ellipse at 50% 50%, ${b.color}25 0%, transparent 60%)` }} />
          </div>

          {/* Content */}
          <div ref={panelRef} className="space-y-5">
            <div className="bp-item flex items-center gap-3">
              <div className="w-7 h-px" style={{ background: b.color }} />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: b.color }}>{b.tagline}</span>
            </div>

            <h3 className="bp-item text-[clamp(2.5rem,4.5vw,4.5rem)] font-black leading-none text-[#0A0A0A]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}>{b.name}</h3>

            <p className="bp-item text-[#0A0A0A]/75 text-sm leading-relaxed max-w-lg">{b.desc}</p>

            {/* Flavors */}
            <div className="bp-item">
              <div className="text-[#0A0A0A]/55 text-[10px] tracking-widest uppercase mb-3">Available Variants</div>
              <div className="flex flex-wrap gap-2">
                {b.flavors.map(f => (
                  <span key={f} className="px-3 py-1.5 rounded-full text-xs text-[#0A0A0A]/55"
                    style={{ border: "1px solid rgba(10,10,10,0.15)" }}>{f}</span>
                ))}
              </div>
            </div>

            {/* Dot nav */}
            <div className="bp-item flex items-center gap-2.5 pt-1">
              {brands.map((br, i) => (
                <button key={br.id} onClick={() => setActive(i)} data-hover
                  className="transition-all duration-300 rounded-full"
                  style={{ width: active === i ? "28px" : "7px", height: "7px",
                    background: active === i ? br.color : "rgba(10,10,10,0.15)" }} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
