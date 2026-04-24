"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { Magnetic } from "@/components/Magnetic";

/* ─── Data ─────────────────────────────────────────────── */

const navLinks = [
  { id: "home", href: "/", label: "Home" },
  { id: "about", href: "/#about", label: "About" },
  { id: "skills", href: "/#skills", label: "Skills" },
  { id: "projects", href: "/projects", label: "Projects" },
  { id: "certificates", href: "/#certificates", label: "Certificates" },
  { id: "experience", href: "/#experience", label: "Experience" },
];

const fullMenuLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About Me" },
  { href: "/#skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/#certificates", label: "Certificates" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

const socialLinks = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Github", href: "https://github.com" },
];

/* ─── Easing ───────────────────────────────────────────── */

const EASE_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];
const LOGO_TEXT = "UCENK.";

/* ─── Overlay backdrop variant ─────────────────────────── */

const overlayVariants = {
  hidden: {
    opacity: 0,
    y: "-8%",
    clipPath: "inset(0 0 100% 0)",
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: "0%",
    clipPath: "inset(0 0 0% 0)",
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: EASE_EXPO,
      when: "beforeChildren",
      staggerChildren: 0.075,
    },
  },
  exit: {
    opacity: 0,
    y: "-5%",
    clipPath: "inset(0 0 100% 0)",
    filter: "blur(8px)",
    transition: {
      duration: 0.55,
      ease: EASE_EXPO,
      when: "afterChildren",
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

/* ─── Menu item variant ────────────────────────────────── */

const menuItemVariants = {
  hidden: {
    opacity: 0,
    y: 26,
    rotateX: -12,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.65,
      ease: EASE_EXPO,
    },
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: {
      duration: 0.35,
      ease: EASE_EXPO,
    },
  },
};

/* ─── Footer item variant ──────────────────────────────── */

const footerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_EXPO },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.25, ease: EASE_EXPO },
  },
};

/* ─── Header item variant ──────────────────────────────── */

const headerVariants = {
  hidden: { opacity: 0, y: -15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.05, ease: EASE_EXPO },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.25, ease: EASE_EXPO },
  },
};

const logoWordVariants = {
  rest: {
    transition: { staggerChildren: 0.012, staggerDirection: -1 },
  },
  hover: {
    transition: { staggerChildren: 0.02, delayChildren: 0.01 },
  },
};

const logoCharVariants = {
  rest: { y: 0, rotateZ: 0, opacity: 1 },
  hover: {
    y: -3,
    rotateZ: -1.5,
    opacity: 1,
    transition: { duration: 0.36, ease: EASE_EXPO },
  },
};

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════ */

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [logoHovered, setLogoHovered] = useState(false);
  const gradientX = useMotionValue(50);
  const gradientY = useMotionValue(50);
  const logoOffsetX = useMotionValue(0);
  const logoOffsetY = useMotionValue(0);
  const lockedScrollY = useRef(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  const { scrollY } = useScroll();

  /* --- Smooth spring for scroll-driven nav --- */
  const smooth = useSpring(scrollY, {
    stiffness: 50,
    damping: 20,
    mass: 0.8,
  });

  const navScale = useTransform(smooth, [0, 200], [1, 0.95]);
  const navY = useTransform(smooth, [0, 200], [0, 12]);
  const navMaxWidth = useTransform(smooth, [0, 200], ["100%", "56rem"]);
  const navPadY = useTransform(smooth, [0, 200], ["1.5rem", "0.75rem"]);
  const navBorderRadius = useTransform(smooth, [0, 200], ["0px", "9999px"]);
  const navBgColor = useTransform(
    smooth,
    [0, 200],
    ["rgba(238, 235, 222, 0)", "rgba(238, 235, 222, 0.8)"]
  );
  const navBlurRaw = useTransform(smooth, [0, 200], [0, 20]);
  const navBlur = useTransform(navBlurRaw, (v) => `blur(${v}px)`);
  const navBorderOpacityRaw = useTransform(smooth, [0, 200], [0, 0.1]);
  const navBorderColor = useTransform(
    navBorderOpacityRaw,
    (v) => `rgba(10, 34, 74, ${v})`
  );
  const navShadowOpacityRaw = useTransform(smooth, [0, 200], [0, 0.1]);
  const navShadow = useTransform(
    navShadowOpacityRaw,
    (v) => `0 8px 32px -8px rgba(10, 34, 74, ${v})`
  );

  /* --- Body scroll lock --- */
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (menuOpen) {
      lockedScrollY.current = window.scrollY;
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${lockedScrollY.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.touchAction = "none";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.touchAction = "";
      if (lockedScrollY.current !== 0) {
        window.scrollTo(0, lockedScrollY.current);
      }
    }

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.touchAction = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setHoveredLink(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* --- IntersectionObserver for active section --- */
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

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    // Also observe contact section for fullscreen menu
    const contactEl = document.getElementById("contact");
    if (contactEl) observer.observe(contactEl);

    return () => observer.disconnect();
  }, []);

  /* --- Smooth scroll to section --- */
  const scrollToSection = useCallback(
    (e: React.MouseEvent, href: string) => {
      e.preventDefault();

      const isExternalPage = !href.startsWith("#") && !href.startsWith("/#") && href !== "/";
      const isHashLink = href.includes("#");

      if (isExternalPage) {
        setMenuOpen(false);
        setHoveredLink(null);
        router.push(href);
        return;
      }

      const targetId = href.split("#")[1] || "home";
      const elem = document.getElementById(targetId);

      if (!elem) {
        setMenuOpen(false);
        setHoveredLink(null);
        router.push(href);
        return;
      }

      setMenuOpen(false);
      setHoveredLink(null);

      // Small delay so exit animation plays first
      setTimeout(() => {
        const yOffset = -100;
        const targetY =
          elem.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }, 350);
    },
    [router]
  );

  /* --- Parallax gradient on mouse move inside overlay --- */
  const handleOverlayMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!overlayRef.current) return;
      const rect = overlayRef.current.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      gradientX.set(px);
      gradientY.set(py);
    },
    [gradientX, gradientY]
  );

  const smoothGX = useSpring(gradientX, { stiffness: 40, damping: 30 });
  const smoothGY = useSpring(gradientY, { stiffness: 40, damping: 30 });
  const smoothLogoX = useSpring(logoOffsetX, { stiffness: 250, damping: 18, mass: 0.35 });
  const smoothLogoY = useSpring(logoOffsetY, { stiffness: 250, damping: 18, mass: 0.35 });
  const gradientBg = useTransform(
    [smoothGX, smoothGY],
    ([gx, gy]: number[]) =>
      `radial-gradient(ellipse 600px 600px at ${gx}% ${gy}%, rgba(14, 86, 184, 0.12) 0%, transparent 72%)`
  );

  const handleLogoPointerMove = useCallback(
    (event: React.PointerEvent<HTMLAnchorElement>) => {
      if (!logoRef.current) return;
      const rect = logoRef.current.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      logoOffsetX.set(px * 10);
      logoOffsetY.set(py * 8);
    },
    [logoOffsetX, logoOffsetY]
  );

  const resetLogoOffset = useCallback(() => {
    logoOffsetX.set(0);
    logoOffsetY.set(0);
  }, [logoOffsetX, logoOffsetY]);

  return (
    <>
      {/* ─── Main Navbar (Floating Pill) ─────────────────── */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          scale: navScale,
          y: navY,
          maxWidth: navMaxWidth,
          paddingTop: navPadY,
          paddingBottom: navPadY,
          borderRadius: navBorderRadius,
          backgroundColor: navBgColor,
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur,
          borderColor: navBorderColor,
          boxShadow: navShadow,
        }}
        className="fixed left-0 right-0 z-60 mx-auto origin-top border will-change-transform"
      >
        <div className="flex w-full items-center justify-between px-6 md:px-8">
          <motion.a
            ref={logoRef}
            href="#home"
            onClick={(e) => scrollToSection(e, "#home")}
            onPointerMove={handleLogoPointerMove}
            onPointerLeave={resetLogoOffset}
            onPointerUp={resetLogoOffset}
            onHoverStart={() => setLogoHovered(true)}
            onHoverEnd={() => setLogoHovered(false)}
            className="group relative z-70 inline-flex text-xl font-black uppercase tracking-tighter text-[#0a224a]"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.95, y: 1 }}
            transition={{ duration: 0.35, ease: EASE_EXPO }}
            style={{ x: smoothLogoX, y: smoothLogoY }}
          >
            <motion.span
              className="relative inline-flex"
              animate={logoHovered ? "hover" : "rest"}
              variants={logoWordVariants}
            >
              {LOGO_TEXT.split("").map((char, idx) => (
                <motion.span
                  key={`${char}-${idx}`}
                  variants={logoCharVariants}
                  className="inline-block"
                  style={{ transformOrigin: "50% 100%" }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
            <motion.span
              className="absolute -bottom-0.5 left-0 h-0.5 overflow-hidden bg-[#c9493b]/45"
              initial={{ width: "0%", opacity: 0.6 }}
              whileHover={{ width: "100%", opacity: 1 }}
              whileTap={{ width: "65%", opacity: 0.9 }}
              transition={{ duration: 0.35, ease: EASE_EXPO }}
            >
              <motion.span
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(201,73,59,0) 10%, rgba(201,73,59,1) 50%, rgba(201,73,59,0) 90%, transparent 100%)",
                }}
                initial={{ x: "-120%" }}
                whileHover={{ x: "120%" }}
                transition={{ duration: 0.8, ease: EASE_EXPO }}
              />
            </motion.span>
          </motion.a>

          {/* Desktop Nav Pills */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-full border border-[#0a224a]/10 bg-[#eeebde]/40 p-1 backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id} className="relative">
                    <a
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className={`relative z-10 block px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${
                        isActive ? "text-[#eeebde]" : "text-[#0a224a]"
                      }`}
                    >
                      {link.label}
                    </a>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill-main"
                        className="absolute inset-0 z-0 rounded-full bg-[#0a224a]"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Hamburger / Close Toggle */}
          <Magnetic>
            <button
              className="relative z-70 flex h-10 w-10 items-center justify-center"
              onClick={() => {
                setHoveredLink(null);
                setMenuOpen(!menuOpen);
              }}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="fullscreen-menu"
            >
              <motion.span
                animate={
                  menuOpen
                    ? { rotate: 45, y: 0, width: 26 }
                    : { rotate: 0, y: 0, width: 26 }
                }
                transition={{ duration: 0.4, ease: EASE_EXPO }}
                className={`block h-[2.5px] rounded-full transition-colors duration-300 ${
                  menuOpen ? "bg-[#eeebde]" : "bg-[#0a224a]"
                }`}
                style={{ width: 26 }}
              />
              <motion.span
                animate={
                  menuOpen
                    ? { rotate: -45, y: 0, width: 26, opacity: 1 }
                    : { rotate: 0, y: 0, width: 26, opacity: 0 }
                }
                transition={{ duration: 0.4, ease: EASE_EXPO }}
                className={`absolute block h-[2.5px] rounded-full transition-colors duration-300 ${
                  menuOpen ? "bg-[#eeebde]" : "bg-[#0a224a]"
                }`}
                style={{ width: 26 }}
              />
            </button>
          </Magnetic>
        </div>
      </motion.header>

      {/* ─── Fullscreen Overlay Menu ─────────────────────── */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            id="fullscreen-menu"
            ref={overlayRef}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseMove={handleOverlayMouseMove}
            onWheel={(event) => event.preventDefault()}
            onTouchMove={(event) => event.preventDefault()}
            className="fixed inset-0 z-65 flex h-dvh flex-col overflow-hidden overscroll-none touch-none backdrop-blur-[3px]"
            style={{ perspective: "1200px", transformOrigin: "top center" }}
          >
            {/* ── Background layers ── */}

            {/* Base cream background */}
            <div className="absolute inset-0 bg-[#eeebde]" />

            {/* Ambient moving gradient layer */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(130deg, rgba(14,86,184,0.1) 0%, rgba(238,235,222,0) 38%, rgba(11,63,134,0.12) 100%)",
                backgroundSize: "140% 140%",
              }}
              animate={{
                backgroundPosition: ["0% 40%", "100% 60%", "0% 40%"],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Parallax gradient that follows cursor */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: gradientBg }}
            />

            {/* Subtle secondary gradient for depth */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(14,86,184,0.08) 0%, transparent 70%)",
              }}
            />

            {/* Grain / noise texture overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                backgroundSize: "128px 128px",
              }}
            />

            {/* Fine dot texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(14,86,184,0.16) 0.8px, transparent 0.8px)",
                backgroundSize: "4px 4px",
              }}
            />

            {/* Vignette overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 52%, rgba(14,86,184,0.16) 100%)",
              }}
            />

            {/* ── Header ── */}
            <motion.div
              variants={headerVariants}
              className="relative z-20 flex w-full items-center justify-between px-6 py-6 md:px-10 md:py-8"
            >
              <div className="w-10" />
              <motion.p
                className="text-2xl font-black uppercase tracking-tighter text-[#0e56b8] md:text-3xl"
                whileHover={{ opacity: 1, y: -1 }}
                whileTap={{ scale: 0.96, y: 1 }}
                transition={{ duration: 0.3, ease: EASE_EXPO }}
              >
                UCENK.
              </motion.p>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setHoveredLink(null);
                }}
                aria-label="Close menu"
                className="group relative flex h-10 w-10 items-center justify-center"
              >
                <motion.span
                  className="absolute h-0.5 w-6 bg-[#0e56b8] group-hover:bg-[#0b3f86]"
                  initial={{ rotate: 0, scale: 0 }}
                  animate={{ rotate: 45, scale: 1 }}
                  exit={{ rotate: 0, scale: 0 }}
                  transition={{ duration: 0.4, ease: EASE_EXPO }}
                  style={{ transition: "background-color 0.3s" }}
                />
                <motion.span
                  className="absolute h-0.5 w-6 bg-[#0e56b8] group-hover:bg-[#0b3f86]"
                  initial={{ rotate: 0, scale: 0 }}
                  animate={{ rotate: -45, scale: 1 }}
                  exit={{ rotate: 0, scale: 0 }}
                  transition={{ duration: 0.4, delay: 0.05, ease: EASE_EXPO }}
                  style={{ transition: "background-color 0.3s" }}
                />
              </button>
            </motion.div>

            {/* ── Decorative side numbers ── */}
            <motion.div
              variants={footerVariants}
              className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-20"
            >
              {fullMenuLinks.map((_, i) => (
                <span
                  key={i}
                  className="text-[10px] font-mono tracking-widest text-[#0e56b8]/45"
                >
                  0{i + 1}
                </span>
              ))}
            </motion.div>

            {/* ── Menu Links ── */}
            <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6">
              <nav className="flex w-full max-w-5xl flex-col items-center gap-0">
                {fullMenuLinks.map((link) => {
                  const sectionId = link.href.replace("#", "");
                  const hasActiveInMenu = fullMenuLinks.some(
                    (menuLink) => menuLink.href.replace("#", "") === activeSection
                  );
                  const resolvedActiveSection = hasActiveInMenu ? activeSection : "home";
                  const isActive = resolvedActiveSection === sectionId;
                  const isHovered = hoveredLink === link.label;
                  const somethingHovered = hoveredLink !== null;

                  // Keep links clearly visible by default.
                  let targetOpacity = 0.94;
                  if (isActive) targetOpacity = 1;
                  else if (isHovered) targetOpacity = 0.98;
                  else if (somethingHovered) targetOpacity = 0.52;

                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      onMouseEnter={() => setHoveredLink(link.label)}
                      onMouseLeave={() => setHoveredLink(null)}
                      variants={menuItemVariants}
                      className="group relative block py-1 md:py-2"
                      style={{ perspective: "800px" }}
                    >
                      {/* Link text */}
                      <motion.span
                        animate={{
                          opacity: targetOpacity,
                          scale: isHovered && !isActive ? 1.04 : 1,
                          x: isHovered && !isActive ? 6 : 0,
                          textShadow:
                            isHovered || isActive
                              ? "0 14px 36px rgba(0,0,0,0.3)"
                              : "0 0 0 rgba(0,0,0,0)",
                        }}
                        transition={{
                          duration: 0.45,
                          ease: EASE_EXPO,
                        }}
                        className="menu-display relative z-10 block text-center text-[clamp(2.25rem,7.5vh,6.2rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em] text-[#0e56b8] will-change-transform"
                      >
                        {link.label}
                      </motion.span>

                      {/* Active strike-through line */}
                      {isActive && (
                        <motion.div
                          layoutId="active-menu-strike"
                          className="absolute left-0 right-0 top-1/2 z-20 h-1 -translate-y-1/2"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent 0%, #0e56b8 15%, #0e56b8 85%, transparent 100%)",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 340,
                            damping: 32,
                          }}
                        />
                      )}

                      {/* Hover glow line (subtle) */}
                      {isHovered && !isActive && (
                        <motion.div
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 0.3 }}
                          exit={{ scaleX: 0, opacity: 0 }}
                          className="absolute left-0 right-0 bottom-0 z-20 h-px origin-left bg-[#0e56b8]"
                          transition={{ duration: 0.4, ease: EASE_EXPO }}
                        />
                      )}

                      {/* Hover index number */}
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={
                          isHovered
                            ? { opacity: 0.4, x: 0 }
                            : { opacity: 0, x: -10 }
                        }
                        transition={{ duration: 0.3, ease: EASE_EXPO }}
                        className="absolute -left-8 md:-left-12 top-1/2 -translate-y-1/2 text-[10px] md:text-xs font-mono tracking-widest text-[#0e56b8]"
                      >
                        0{fullMenuLinks.indexOf(link) + 1}
                      </motion.span>
                    </motion.a>
                  );
                })}
              </nav>
            </div>

            {/* ── Footer ── */}
            <motion.div
              variants={footerVariants}
              className="relative z-10 flex w-full flex-col items-center gap-4 pb-8 md:pb-10"
            >
              {/* Social links */}
              <div className="flex items-center gap-3 md:gap-4">
                {socialLinks.map((social, i) => (
                  <motion.div key={social.label} className="flex items-center gap-3 md:gap-4">
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 0.35, y: 0 }}
                      whileHover={{ opacity: 1, y: -2 }}
                      transition={{
                        delay: 0.4 + i * 0.06,
                        duration: 0.4,
                        ease: EASE_EXPO,
                      }}
                      className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#0e56b8] transition-colors hover:text-[#0b3f86]"
                    >
                      {social.label}
                    </motion.a>
                    {i < socialLinks.length - 1 && (
                      <span className="text-[10px] text-[#0e56b8]/45">•</span>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Decorative bottom line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8, ease: EASE_EXPO }}
                className="h-px w-16 origin-center bg-[#0e56b8]/35"
              />

              {/* Copyright */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#0e56b8]"
              >
                © 2026 Ucenk
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
