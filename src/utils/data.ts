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
  tagline: string;
  overview: string;
  problem: string;
  solution: string;
  highlight: string[];
  tech: string[];
  url: string;
  image: string;
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
    id: "parakelana",
    title: "Parakelana Adventure Booking",
    category: "Booking System",
    description: "A modern outdoor gear rental platform designed to simplify booking and equipment management.",
    tagline: "Outdoor gear rental platform",
    overview:
      "Parakelana is built to make adventure gear rental faster, clearer, and more reliable for both customers and operators.",
    problem:
      "Manual booking and stock tracking created delays, booking conflicts, and slow payment verification.",
    solution:
      "Built a real-time booking flow with automated payment confirmation and a centralized admin dashboard for inventory and orders.",
    highlight: [
      "Real-time booking system",
      "Payment confirmation automation",
      "Admin dashboard for inventory and orders",
    ],
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    url: "https://parakelana-adventure-booking.vercel.app/",
    image: "/asset/parakelana/page_parakelana.png",
  },
  {
    id: "ucenk-theme",
    title: "Ucenk Theme",
    category: "Creative Theme",
    description: "A modern visual theme system focused on expressive interactions and polished UI consistency.",
    tagline: "Immersive visual theme experience",
    overview:
      "Ucenk Theme showcases a distinctive visual language with cinematic motion and carefully tuned component styling.",
    problem:
      "Generic template aesthetics made branding inconsistent and less memorable across pages.",
    solution:
      "Designed a cohesive theme architecture with reusable visual tokens, dynamic sections, and smooth interaction patterns.",
    highlight: [
      "Consistent design token system",
      "Cinematic transitions and micro-interactions",
      "Reusable UI blocks for fast iteration",
    ],
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
    url: "https://ucenk-theme.vercel.app/",
    image: "/asset/Ucenk_Theme/page_Ucenk_Theme.png",
  },
  {
    id: "gimap-simda",
    title: "GIMAP SIMDA",
    category: "Government Information System",
    description: "A data service platform supporting municipal workflow and structured public sector information access.",
    tagline: "Scalable civic information platform",
    overview:
      "GIMAP SIMDA delivers structured data access and operational clarity for institutional users in a government environment.",
    problem:
      "Legacy workflows made data retrieval fragmented and difficult to manage across teams.",
    solution:
      "Implemented a centralized interface with clearer data pathways, better role-based usability, and streamlined access.",
    highlight: [
      "Structured data navigation",
      "Operational dashboard flow",
      "Improved clarity for administrative users",
    ],
    tech: ["PHP", "JavaScript", "MySQL", "Bootstrap"],
    url: "https://gimap.simda.net/",
    image: "/asset/GI/image.png",
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