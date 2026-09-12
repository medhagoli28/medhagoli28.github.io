/**
 * data.js — every piece of content on the site lives here.
 *
 * Edit this file to update the portfolio; nothing else needs to change.
 * Sections render in the order they are listed in main.js.
 */

export const profile = {
  name: "Medha Goli",
  tagline:
    "Computer science at Cornell. I build small, useful software: a news digest that writes itself, quant dashboards, and tools that keep me organized.",
  location: "Ithaca, NY · Overland Park, KS",
  email: "medha.goli@gmail.com",
  headshot: "assets/headshot.jpg",
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/in/medhagoli", external: true },
    { label: "GitHub", href: "https://github.com/medhagoli28", external: true },
    { label: "Email", href: "mailto:medha.goli@gmail.com" },
  ],
};

export const about = {
  paragraphs: [
    "I'm a computer science student at Cornell (class of 2028), originally from Overland Park, Kansas. I like building things end to end: a pipeline that researches the day's WSJ headlines and publishes a digest every morning, a quant dashboard that scores eleven assets on risk-adjusted return, and a from-scratch backtester I can explain line by line.",
    "This past summer I shipped bug fixes and AI features as a software engineering intern at two New York startups. Before that I worked in data science and project management, and I spent a year analyzing EEG data in a neuroimaging lab. I care about tools that quietly do their job every day without being babysat.",
  ],
  education: {
    school: "Cornell University",
    degree: "B.A. Computer Science",
    dates: "Expected May 2028",
    location: "Ithaca, NY",
    coursework: [
      "Object-Oriented Programming & Data Structures",
      "Introduction to Machine Learning",
      "CS Design & Development (Python)",
      "Applied Probability & Statistics",
      "Linear Algebra",
      "Multivariable Calculus",
      "Financial Accounting",
    ],
  },
};

export const experience = [
  {
    company: "PlateRate",
    role: "Software Engineering Intern",
    dates: "Jun 2026 – Aug 2026",
    location: "New York, NY (remote)",
    bullets: [
      "Shipped fixes for 4 high-severity defects in a Node.js / Express / MongoDB app, including internal config exposed on public restaurant pages.",
      "Audited 5 core pages of the staging app, documenting 21 UX and functional defects and a 7-step prioritized remediation plan.",
    ],
    tags: ["Node.js", "Express", "MongoDB", "JavaScript"],
  },
  {
    company: "Jacana",
    role: "Software Engineering & Marketing Intern",
    dates: "May 2026 – Aug 2026",
    location: "New York, NY (remote)",
    bullets: [
      "Built 2 AI-powered scam-detection and consumer-education features for the core web platform using the Anthropic and OpenAI APIs.",
      "Compiled an 85-prospect partner engagement pipeline across 4 social channels, prioritizing outreach to coalitions and creators.",
    ],
    tags: ["Anthropic API", "OpenAI API", "JavaScript", "Growth"],
  },
  {
    company: "FSC Inc",
    role: "Data Science Intern",
    dates: "Jun 2025 – Aug 2025",
    location: "Overland Park, KS",
    bullets: [
      "Designed and deployed a SQL database consolidating 45+ project portfolios, replacing spreadsheet tracking across 6 departments.",
      "Built automated performance-tracking dashboards in Microsoft Azure that flag projects breaching schedule and budget thresholds.",
    ],
    tags: ["SQL", "Microsoft Azure", "Dashboards"],
  },
  {
    company: "FSC Inc",
    role: "Project Management Intern",
    dates: "Jun 2024 – Aug 2024",
    location: "Overland Park, KS",
    bullets: [
      "Rolled out Trello as the company-wide project platform across 6 departments and authored standardized workflow templates.",
      "Cut project setup time with reusable Trello workflows that kept execution practices consistent across teams.",
    ],
    tags: ["Trello", "Process design"],
  },
];

export const projects = [
  {
    title: "The Deep Digest",
    subtitle: "WSJ daily summaries, paywall-free",
    description:
      "A daily digest of WSJ's tech, markets, and personal-finance sections. Headlines come from free RSS; a Claude agent researches each story from other outlets, de-duplicates against prior days, and publishes a newspaper-style archive to GitHub Pages every morning. It has run unattended for two months.",
    image: "assets/wsj-digest.png",
    tags: ["Python", "Claude API", "GitHub Actions", "pytest", "Static site"],
    live: "https://medhagoli28.github.io/wsj-daily-summaries/",
    repo: "https://github.com/medhagoli28/wsj-daily-summaries",
    accent: "tech",
  },
  {
    title: "Multi-Asset Risk Dashboard",
    subtitle: "Risk-adjusted performance for 11 assets",
    description:
      "Computes Sharpe, Sortino, Calmar, max drawdown, and CAGR from daily log returns and live FRED rates, with a resilient ingestion layer (exponential-backoff retries, bounded forward-fill, calendar alignment for crypto). Renders a 7-panel interactive Plotly dashboard with a rolling correlation heatmap and Sharpe-isoline scatter.",
    image: "assets/risk-dashboard.png",
    tags: ["Python", "pandas", "Plotly", "Quant", "FRED API"],
    repo: "https://github.com/medhagoli28/risk-dashboard",
    accent: "markets",
  },
  {
    title: "Momentum Backtesting Engine",
    subtitle: "A backtester written from first principles",
    description:
      "Rebalances monthly into the top 10 S&P 500 stocks by 12-month momentum, with no backtesting library underneath. Sharpe, max drawdown, and CAGR are implemented by hand with unit tests, and the equity curve is benchmarked against SPY. The README documents survivorship bias and transaction-cost limitations honestly.",
    image: "assets/backtest.png",
    tags: ["Python", "pandas", "Plotly", "Quant"],
    repo: "https://github.com/medhagoli28/backtest",
    accent: "finance",
  },
];

export const research = [
  {
    org: "USC Mark and Mary Stevens Neuroimaging and Informatics Institute",
    role: "Research Intern",
    dates: "Sep 2023 – Jul 2024",
    location: "Remote",
    bullets: [
      "Programmed 10+ scripts in RStudio to analyze EEG data from rat brains, identifying patterns linked to trauma-induced seizures.",
      "Processed and filtered datasets for 3 ongoing projects and submitted cleaned data to senior research assistants for validation.",
      "Presented findings and analysis methods in weekly lab meetings with a team of 5+ researchers.",
    ],
    tags: ["R", "EEG", "Signal processing", "Data cleaning"],
  },
];

export const leadership = [
  {
    org: "Kappa Theta Pi",
    role: "Member · Professional Technology Fraternity, Cornell",
    dates: "Feb 2026 – Present",
    bullets: [
      "Selected into a cohort spanning CS, ECE, and Information Science; trained in Git workflows, technical interviewing, and recruiting.",
      "Completed a semester-long curriculum in tech consulting, data science, and ML; designed UI mockups presented to the full chapter.",
    ],
  },
  {
    org: "South Asian Business Association",
    role: "Member · Cornell",
    dates: "Feb 2026 – Present",
    bullets: [
      "Completed an 8-week new-member program covering financial statement analysis, valuation, and market research.",
      "Delivered weekly case presentations synthesizing research and models into recommendations.",
    ],
  },
  {
    org: "MATHCOUNTS · Lakewood Middle School",
    role: "Coach",
    dates: "Aug 2023 – Present",
    bullets: [
      "Curate weekly problem sets for 50+ students and teach step-by-step solutions that break down hard problems.",
      "Build and coach the competitive school team through State and National competitions in Washington, D.C.",
    ],
  },
  {
    org: "Techie Trailblazers Podcast",
    role: "Co-Founder",
    dates: "May 2024 – May 2025",
    bullets: [
      "Produced 5 episodes on gender gaps in STEM, reaching 500+ students and educators in the Kansas City area.",
      "Partnered with 5 CS teachers to integrate the podcast into their curriculum for 200 students.",
    ],
  },
  {
    org: "Food for Thought",
    role: "Co-Founder",
    dates: "Dec 2023 – May 2025",
    bullets: [
      "Co-led donation drives collecting 3,000+ cans for Kansas City shelters such as Harvesters.",
      "Ran bi-monthly meetings for a club of 200+ members focused on local food insecurity.",
    ],
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["Python", "Java", "SQL", "JavaScript", "TypeScript", "R", "MATLAB", "HTML", "CSS"],
  },
  {
    group: "Frameworks & libraries",
    items: ["Node.js", "Express", "React Native", "Flask", "pandas", "NumPy", "Plotly", "pytest"],
  },
  {
    group: "Tools & platforms",
    items: [
      "Git & GitHub Actions",
      "Anthropic API",
      "OpenAI API",
      "MongoDB",
      "Microsoft Azure",
      "FRED API",
      "yfinance",
      "Figma",
    ],
  },
];

export const hobbies = [
  { icon: "🎾", label: "Tennis", detail: "seven years and counting" },
  { icon: "🏓", label: "Pickleball", detail: "the newer racket habit" },
  { icon: "💃", label: "Dance", detail: "Bollywood and Kuchipudi" },
  { icon: "🏈", label: "NFL Sundays", detail: "every week of the season" },
  { icon: "🥾", label: "Hiking", detail: "gorges in Ithaca, trails at home" },
  { icon: "✈️", label: "Traveling", detail: "new cities, new food" },
  { icon: "🃏", label: "Card games", detail: "ask me about my house rules" },
];

/**
 * Pages. `file` is the HTML file, `label` the nav tab. `title` and `dek`
 * render in the masthead of every page except Home (which shows the hero).
 */
export const pages = [
  { file: "index.html", label: "Home" },
  {
    file: "work.html",
    label: "Work",
    title: "Work",
    dek: "Internships, a year in a neuroimaging lab, and the clubs and coaching I keep up on the side.",
  },
  {
    file: "projects.html",
    label: "Projects",
    title: "Projects",
    dek: "Things I've built end to end and shipped. Filter by tag.",
  },
  {
    file: "more.html",
    label: "More",
    title: "More",
    dek: "What I work with, and what I do off the clock.",
  },
];
