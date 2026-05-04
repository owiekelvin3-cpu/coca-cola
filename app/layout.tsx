import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import Navigation from "@/components/layout/Navigation";
import PageTransition from "@/components/layout/PageTransition";

export const metadata: Metadata = {
  title: "Coca-Cola Nigeria — Open Happiness",
  description:
    "Experience the world's most iconic brand. Coca-Cola Nigeria — refreshing moments, inspiring stories, and a taste of happiness.",
  keywords: ["Coca-Cola", "Nigeria", "Fanta", "Sprite", "Schweppes", "beverages"],
  openGraph: {
    title: "Coca-Cola Nigeria — Open Happiness",
    description: "Experience the world's most iconic brand.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-coke-black text-coke-white antialiased">
        <SmoothScrollProvider>
          <CustomCursor />
          <Navigation />
          <PageTransition>
            {children}
          </PageTransition>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
