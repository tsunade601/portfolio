# Roberto Pires — Full-Stack Developer Portfolio

A modern, high-performance personal portfolio website built with React 19, TypeScript, Vite, and Tailwind CSS v4. Engineered with precision, smooth animations, interactive case studies, accessible navigation, and comprehensive dark/light mode support.

## ✨ Features & Enhancements

- **Modern & Premium UI**: Deep slate dark mode (`#030712`) and clean slate light mode with glassmorphism surfaces, responsive typography, and glowing radial mesh backgrounds.
- **Interactive Project Showcase**:
  - Live search input to filter projects by title, description, or technology stack.
  - Category filter pills with dynamic count badges (`All`, `SaaS`, `Open Source`, `Community`, `Mobile`, `AI/ML`, `Finance`).
  - Interactive project detail modal presenting in-depth case studies, key technical challenges solved, architecture, and live links.
  - Clickable tech stack badges that instantly filter related projects.
- **Digital Résumé / CV Modal**:
  - Interactive digital curriculum vitae modal accessible from both the Hero and About sections.
  - Native print and PDF export styling (`window.print()`) with print-optimized media queries.
- **Robust Contact Form Validation**:
  - Real-time inline field validation (name, email RFC regex, subject, and message length).
  - Dynamic character counter (`x / 1000 characters`).
  - One-click "Copy Email" and "Copy Message" with instant clipboard toast confirmation.
  - Automatic `mailto:` client handoff with pre-populated subject and message body.
- **Smooth Animations & Scroll Effects**:
  - Viewport-aware scroll reveal animations powered by `IntersectionObserver`.
  - Top reading scroll progress bar indicating document position.
  - Floating circular Back-to-Top button displaying real-time scroll completion.
  - Cursor-following spotlight card glow (`--mouse-x`, `--mouse-y`) optimized with `requestAnimationFrame`.
  - Interactive hero particle canvas with responsive physics, cursor repulsion, and touch support.
  - Typewriter header with animated caret and multiple professional roles.
  - Animated numerical counters for experience stats.
- **Accessible & Mobile-First**:
  - Semantic HTML5 landmark tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
  - WCAG 2.1 AA keyboard accessibility with "Skip to main content" link and focus rings.
  - Responsive mobile navigation drawer with backdrop blur, outside-click listener, and Escape key dismissal.
- **Dark / Light Theme Persistence**:
  - Seamless theme toggle storing user preference in `localStorage` with system `prefers-color-scheme` fallback.

## 🛠️ Tech Stack

- **Framework**: React 19
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS v4
- **Bundler**: Vite 7
- **Utilities**: `clsx`, `tailwind-merge`

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/tsunade601/portfolio.git
cd portfolio
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```text
portfolio/
├── public/
│   └── images/
│       └── roberto.jpg          # Profile avatar
├── src/
│   ├── components/
│   │   ├── About.tsx            # Bio, pillars, and animated stats
│   │   ├── Contact.tsx          # Validated contact form & direct reach
│   │   ├── Experience.tsx       # Interactive career timeline
│   │   ├── Footer.tsx           # Footer with links & quick back to top
│   │   ├── Hero.tsx             # Particle canvas, typewriter, and CTAs
│   │   ├── Navbar.tsx           # Navigation bar, progress bar, & theme toggle
│   │   ├── ProjectModal.tsx     # Case study inspection modal
│   │   ├── Projects.tsx         # Filterable & searchable project cards
│   │   ├── ResumeModal.tsx      # Digital CV with print & PDF export
│   │   ├── ScrollToTop.tsx      # Floating circular scroll-to-top button
│   │   ├── SectionHeader.tsx    # Standardized section headings
│   │   ├── Skills.tsx           # Progress bars, tools & architectural principles
│   │   └── layout.ts            # Layout spacing & card surface tokens
│   ├── context/
│   │   └── ThemeContext.tsx     # Theme provider (dark / light mode)
│   ├── hooks/
│   │   ├── useParticles.ts      # Canvas particle simulation hook
│   │   └── useScrollReveal.ts   # IntersectionObserver scroll reveal hook
│   ├── utils/
│   │   └── cn.ts                # Tailwind class merge helper
│   ├── App.tsx                  # Main app shell & spotlight tracking
│   ├── index.css                # Global Tailwind styles & animation keyframes
│   └── main.tsx                 # Application entry point
├── index.html                   # HTML template & fonts
├── package.json                 # Project dependencies & scripts
├── tsconfig.json                # TypeScript configuration
└── vite.config.ts               # Vite configuration
```

## 📄 License

MIT © [Roberto Pires](https://github.com/tsunade601)
