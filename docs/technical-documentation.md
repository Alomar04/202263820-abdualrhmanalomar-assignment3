# Technical Documentation

## Overview

This project is a single-page advanced portfolio website built with semantic HTML, custom CSS, and vanilla JavaScript. Assignment 3 extends the previous version by adding external API integrations, complex filtering/sorting logic, visitor state management, and performance optimizations — all while keeping the codebase lightweight and maintainable.

## Project Structure

- `index.html` — Semantic page structure with four tab panels (About, Projects, GitHub, Contact), filter controls, visitor modal, and quote/weather widgets.
- `css/styles.css` — Visual styling organized with CSS custom properties, responsive layout, component styles, and animation definitions.
- `js/script.js` — Application logic including API fetching, project data management, form validation, visitor state, and event handling.
- `docs/` — Assignment documentation (this file and the AI usage report).

## Technical Decisions

### Semantic HTML
The layout uses clear structural elements: `header`, `main`, `section`, `nav`, `form`, `footer`, `article`, `aside`, and `blockquote`. ARIA attributes (`role`, `aria-label`, `aria-selected`, `aria-controls`, `aria-live`) improve accessibility for screen readers.

### CSS Architecture
The stylesheet is organized into clearly commented sections:
- **Custom properties** — Root-level variables for colors, spacing, shadows, and transitions
- **Theme overrides** — Dark mode variables applied via `.dark-theme` class on `body`
- **Layout classes** — `.container`, `.hero-grid`, `.project-grid`, `.repo-grid`, `.contact-layout`
- **Component styles** — Cards, buttons, tabs, form elements, modals, loading indicators
- **Responsive media queries** — Breakpoints at 980px (tablet) and 640px (mobile)

CSS custom properties make theme switching efficient because only variable values change — no component styles need to be rewritten.

### JavaScript Approach
Vanilla JavaScript was chosen because the project scope does not justify a framework. The script is organized into focused sections:
- DOM references at the top
- Feature functions grouped by concern
- Event listeners in one block
- Initialization calls at the bottom

## Feature Implementation

### 1. API Integration

#### GitHub Repositories API
- **Endpoint:** `https://api.github.com/users/abdualrhmanalomar/repos?sort=updated&per_page=6`
- **Method:** `fetch()` with `async/await`
- **Error handling:** Shows a user-friendly error message with a "Retry" button if the API fails
- **Lazy loading:** Repos are fetched only when the GitHub tab is first opened
- **Security:** Repository names and descriptions are escaped with `escapeHTML()` to prevent XSS

#### Quotes API
- **Endpoint:** `https://dummyjson.com/quotes/random`
- **Fallback:** If the API is unavailable, a local array of fallback quotes is used
- **User control:** A "New Quote" button lets visitors fetch another quote on demand

#### Weather API
- **Endpoint:** `https://wttr.in/Dhahran?format=%t|%C`
- **Display:** Shows temperature and conditions in the hero panel
- **Error handling:** Displays "Weather unavailable" if the request fails

### 2. Complex Logic — Filtering & Sorting

The Projects tab uses three dropdown controls that work together:
1. **Category filter** — All, Web Development, AI/ML, Mobile/Tools
2. **Skill level filter** — All, Beginner, Intermediate, Advanced
3. **Sort order** — Newest First, Oldest First, Name A–Z, Name Z–A

The `getFilteredAndSortedProjects()` function applies filtering and sorting in three sequential steps:
1. Filter the full project array by category
2. Filter the result by skill level
3. Sort the remaining items based on the selected order

The `renderProjects()` function clears the grid and dynamically creates DOM elements for each matching project. If no projects match, a "No projects found" message is shown.

### 3. State Management

#### Theme Persistence
- The selected theme (light/dark) is stored in `localStorage` under the key `portfolio-theme`
- On page load, `initializeTheme()` reads and applies the stored value

#### Visitor Login/Logout
- Clicking "Set Name" opens a modal where the visitor enters their name
- The name is sanitized (HTML characters stripped) and stored in `localStorage` under `visitor-name`
- When a name is stored, a greeting banner appears with a personalized welcome message
- Clicking "Logout" clears the stored name and hides the banner
- The visitor state persists across page reloads

#### Session Timer
- When logged in, a timer displays how long the visitor has been on the site
- Uses `setInterval` with 1-second updates and formats as `M:SS`

### 4. Advanced Form Validation

The contact form validates four fields with multiple rules:
- **Name** — Required, minimum 2 characters, maximum 50 characters
- **Email** — Required, must match a regex pattern for valid email format
- **Subject** — Required, must select one of the predefined options
- **Message** — Required, minimum 10 characters, maximum 500 characters

Additional features:
- **Character counter** — Live count showing `X / 500` below the message field
- **Real-time clearing** — Error messages clear as soon as the user starts typing
- **Visual feedback** — Error fields get a red border via the `.input-error` class

### 5. Animations and Transitions
- Fade-in animation when switching between tab panels
- Hover transitions on project cards, repo cards, and buttons
- Smooth color and shadow transitions when toggling the theme
- Spinner animation for the GitHub loading state

## Security Considerations

- **XSS prevention:** All dynamic content from APIs is escaped using `escapeHTML()` before insertion into the DOM
- **Input sanitization:** Visitor name input strips `< > " ' &` characters before storage
- **Safe links:** GitHub repo URLs use `encodeURI()` and `rel="noopener noreferrer"` for external links
- **No eval/innerHTML for user data:** Dynamic user-facing content uses `textContent` where possible

## Performance Optimizations

- **Lazy API loading:** GitHub repos are fetched only when the tab is first opened
- **Efficient rendering:** Projects are rendered with `document.createElement` for better performance
- **Minimal reflows:** CSS custom properties avoid redundant style recalculations during theme switches
- **Font preconnect:** `<link rel="preconnect">` hints reduce font loading latency
- **Deferred script:** `<script defer>` ensures the HTML is parsed before JavaScript runs

## Responsiveness

The layout is mobile-friendly through CSS Grid, flexbox, and media queries:
- **980px breakpoint:** Multi-column layouts collapse to single column, header stacks vertically
- **640px breakpoint:** Tab buttons wrap, brand text and toggle text hide, project grid becomes single column

## Maintainability

- Each file has a single clear responsibility
- JavaScript functions are short and focused (single responsibility)
- Styles are grouped by component with section comments
- Theme values are centralized in CSS custom properties
- Project data is stored in a structured array for easy modification
