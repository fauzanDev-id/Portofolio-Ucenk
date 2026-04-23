"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { projects, type Project } from "@/utils/data";

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="section-shell">
        <div className="lg:sticky lg:top-24 lg:z-10 lg:mb-16 lg:w-fit">
          <Reveal>
            <h2 className="section-title text-brand-blue">projects.</h2>
          </Reveal>
        </div>

        <div className="grid gap-7">
          {projects.map((project) => (
            <Reveal key={project.id}>
              <button
                type="button"
                onClick={() => setActiveProject(project)}
                className="group relative block w-full overflow-hidden rounded-[2rem] border border-brand-blue/20"
                data-cursor="open"
              >
                <div className="relative h-[300px] md:h-[460px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/85 via-brand-blue/20 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-100" />

                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-5 text-left text-cream md:p-8"
                    initial={{ y: 36, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65 }}
                  >
                    <p className="text-xs uppercase tracking-[0.25em] md:text-sm">{project.category}</p>
                    <h3 className="mt-2 text-2xl font-semibold md:text-4xl">{project.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm text-cream/85 md:text-base">{project.description}</p>
                  </motion.div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-[110] grid place-items-center bg-ink/65 px-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.article
              className="glass-panel w-full max-w-3xl rounded-3xl p-5 md:p-8"
              initial={{ y: 60, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[220px] overflow-hidden rounded-2xl md:h-[330px]">
                <Image src={activeProject.image} alt={activeProject.title} fill className="object-cover" />
              </div>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-[0.18em] text-brand-blue">{activeProject.category}</p>
                <h3 className="mt-2 text-2xl font-bold text-ink md:text-3xl">{activeProject.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{activeProject.description}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {activeProject.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-brand-blue/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.09em] text-brand-blue"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}