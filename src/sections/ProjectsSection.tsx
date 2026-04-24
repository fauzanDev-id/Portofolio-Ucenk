"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/utils/data";
import Link from "next/link";
import { useRouter } from "next/navigation";

const EASE_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ProjectsSection() {
  const router = useRouter();
  const [maxShift, setMaxShift] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxShift]);
  const trackScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateShift = () => {
      const viewportWidth = window.innerWidth;
      const totalWidth = track.scrollWidth;
      const shift = Math.max(totalWidth - viewportWidth, 0);
      setMaxShift(shift);
    };

    updateShift();

    const resizeObserver = new ResizeObserver(updateShift);
    resizeObserver.observe(track);
    window.addEventListener("resize", updateShift);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateShift);
    };
  }, []);

  return (
    <section id="projects" ref={containerRef} className="relative h-[300vh] bg-cream">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="section-shell pt-10 md:pt-14 flex items-end justify-between">
          <Reveal>
            <h2 className="section-title text-brand-blue">projects.</h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <Link 
              href="/projects" 
              className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue/60 transition-colors hover:text-brand-blue mb-4 md:mb-6"
            >
              View all <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x, scale: trackScale }}
          className="mt-8 flex gap-8 px-6 md:mt-12 md:gap-10 md:px-10"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              layoutId={`card-${project.id}`}
              onClick={() => router.push(`/projects/${project.id}`)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  router.push(`/projects/${project.id}`);
                }
              }}
              role="button"
              tabIndex={0}
              whileHover={{ y: -8, scale: 1.015 }}
              transition={{ duration: 0.5, ease: EASE_EXPO }}
              className="group relative h-[62vh] w-[78vw] min-w-160 max-w-245 shrink-0 cursor-pointer overflow-hidden rounded-4xl border border-brand-blue/20 bg-[#0f2344]"
              data-cursor="open"
            >
              <motion.div className="relative h-full w-full overflow-hidden">
                <motion.div
                  className="h-full w-full"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 1.1, ease: EASE_EXPO }}
                >
                  <motion.div
                    className="relative h-full w-full"
                    initial={{ scale: 1.01 }}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 1.1, ease: EASE_EXPO }}
                  >
                    <Image
                      src={project.image}
                      alt={`Website preview ${project.title}`}
                      fill
                      loading="lazy"
                      className="object-cover object-top"
                    />
                  </motion.div>
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#071934]/95 via-[#0a2244]/40 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-100" />

                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6 text-left text-cream md:p-10"
                  initial={{ y: 16, opacity: 0.8 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: EASE_EXPO }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-cream/65 mb-1">
                    {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/75 mb-2">{project.category}</p>
                  <h3 className="text-xl font-bold leading-tight md:text-3xl tracking-tight">{project.title}</h3>
                  <p className="mt-2.5 text-xs md:text-sm text-cream/75 leading-relaxed">{project.tagline}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}