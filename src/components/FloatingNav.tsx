"use client";

import { motion } from "framer-motion";

const links = [
  { href: "#home", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function FloatingNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.1, duration: 0.6 }}
      className="fixed left-1/2 top-4 z-50 w-[min(95%,900px)] -translate-x-1/2 rounded-full border border-brand-blue/15 bg-cream/70 px-2 py-2 backdrop-blur-lg"
    >
      <ul className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              data-cursor="go"
              className="block rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-blue transition-colors hover:bg-brand-blue hover:text-cream md:text-xs"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}