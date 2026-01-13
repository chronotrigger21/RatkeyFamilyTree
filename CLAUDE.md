# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A web app for browsing the Ratkey family tree. Mobile-first, responsive design targeting phone browsers as the primary platform.

## Core Features

- **Main view**: Interactive visual diagram of the entire family tree
- **Navigation**: Pinch-to-zoom and pan to explore nodes and branches
- **Person nodes**: Display name (split into first/last), birth year, death year, gender-colored background (blue/pink)
- **Relationships**: Visual connections showing family relationships via curved SVG paths
- **Person detail view**: Tap a node to see expanded bio page with photo, name, years, and biography sections

## Design Principles

- Mobile-first: Design for phone screens, scale up for larger displays
- App-like UX: Should feel like a native app, not a traditional website
- Light and simple: Avoid unnecessary complexity in the tech stack
- Prefer taller over wider: Node and layout decisions favor vertical space over horizontal

## Tech Stack

- **Framework**: SvelteKit - lightweight, compiles to vanilla JS, excellent mobile performance
- **Visualization**: D3.js - tree layout algorithms, SVG rendering, zoom/pan behavior
- **Styling**: CSS (Svelte scoped styles) - mobile-first approach
- **Gestures**: D3.zoom handles both touch (pinch-zoom, pan) and mouse (scroll, drag)
- **Language**: TypeScript

## Deployment

- **Hosting**: GitHub Pages (static site)
- **Adapter**: @sveltejs/adapter-static - generates static HTML/CSS/JS at build time
- **CI/CD**: GitHub Actions auto-deploys on push to `main`
- **Live URL**: https://chronotrigger21.github.io/RatkeyFamilyTree/

The app is fully static - all family tree data is bundled into the build (no server-side API).

## Development Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Build static site to /build
npm run preview  # Preview production build locally
```

## Project Structure

```
src/
  routes/
    +layout.svelte      # Root layout (global styles, font)
    +layout.ts          # Enables prerendering for all pages
    +page.svelte        # Home page (main tree view)
    person/[id]/
      +page.svelte      # Person detail page
      +page.ts          # Loads person data, defines prerender entries
  lib/
    components/
      FamilyTree.svelte # D3-based interactive tree visualization
    data/
      familyData.ts     # Types and sample family tree data
static/                 # Static assets (images, fonts, etc.)
```

## Data Model

### Person
```typescript
interface Person {
  id: string;           // URL-safe identifier (e.g., 'john-ratkey')
  name: string;         // Full name (e.g., 'John Ratkey')
  gender: 'male' | 'female';
  birthYear: number;
  deathYear?: number;   // Optional - omit if still living
  imageUrl?: string;    // Optional - placeholder shown if missing
  bio?: BioSection[];   // Optional - biography content
}
```

### BioSection
```typescript
interface BioSection {
  heading?: string;     // Optional section heading (e.g., 'Early Life')
  paragraphs: string[]; // One or more paragraphs of text
}
```

### FamilyNode
```typescript
interface FamilyNode {
  person: Person;
  children?: FamilyNode[];  // Hierarchical tree structure
}
```

## Key Implementation Notes

- **Tree visualization**: Uses D3's `tree()` layout with custom SVG rendering. Nodes are positioned by D3, then rendered as SVG groups with rect, circle, and text elements.
- **Navigation**: Clicking a node calls `goto()` to navigate to `/person/[id]`. The base path is prepended for GitHub Pages compatibility.
- **Prerendering**: All person detail pages are prerendered at build time. The `entries()` function in `+page.ts` generates the list of person IDs.
- **Scrolling**: The tree view uses `overflow: hidden` to enable D3 pan/zoom. Detail pages allow normal scrolling.

## Key Configuration

- `svelte.config.js` - Static adapter config, base path set to `/RatkeyFamilyTree` for GitHub Pages
- `.github/workflows/deploy.yml` - Auto-deployment workflow

## Future Considerations

- Replace sample data with real family tree data
- Add actual photos for family members
- Consider spouse pairing (side-by-side nodes connected by horizontal line)
- Search/filter functionality
- Multiple tree roots or family branches
