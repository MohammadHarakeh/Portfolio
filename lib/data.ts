import {
  PersonalInfo,
  Project,
  Skill,
  Experience,
  Education,
  Certificate,
} from "@/types";

export const personalInfo: PersonalInfo = {
  name: "Mohammad Harake",
  title: "Software Developer",
  email: "mohammad.d.harakeh@gmail.com",
  phone: "+961 70860668",
  location: "Beirut, Lebanon",
  linkedin: "https://linkedin.com/in/mohammad-d-harakeh",
  github: "https://github.com/MohammadHarakeh",
  bio: "Results-driven software developer with hands-on experience delivering responsive, user-focused web platforms from concept to production, with strong front-end depth and practical full-stack collaboration.",
  tagline: "Built 26 web projects from concept to production",
};

export const skills: Skill[] = [
  // Languages
  {
    name: "JavaScript",
    level: "expert",
    category: "language",
    projects: [
      "bookhub",
      "subway-system",
      "digital-chain",
      "ivr-chat",
      "bp-lp",
      "numbase-kwt",
    ],
  },
  {
    name: "TypeScript",
    level: "expert",
    category: "language",
    projects: [
      "bookhub",
      "digital-chain",
      "beeline-kids",
      "bestshaharlar",
      "lucky-spin",
      "trivia-boss-battle",
    ],
  },
  {
    name: "Python",
    level: "advanced",
    category: "language",
    projects: ["google-ads"],
  },
  {
    name: "PHP",
    level: "advanced",
    category: "language",
    projects: ["subway-system"],
  },
  { name: "Java", level: "intermediate", category: "language" },
  {
    name: "SQL",
    level: "advanced",
    category: "language",
    projects: ["subway-system"],
  },
  { name: "HTML", level: "expert", category: "language" },
  { name: "CSS", level: "expert", category: "language" },
  { name: "SCSS", level: "expert", category: "language" },

  // Frameworks
  {
    name: "React",
    level: "expert",
    category: "framework",
    projects: [
      "subway-system",
      "digital-chain",
      "beeline-kids",
      "bestshaharlar",
      "lucky-spin",
    ],
  },
  {
    name: "Next.js",
    level: "expert",
    category: "framework",
    projects: ["bookhub"],
  },
  { name: "React Native", level: "advanced", category: "framework" },
  {
    name: "Node.js",
    level: "expert",
    category: "framework",
    projects: ["bookhub", "beeline-kids", "bestshaharlar", "lucky-spin"],
  },
  { name: "Express", level: "advanced", category: "framework" },
  { name: "Material UI", level: "expert", category: "framework" },
  {
    name: "Laravel",
    level: "advanced",
    category: "framework",
    projects: ["subway-system"],
  },
  { name: "Django", level: "intermediate", category: "framework" },
  { name: "Bootstrap", level: "advanced", category: "framework" },
  { name: "Prisma", level: "advanced", category: "framework" },
  { name: "Electron.js", level: "intermediate", category: "framework" },

  // Databases
  {
    name: "MongoDB",
    level: "advanced",
    category: "database",
    projects: ["bookhub"],
  },
  {
    name: "MySQL",
    level: "advanced",
    category: "database",
    projects: ["subway-system"],
  },

  // Tools
  { name: "Git", level: "expert", category: "tool" },
  { name: "GitHub", level: "expert", category: "tool" },
  { name: "Postman", level: "advanced", category: "tool" },
  { name: "Figma", level: "intermediate", category: "tool" },
  { name: "Unreal Engine", level: "intermediate", category: "tool" },

  // Technical Skills
  { name: "Frontend Development", level: "expert", category: "other" },
  { name: "Full Stack Development", level: "expert", category: "other" },
  { name: "Responsive Web Design", level: "expert", category: "other" },
  { name: "UI Development", level: "expert", category: "other" },
  { name: "API Integration", level: "expert", category: "other" },
  { name: "RESTful APIs", level: "advanced", category: "other" },
  { name: "Unit Testing", level: "advanced", category: "other" },
  { name: "Database Integration", level: "advanced", category: "other" },
  { name: "Performance Optimization", level: "advanced", category: "other" },
  { name: "Real Time Features", level: "advanced", category: "other" },
  { name: "Component Reusability", level: "expert", category: "other" },
  { name: "Pixel Perfect Implementation", level: "expert", category: "other" },
  { name: "CMS Development", level: "advanced", category: "other" },
  { name: "Cross Browser Compatibility", level: "advanced", category: "other" },
  { name: "Version Control", level: "expert", category: "other" },
  { name: "Debugging", level: "expert", category: "other" },
  { name: "Code Review", level: "advanced", category: "other" },
  { name: "OOP", level: "advanced", category: "other" },
  { name: "Design Patterns", level: "advanced", category: "other" },
  { name: "Data Structures", level: "advanced", category: "other" },
  { name: "Complexity Analysis", level: "advanced", category: "other" },
];

export const projects: Project[] = [
  {
    id: "bookhub",
    title: "BookHub",
    description:
      "A version control website where writers can collaborate to create unique stories.",
    longDescription:
      "BookHub is an innovative platform that enables writers to collaborate in real-time on creative stories. The platform features live collaboration, version control, and AI-powered assistance to enhance the writing experience.",
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/MohammadHarakeh/bookhub",
    featured: true,
    category: "fullstack",
    date: "2024-05",
    highlights: [
      "Live collaboration with real-time updates",
      "Version control system for story management",
      "AI-powered writing assistance",
      "Real-time synchronization across multiple users",
    ],
  },
  {
    id: "subway-system",
    title: "Subway System",
    description:
      "A collaborative platform where users can book tickets for the subway near them.",
    longDescription:
      "A comprehensive subway ticket booking system with interactive map display and integrated chat system for customer support.",
    technologies: ["React.js", "Laravel", "MySQL", "phpMyAdmin"],
    githubUrl: "https://github.com/MohammadHarakeh/subway-system",
    featured: true,
    category: "fullstack",
    date: "2024-04",
    highlights: [
      "Interactive map display for subway locations",
      "Real-time ticket booking system",
      "Integrated chat system for support",
      "User-friendly booking interface",
    ],
  },
  {
    id: "digital-chain",
    title: "Digital Chain",
    description: "A responsive website with smooth UI built using TypeScript.",
    longDescription:
      "A modern, responsive website with seamless backend integration, focusing on usability and performance.",
    technologies: ["TypeScript", "React", "Node.js"],
    featured: false,
    category: "fullstack",
    date: "2024-10",
    highlights: [
      "Responsive design across all devices",
      "Smooth UI/UX experience",
      "Optimized performance",
    ],
  },
  {
    id: "kids-security",
    title: "Kids Security",
    description:
      "A landing page showcasing terms and agreement services with professional UI/UX design.",
    longDescription:
      "A fully functional landing page designed from scratch, integrating existing backend services to deliver a professional product.",
    technologies: ["TypeScript", "React", "Node.js"],
    featured: false,
    category: "frontend",
    date: "2024-10",
    highlights: [
      "Professional UI/UX design",
      "Terms and agreement showcase",
      "Backend service integration",
    ],
  },
  {
    id: "beeline-kids",
    title: "BeeLineKids",
    description:
      "Landing page with backend integration for user sign-up: collect numbers, send OTP, and subscribe users with a custom design.",
    longDescription:
      "A landing page built with backend APIs for phone number collection, OTP verification, and user subscription, featuring a unique design tailored to the product.",
    technologies: ["TypeScript", "React", "Node.js"],
    featured: false,
    category: "fullstack",
    date: "2025-01",
    highlights: [
      "Backend APIs for number collection and OTP",
      "User subscription flow integration",
      "Custom UI/UX design",
    ],
  },
  {
    id: "bestshaharlar",
    title: "Bestshaharlar",
    description:
      "Landing page with backend APIs for user sign-up, OTP verification, and subscription with a distinct design.",
    longDescription:
      "A landing page integrating backend services for phone number collection, OTP sending, and user subscription, with a design distinct from other landing pages.",
    technologies: ["TypeScript", "React", "Node.js"],
    featured: false,
    category: "fullstack",
    date: "2025-01",
    highlights: [
      "Backend integration for sign-up and OTP",
      "User subscription flow",
      "Distinct visual design",
    ],
  },
  {
    id: "google-ads",
    title: "GoogleAds",
    description:
      "Python Telegram bot that calculates Google Ads conversions and analytics and sends results to Telegram on demand.",
    longDescription:
      "A Python bot running on Telegram that fetches and computes Google Ads conversion and analytics data, then delivers the results to the user via Telegram when requested.",
    technologies: ["Python", "Telegram API"],
    featured: false,
    category: "backend",
    date: "2025-02",
    highlights: [
      "Google Ads conversions and analytics calculation",
      "Telegram bot delivery on demand",
      "Automated reporting workflow",
    ],
  },
  {
    id: "lucky-spin",
    title: "Lucky Spin the Wheel",
    description:
      "Spin-the-wheel web app with configurable segment probabilities; users sign up via phone and OTP, then access daily rewards.",
    longDescription:
      "A spin-the-wheel experience where segment landing probabilities are configurable. Users enter their number, receive an OTP, subscribe to the platform, and are shown the wheel with daily rewards.",
    technologies: ["TypeScript", "React", "Node.js"],
    featured: false,
    category: "fullstack",
    date: "2025-01",
    highlights: [
      "Configurable spin wheel segment probabilities",
      "Phone, OTP, and subscription flow",
      "Daily rewards system",
    ],
  },
  {
    id: "quickf-fun",
    title: "quickfFun",
    description: "Front-end project with a focus on styling and layout.",
    longDescription:
      "A front-end project built with CSS, emphasizing design and user interface.",
    technologies: ["CSS", "HTML", "JavaScript"],
    featured: false,
    category: "frontend",
    date: "2025-02",
    highlights: ["Custom styling and layout", "Responsive design"],
  },
  // {
  //   id: "ffeleven",
  //   title: "ffeleven",
  //   description: "Front-end project with custom CSS and layout.",
  //   longDescription:
  //     "A front-end project with a focus on CSS-driven design and structure.",
  //   technologies: ["CSS", "HTML", "JavaScript"],
  //   featured: false,
  //   category: "frontend",
  //   date: "2025-02",
  //   highlights: ["CSS-focused implementation", "Clean layout and structure"],
  // },
  {
    id: "ivr-chat",
    title: "ivr-chat",
    description:
      "Application combining IVR and chat functionality, built with JavaScript.",
    longDescription:
      "A JavaScript-based project integrating IVR (Interactive Voice Response) with chat features.",
    technologies: ["JavaScript", "Node.js"],
    featured: false,
    category: "fullstack",
    date: "2025-02",
    highlights: ["IVR and chat integration", "JavaScript-based implementation"],
  },
  {
    id: "bp-lp",
    title: "Bp-Lp",
    description: "Landing page project built with JavaScript.",
    longDescription:
      "A JavaScript landing page project with modern front-end practices.",
    technologies: ["JavaScript", "HTML", "CSS"],
    featured: false,
    category: "fullstack",
    date: "2025-02",
    highlights: ["JavaScript-driven landing page", "Modern front-end approach"],
  },
  // {
  //   id: 'numbase-kwt',
  //   title: 'numbase-kwt',
  //   description: 'JavaScript project for number base and JWT-related functionality.',
  //   longDescription: 'A JavaScript application handling number base operations and JWT (JSON Web Token) integration.',
  //   technologies: ['JavaScript', 'Node.js'],
  //   featured: false,
  //   category: 'fullstack',
  //   date: '2025-12',
  //   highlights: [
  //     'Number base handling',
  //     'JWT integration',
  //   ],
  // },
  {
    id: "trivia-boss-battle",
    title: "trivia-boss-battle",
    description: "TypeScript-based trivia game with a boss battle theme.",
    longDescription:
      "A trivia game built with TypeScript, featuring a boss battle style gameplay and quiz mechanics.",
    technologies: ["TypeScript", "React"],
    featured: false,
    category: "fullstack",
    date: "2025-08",
    highlights: [
      "Trivia and boss battle gameplay",
      "TypeScript implementation",
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: "ark-networks",
    title: "Software Developer",
    company: "The Ark Networks",
    location: "Beirut, Lebanon",
    startDate: "2025-02",
    current: true,
    description: [
      "Developed responsive React and Material UI interfaces across multiple web projects with pixel-perfect implementation.",
      "Contributed to vessel operations, tourism booking, and QR business card platforms with role workflows and interactive user flows.",
      "Engineered notifications, chat, and live updates while optimizing components for stronger responsiveness across devices.",
      "Wrote frontend unit tests and supported Node.js and Prisma backend tasks to improve release confidence.",
      "Collaborated in code reviews with teammates to improve maintainability and reduce recurring bugs.",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Material UI",
      "SCSS",
      "Node.js",
      "Prisma",
    ],
  },
  {
    id: "advopment",
    title: "Software Developer",
    company: "Advopment",
    location: "Remote",
    startDate: "2024-10",
    current: true,
    description: [
      "Designed and delivered 20 landing pages and websites from concept to production with consistent quality.",
      "Built subscription-based SMS web flows supporting recurring user signups.",
      "Crafted responsive React and Next.js interfaces across quiz, news, and games products.",
      "Coordinated API integrations with backend teams and connected front-end layers to Python and Java services.",
      "Authored TypeScript applications and built an internal admin CMS portal for publishing workflows.",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
      "Java",
    ],
  },
];

export const education: Education = {
  degree: "BS in Computer Science",
  institution: "American University of Science and Technology",
  location: "Lebanon",
  startDate: "2019-10",
  endDate: "2023-06",
  description:
    "Completed comprehensive computer science program covering algorithms, data structures, software engineering, and system design.",
};

export const certificates: Certificate[] = [
  {
    name: "Full Stack Development",
    issuer: "SE Factory",
    date: "2024-05",
    description:
      "Successfully completed an intensive 12-week Full-Stack Web Development program covering Front-end and Back-end development, Version Control, Cloud Architecture, and Web Application Development.",
  },
];
