"use client";
/**
 * ScrollReveal — wraps any content with a smooth fade-up entrance
 * triggered when the element enters the viewport.
 */
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.7,
  y = 40,
  className,
  style,
  once = true,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
