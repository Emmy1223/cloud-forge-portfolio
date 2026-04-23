
# Faleti Emmanuel — Personal Portfolio

A premium, dark-themed single-page portfolio for a Cloud Engineer & Cybersecurity student, built with strong typography, glassmorphism, and subtle motion.

## Design System
- **Theme**: Deep dark base (near-black with a hint of indigo) with blue→purple gradient accents
- **Typography**: Inter (body) + tighter, bolder display weights for headings
- **Surfaces**: Glassmorphism cards (subtle blur, low-opacity borders, soft inner glow)
- **Radius**: Medium-large rounded corners throughout
- **Motion**: Fade-in on load, scroll-triggered reveals, hover scale + glow on cards, smooth section scrolling
- **Background ambience**: Animated gradient blobs + faint particle/glow layer in hero

## Page Sections (single-page, anchor-scroll)

### 1. Sticky Navigation
- Translucent glass nav bar with blur-on-scroll
- Logo mark "FE" + links: About, Skills, Projects, Experience, Education, Contact
- Mobile: hamburger → slide-in sheet menu

### 2. Hero
- Full-screen, centered
- Animated gradient + soft particle/glow background
- Floating abstract cloud/server shapes (subtle parallax)
- Name: **Faleti Emmanuel** (large, bold, gradient highlight)
- Subtitle: Cloud Engineer and Cybersecurity Enthusiast
- Description paragraph as provided
- Two CTAs: **View Projects** (primary gradient) · **Contact Me** (ghost/outline)
- Scroll indicator at bottom

### 3. About
- Two-column: text left, glass visual card right
- Visual card: stylized "stack" graphic (cloud / shield / terminal icons in a layered glass panel)
- Both paragraphs from prompt
- Scroll fade-in animation

### 4. Skills
- 4-card responsive grid (1 / 2 / 4 cols)
- Cards: Cloud & Infrastructure · Networking & Security · Development & Tools · Operations & Support
- Each card: Lucide icon (Cloud, Shield, Code2, Activity), title, listed skills as chips
- Hover: scale up + glow border

### 5. Featured Projects
- 2-card responsive grid
- **Cloud File Uploader** — Python · AWS · Cloud
- **Server Monitoring Tool** — Python · Monitoring · DevOps
- Each card: gradient header strip, title, description, tag chips, "View Project" button
- Hover lift + glow

### 6. Experience (Timeline)
- Vertical timeline with gradient line + glowing dots
- Three entries with role, company, date, location, bullet achievements
- Glass cards alternating sides on desktop, stacked on mobile

### 7. Education
- Centered glass card
- Osun State University · Bachelor's Degree in Cybersecurity
- Graduation cap icon

### 8. Certifications
- Badge-style grid (4 items)
- Each badge: award icon + cert name in glass pill card
- Subtle hover glow

### 9. Contact
- Centered "Let's Build Something" headline
- Three info rows (phone, email, location) with icons
- Primary "Get In Touch" CTA → opens mailto
- Email link is clickable

### 10. Footer
- Minimal: name, year, small social/contact icons

## Technical Notes
- Update `index.css` with dark theme tokens, gradient utilities, glass utility classes
- Add Inter via Google Fonts in `index.html`
- Extend Tailwind with fade/float/glow keyframes and gradient color tokens
- Build modular section components under `src/components/sections/`
- Replace `src/pages/Index.tsx` to compose all sections
- Smooth scroll via `scroll-behavior: smooth` + anchor IDs
- Fully responsive, mobile-first
