# 🎡 Wheel of Career Assessment

A structured self-assessment web application that evaluates **8 key dimensions of career health**. This tool helps employees reflect on their current career status, identify strengths and development areas, and support career coaching, mentoring, and development conversations.

---

## ✨ Features

| Feature | Description |
|---|---|
| **40-Question Assessment** | 8 sections × 5 questions, each rated on a 5-point scale (A–E) |
| **Radar Chart Visualization** | Interactive Chart.js radar wheel showing scores across all 8 dimensions |
| **Personalized Insights** | Tailored feedback for each dimension based on score bands |
| **Score Interpretation** | Color-coded cards with interpretation badges (Strong / Good / Needs Attention / Priority) |
| **PDF Export** | Download a complete multi-page PDF report of your results |
| **Reflection Prompts** | 6 guided questions for self-development planning |
| **Retake Assessment** | Start over with confirmation dialog — all data is cleared |
| **Fully Accessible** | ARIA roles, keyboard navigation, focus management, reduced-motion support |
| **Privacy-First** | No backend, no data storage — everything stays in your browser session |

---

## 🎯 Career Dimensions Assessed

| # | Dimension | Focus Area |
|---|---|---|
| 1 | 🎯 **Role Clarity** | Understanding expectations, priorities, and decision-making authority |
| 2 | 📈 **Performance & Impact** | Delivering measurable results and business value |
| 3 | 🛠️ **Skills & Capability** | Current competencies and future skill development |
| 4 | 🚀 **Career Growth** | Career path clarity, progression pace, and development opportunities |
| 5 | 👥 **Leadership & Influence** | Trust, ownership, communication, and ability to guide others |
| 6 | 🤝 **Network & Relationships** | Stakeholder relationships, mentors, and professional network |
| 7 | 🏆 **Compensation & Recognition** | Fair rewards, visibility, and motivating recognition |
| 8 | ⚖️ **Workload & Sustainability** | Manageable workload, energy levels, and long-term sustainability |

---

## 📊 Scoring System

Each question is scored 1–5. Per section:

```
Raw Score   = Sum of 5 answers (range: 5–25)
Wheel Score = (Raw Score / 25) × 10, rounded to 1 decimal (range: 2.0–10.0)
```

### Interpretation Bands

| Score Range | Interpretation | Color |
|---|---|---|
| 8.0 – 10.0 | ✅ Strong and healthy area | Green |
| 6.0 – 7.9 | 🟡 Good, but can be improved | Amber |
| 4.0 – 5.9 | 🟠 Needs attention | Orange |
| 0.0 – 3.9 | 🔴 Priority development area | Red |

### Example Calculation

> **Role Clarity:** D, E, C, D, C → 4 + 5 + 3 + 4 + 3 = **19** → (19/25) × 10 = **7.6** → "Good, but can be improved"

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Build Tool | [Vite](https://vitejs.dev/) | Fast dev server, ESM-native bundling |
| Language | Vanilla JavaScript (ES2022+) | No framework overhead, minimal bundle |
| Styling | Vanilla CSS with custom properties | Full design system control |
| Charts | [Chart.js](https://www.chartjs.org/) v4 | Radar chart visualization |
| PDF Export | [html2canvas](https://html2canvas.hertzen.com/) + [jsPDF](https://github.com/parallax/jsPDF) | Browser-based PDF generation |
| Fonts | [Google Fonts](https://fonts.google.com/) — Inter + Outfit | Modern, professional typography |
| Content | `data/assessment.json` | All questions, answers, insights — edit without code changes |

---

## 📂 Project Structure

```
Wheel of career/
├── index.html                     # SPA entry point
├── package.json                   # Dependencies & scripts
├── data/
│   └── assessment.json            # All 40 questions, insights, and interpretation config
├── src/
│   ├── main.js                    # App entry, data loading, router init
│   ├── state.js                   # In-memory state store (no persistence)
│   ├── router.js                  # Hash-based SPA router
│   ├── pages/
│   │   ├── landing.js             # Landing page with CTA
│   │   ├── assessment.js          # Assessment flow (section-by-section)
│   │   └── results.js             # Results page with wheel, scores, insights
│   ├── utils/
│   │   ├── scoring.js             # Score calculation engine
│   │   └── pdf-export.js          # PDF generation
│   └── styles/
│       ├── index.css              # Design system tokens, components, animations
│       ├── landing.css            # Landing page styles
│       ├── assessment.css         # Assessment flow styles
│       └── results.css            # Results page styles
├── public/
│   ├── favicon.svg                # Custom wheel favicon
│   └── icons.svg                  # SVG icon sprite
├── wheel_of_career_brsd.md        # Business Requirements Specification Document
└── wheel_of_career_assessment.md  # Original assessment content
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ (LTS recommended)
- npm v9+

### Installation

```bash
# Clone the repository
git clone https://github.com/falsafat/Wheel-of-Career-Assessment.git
cd Wheel-of-Career-Assessment

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:5173/**

### Production Build

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

The production bundle is output to the `dist/` directory and can be deployed to any static hosting provider.

---

## 🌐 Deployment

This is a static site — deploy the `dist/` folder to any hosting service:

| Service | Command |
|---|---|
| **GitHub Pages** | Push `dist/` to `gh-pages` branch or use GitHub Actions |
| **Netlify** | Set build command: `npm run build`, publish directory: `dist` |
| **Vercel** | Set framework preset: `Vite`, output directory: `dist` |
| **Any web server** | Serve the `dist/` folder as static files |

---

## ✏️ Customizing Content

All assessment content is stored in [`data/assessment.json`](data/assessment.json). You can modify:

- **Questions** — Edit text, answer options, and scoring values
- **Sections** — Add, remove, or rename career dimensions
- **Section Colors** — Change the hex color for each dimension
- **Insights** — Update personalized feedback for high/medium/low score bands
- **Interpretation Bands** — Adjust the score ranges and labels
- **Reflection Questions** — Edit or add self-development prompts
- **Meta Information** — Update title, description, estimated time, privacy notice, and disclaimer

> **No code changes required** — just edit the JSON file and rebuild.

---

## ♿ Accessibility

The application follows WCAG 2.1 AA guidelines:

- **Skip-to-content** link for keyboard users
- **ARIA roles** and landmarks on all pages (`main`, `navigation`, `dialog`, `radiogroup`)
- **Focus management** — programmatic focus on page transitions
- **Keyboard navigation** — Arrow keys within option groups, Tab between elements
- **Focus trapping** in modal dialogs
- **Reduced motion** — respects `prefers-reduced-motion` system preference
- **Screen reader support** — `aria-live` regions for dynamic content updates
- **Color contrast** — WCAG AA compliant dark mode palette

---

## 🔒 Privacy & Security

This application is designed with the strongest privacy posture:

- **No backend server** — all processing happens in the browser
- **No data storage** — responses are never saved to localStorage, cookies, or any database
- **No network requests** — assessment data is bundled with the app
- **Ephemeral data** — all answers are cleared when you close the tab or retake the assessment
- **No tracking** — no analytics, telemetry, or third-party scripts

---

## 📄 License

This project is proprietary and intended for internal organizational use.

---

## 📝 Business Requirements

For the full specification, see the [Business Requirements Specification Document](wheel_of_career_brsd.md).
