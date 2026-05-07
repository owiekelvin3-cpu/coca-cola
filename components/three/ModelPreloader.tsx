"use client";
/**
 * ModelPreloader — pre-warms Sketchfab iframes so models are cached
 * by the time the user sees them. Uses autostart:1 so WebGL actually
 * initialises in the background. Hero model loads first (0ms delay),
 * others stagger in after the page has settled.
 */
import { useEffect, useState } from "react";

const MODELS = [
  // Load order: hero-visible models first
  { id: "3e2d38a14d4345608a95843b73d869b6", delay: 0    }, // Can  (hero default)
  { id: "34075fedb0ef40d9a172231134849914", delay: 2000 }, // Bottle
  { id: "30178d8ee92949499854f6edaac8574f", delay: 4000 }, // Softdrinks
];

function buildUrl(id: string) {
  const p = new URLSearchParams({
    autostart:         "1",   // ← must be 1 to actually warm WebGL + cache
    preload:           "1",
    dnt:               "0",
    ui_infos:          "0",
    ui_controls:       "0",
    ui_watermark:      "0",
    ui_watermark_link: "0",
    ui_ar:             "0",
    ui_help:           "0",
    ui_settings:       "0",
    ui_vr:             "0",
    ui_fullscreen:     "0",
    ui_annotations:    "0",
    ui_loading:        "0",
    ui_stop:           "0",
    autospin:          "0",
    transparent:       "1",
  });
  return `https://sketchfab.com/models/${id}/embed?${p.toString()}`;
}

export default function ModelPreloader() {
  const [loaded, setLoaded] = useState<string[]>([]);

  useEffect(() => {
    // Stagger loading so hero model gets full bandwidth first
    const timers = MODELS.map(({ id, delay }) =>
      setTimeout(() => {
        setLoaded(prev => [...prev, id]);
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  if (loaded.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        width: "1px",
        height: "1px",
        overflow: "hidden",
        opacity: 0,
        pointerEvents: "none",
        zIndex: -1,
        top: 0,
        left: 0,
      }}
    >
      {loaded.map(id => (
        <iframe
          key={id}
          title={`preload-${id}`}
          src={buildUrl(id)}
          style={{ width: "1px", height: "1px", border: "none" }}
          tabIndex={-1}
        />
      ))}
    </div>
  );
}
