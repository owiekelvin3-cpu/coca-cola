"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-line",
        { y: "105%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.1, stagger: 0.12, ease: "expo.out",
          scrollTrigger: { trigger: secRef.current, start: "top 78%" } }
      );
      gsap.fromTo(".about-stat",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "expo.out",
          scrollTrigger: { trigger: ".about-stats", start: "top 80%" } }
      );
      gsap.fromTo(".about-sub",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".about-stats", start: "top 75%" } }
      );
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={secRef}
      id="about"
      style={{
        background: "#F5F5F0",
        padding: "clamp(100px,14vh,160px) clamp(24px,6vw,80px)",
        borderTop: "1px solid rgba(10,10,10,0.13)",
      }}
    >
      <div className="max-w-[1440px] mx-auto">

        {/* Statement headline */}
        <div style={{ marginBottom: "clamp(60px,10vh,100px)" }}>
          <div className="section-label" style={{ marginBottom: "20px" }}>About</div>
          <div style={{ overflow: "hidden" }}>
            <h2 className="about-line" style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem,8vw,8.5rem)",
              fontWeight: 900, color: "#0A0A0A",
              letterSpacing: "-0.05em", lineHeight: 0.86,
              margin: 0,
            }}>
              138 Years of
            </h2>
          </div>
          <div style={{ overflow: "hidden" }}>
            <h2 className="about-line" style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem,8vw,8.5rem)",
              fontWeight: 900, color: "#E8001A",
              letterSpacing: "-0.05em", lineHeight: 0.86,
              margin: 0,
            }}>
              Happiness.
            </h2>
          </div>
        </div>

        {/* Stats + quote — side by side */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(40px,6vw,80px)",
          alignItems: "end",
        }}>
          {/* Stats */}
          <div className="about-stats" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(20px,3vw,32px)",
          }}>
            {[
              { v: "1953", l: "Nigeria Est." },
              { v: "130+", l: "Years Global" },
              { v: "200+", l: "Countries"    },
              { v: "1.9B", l: "Daily Servings"},
            ].map(({ v, l }) => (
              <div key={l} className="about-stat" style={{ opacity: 0 }}>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem,4vw,3.5rem)",
                  fontWeight: 900, color: "#0A0A0A",
                  letterSpacing: "-0.04em", lineHeight: 1,
                }}>{v}</div>
                <div style={{
                  color: "rgba(10,10,10,0.8)",
                  fontSize: "10px", letterSpacing: "0.25em",
                  textTransform: "uppercase", marginTop: "6px",
                }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="about-sub" style={{ opacity: 0 }}>
            <div style={{
              color: "#E8001A",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem,3.5vw,3rem)",
              fontWeight: 900, lineHeight: 1,
              marginBottom: "20px",
            }}>"</div>
            <p style={{
              color: "rgba(10,10,10,0.75)",
              fontSize: "clamp(0.9rem,1.4vw,1.1rem)",
              lineHeight: 1.7,
              maxWidth: "420px",
            }}>
              Our purpose is to refresh the world and make a difference.
              In Nigeria, that means being part of every celebration,
              every meal, every moment that matters.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
