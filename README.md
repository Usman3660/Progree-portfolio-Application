# ⚡ Muhammad Usman — Visual Portfolio & Systems Portal

[![HTML5](https://img.shields.io/badge/HTML5-Semantic%20DOM-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Grid%20%26%20Flexbox-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B%20Vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Design-Fully%20Responsive-00C7B7?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
[![Accessibility](https://img.shields.io/badge/a11y-WCAG%202.1%20AAA-success?style=for-the-badge)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

A high-performance, fully responsive, and accessible visual portal & portfolio web application engineered for **Muhammad Usman** (Creative Technologist & Full-Stack Systems Architect based in Islamabad & Lahore, Pakistan).

Crafted with clean **Semantic HTML5**, fluid **CSS Grid & Flexbox systems**, **WebGL/Canvas particle physics**, an **interactive CLI terminal**, and a **multi-theme engine** (Dark Luxe, Cyberpunk Neon, and Clean Light).

---

## 🌟 Key Features & Architecture

### 1. 📐 Fluid CSS Grid & Flexbox Systems
- **Bento Grid Architecture**: Clean multi-column capabilities layout showcasing Frontend, Backend, Cloud & DevOps, and Architecture principles.
- **Interactive CSS Grid Sandbox**: Live interactive widget directly embedded in the Skills section allowing visitors to test 3-column, 2-column, 4-column, Auto-Fit, and Bento masonry layouts with real-time CSS code output.
- **Fluid Typography & Spacing**: Fully responsive design leveraging CSS `clamp()`, custom CSS design tokens, and media queries calibrated for mobile (320px+), tablets, laptops, and ultra-wide displays (1920px+).

### 2. 📱 Interactive Mobile Navigation Drawer
- **Drawer Navigation**: Smooth slide-in navigation drawer with backdrop blur overlay and auto-dismissal.
- **Pure CSS Animated Hamburger**: Fluid 3-line hamburger morphing to an "X" close state with touch feedback.
- **Keyboard & Touch Accessibility**: Full `Escape` key trapping, ARIA states (`aria-expanded`, `aria-hidden`, `aria-controls`), and focus handling.

### 3. 🎨 Multi-Theme Visual Engine
- **3 Curated Palettes**:
  - 🌌 **Dark Luxe**: Deep space obsidian (`#090a10`) with electric indigo (`#6366f1`) and cyber cyan accents.
  - ⚡ **Cyberpunk Neon**: Ultra-high contrast matrix green (`#00ffaa`) and vivid violet.
  - ☀️ **Clean Light**: High-contrast, crisp slate container (`#f8fafc`) with pristine syntax highlighting.
- **State Persistence**: Theme choice automatically preserved in `localStorage`.

### 4. 🔮 Dynamic Visual Effects & Micro-Interactions
- **Canvas Particle Mesh**: High-performance interactive background particle network with mouse proximity repel forces and distance-based connecting vectors.
- **3D Tilt Perspective**: Interactive 3D tilt tracking with specular lighting reflections on the Hero portal card.
- **Typewriter Role Rotator**: Dynamic role cycler in the hero banner.
- **Live Counter Engine**: Numeric milestone counter animated smoothly upon viewport entry via `IntersectionObserver`.

### 5. 💻 Embedded Interactive CLI Terminal
- Launchable from the header or keyboard shortcut.
- Includes commands:
  - `help` &mdash; Lists available commands.
  - `skills` &mdash; Outputs core frontend, backend, and DevOps proficiencies.
  - `projects` &mdash; Lists active flagship architecture projects.
  - `about` &mdash; Displays biographical and location summary.
  - `contact` &mdash; Shows direct communication endpoints.
  - `theme [dark|cyber|light]` &mdash; Switches stylesheet directly from terminal.
  - `matrix` &mdash; Activates matrix cyber mode.
  - `whoami` &mdash; Displays authenticated user status.
  - `clear` &mdash; Clears the terminal screen buffer.

### 6. 📂 Project Showcase & Modal Dialogs
- **Category Filter Tabs**: Dynamic category filtering (`All`, `Full-Stack Platforms`, `3D & WebGL`, `Cloud & Systems`, `UI/UX & Mobile`).
- **Accessible Case Study Modals**: Native HTML5 `<dialog>` component with comprehensive architectural overviews, milestone breakdowns, tech stacks, and live instance/GitHub buttons.

### 7. 📬 Interactive Contact Form & Toast Notifications
- **Real-Time Input Validation**: Real-time checking for name, email formatting, and message length with error styling.
- **Character Counter**: Live `textarea` character tracker (`0 / 1000`).
- **Simulated Transmit**: Animated loading state with toast notification popups.

---

## 📁 Repository Structure

```
.
├── index.html          # Semantic HTML5 structure & accessibility markup
├── css/
│   └── style.css       # Complete design tokens, CSS Grid, animations & themes
├── js/
│   └── main.js         # Particle canvas, mobile menu, modals, filters & CLI
└── README.md           # Comprehensive project documentation
```

---

## 🚀 Quick Start Guide

### 1. Clone the Repository
```bash
git clone https://github.com/muhammadusman-dev/portfolio-portal.git
cd portfolio-portal
```

### 2. Run Locally

#### Option A: Using Node.js / NPX (Recommended)
```bash
# Start a local static preview server
npx serve .
```
Then open `http://localhost:3000` (or the displayed port) in your browser.

#### Option B: Using Python 3
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

#### Option C: Direct Browser Opening
Simply double-click `index.html` or open it in Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari.

---

## 🛠️ Tech Stack & Technologies

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Markup** | HTML5 Semantic DOM | Full semantic tag hierarchy, `<dialog>`, `<aside>`, `<nav>`, `<article>`, `<header>`, `<footer>` |
| **Styling** | Vanilla CSS3 | Custom CSS Grid, Flexbox, CSS Custom Properties (`var(--token)`), `clamp()`, Glassmorphism |
| **Logic** | Vanilla JavaScript ES6+ | Zero external framework dependencies; pure modular functions, `IntersectionObserver`, Web Canvas 2D |
| **Typography** | Google Fonts | `Plus Jakarta Sans`, `Outfit`, `JetBrains Mono` |
| **Icons** | Custom Inline SVG | Pixel-perfect scalable vector icons with zero network overhead |

---

## ⚙️ Customization

### Updating Personal Information
Edit [`index.html`](index.html):
- **Name & Title**: Update `<title>`, `<h1>`, and brand logo text.
- **Location**: Modify location tags (`Islamabad & Lahore, Pakistan`).
- **Bio & Paragraphs**: Update the `#about` section copy.
- **Social Links**: Replace placeholder URLs (`github.com`, `linkedin.com`, `twitter.com`).

### Adding / Modifying Projects
In [`js/main.js`](js/main.js), locate the `projectDatabase` object:
```javascript
const projectDatabase = {
  'your-project-id': {
    title: 'Your Project Title',
    category: 'Full-Stack Platform',
    timeline: '3 Months • 2026',
    architecture: 'Tech Stack List',
    overview: 'Detailed description of the project...',
    highlights: ['Key achievement 1', 'Key achievement 2'],
    liveUrl: 'https://your-demo.com',
    githubUrl: 'https://github.com/your-repo'
  }
};
```

---

## ♿ Accessibility (a11y) Compliance

- ✅ **Semantic Structure**: Meaningful heading hierarchy (`<h1>` through `<h4>`).
- ✅ **Keyboard Navigable**: Full tab-focus loop, `:focus-visible` outlines, and `Escape` key close handlers.
- ✅ **ARIA Attributes**: `aria-expanded`, `aria-hidden`, `aria-live`, `aria-controls`, and `role="tab"`.
- ✅ **Contrast Compliance**: WCAG AAA compliant color ratios in both Dark and Light modes.
- ✅ **Screen-Reader Friendly**: Skip links (`#main-content`) and descriptive button labels.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more details.

---

## 👨‍💻 Author

**Muhammad Usman**  
*Principal Systems Architect & Creative Technologist*  
📍 Islamabad & Lahore, Pakistan  
📧 [usman.dev@portfolio.pk](mailto:usman.dev@portfolio.pk)  
🌐 [LinkedIn](https://linkedin.com) &bull; [GitHub](https://github.com)
