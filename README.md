# Erica Santini — Portfolio

A multilingual portfolio website for presenting my background, professional experience, education, and projects. I’m also building it as a hands-on project to learn React and strengthen my web development skills.

**Live site:** [erica-santini.ca](https://erica-santini.ca)

## Features

- Content in English, French, and Portuguese
- Home, Journey, and Projects pages
- Light and dark themes
- Project cards with image and video galleries
- Expanded media viewer with controls to move between project assets
- Optional color editor for local development

## Built with

- React
- TypeScript
- Vite
- React Router
- i18next and react-i18next
- CSS

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

To show the color editor locally, add this to a `.env.local` file in the project root:

```env
VITE_SHOW_COLOR_CUSTOMIZER=true
```

The editor is restricted to local development and is not shown on the deployed site.

## Useful commands

```bash
npm run lint
npm run build
npm run check
npm run preview
```

`npm run check` runs the linter and production build.
