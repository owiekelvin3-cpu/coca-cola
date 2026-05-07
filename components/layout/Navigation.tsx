"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "Our Products", href: "#brands"          },
  { label: "Where To Buy", href: "#nigeria-moments" },
  { label: "Store",        href: "#campaigns"       },
  { label: "About Us",     href: "#about"           },
  { label: "Social",       href: "#brand-moments"   },
];

export default function Navigation() {
  const [scrolled, setScrolled]  = useState(false);
  const [menuOpen, setMenuOpen]  = useState(false);
  const [active,   setActive]    = useState("experience");
  const navRef  = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ids = ["experience","brands","nigeria-moments","coke-quiz","brand-moments","campaigns","impact","about"];
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 140) { setActive(ids[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.8 }
    );
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    if (menuOpen) {
      gsap.fromTo(menuRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "expo.out" }
      );
      gsap.fromTo(menuRef.current.querySelectorAll(".m-item"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "expo.out", delay: 0.1 }
      );
    } else {
      gsap.to(menuRef.current, { clipPath: "inset(0 0 100% 0)", duration: 0.4, ease: "expo.in" });
    }
  }, [menuOpen]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(href.replace("#",""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const isLight = !scrolled; // nav is transparent on light bg

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          transition: "all 0.5s ease",
          background: scrolled ? "rgba(245,245,240,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(10,10,10,0.13)" : "none",
          padding: scrolled ? "12px 0" : "20px 0",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#experience" onClick={e => scrollTo(e,"#experience")} data-hover
            style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Image
              src="/media/images/logo.png"
              alt="Coca-Cola"
              width={100} height={40}
              style={{ objectFit: "contain", height: "auto" }}
              priority
            />
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={e => scrollTo(e, l.href)} data-hover
                style={{
                  fontSize: "13px", fontWeight: 500,
                  color: "rgba(10,10,10,0.6)",
                  textDecoration: "none",
                  transition: "color 0.3s",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#0A0A0A")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(10,10,10,0.6)")}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Cart icon */}
          <div className="hidden lg:flex items-center gap-4">
            <button data-hover style={{
              width: "40px", height: "40px", borderRadius: "50%",
              background: "#0A0A0A",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "none", cursor: "pointer",
              position: "relative",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.1 17 7 17h11v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.25 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              <span style={{
                position: "absolute", top: "-4px", right: "-4px",
                width: "16px", height: "16px", borderRadius: "50%",
                background: "#E8001A", color: "#fff",
                fontSize: "9px", fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>1</span>
            </button>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <span style={{ display: "block", width: "22px", height: "1.5px", background: "#0A0A0A", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none" }} />
              <span style={{ display: "block", width: menuOpen ? "0" : "16px", height: "1.5px", background: "#0A0A0A", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: "block", width: "22px", height: "1.5px", background: "#0A0A0A", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div ref={menuRef} className="fixed inset-0 z-40 lg:hidden flex flex-col justify-center px-8"
        style={{ background: "#F5F5F0", clipPath: "inset(0 0 100% 0)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {links.map(l => (
            <div key={l.href} className="m-item" style={{ overflow: "hidden" }}>
              <a href={l.href} onClick={e => scrollTo(e, l.href)} data-hover
                style={{
                  display: "block",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.5rem,8vw,4rem)",
                  fontWeight: 900, color: "#0A0A0A",
                  letterSpacing: "-0.04em", textDecoration: "none",
                  transition: "color 0.3s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#E8001A")}
                onMouseLeave={e => (e.currentTarget.style.color = "#0A0A0A")}
              >
                {l.label}
              </a>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", bottom: "32px", left: "32px", right: "32px", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: "11px", color: "rgba(10,10,10,0.8)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Coca-Cola Nigeria</span>
          <span style={{ fontSize: "11px", color: "rgba(10,10,10,0.8)" }}>© 2024</span>
        </div>
      </div>
    </>
  );
}
