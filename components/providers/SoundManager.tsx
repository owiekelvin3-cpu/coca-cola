"use client";
/**
 * SoundManager — ambient Coca-Cola sound design.
 * Sounds play on specific interactions:
 * - Coke bottle open: on hero CTA hover
 * - Fizz: on section enter
 * - Ice clink: on brand card hover
 * - Pour: on scroll past hero
 *
 * All sounds are synthetic (Web Audio API) — no external files needed.
 * User must interact first (browser autoplay policy).
 */
import { useEffect, useRef, useState } from "react";

class CokeAudio {
  private ctx: AudioContext | null = null;
  private enabled = false;

  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.enabled = true;
  }

  enable() { this.enabled = true; this.init(); }
  disable() { this.enabled = false; }
  isEnabled() { return this.enabled; }

  // Coke bottle open — pressurized hiss
  playOpen() {
    if (!this.ctx || !this.enabled) return;
    const ctx = this.ctx;
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.4, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08));
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 3000;
    filter.Q.value = 0.5;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start();
  }

  // Fizz / carbonation bubbles
  playFizz() {
    if (!this.ctx || !this.enabled) return;
    const ctx = this.ctx;
    for (let b = 0; b < 6; b++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const delay = b * 0.06 + Math.random() * 0.04;
      osc.frequency.value = 800 + Math.random() * 1200;
      osc.type = "sine";
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + delay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.15);
    }
  }

  // Ice clink — short metallic ping
  playClink() {
    if (!this.ctx || !this.enabled) return;
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 2200 + Math.random() * 400;
    osc.type = "triangle";
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.28);
  }

  // Pour — liquid rushing sound
  playPour() {
    if (!this.ctx || !this.enabled) return;
    const ctx = this.ctx;
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.6, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3 * Math.sin(i / (ctx.sampleRate * 0.1));
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 800;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start();
  }

  // Subtle UI click
  playClick() {
    if (!this.ctx || !this.enabled) return;
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 600;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }
}

// Singleton
export const cokeAudio = typeof window !== "undefined" ? new CokeAudio() : null;

export default function SoundManager() {
  const [enabled, setEnabled] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    // Init on first user interaction
    const init = () => {
      if (initialized.current) return;
      initialized.current = true;
      cokeAudio?.enable();
      setEnabled(true);
      // Play open sound on first interaction
      setTimeout(() => cokeAudio?.playOpen(), 200);
    };

    document.addEventListener("click", init, { once: true });
    document.addEventListener("keydown", init, { once: true });
    document.addEventListener("touchstart", init, { once: true });

    // Attach sounds to interactive elements
    const attachSounds = () => {
      // CTA buttons — open sound on hover
      document.querySelectorAll("a[href='#brands'], a[href='#campaigns']").forEach(el => {
        el.addEventListener("mouseenter", () => cokeAudio?.playOpen());
      });
      // Brand cards — clink on hover
      document.querySelectorAll(".brand-tab, .td-dot").forEach(el => {
        el.addEventListener("mouseenter", () => cokeAudio?.playClink());
      });
      // Nav links — click sound
      document.querySelectorAll("nav a").forEach(el => {
        el.addEventListener("click", () => cokeAudio?.playClick());
      });
    };

    const t = setTimeout(attachSounds, 2000);
    return () => {
      clearTimeout(t);
      document.removeEventListener("click", init);
    };
  }, []);

  const toggle = () => {
    if (enabled) {
      cokeAudio?.disable();
      setEnabled(false);
    } else {
      cokeAudio?.enable();
      setEnabled(true);
    }
  };

  return (
    <button
      onClick={toggle}
      data-hover
      title={enabled ? "Mute sounds" : "Enable sounds"}
      style={{
        position: "fixed",
        bottom: "clamp(20px, 3vh, 32px)",
        left: "clamp(20px, 3vw, 32px)",
        zIndex: 50,
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "border-color 0.3s, background 0.3s",
        color: enabled ? "#F40009" : "rgba(255,255,255,0.3)",
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "#F40009")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
    >
      {enabled ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        </svg>
      )}
    </button>
  );
}
