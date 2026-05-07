"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const campaigns = [
  { id:"01", title:"Taste the Feeling",   sub:"Nigeria Edition 2024",  cat:"BRAND CAMPAIGN", year:"2024", color:"#E8001A", video:"/media/videos/coke-for-everyone.mp4",                    tags:["TV","Digital","OOH","Experiential"] },
  { id:"02", title:"Share a Coke",        sub:"Find Your Name",         cat:"ACTIVATION",     year:"2024", color:"#C0001A", video:"/media/videos/coke-share-with.mp4",                  tags:["Retail","Social","Experiential"] },
  { id:"03", title:"A Real Coke Story",   sub:"Real Magic",             cat:"BRAND STORY",    year:"2023", color:"#8B0010", video:"/media/videos/coke-real-story.mp4",                           tags:["Film","Digital","Social"] },
  { id:"04", title:"Taste of Africa",     sub:"Wozzaah",                cat:"MUSIC",          year:"2023", color:"#E8001A", video:"/media/videos/coke-wozzaah.mp4",            tags:["Music","Digital","Events"] },
  { id:"05", title:"Buy. Scan. Win.",     sub:"Recipe for Wonder",      cat:"GAMIFIED",       year:"2024", color:"#C0001A", video:"/media/videos/coke-scan-win.mp4",         tags:["Digital","Retail","Mobile"] },
  { id:"06", title:"Odogwu Moment",       sub:"Spoil Your Own",         cat:"EXPERIENTIAL",   year:"2023", color:"#8B0010", video:"/media/videos/coke-odogwu.mp4",                 tags:["Experiential","Events","PR"] },
  { id:"07", title:"Share & Win Big",     sub:"Nigeria Campaign",       cat:"PROMO",          year:"2024", color:"#E8001A", video:"/media/videos/coke-share-win.mp4",                            tags:["Promo","Social","Retail"] },
  { id:"08", title:"Pool Party",          sub:"Summer Vibes",           cat:"LIFESTYLE",      year:"2023", color:"#C0001A", video:"/media/videos/coke-pool-party.mp4",                           tags:["Lifestyle","Digital","Events"] },
];

export default function CampaignsSection() {
  const secRef    = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".camp-title",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: secRef.current, start: "top 78%" } }
      );
      /* Featured wipe */
      gsap.fromTo(".camp-featured",
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: ".camp-featured", start: "top 80%" } }
      );
      /* Grid cascade */
      gsap.fromTo(".camp-card",
        { y: 55, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.09, ease: "expo.out",
          scrollTrigger: { trigger: ".camp-grid", start: "top 78%" } }
      );
    }, secRef);
    return () => ctx.revert();
  }, []);

  const hover = (i: number, on: boolean) => {
    setHovered(on ? i : null);
    const v = videoRefs.current[i];
    if (!v) return;
    if (on) v.play().catch(() => {});
    else { v.pause(); v.currentTime = 0; }
  };

  const feat = campaigns[0];

  return (
    <section ref={secRef} id="campaigns" className="relative py-28 overflow-hidden" style={{ background: "#F5F5F0" }}>
      <div className="divider-white mb-0" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-16">
        {/* Header */}
        <div className="mb-14">
          <div className="camp-title section-label mb-5">Interactive Campaigns</div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="camp-title text-[clamp(2.5rem,5vw,5rem)] font-black leading-none text-[#0A0A0A]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}>
              Stories That
              <br /><span className="text-red-gradient">Move You.</span>
            </h2>
            <p className="camp-title text-[#0A0A0A]/65 max-w-xs text-sm leading-relaxed">
              Campaigns crafted for the Nigerian spirit — bold, emotional, deeply human.
            </p>
          </div>
        </div>

        {/* Featured */}
        <div className="camp-featured relative overflow-hidden rounded-2xl mb-5 group cursor-pointer"
          style={{ background: "rgba(10,10,10,0.07)", border: "1px solid rgba(10,10,10,0.13)", clipPath: "inset(0 0 100% 0)" }}
          onMouseEnter={() => videoRefs.current[0]?.play().catch(() => {})}
          onMouseLeave={() => { const v = videoRefs.current[0]; if (v) { v.pause(); v.currentTime = 0; } }}>
          <div className="grid lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto min-h-[340px] overflow-hidden">
              <video ref={el => { videoRefs.current[0] = el; }} src={feat.video} autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
              <div className="absolute top-5 left-5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
                style={{ background: feat.color, color: "#0A0A0A" }}>FEATURED</div>
              <div className="absolute bottom-5 left-5 text-[5rem] font-black text-[#0A0A0A]/08 leading-none"
                style={{ fontFamily: "var(--font-display)" }}>{feat.id}</div>
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: feat.color }}>{feat.cat}</span>
                <span className="text-[#0A0A0A]/50 text-[10px]">{feat.year}</span>
              </div>
              <h3 className="text-[clamp(1.8rem,3vw,3rem)] font-black leading-none text-[#0A0A0A] mb-2"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>{feat.title}</h3>
              <p className="text-[#0A0A0A]/65 text-base mb-6">{feat.sub}</p>
              <div className="flex flex-wrap gap-2">
                {feat.tags.map(t => (
                  <span key={t} className="px-3 py-1 rounded-full text-[10px] text-[#0A0A0A]/65"
                    style={{ border: "1px solid rgba(10,10,10,0.15)" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="camp-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {campaigns.slice(1).map((c, i) => (
            <div key={c.id} className="camp-card relative overflow-hidden rounded-xl cursor-pointer group"
              style={{ background: "rgba(10,10,10,0.07)", border: "1px solid rgba(10,10,10,0.13)" }}
              onMouseEnter={() => hover(i + 1, true)}
              onMouseLeave={() => hover(i + 1, false)}>
              {/* Video */}
              <div className="relative h-40 overflow-hidden">
                <video ref={el => { videoRefs.current[i + 1] = el; }} src={c.video} autoPlay muted loop playsInline
                  className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-600" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 text-[3.5rem] font-black text-[#0A0A0A]/08 leading-none"
                  style={{ fontFamily: "var(--font-display)" }}>{c.id}</div>
                <div className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${hovered === i + 1 ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
                  style={{ background: c.color }}>
                  <svg className="w-3 h-3 text-[#0A0A0A] ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: c.color }}>{c.cat}</span>
                  <span className="text-[#0A0A0A]/50 text-[9px]">{c.year}</span>
                </div>
                <h4 className="text-sm font-black text-[#0A0A0A] leading-tight mb-1"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>{c.title}</h4>
                <p className="text-[#0A0A0A]/60 text-xs">{c.sub}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-px transition-all duration-400"
                style={{ background: hovered === i + 1 ? c.color : "transparent" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
