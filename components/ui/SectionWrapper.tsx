"use client";
/**
 * SectionWrapper — wraps each page section with a Framer Motion
 * fade-up entrance. Lightweight, no layout impact.
 */
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function SectionWrapper({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
