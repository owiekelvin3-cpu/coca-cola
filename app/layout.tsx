import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import AnimationProvider from "@/components/providers/AnimationProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import SectionTransition from "@/components/ui/SectionTransition";
import WebVitals from "@/components/providers/WebVitals";
import ReducedMotion from "@/components/providers/ReducedMotion";
import ModelPreloader from "@/components/three/ModelPreloader";
import Navigation from "@/components/layout/Navigation";
import AppShell from "@/components/layout/AppShell";
import ScrollToTop from "@/components/layout/ScrollToTop";
import ServiceWorkerProvider from "@/components/providers/ServiceWorkerProvider";
import FloatingCan from "@/components/ui/FloatingCan";
import ScrollProgress from "@/components/ui/ScrollProgress";

export const metadata: Metadata = {
  title: "Coca-Cola Nigeria — Open Happiness",
  description: "Coca-Cola Nigeria — refreshing moments, inspiring stories, and a taste of happiness.",
  keywords: ["Coca-Cola", "Nigeria", "Fanta", "Sprite", "Schweppes"],
  openGraph: {
    title: "Coca-Cola Nigeria — Open Happiness",
    description: "Experience the world's most iconic brand.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />

        {/* Sketchfab — preconnect so DNS+TLS is ready before iframes load */}
        <link rel="preconnect" href="https://sketchfab.com" />
        <link rel="preconnect" href="https://media.sketchfab.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://static.sketchfab.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://sketchfab.com" />
        <link rel="dns-prefetch" href="https://media.sketchfab.com" />
        <link rel="dns-prefetch" href="https://static.sketchfab.com" />

        {/* Preload hero video for instant playback */}
        <link rel="preload" as="video" href="/media/videos/coke-for-everyone.mp4" />
        {/* Preload logo */}
        <link rel="preload" as="image" href="/media/images/logo.png" />
      </head>
      <body className="antialiased body-root">
        <SmoothScrollProvider>
          <ScrollToTop />
          <ServiceWorkerProvider />
          <ScrollProgress />
          <CustomCursor />
          <AnimationProvider>
            <WebVitals />
            <ReducedMotion />
            <SectionTransition />
            <ModelPreloader />
            <FloatingCan />
            <AppShell>
              <Navigation />
              {children}
            </AppShell>
          </AnimationProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
