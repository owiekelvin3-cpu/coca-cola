# Coca-Cola Nigeria — Premium Brand Experience

A world-class, cinematic, 3D-enhanced website for Coca-Cola Nigeria. Built with Next.js, Three.js, GSAP, and Framer Motion.

## 🎯 Project Philosophy

This is NOT a website. This is a **living brand experience**.

- **Emotion first, UI second**
- **Motion first, layout second**
- **Story first, components second**

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4 (custom config)
- **3D**: Three.js + React Three Fiber + Drei
- **Animation**: GSAP + Framer Motion
- **Smooth Scroll**: Lenis
- **Performance**: Optimized for production

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Design System

### Colors
- **Coke Red**: `#F40009`
- **Coke Black**: `#0A0A0A`
- **Coke White**: `#F8F4F0`
- **Fanta Orange**: `#FF6B00`
- **Sprite Green**: `#00A651`
- **Schweppes Gold**: `#C9A84C`

### Typography
- **Display Font**: Helvetica Neue / Arial Black (tight tracking, bold)
- **Body Font**: Helvetica Neue / Arial (clean, readable)

### Animation Principles
- **Cinematic transitions** (Apple/Nike style)
- **Smooth scroll** with Lenis
- **GSAP ScrollTrigger** for parallax and reveals
- **Framer Motion** for micro-interactions
- **3D WebGL** for hero bottle scene

## 📁 Project Structure

```
coca-cola-ng/
├── app/
│   ├── page.tsx              # Home (Experience)
│   ├── brands/page.tsx       # Brands Ecosystem
│   ├── campaigns/page.tsx    # Interactive Campaigns
│   ├── impact/page.tsx       # Impact & Sustainability
│   ├── about/page.tsx        # About / Company
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── three/
│   │   ├── CokeBottle.tsx    # 3D Coke bottle
│   │   └── HeroScene.tsx     # Hero 3D scene
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── CampaignShowcase.tsx
│   │   ├── BrandMoments.tsx
│   │   ├── BrandsTeaser.tsx
│   │   ├── ImpactTeaser.tsx
│   │   └── Footer.tsx
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   └── PageTransition.tsx
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx
│   └── ui/
│       └── CustomCursor.tsx
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
├── next.config.ts            # Next.js configuration
└── tsconfig.json             # TypeScript configuration
```

## 🎬 Key Features

### 1. **Hero Section**
- Fullscreen immersive 3D experience
- Floating Coke bottle with realistic lighting
- Parallax scroll effects
- Dynamic background gradients
- Animated text reveals

### 2. **Campaign Showcase**
- Scroll-based storytelling
- Interactive campaign cards
- Smooth transitions
- Sticky visual panels

### 3. **Brand Moments**
- Music, culture, lifestyle sections
- Animated marquee
- Hover interactions
- Statistical highlights

### 4. **Brands Ecosystem**
- Coca-Cola, Fanta, Sprite, Schweppes
- Each brand has unique visual identity
- Scroll-triggered animations
- Brand-specific color schemes

### 5. **Impact & Sustainability**
- Animated data visualizations
- Progress bars with scroll triggers
- UN SDG alignment
- Community impact stories

### 6. **Custom Cursor**
- Dot + ring cursor system
- Hover state transformations
- Smooth following animation

### 7. **Smooth Scrolling**
- Lenis smooth scroll
- GSAP ScrollTrigger integration
- Parallax effects
- Scroll-based reveals

## 🎯 Performance Optimizations

- **Lazy loading** for 3D assets
- **Suspense boundaries** for code splitting
- **Dynamic imports** for heavy components
- **Optimized textures** for WebGL
- **Image optimization** with Next.js
- **Font optimization** with system fonts

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`
- Touch-optimized interactions
- Adaptive 3D rendering

## 🎨 Design Principles

### What This Is:
✅ Premium brand experience  
✅ Cinematic storytelling  
✅ Emotional connection  
✅ Cultural relevance  
✅ Motion-first design  

### What This Is NOT:
❌ Generic template  
❌ Bootstrap-style layout  
❌ Card-based UI  
❌ SaaS-looking design  
❌ AI-generated patterns  

## 🚀 Deployment

```bash
# Build for production
npm run build

# Test production build locally
npm start

# Deploy to Vercel (recommended)
vercel deploy
```

## 📄 License

© 2024 The Coca-Cola Company. All rights reserved.

---

**Built with passion for the Nigerian market.**  
**Open Happiness. Taste the Feeling.**
