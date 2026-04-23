"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

const links = [
  { id: "hero", href: "#hero", label: "Home" },
  { id: "about", href: "#about", label: "About" },
  { id: "skills", href: "#skills", label: "Skills" },
  { id: "projects", href: "#projects", label: "Projects" },
  { id: "certificates", href: "#certificates", label: "Certificates" },
  { id: "experience", href: "#experience", label: "Experience" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Glassmorphism state
    if (latest > 80) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  // Active section observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    links.forEach((link) => {
      // The hero section might be named "hero" or just body top. 
      // We'll observe the sections safely.
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Custom premium smooth scroll logic
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);
    if (!elem) return;

    setMobileMenuOpen(false);

    const isMobile = window.innerWidth < 768;
    // Calculate precise offset to prevent hiding behind the fixed navbar
    const yOffset = isMobile ? -80 : -100;
    const targetY = elem.getBoundingClientRect().top + window.scrollY + yOffset;
    
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 1000; // 1s smooth glide
    let startTime: number | null = null;

    // Premium cubic-bezier like easing (easeOutExpo)
    const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      window.scrollTo(0, startY + distance * easeOutExpo(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <>
      <motion.header
        initial={{ top: -100, opacity: 0 }}
        animate={{ 
          top: scrolled ? 16 : 0,
          opacity: 1,
          width: scrolled ? "min(90%, 900px)" : "100%",
          scale: scrolled ? 0.97 : 1,
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 z-50 mx-auto transition-all duration-700 ease-[0.22,1,0.36,1] origin-top ${
          scrolled 
            ? "rounded-full bg-cream/70 py-3 md:py-3.5 backdrop-blur-2xl shadow-[0_15px_40px_-15px_rgba(10,34,74,0.15)] border border-brand-blue/10" 
            : "bg-transparent py-6 md:py-8 border-transparent"
        }`}
      >
        <div className="flex w-full items-center justify-between px-6 md:px-8">
          {/* Logo */}
          <Link href="#hero" onClick={(e) => scrollToSection(e as any, "#hero")} className="relative z-50 overflow-hidden text-xl font-black uppercase tracking-tighter text-[#0a224a] group" data-cursor="go">
            <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Ucenk.</span>
            <span className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">Ucenk.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-full border border-brand-blue/10 bg-cream/40 p-1 backdrop-blur-md shadow-[0_4px_20px_-10px_rgba(10,34,74,0.1)]">
              {links.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id} className="relative">
                    <a
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      data-cursor="go"
                      className={`relative z-10 block px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${
                        isActive ? "text-cream" : "text-[#0a224a] hover:text-[#0e56b8]"
                      }`}
                    >
                      {link.label}
                    </a>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 z-0 rounded-full bg-[#0a224a]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right CTA */}
          <div className="hidden md:block">
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, "#contact")}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[#0a224a] px-6 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-[#0a224a] transition-colors hover:text-cream"
              data-cursor="go"
            >
              <span className="relative z-10">Let&apos;s Talk</span>
              <div className="absolute inset-0 -z-10 translate-y-full bg-[#0a224a] transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-y-0" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <motion.span 
              animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 8 : 0 }} 
              className="block h-[2px] w-6 bg-[#0a224a]" 
            />
            <motion.span 
              animate={{ opacity: mobileMenuOpen ? 0 : 1 }} 
              className="block h-[2px] w-6 bg-[#0a224a]" 
            />
            <motion.span 
              animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -8 : 0 }} 
              className="block h-[2px] w-6 bg-[#0a224a]" 
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-cream/95 px-8 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {links.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e as any, link.href)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl font-black uppercase tracking-tighter text-[#0a224a]"
                >
                  {link.label}.
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => scrollToSection(e as any, "#contact")}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.1 + links.length * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 inline-flex w-fit items-center justify-center rounded-full bg-[#0a224a] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-cream"
              >
                Let&apos;s Talk
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
