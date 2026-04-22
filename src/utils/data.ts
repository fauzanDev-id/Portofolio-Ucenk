export type Skill = {
  title: string;
  description: string;
  level: number;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  stack: string[];
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image: string;
};

export type Experience = {
  year: string;
  role: string;
  company: string;
  summary: string;
};

export const skills: Skill[] = [
  {
    title: "Frontend Engineering",
    description: "Building expressive interfaces with Next.js, TypeScript, and modern animation systems.",
    level: 94,
  },
  {
    title: "Backend Architecture",
    description: "Designing robust APIs, clean data flows, and scalable service integrations.",
    level: 88,
  },
  {
    title: "UI Motion Design",
    description: "Crafting micro-interactions, page transitions, and storytelling-based scroll behavior.",
    level: 91,
  },
  {
    title: "Performance Optimization",
    description: "Improving loading, rendering, and interaction timing for reliable 60fps experiences.",
    level: 86,
  },
];

export const projects: Project[] = [
  {
    id: "atlas-finance",
    title: "Atlas Finance Dashboard",
    category: "Web App",
    description: "A premium analytics dashboard with real-time market insights and immersive data storytelling.",
    image: "/projects/project-1.svg",
    stack: ["Next.js", "TypeScript", "Framer Motion", "Prisma"],
  },
  {
    id: "nova-commerce",
    title: "Nova Commerce Experience",
    category: "E-Commerce",
    description: "A high-conversion storefront with cinematic product browsing and seamless checkout flow.",
    image: "/projects/project-2.svg",
    stack: ["Next.js", "Stripe", "Tailwind", "PostgreSQL"],
  },
  {
    id: "studio-echo",
    title: "Studio Echo Portfolio",
    category: "Creative Site",
    description: "An Awwwards-inspired portfolio system built for visual narratives and smooth interactions.",
    image: "/projects/project-3.svg",
    stack: ["Next.js", "Framer Motion", "Lenis", "GSAP"],
  },
];

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    title: "Advanced Front-End Engineering",
    issuer: "Dicoding",
    year: "2025",
    image: "/certificates/cert-1.svg",
  },
  {
    id: "cert-2",
    title: "Cloud Practitioner Essentials",
    issuer: "AWS",
    year: "2024",
    image: "/certificates/cert-2.svg",
  },
  {
    id: "cert-3",
    title: "UI Animation Systems",
    issuer: "Frontend Mentor Pro",
    year: "2026",
    image: "/certificates/cert-3.svg",
  },
];

export const experiences: Experience[] = [
  {
    year: "2026",
    role: "Lead Fullstack Developer",
    company: "Softta Engine",
    summary: "Led architecture and delivery for business-critical digital products with strong UX standards.",
  },
  {
    year: "2025",
    role: "Frontend Developer",
    company: "Freelance",
    summary: "Built premium websites for startups, focusing on branding, motion, and performance.",
  },
  {
    year: "2024",
    role: "Web Developer Intern",
    company: "Digital Agency",
    summary: "Implemented reusable UI systems and collaborated on modern client-facing web experiences.",
  },
];