"use client";

import Link from "next/link";

const footerLinks = {
  Brands: [
    { label: "Coca-Cola", href: "/brands#coca-cola" },
    { label: "Fanta", href: "/brands#fanta" },
    { label: "Sprite", href: "/brands#sprite" },
    { label: "Schweppes", href: "/brands#schweppes" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Leadership", href: "/about#leadership" },
    { label: "History", href: "/about#history" },
    { label: "Careers", href: "/about#careers" },
  ],
  Impact: [
    { label: "Sustainability", href: "/impact" },
    { label: "Community", href: "/impact#community" },
    { label: "Environment", href: "/impact#environment" },
    { label: "Reports", href: "/impact#reports" },
  ],
  Connect: [
    { label: "Campaigns", href: "/campaigns" },
    { label: "Press", href: "/about#press" },
    { label: "Contact", href: "/about#contact" },
    { label: "Investors", href: "/about#investors" },
  ],
};

export default function Footer() {
  return (
    <footer
      className="relative pt-24 pb-12 overflow-hidden"
      style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Background text */}
      <div
        className="absolute bottom-0 left-0 right-0 text-center text-[20vw] font-black leading-none text-white/[0.02] pointer-events-none select-none overflow-hidden"
        style={{ fontFamily: "var(--font-display)" }}
      >
        COKE
      </div>

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
        {/* Top section */}
        <div className="grid lg:grid-cols-5 gap-16 mb-20">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "#F40009" }}
              >
                <svg viewBox="0 0 40 40" className="w-8 h-8" fill="white">
                  <circle cx="20" cy="20" r="14" fill="none" stroke="white" strokeWidth="2" />
                  <path d="M14 16c0 0 2 1 6 1s6-1 6-1v2s-2 1-6 1-6-1-6-1v-2zm0 4c0 0 2 1 6 1s6-1 6-1v2s-2 1-6 1-6-1-6-1v-2z" />
                </svg>
              </div>
              <div>
                <div
                  className="text-white font-black text-lg leading-none"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                >
                  COCA-COLA
                </div>
                <div className="text-[#F40009] text-xs tracking-widest uppercase">Nigeria</div>
              </div>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs mb-8">
              Refreshing Nigeria since 1953. More than a beverage — a cultural institution,
              a moment of joy, a shared experience.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-4">
              {["Instagram", "Twitter", "Facebook", "YouTube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/30 hover:text-white transition-all duration-300 hover:scale-110"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                  aria-label={social}
                >
                  <span className="text-xs font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white/20 text-xs font-semibold tracking-[0.3em] uppercase mb-6">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/40 text-sm hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex items-center justify-between flex-wrap gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/20 text-xs">
            © 2024 The Coca-Cola Company. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Use", "Cookie Settings"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/20 text-xs hover:text-white/50 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
