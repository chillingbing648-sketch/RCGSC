# RCGSC — Rotaract Club of Ghanshyamdas Saraf College

> **Practice / Development Website**
>
> This website is currently a practice and development implementation created for the RCGSC project. It is **not intended to represent the final official website or permanent ownership of the club**.
>
> The website will soon be transferred to the **original RCGSC members and the authorized website holders/administrators** for their continued use, review, ownership, and future updates.

[![Deploy](https://github.com/chillingbing648-sketch/RCGSC/actions/workflows/deploy.yml/badge.svg)](https://github.com/chillingbing648-sketch/RCGSC/actions/workflows/deploy.yml)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-222?logo=github)](https://pages.github.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=111)](https://react.dev/)

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
| GitHub Actions deployment | Automated |
| GitHub Pages preview | Active after Pages setup |
| Official ownership | Pending transfer |
| Final official content | To be reviewed by RCGSC |

## Technology

- **React 18** — UI architecture
- **Vite 5** — development and production build tooling
- **Framer Motion** — interface motion
- **GSAP** — advanced animation
- **Lenis** — smooth scrolling
- **CSS / Responsive Design** — presentation and layout
- **GitHub Actions** — automated deployment
- **GitHub Pages** — practice hosting

## Project Structure

```text
RCGSC/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
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

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

The repository uses **GitHub Actions + GitHub Pages**.

Every push to `main`:

1. Installs dependencies with `npm ci`
2. Builds the Vite application
3. Packages the generated `dist` directory
4. Publishes the artifact to GitHub Pages

The workflow can also be started manually from the **Actions** tab.

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

This project is being developed as a practical web-development implementation and learning project. The current design and implementation may continue to change before the official handover.

Please avoid treating temporary content, placeholder information, or development decisions as final club policy or official communication.

## License

This project is currently intended for **RCGSC practice, review, development, and eventual handover**. Final licensing, ownership, and usage terms should be determined by the authorized RCGSC website holders during the transfer.

---

### RCGSC

**Rotaract Club of Ghanshyamdas Saraf College**

Practice website • Development preview • Intended for future official handover
