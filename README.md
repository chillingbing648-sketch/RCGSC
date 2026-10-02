<<<<<<< HEAD
# RCGSC — Rotaract Club of Ghanshyamdas Saraf College

> **Practice / Development Website**
>
> This website is currently a practice and development implementation created for the RCGSC project. It is **not intended to represent the final official website or permanent ownership of the club**.
>
> The website will soon be transferred to the **original RCGSC members and the authorized website holders/administrators** for their continued use, review, ownership, and future updates.

[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-222?logo=github)](https://pages.github.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=111)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-13-0055FF?logo=framer&logoColor=white)](https://motion.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=111)](https://gsap.com/)
[![Lenis](https://img.shields.io/badge/Lenis-1.3-111111?logoColor=white)](https://lenis.darkroom.engineering/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ESM-F7DF1E?logo=javascript&logoColor=111)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Responsive-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)](https://github.com/features/actions)

<p align="center">
  <img src="./public/rcgsc-preview.svg" alt="RCGSC practice website preview" width="100%">
</p>

## Live Practice Preview

**GitHub Pages:**  
https://chillingbing648-sketch.github.io/RCGSC/

The live deployment is provided for **practice, demonstration, testing, and review** while the project is being prepared for transfer.

## About

RCGSC is a modern web experience for the **Rotaract Club of Ghanshyamdas Saraf College**.

The current implementation focuses on building a polished digital presence with a modern React interface, motion, structured club content, and a responsive presentation suitable for future refinement by the original club team.

## Current Status

| Area | Status |
| --- | --- |
| Website implementation | Practice / Development |
| React application | Active |
| Responsive UI | Active |
| GitHub repository | Active |
| GitHub Pages preview | Active after Pages setup |
| Official ownership | Pending transfer |
| Final official content | To be reviewed by RCGSC |

## Technology Stack

| Technology | Purpose |
| --- | --- |
| React 18 | UI architecture |
| Vite 5 | Development and production builds |
| Framer Motion | Interface motion |
| GSAP | Advanced animation |
| Lenis | Smooth scrolling |
| JavaScript / ESM | Application logic |
| CSS3 | Styling and responsive design |
| Node.js | Development environment |
| GitHub Actions | Automated deployment |
| GitHub Pages | Practice hosting |

## Project Structure

```text
RCGSC/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   └── rcgsc-preview.svg
├── src/
│   ├── components/
│   ├── lib/
│   ├── styles/
│   ├── App.jsx
│   ├── content.js
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Local Development

Requirements:

- Node.js 20+
- npm

```bash
npm ci
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Deployment

The repository uses **GitHub Actions + GitHub Pages**.

Every push to `main` builds the Vite application and publishes the generated `dist` directory to GitHub Pages. The workflow can also be started manually from the **Actions** tab.

## Ownership & Transfer Notice

This repository currently represents a **practice/development version** of the RCGSC website.

The intent is for the website and its future official use to be transferred to the **original RCGSC members and the authorized website holders**. Until that transfer is completed, this repository and its live deployment should be treated as a development/practice implementation rather than the final official RCGSC website.

Official club representatives should review and approve:

- Club information
- Member information
- Contact details
- Images and media
- Social links
- Branding
- Policies and notices
- Final website content

## Development Notes

This project is being developed as a practical web-development implementation and learning project. The design and implementation may continue to change before the official handover.

Temporary content, placeholder information, and development decisions should not be treated as final club policy or official communication.

## License

This project is currently intended for **RCGSC practice, review, development, and eventual handover**. Final licensing, ownership, and usage terms should be determined by the authorized RCGSC website holders.

---

### RCGSC

**Rotaract Club of Ghanshyamdas Saraf College**

Practice website • Development preview • Intended for future official handover
=======
# RCGSC

Website for the Rotaract Club of Ghanshyamdas Saraf College (RCGSC), part of Rotaract District 3141 in Malad West, Mumbai. The site presents the club, its service avenues, milestones, and gallery.

## Tech Stack

- React 18
- Vite
- Framer Motion, GSAP, and Lenis for animation and scrolling

## Getting Started

Requires Node.js and npm.

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Available Commands

```bash
npm run dev      # Start the development server
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
```

## Project Structure

- `src/components/` - Site sections and shared UI components
- `src/content.js` - Club copy and gallery content
- `src/lib/` - Shared utilities
- `src/styles/` - Global and section styles
- `public/images/` - Static image assets

Update club details and page copy in `src/content.js`; add or replace static images in `public/images/`.
>>>>>>> 8e907b5 (Added Better Group Images)
