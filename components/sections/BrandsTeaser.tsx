"use client";
import { motion } from "framer-motion";

const BRANDS = [
  { name: "Coca-Cola", color: "#F40009", year: "1886", tagline: "The Original" },
  { name: "Fanta",     color: "#FF6B00", year: "1940", tagline: "Taste the Fun" },
  { name: "Sprite",    color: "#00A651", year: "1961", tagline: "Obey Your Thirst" },
  { name: "Schweppes", color: "#C9A84C", year: "1783", tagline: "Distinctly Different" },
];

export default function BrandsTeaser() {
  return (
    <section
      style={{
        background: "#F5F5F0",
        borderTop: "1px solid rgba(10,10,10,0.08)",
        borderBottom: "1px solid rgba(10,10,10,0.08)",
      }}
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {BRANDS.map((b, i) => (
            <motion.a
              key={b.name}
              href="#brands"
              onClick={e => { e.preventDefault(); document.getElementById("brands")?.scrollIntoView({ behavior: "smooth" }); }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ backgroundColor: `${b.color}08` }}
              data-hover
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "clamp(28px,4vw,48px) clamp(20px,3vw,36px)",
                borderRight: i < 3 ? "1px solid rgba(10,10,10,0.08)" : "none",
                textDecoration: "none",
                cursor: "pointer",
                minHeight: "clamp(160px,20vh,220px)",
              }}
            >
              {/* Top accent line */}
              <motion.div
                initial={{ width: "24px" }}
                whileHover={{ width: "48px" }}
                transition={{ duration: 0.3 }}
                style={{
                  height: "2px",
                  background: b.color,
                  marginBottom: "clamp(20px,3vh,32px)",
                }}
              />

              {/* Name + tagline */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.3rem,2.2vw,2rem)",
                  fontWeight: 900,
                  color: "#0A0A0A",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}>
                  {b.name}
                </div>
                <div style={{
                  color: "rgba(10,10,10,0.45)",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}>
                  {b.tagline}
                </div>
              </div>

              {/* Year */}
              <div style={{
                color: b.color,
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                marginTop: "clamp(20px,3vh,32px)",
              }}>
                Est. {b.year}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
