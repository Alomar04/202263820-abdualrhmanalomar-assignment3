// ============================================
// DOM Element References
// ============================================
const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");
const tabLinks = document.querySelectorAll("[data-open-tab]");
const themeToggleButton = document.getElementById("theme-toggle");
const themeToggleText = document.getElementById("theme-toggle-text");
const contactForm = document.getElementById("contact-form");
const greetingElement = document.getElementById("greeting");
const visitorBtn = document.getElementById("visitor-btn");
const visitorBtnText = document.getElementById("visitor-btn-text");
const visitorBanner = document.getElementById("visitor-banner");
const visitorGreeting = document.getElementById("visitor-greeting");
const visitTimerEl = document.getElementById("visit-timer");
const visitorModal = document.getElementById("visitor-modal");
const visitorNameInput = document.getElementById("visitor-name-input");
const visitorSaveBtn = document.getElementById("visitor-save");
const visitorCancelBtn = document.getElementById("visitor-cancel");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote-btn");
const weatherTemp = document.getElementById("weather-temp");
const weatherDesc = document.getElementById("weather-desc");
const projectGrid = document.getElementById("project-grid");
const filterCategory = document.getElementById("filter-category");
const filterLevel = document.getElementById("filter-level");
const sortOrder = document.getElementById("sort-order");
const projectCount = document.getElementById("project-count");
const noProjectsMsg = document.getElementById("no-projects-msg");
const repoGrid = document.getElementById("repo-grid");
const githubLoading = document.getElementById("github-loading");
const githubError = document.getElementById("github-error");
const githubRetry = document.getElementById("github-retry");
const messageCounter = document.getElementById("message-counter");
const messageField = document.getElementById("message");

const formFields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  subject: document.getElementById("subject"),
  message: document.getElementById("message"),
};

const errorElements = {
  name: document.getElementById("name-error"),
  email: document.getElementById("email-error"),
  subject: document.getElementById("subject-error"),
  message: document.getElementById("message-error"),
};

const successMessage = document.getElementById("form-success");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ============================================
// Project Data (used for filtering and sorting)
// ============================================
const projectData = [
  {
    id: 1,
    name: "AI Tutor",
    tag: "SWE-206 Team Project",
    category: "ai",
    level: "advanced",
    date: "2025-09-15",
    visual: "project-visual-one",
    description:
      "A Blackboard-like platform integrated with AI to personalize learning, improve content delivery, and support more useful academic feedback loops.",
  },
  {
    id: 2,
    name: "KFUPM Co-pilot",
    tag: "SWE-216 Team Project",
    category: "ai",
    level: "intermediate",
    date: "2025-06-10",
    visual: "project-visual-two",
    description:
      "An AI assistant concept connected to KFUPM systems to simplify course planning, student workflows, and institutional support tasks.",
  },
  {
    id: 3,
    name: "Appliflow",
    tag: "SWE-363 Team Project",
    category: "web",
    level: "intermediate",
    date: "2026-01-20",
    visual: "project-visual-three",
    description:
      "A tracker for internships and summer training focused on mentorship, progress visibility, and a smoother experience for students managing applications.",
  },
  {
    id: 4,
    name: "Portfolio Website",
    tag: "SWE-363 Individual Project",
    category: "web",
    level: "beginner",
    date: "2025-03-05",
    visual: "project-visual-four",
    description:
      "A personal portfolio website built with HTML, CSS, and JavaScript featuring tabbed navigation, theme persistence, and form validation.",
  },
  {
    id: 5,
    name: "Campus Navigator",
    tag: "SWE-316 Team Project",
    category: "mobile",
    level: "advanced",
    date: "2025-12-01",
    visual: "project-visual-five",
    description:
      "A mobile-friendly campus navigation tool with interactive maps, building search, and real-time location tracking for KFUPM students.",
  },
  {
    id: 6,
    name: "Study Planner",
    tag: "Personal Project",
    category: "web",
    level: "beginner",
    date: "2025-01-15",
    visual: "project-visual-six",
    description:
      "A simple web-based study planner that helps students organize their weekly schedules, set reminders, and track assignment deadlines.",
  },
];

// ============================================
// Greeting (time-based)
// ============================================
function getGreeting() {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return "Good morning.";
  if (currentHour < 18) return "Good afternoon.";
  return "Good evening.";
}

function initializeGreeting() {
  if (greetingElement) {
    greetingElement.textContent = getGreeting();
  }
}

// ============================================
// Tab Navigation
// ============================================
function setActiveTab(targetId) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === targetId;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  tabPanels.forEach((panel) => {
    const isActive = panel.id === targetId;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });

  // Fetch GitHub repos when the tab is first opened
  if (targetId === "github" && repoGrid.children.length === 0) {
    fetchGitHubRepos();
  }
}

// ============================================
// Theme Toggle (with localStorage persistence)
// ============================================
function applyTheme(theme) {
  const isDarkTheme = theme === "dark";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  if (themeToggleText) {
    themeToggleText.textContent = isDarkTheme ? "Light Mode" : "Dark Mode";
  }
}

function initializeTheme() {
  const storedTheme = localStorage.getItem("portfolio-theme");
  applyTheme(storedTheme || "light");
}

function toggleTheme() {
  const isDarkTheme = document.body.classList.contains("dark-theme");
  const nextTheme = isDarkTheme ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem("portfolio-theme", nextTheme);
}

// ============================================
// Visitor State Management (login/logout simulation)
// ============================================
let visitStartTime = Date.now();
let timerInterval = null;

function getVisitorName() {
  return localStorage.getItem("visitor-name");
}

function setVisitorName(name) {
  // Sanitize input to prevent XSS
  const sanitized = name.trim().replace(/[<>"'&]/g, "");
  if (sanitized.length > 0 && sanitized.length <= 30) {
    localStorage.setItem("visitor-name", sanitized);
    return sanitized;
  }
  return null;
}

function clearVisitorName() {
  localStorage.removeItem("visitor-name");
}

function updateVisitorUI() {
  const name = getVisitorName();
  if (name) {
    // Logged-in state
    visitorBtnText.textContent = "👋 Logout";
    visitorBanner.classList.remove("hidden");
    visitorGreeting.textContent = "Welcome back, " + name + "!";
    startVisitTimer();
  } else {
    // Logged-out state
    visitorBtnText.textContent = "👋 Set Name";
    visitorBanner.classList.add("hidden");
    stopVisitTimer();
  }
}

function startVisitTimer() {
  visitStartTime = Date.now();
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(updateTimerDisplay, 1000);
  updateTimerDisplay();
}

function stopVisitTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateTimerDisplay() {
  const elapsed = Math.floor((Date.now() - visitStartTime) / 1000);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  visitTimerEl.textContent = minutes + ":" + String(seconds).padStart(2, "0");
}

function openVisitorModal() {
  visitorModal.classList.remove("hidden");
  visitorNameInput.value = "";
  visitorNameInput.focus();
}

function closeVisitorModal() {
  visitorModal.classList.add("hidden");
}

function handleVisitorBtn() {
  const name = getVisitorName();
  if (name) {
    // Logout
    clearVisitorName();
    updateVisitorUI();
  } else {
    // Open modal to set name
    openVisitorModal();
  }
}

function handleVisitorSave() {
  const saved = setVisitorName(visitorNameInput.value);
  if (saved) {
    closeVisitorModal();
    updateVisitorUI();
  }
}

// ============================================
// Quotes API Integration
// ============================================
// Fallback quotes in case the API is unavailable
const fallbackQuotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "Code is like humor. When you have to explain it, it is bad.", author: "Cory House" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
];

async function fetchQuote() {
  quoteText.textContent = "Loading quote...";
  quoteAuthor.textContent = "";

  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    if (!response.ok) throw new Error("API error");
    const data = await response.json();
    quoteText.textContent = '"' + data.quote + '"';
    quoteAuthor.textContent = "— " + data.author;
  } catch {
    // Use fallback quote if API fails
    const fallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    quoteText.textContent = '"' + fallback.text + '"';
    quoteAuthor.textContent = "— " + fallback.author;
  }
}

// ============================================
// Weather API Integration
// ============================================
async function fetchWeather() {
  try {
    // Open-Meteo API: free, no key, CORS-friendly. Dhahran coordinates: 26.43, 50.10
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=26.43&longitude=50.10&current_weather=true"
    );
    if (!response.ok) throw new Error("Weather API error");
    const data = await response.json();
    const temp = data.current_weather.temperature;
    const code = data.current_weather.weathercode;
    weatherTemp.textContent = temp + "°C";
    weatherDesc.textContent = getWeatherLabel(code) + " — Dhahran, SA";
  } catch {
    weatherTemp.textContent = "--";
    weatherDesc.textContent = "Weather unavailable";
  }
}

// Map WMO weather codes to readable labels
function getWeatherLabel(code) {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Rain showers";
  if (code <= 86) return "Snow showers";
  if (code >= 95) return "Thunderstorm";
  return "Unknown";
}

// ============================================
// GitHub API Integration
// ============================================
async function fetchGitHubRepos() {
  githubLoading.classList.remove("hidden");
  githubError.classList.add("hidden");
  repoGrid.innerHTML = "";

  try {
    const response = await fetch(
      "https://api.github.com/users/Alomar04/repos?sort=updated&per_page=6",
      { headers: { Accept: "application/vnd.github.v3+json" } }
    );

    if (!response.ok) throw new Error("GitHub API returned " + response.status);

    const repos = await response.json();
    githubLoading.classList.add("hidden");

    if (repos.length === 0) {
      repoGrid.innerHTML = '<p class="no-results">No public repositories found.</p>';
      return;
    }

    // Language color mapping for visual display
    const langColors = {
      JavaScript: "#f1e05a",
      HTML: "#e34c26",
      CSS: "#563d7c",
      Python: "#3572A5",
      Java: "#b07219",
      TypeScript: "#3178c6",
      default: "#858585",
    };

    repos.forEach((repo) => {
      const card = document.createElement("div");
      card.className = "repo-card";

      const langDotColor = langColors[repo.language] || langColors.default;
      const description = repo.description || "No description provided.";

      card.innerHTML =
        '<h3><a href="' + encodeURI(repo.html_url) + '" target="_blank" rel="noopener noreferrer">' +
        escapeHTML(repo.name) + "</a></h3>" +
        '<p class="repo-description">' + escapeHTML(description) + "</p>" +
        '<div class="repo-stats">' +
        (repo.language
          ? '<span class="repo-stat"><span class="repo-lang-dot" style="background:' +
            langDotColor + '"></span>' + escapeHTML(repo.language) + "</span>"
          : "") +
        '<span class="repo-stat">⭐ ' + repo.stargazers_count + "</span>" +
        '<span class="repo-stat">🍴 ' + repo.forks_count + "</span>" +
        "</div>";

      repoGrid.appendChild(card);
    });
  } catch {
    githubLoading.classList.add("hidden");
    githubError.classList.remove("hidden");
  }
}

// Prevent XSS by escaping HTML entities in dynamic content
function escapeHTML(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// ============================================
// Project Filtering, Sorting & Rendering
// ============================================
function getFilteredAndSortedProjects() {
  const category = filterCategory.value;
  const level = filterLevel.value;
  const sort = sortOrder.value;

  // Step 1: Filter by category
  let filtered = projectData;
  if (category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  // Step 2: Filter by skill level
  if (level !== "all") {
    filtered = filtered.filter((p) => p.level === level);
  }

  // Step 3: Sort based on selected order
  filtered.sort((a, b) => {
    switch (sort) {
      case "newest":
        return new Date(b.date) - new Date(a.date);
      case "oldest":
        return new Date(a.date) - new Date(b.date);
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return filtered;
}

function renderProjects() {
  const projects = getFilteredAndSortedProjects();
  projectGrid.innerHTML = "";

  if (projects.length === 0) {
    noProjectsMsg.classList.remove("hidden");
    projectCount.textContent = "Showing 0 projects";
    return;
  }

  noProjectsMsg.classList.add("hidden");
  projectCount.textContent = "Showing " + projects.length + " project" + (projects.length !== 1 ? "s" : "");

  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.innerHTML =
      '<div class="project-visual ' + project.visual + '"></div>' +
      '<div class="project-content">' +
      '<span class="project-tag">' + escapeHTML(project.tag) + "</span>" +
      "<h3>" + escapeHTML(project.name) + "</h3>" +
      "<p>" + escapeHTML(project.description) + "</p>" +
      '<div class="project-meta">' +
      '<span class="project-level level-' + project.level + '">' + project.level + "</span>" +
      '<span class="project-date">' + formatDate(project.date) + "</span>" +
      "</div>" +
      "</div>";
    projectGrid.appendChild(card);
  });
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

// ============================================
// Contact Form Validation (Advanced)
// ============================================
function showFieldError(fieldName, message) {
  const field = formFields[fieldName];
  const errorElement = errorElements[fieldName];
  field.classList.add("input-error");
  errorElement.textContent = message;
}

function clearFieldError(fieldName) {
  const field = formFields[fieldName];
  const errorElement = errorElements[fieldName];
  field.classList.remove("input-error");
  errorElement.textContent = "";
}

function validateForm() {
  let isValid = true;

  // Clear all previous errors
  Object.keys(formFields).forEach((fieldName) => {
    clearFieldError(fieldName);
  });
  successMessage.textContent = "";

  // Name validation: required, minimum 2 characters
  const nameValue = formFields.name.value.trim();
  if (!nameValue) {
    showFieldError("name", "Please enter your name.");
    isValid = false;
  } else if (nameValue.length < 2) {
    showFieldError("name", "Name must be at least 2 characters.");
    isValid = false;
  }

  // Email validation: required and must match pattern
  const emailValue = formFields.email.value.trim();
  if (!emailValue) {
    showFieldError("email", "Please enter your email address.");
    isValid = false;
  } else if (!emailPattern.test(emailValue)) {
    showFieldError("email", "Please enter a valid email address.");
    isValid = false;
  }

  // Subject validation: must select an option
  if (!formFields.subject.value) {
    showFieldError("subject", "Please select a subject.");
    isValid = false;
  }

  // Message validation: required, minimum 10 characters
  const messageValue = formFields.message.value.trim();
  if (!messageValue) {
    showFieldError("message", "Please enter a message.");
    isValid = false;
  } else if (messageValue.length < 10) {
    showFieldError("message", "Message must be at least 10 characters.");
    isValid = false;
  }

  return isValid;
}

function handleFormSubmit(event) {
  event.preventDefault();
  if (!validateForm()) return;

  successMessage.textContent = "Thank you. Your message has been sent successfully.";
  contactForm.reset();
  updateCharCounter();
}

function updateCharCounter() {
  if (messageField && messageCounter) {
    const count = messageField.value.length;
    messageCounter.textContent = count + " / 500";
  }
}

// ============================================
// Event Listeners
// ============================================

// Tab navigation
tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveTab(button.dataset.tab);
  });
});

tabLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setActiveTab(link.dataset.openTab);
  });
});

// Theme toggle
if (themeToggleButton) {
  themeToggleButton.addEventListener("click", toggleTheme);
}

// Contact form
if (contactForm) {
  contactForm.addEventListener("submit", handleFormSubmit);

  Object.keys(formFields).forEach((fieldName) => {
    formFields[fieldName].addEventListener("input", () => {
      clearFieldError(fieldName);
      successMessage.textContent = "";
    });
  });
}

// Message character counter
if (messageField) {
  messageField.addEventListener("input", updateCharCounter);
}

// Project filter and sort controls
if (filterCategory) filterCategory.addEventListener("change", renderProjects);
if (filterLevel) filterLevel.addEventListener("change", renderProjects);
if (sortOrder) sortOrder.addEventListener("change", renderProjects);

// Visitor state
if (visitorBtn) visitorBtn.addEventListener("click", handleVisitorBtn);
if (visitorSaveBtn) visitorSaveBtn.addEventListener("click", handleVisitorSave);
if (visitorCancelBtn) visitorCancelBtn.addEventListener("click", closeVisitorModal);

// Close modal on Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !visitorModal.classList.contains("hidden")) {
    closeVisitorModal();
  }
});

// Close modal on overlay click
if (visitorModal) {
  visitorModal.addEventListener("click", (event) => {
    if (event.target === visitorModal) {
      closeVisitorModal();
    }
  });
}

// Save visitor name on Enter key
if (visitorNameInput) {
  visitorNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") handleVisitorSave();
  });
}

// Quote button
if (newQuoteBtn) newQuoteBtn.addEventListener("click", fetchQuote);

// GitHub retry button
if (githubRetry) githubRetry.addEventListener("click", fetchGitHubRepos);

// ============================================
// Initialization
// ============================================
initializeTheme();
initializeGreeting();
updateVisitorUI();
renderProjects();
fetchQuote();
fetchWeather();
