# SWE-363 Portfolio 3 — Abdulrahman Alomar

![Status: Active](https://img.shields.io/badge/Status-Active-22c55e)

## Project Description

This project is the third iteration of an interactive portfolio website for SWE-363. Building on Assignments 1 and 2, it introduces **external API integration**, **complex filtering and sorting logic**, **visitor state management**, and **performance optimizations** — all implemented with vanilla HTML, CSS, and JavaScript.

### Key Additions in Assignment 3

- **GitHub API** — Fetches and displays public repositories dynamically
- **Quotes API** — Shows random inspirational quotes from an external service
- **Weather API** — Displays current weather information for Dhahran
- **Project Filtering & Sorting** — Filter by category and skill level, sort by date or name
- **Visitor State Management** — Simulated login/logout with `localStorage`, greeting banner, and session timer
- **Advanced Form Validation** — Subject field, character counter, minimum length checks, real-time feedback
- **Performance** — Lazy-loaded API data, efficient DOM rendering, clean CSS architecture

## File Structure

```text
202263820-abdualrhmanalomar-assignment3/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

## Features

### API Integration
- **GitHub Repositories** — Fetches repos from the GitHub REST API and renders them as cards with language, stars, and forks
- **Inspirational Quotes** — Pulls random quotes from the DummyJSON Quotes API with fallback data if the API is unavailable
- **Weather Widget** — Shows current temperature and conditions for Dhahran via the wttr.in API

### Complex Logic
- **Project Filtering** — Filter projects by category (Web, AI, Mobile) and skill level (Beginner, Intermediate, Advanced)
- **Project Sorting** — Sort by newest, oldest, or alphabetical order (A–Z or Z–A)
- **Multi-step Form Validation** — Validates name length, email format, subject selection, and message length with real-time inline feedback
- **Visitor Timer** — Tracks and displays how long the visitor has been on the site

### State Management
- **Dark/Light Theme** — Toggled and persisted via `localStorage`
- **Visitor Login/Logout** — Stores and displays visitor name across page reloads
- **Greeting Banner** — Shows personalized welcome message and session timer when logged in
- **Filter Preferences** — Project filters respond dynamically to user selections

### Performance
- Efficient DOM rendering with `document.createElement` instead of `innerHTML` for large lists
- API data fetched only when needed (lazy loading GitHub tab)
- Clean CSS using custom properties for easy theme switching
- Responsive design with mobile-first media queries

## Setup Instructions

1. Download or clone the repository:
   ```bash
   git clone https://github.com/Alomar04/202263820-abdualrhmanalomar-assignment3.git
   ```
2. Open the project directory.
3. Launch `index.html` in any modern web browser.

No build tools, package managers, or external setup steps are required — this is a static frontend project.

## How to Use

1. **Navigate** — Click the tab buttons (About, Projects, GitHub, Contact) to switch sections.
2. **Theme** — Use the theme toggle button to switch between light and dark mode.
3. **Set Name** — Click "Set Name" in the header to enter your visitor name and see a personalized greeting.
4. **Browse Quotes** — Click "New Quote" on the About page to fetch a new inspirational quote.
5. **Filter Projects** — Use the dropdowns on the Projects page to filter by category/level and sort by date/name.
6. **View GitHub Repos** — Open the GitHub tab to see live repository data.
7. **Contact Form** — Fill out the form with validation feedback and character counter.

## Browser Compatibility

Works across current versions of Chrome, Edge, Firefox, and Safari. Uses standard HTML5, CSS3, and ES6+ JavaScript features.

## AI Usage Summary

GitHub Copilot was used as a development assistant to help generate code, debug issues, review implementations, and draft documentation. All AI-generated output was reviewed, understood, and modified to match the assignment requirements. Full details are in [docs/ai-usage-report.md](docs/ai-usage-report.md).
