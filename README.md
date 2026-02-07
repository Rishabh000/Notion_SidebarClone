# Notion Sidebar Clone

Replication of the **Notion Sidebar** built with Next.js, React, and Tailwind CSS.

## Reference Component

I chose the **Notion Sidebar** as the reference component for cloning. This includes the workspace switcher, navigation sections, page tree, search dialog, settings panel, trash panel, and sidebar footer, replicating the full sidebar experience.

## External Libraries & AI Tools Used

### Libraries
- **Next.js** (v16.1.6) — React framework
- **React** (v19.2.3) — UI library
- **Tailwind CSS** (v4) — Utility-first CSS framework
- **Lucide React** (v0.563.0) — Icon library

### AI Tools
- **ChatGPT** — Used for generating component logic and debugging
- **Cursor** — AI-powered code editor used for faster development and code suggestions

## Workflow Efficiency Report

1. **Inspecting & Copying Styles:** I used the browser DevTools (Inspect Element) on the actual Notion sidebar to extract exact CSS styles (colors, spacing, font sizes, etc.), which significantly sped up the visual replication process instead of eyeballing every value.

2. **AI-Assisted Development:** Using Cursor and ChatGPT to generate boilerplate code, and iterate on the sidebar's interactive behavior, reducing the overall development time.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.