"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { skills } from "@/utils/data";

type Skill = (typeof skills)[number];

function SkillCard({ 
  skill, 
  index, 
  hoveredIndex, 
  setHoveredIndex 
}: { 
  skill: Skill; 
  index: number; 
  hoveredIndex: number | null; 
  setHoveredIndex: (idx: number | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const isHovered = hoveredIndex === index;
  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Extremely smooth premium springs
  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20, mass: 0.5 });

  // 3D Tilt Effect - slightly amplified
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  // Magnetic Shift
  const magneticX = useTransform(mouseXSpring, [-0.5, 0.5], ["-1.5%", "1.5%"]);
  const magneticY = useTransform(mouseYSpring, [-0.5, 0.5], ["-1.5%", "1.5%"]);

  // Deep Parallax Layers
  const layer1X = useTransform(mouseXSpring, [-0.5, 0.5], ["-6px", "6px"]);
  const layer1Y = useTransform(mouseYSpring, [-0.5, 0.5], ["-6px", "6px"]);
  
  const layer2X = useTransform(mouseXSpring, [-0.5, 0.5], ["-12px", "12px"]);
  const layer2Y = useTransform(mouseYSpring, [-0.5, 0.5], ["-12px", "12px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const px = mouseX / rect.width - 0.5;
    const py = mouseY / rect.height - 0.5;
    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

    x.set(clamp(px, -0.3, 0.3));
    y.set(clamp(py, -0.3, 0.3));
    
    setMousePos({ x: mouseX, y: mouseY });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    x.set(0);
    y.set(0);
    setHoveredIndex(null);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 1, 
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.15 
      }}
      animate={{
        scale: isHovered ? 1.04 : isOtherHovered ? 0.96 : 1,
        opacity: isOtherHovered ? 0.45 : 1,
        y: isHovered ? -12 : 0,
      }}
      className="relative z-10 block h-full perspective-distant"
      data-cursor="view"
      style={{ zIndex: isHovered ? 50 : 10 }}
    >
      {/* Massive radial glow behind the hovered card to light up the section */}
      <AnimatePresence>
        {isHovered && !isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-[-80%] -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(9,44,102,0.15)_0%,transparent_50%)] blur-2xl"
          />
        )}
      </AnimatePresence>

      <motion.article
        className={`group relative flex h-72 flex-col overflow-hidden rounded-4xl border border-brand-blue/15 bg-cream/30 p-6 shadow-[0_15px_50px_-15px_rgba(9,44,102,0.08)] backdrop-blur-2xl transition-shadow duration-700 md:h-80 md:p-7 ${
          isHovered ? "border-brand-blue/30 shadow-[0_30px_80px_-20px_rgba(9,44,102,0.25)]" : ""
        }`}
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          x: isMobile ? 0 : magneticX,
          y: isMobile ? 0 : magneticY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Inner subtle rim light */}
        <div className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-white/40" />

        {/* Dynamic Light Sweep tracking mouse */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.4), transparent 40%)`,
          }}
        />

        {/* Layer 1: Base text (slowest) */}
        <motion.div 
          style={{ x: isMobile ? 0 : layer1X, y: isMobile ? 0 : layer1Y, z: isMobile ? 0 : 20 }} 
          className="relative z-10 flex h-full flex-col"
        >
          <motion.h3 
            className="text-lg font-bold uppercase tracking-widest text-[#0a224a] md:text-xl drop-shadow-sm"
          >
            {skill.title}
          </motion.h3>
          
          <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-[#0a224a]/80 md:text-[0.95rem]">
            {skill.description}
          </p>

          {/* Layer 2: Progress Bar (mid layer) */}
          <motion.div 
            style={{ x: isMobile ? 0 : layer2X, y: isMobile ? 0 : layer2Y, z: isMobile ? 0 : 45 }}
            className="mt-7"
          >
            <div className="mb-4 flex items-center justify-between text-[0.7rem] font-bold uppercase tracking-[0.15em] text-[#0a224a]">
              <span>Proficiency</span>
              <span>{skill.level}%</span>
            </div>
            
            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-brand-blue/15 shadow-inner">
              {/* The filled bar */}
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-[#0a224a]/80 to-[#0a224a] shadow-[0_0_12px_rgba(10,34,74,0.6)]"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 + 0.2 }}
              >
                {/* Infinite sweeping light ray over the progress bar on hover */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 z-20 w-1/2 bg-linear-to-r from-transparent via-white/50 to-transparent blur-[2px]"
                    animate={{ x: ["-150%", "300%"] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                  />
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.article>
    </motion.div>
  );
}

export function SkillsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="skills" className="relative z-10 overflow-hidden bg-cream py-16 md:py-20">
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-col items-start">
            <h2 className="section-title text-brand-blue drop-shadow-sm">skills.</h2>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.8] text-[#0a224a]/80">
              A blend of engineering depth and interaction design to produce modern, high-quality web products. Focus remains entirely on craft, precision, and immersive user experiences.
            </p>
          </div>
        </Reveal>

        {/* Broken grid layout for asymmetrical, handcrafted feel */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-6 lg:gap-8">
          {skills.map((skill, idx) => (
            <div 
              key={skill.title} 
              className=""
            >
              <SkillCard 
                skill={skill} 
                index={idx} 
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}