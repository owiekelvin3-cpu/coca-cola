"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const gallery = [
  { type: "video", src: "/media/videos/coke-pool-party.mp4", alt: "Coca-Cola Pool Party", col: "span 2", row: "span 2" },
  { type: "image", src: "/media/images/img-06.png",           alt: "Coke lifestyle",       col: "span 1", row: "span 1" },
  { type: "image", src: "/media/images/img-07.png",           alt: "Coke culture",         col: "span 1", row: "span 1" },
  { type: "image", src: "/media/images/img-11.png",           alt: "Coke happiness",       col: "span 1", row: "span 2" },
  { type: "image", src: "/media/images/img-12.png",           alt: "Coke Nigeria",         col: "span 1", row: "span 1" },
  { type: "image", src: "/media/images/img-08.png",           alt: "Coke brand",           col: "span 1", row: "span 1" },
  { type: "image", src: "/media/images/img-13.png",           alt: "Coke experience",      col: "span 2", row: "span 1" },
];

export default function BrandMoments() {
  const secRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: secRef,
    offset: ["start end", "end start"],
  });
  const galleryY = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"]);

  return (
    <section
      ref={secRef}
      id="brand-moments"
      style={{
        background: "#F5F5F0",
        padding: "clamp(80px,12vh,140px) 0",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 clamp(24px,6vw,80px)" }}>

        {/* Header — asymmetric, generous space */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(32px,6vw,80px)",
          alignItems: "end",
          marginBottom: "clamp(48px,7vh,80px)",
        }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              marginBottom: "20px",
            }}>
              <div style={{ width: "32px", height: "1px", background: "#E8001A" }} />
              <span style={{
                fontSize: "10px", fontWeight: 700,
                letterSpacing: "0.25em", textTransform: "uppercase",
                color: "rgba(10,10,10,0.5)",
              }}>Culture</span>
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem,6vw,6.5rem)",
              fontWeight: 900,
              color: "#0A0A0A",
              letterSpacing: "-0.045em",
              lineHeight: 0.88,
              margin: 0,
            }}>
              Culture.<br />Music.<br />
              <span style={{ color: "#E8001A" }}>Life.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              color: "rgba(10,10,10,0.55)",
              fontSize: "clamp(0.95rem,1.3vw,1.1rem)",
              lineHeight: 1.8,
              maxWidth: "380px",
              alignSelf: "end",
              paddingBottom: "8px",
            }}
          >
            From Afrobeats to Detty December — Coca-Cola is the soundtrack
            of every Nigerian moment worth remembering.
          </motion.p>
        </div>

        {/* Gallery grid */}
        <motion.div
          style={{ y: galleryY }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "repeat(3, 1fr)",
              gap: "8px",
              height: "clamp(360px, 55vw, 660px)",
            }}
          >
            {gallery.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 1.04 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02 }}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  gridColumn: item.col,
                  gridRow: item.row,
                  cursor: "pointer",
                }}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    autoPlay muted loop playsInline
                    style={{
                      position: "absolute", inset: 0,
                      width: "100%", height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.7s ease",
                    }}
                  />
                ) : (
                  <Image
                    src={item.src} alt={item.alt} fill
                    className="object-cover"
                    sizes="(max-width:768px) 50vw, 25vw"
                    style={{ transition: "transform 0.7s ease" }}
                  />
                )}
                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
