# AI Usage Report

## Tools Used & Use Cases

The primary AI tool used in this assignment was **GitHub Copilot** (Claude model). It was used within acceptable coursework boundaries for the following purposes:

| Use Case | How AI Was Used |
|---|---|
| **Code Generation** | Generated initial implementations for API fetch functions (GitHub, Quotes, Weather), project filtering/sorting logic, and visitor state management |
| **Debugging** | Helped identify issues with DOM element references, event listener binding, and API error handling |
| **Code Review** | Reviewed the JavaScript structure for potential improvements in organization, security (XSS prevention), and performance |
| **Documentation** | Assisted in drafting the README, technical documentation, and this AI usage report |
| **UI/UX Suggestions** | Suggested the modal pattern for visitor login, the quote widget design, and the project control bar layout |

### Specific AI-Assisted Features
- **GitHub API integration** — AI helped structure the `fetch()` call with proper headers, error handling, and DOM rendering
- **Quotes API with fallback** — AI suggested implementing a fallback array of quotes for when the API is unavailable
- **Project filtering logic** — AI helped design the multi-step filter → sort pipeline in `getFilteredAndSortedProjects()`
- **XSS prevention** — AI recommended the `escapeHTML()` utility function and input sanitization for the visitor name
- **Visitor state management** — AI assisted in designing the localStorage-based login/logout flow with modal UI

## Recommended AI Tools

- **GitHub Copilot** → Used for code completion, generation, and inline suggestions while coding in VS Code
- **ChatGPT / Claude** → Used for problem-solving, explaining concepts, and reviewing design decisions
- **Cursor** → AI-powered code editor alternative
- **Replit** → AI-assisted online IDE for quick prototyping
- **AWS CodeWhisperer** → AI code generation for cloud-focused development

## Benefits & Challenges

### Benefits
1. **Speed** — AI significantly accelerated the initial implementation of API integration and DOM manipulation code, allowing more time for testing and refinement
2. **Error handling patterns** — AI suggested robust error handling with user-friendly fallbacks (e.g., fallback quotes, "Retry" buttons for failed API calls)
3. **Security awareness** — AI flagged potential XSS vulnerabilities when inserting API data into the DOM and recommended the `escapeHTML()` approach
4. **Code organization** — AI helped structure the JavaScript into clearly separated sections with consistent patterns

### Challenges
1. **API selection** — AI initially suggested APIs that required API keys or had restrictive CORS policies, which required manual research to find suitable free alternatives
2. **Over-engineering** — Some AI suggestions included unnecessary complexity (e.g., debouncing for simple select changes) that had to be removed to keep the code appropriate for the assignment scope
3. **Context accuracy** — AI-generated content sometimes included placeholder text or generic descriptions that did not match the actual portfolio, requiring manual correction
4. **Testing** — AI could not verify that API endpoints were actually working or that the UI rendered correctly, which required manual browser testing

## Learning Outcomes

Using AI in this assignment supported learning in several areas:

1. **API integration patterns** — Learned how to use `fetch()` with `async/await`, handle HTTP errors, parse JSON responses, and implement fallback behavior
2. **State management** — Understood how `localStorage` can manage multiple pieces of state (theme, visitor name) and how to synchronize UI with stored data
3. **DOM manipulation** — Practiced creating, modifying, and removing DOM elements dynamically based on data and user interactions
4. **Filtering and sorting** — Learned how to chain `.filter()` and `.sort()` array methods to implement multi-criteria data views
5. **Security practices** — Gained awareness of XSS risks when inserting external data into the DOM and how to mitigate them
6. **Code organization** — Improved ability to structure a larger JavaScript file into logical, maintainable sections

## Responsible Use & Modifications

All AI-generated code was **reviewed, understood, and modified** before being included in the final submission. Specific modifications include:

1. **API endpoints** — Replaced AI-suggested APIs that required keys with free, no-auth alternatives (DummyJSON, wttr.in)
2. **Error messages** — Rewrote generic error messages to be specific and user-friendly for this portfolio context
3. **Project data** — Replaced placeholder project descriptions with actual portfolio content matching real coursework
4. **Security hardening** — Added input sanitization for the visitor name field after reviewing the AI-generated localStorage code
5. **Removed unnecessary code** — Stripped out over-engineered patterns (debouncing, throttling, service workers) that were not appropriate for the assignment scope
6. **Documentation** — Rewrote AI-drafted documentation to accurately reflect the actual implementation rather than generic descriptions

AI was used as a development assistant, not as a replacement for understanding. The final submission demonstrates comprehension of every feature and the ability to explain, modify, and extend the code independently.
