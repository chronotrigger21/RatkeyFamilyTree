# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A web app for browsing the Ratkey family tree. Mobile-first, responsive design targeting phone browsers as the primary platform.

## Core Features

- **Main view**: Interactive visual diagram of the entire family tree
- **Navigation**: Pinch-to-zoom and pan to explore nodes and branches
- **Person nodes**: Display name, birth year, and death year
- **Relationships**: Visual connections showing family relationships
- **Person detail view**: Tap a node to see expanded information about that individual

## Design Principles

- Mobile-first: Design for phone screens, scale up for larger displays
- App-like UX: Should feel like a native app, not a traditional website
- Light and simple: Avoid unnecessary complexity in the tech stack

## Tech Stack

- **Framework**: SvelteKit - lightweight, compiles to vanilla JS, excellent mobile performance
- **Visualization**: D3.js - tree layout algorithms, SVG rendering
- **Styling**: CSS (Svelte scoped styles) - mobile-first approach
- **Gestures**: Native touch events for pinch-zoom and pan
