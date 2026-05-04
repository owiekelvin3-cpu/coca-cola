"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

const navLinks = [
  { label: "Experience", href: "/" },
  { label: "Brands", href: "/brands" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Impact", href: "/impact" },
  { label: "About", href: "/about" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.5 }
    );
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    if (menuOpen) {
      gsap.fromTo(
        menuRef.current,
        { clipPath: "inset(0 0 100% 0)", opacity: 0 },
        { clipPath: "inset(0 0 0% 0)", opacity: 1, duration: 0.8, ease: "expo.out" }
      );
      gsap.fromTo(
        menuRef.current.querySelectorAll(".menu-item"),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "expo.out", delay: 0.2 }
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: "inset(0 0 100% 0)",
        opacity: 0,
        duration: 0.5,
        ease: "expo.in",
      });
    }
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? "py-4" : "py-6"
        }`}
        style={{
          background: scrolled
            ? "rgba(10, 10, 10, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="max-w-[1600px] mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                style={{ background: "#F40009" }}
              >
                <svg viewBox="0 0 40 40" className="w-7 h-7" fill="white">
                  <path d="M20 4C11.2 4 4 11.2 4 20s7.2 16 16 16 16-7.2 16-16S28.8 4 20 4zm0 2c7.7 0 14 6.3 14 14s-6.3 14-14 14S6 27.7 6 20 12.3 6 20 6zm-6 8c0 0 2 1 4 1s4-1 4-1v2s-2 1-4 1-4-1-4-1v-2zm0 4c0 0 2 1 4 1s4-1 4-1v2s-2 1-4 1-4-1-4-1v-2zm0 4c0 0 2 1 4 1s4-1 4-1v2s-2 1-4 1-4-1-4-1v-2z" />
                </svg>
              </div>
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: "0 0 30px rgba(244,0,9,0.6)" }}
              />
            </div>
            <span
              className="text-white font-black tracking-tight text-lg"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              COCA-COLA
              <span className="text-[#F40009]"> NG</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-widest uppercase transition-all duration-300 relative group ${
                  pathname === link.href
                    ? "text-[#F40009]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[#F40009] transition-all duration-500 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-6">
            <Link
              href="/brands"
              className="hidden lg:flex items-center gap-2 px-6 py-2.5 text-sm font-semibold tracking-widest uppercase transition-all duration-500 hover:scale-105"
              style={{
                background: "#F40009",
                color: "white",
                clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}
            >
              Explore
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2 group"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-px bg-white transition-all duration-400 ${
                  menuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"
                }`}
              />
              <span
                className={`block h-px bg-white transition-all duration-400 ${
                  menuOpen ? "w-0 opacity-0" : "w-4"
                }`}
              />
              <span
                className={`block h-px bg-white transition-all duration-400 ${
                  menuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-6"
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 lg:hidden flex flex-col justify-center px-8"
        style={{
          background: "rgba(10, 10, 10, 0.97)",
          backdropFilter: "blur(30px)",
          clipPath: "inset(0 0 100% 0)",
          opacity: 0,
        }}
      >
        <div className="space-y-8">
          {navLinks.map((link, i) => (
            <div key={link.href} className="menu-item overflow-hidden">
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-6xl font-black tracking-tight text-white hover:text-[#F40009] transition-colors duration-300"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>
        <div className="absolute bottom-12 left-8 right-8 flex justify-between items-end">
          <p className="text-white/30 text-sm tracking-widest uppercase">
            Coca-Cola Nigeria
          </p>
          <p className="text-white/30 text-sm">© 2024</p>
        </div>
      </div>
    </>
  );
}
