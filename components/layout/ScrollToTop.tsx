"use client";
import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // Disable browser scroll restoration so it doesn't fight us
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // Force top on every mount
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return null;
}
