"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const news = [
  {
    tag: "CAMPAIGN", date: "2024",
    title: "Taste the Feeling — Nigeria Edition",
    desc: "A cinematic celebration of everyday Nigerian moments. Every sip, every feeling.",
    video: "/media/videos/coke-for-everyone.mp4",
    color: "#E8001A",
  },
  {
    tag: "ACTIVATION", date: "2024",
    title: "Share a Coke — Find Your Name",
    desc: "Personalized bottles featuring the most popular Nigerian names.",
    video: "/media/videos/coke-share-with.mp4",
    color: "#C0001A",
  },
  {
    tag: "BRAND STORY", date: "2023",
    title: "A Real Coca-Cola Story",
    desc: "Magic isn't in the extraordinary. It's in the everyday moments.",
    video: "/media/videos/coke-real-story.mp4",
    color: "#8B0010",
  },
  {
    tag: "MUSIC", date: "2023",
    title: "The Taste of Africa",
    desc: "Nigeria's biggest artists. One studio. Infinite possibilities.",
    video: "/media/videos/coke-wozzaah.mp4",
    color: "#E8001A",
  },
];

export default function CampaignShowcase() {
  const secRef  = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const panelRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".news-title",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: secRef.current, start: "top 78%" } }
      );
      gsap.fromTo(".news-card",
        { y: 50, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: "expo.out",
          scrollTrigger: { trigger: ".news-cards", start: "top 78%" } }
      );
      gsap.fromTo(".news-video-panel",
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: ".news-video-panel", start: "top 80%" } }
      );
    }, secRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Autoplay active video immediately
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.play().catch(() => {});
      } else {
        v.pause();
        v.currentTime = 0;
      }
    });
    if (panelRef.current) {
      gsap.fromTo(panelRef.current.querySelectorAll(".panel-item"),
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: "expo.out" }
      );
    }
  }, [active]);

  return (
    <section ref={secRef} className="relative py-28 overflow-hidden" style={{ background: "#F5F5F0" }}>
      <div className="divider-white mb-0" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <div className="news-title section-label mb-4">The Freshest News</div>
            <h2 className="news-title text-[clamp(2.5rem,5vw,5rem)] font-black leading-none text-[#0A0A0A]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}>
              Moments That
              <br /><span className="text-red-gradient">Move Nigeria.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setActive(a => Math.max(0, a - 1))}
              className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center text-[#0A0A0A]/50 hover:border-[#F40009] hover:text-[#F40009] transition-all duration-300" data-hover>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={() => setActive(a => Math.min(news.length - 1, a + 1))}
              className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center text-[#0A0A0A]/50 hover:border-[#F40009] hover:text-[#F40009] transition-all duration-300" data-hover>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Layout: video left + cards right */}
        <div className="grid lg:grid-cols-5 gap-6 items-start">
          {/* Video panel */}
          <div className="news-video-panel lg:col-span-2 relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#F5F5F0]"
            style={{ clipPath: "inset(0 0 100% 0)" }}>
            {news.map((n, i) => (
              <video key={i} ref={el => { videoRefs.current[i] = el; }}
                src={n.video} autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                style={{ opacity: active === i ? 1 : 0 }} />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
              style={{ background: news[active].color, color: "#0A0A0A" }}>
              {news[active].tag}
            </div>
            <div ref={panelRef} className="absolute bottom-6 left-6 right-6">
              <div className="panel-item text-[#0A0A0A]/50 text-[10px] tracking-widest uppercase mb-1">{news[active].date}</div>
              <div className="panel-item text-[#0A0A0A] text-xl font-black leading-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
                {news[active].title}
              </div>
            </div>
            <div className="absolute top-4 right-4 w-px h-[calc(100%-32px)]" style={{ background: news[active].color, opacity: 0.4 }} />
          </div>

          {/* News cards */}
          <div className="news-cards lg:col-span-3 space-y-4">
            {news.map((n, i) => (
              <div key={i} onClick={() => setActive(i)}
                className={`news-card group relative p-5 rounded-xl cursor-pointer transition-all duration-400 border ${
                  active === i ? "border-[#F40009]/40" : "border-black/06 hover:border-black/12"
                }`}
                style={{ background: active === i ? "rgba(244,0,9,0.05)" : "rgba(10,10,10,0.02)" }}
                data-hover>
                <div className="flex gap-4 items-start">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <video src={n.video} muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
                        <svg className="w-3 h-3 text-[#0A0A0A] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: n.color }}>{n.tag}</span>
                      <span className="text-[#0A0A0A]/50 text-[10px]">{n.date}</span>
                    </div>
                    <h4 className="text-sm font-black text-[#0A0A0A] leading-tight mb-1 line-clamp-2"
                      style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em",
                        color: active === i ? "white" : "rgba(255,255,255,0.65)" }}>
                      {n.title}
                    </h4>
                    <p className="text-[#0A0A0A]/65 text-xs leading-relaxed line-clamp-2">{n.desc}</p>
                  </div>
                </div>
                {active === i && (
                  <div className="mt-3 h-px bg-[#F5F5F0]/08 overflow-hidden">
                    <div className="h-full bg-[#F40009]" style={{ animation: "progressBar 6s linear forwards" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
