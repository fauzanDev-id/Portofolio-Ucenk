"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { skills } from "@/utils/data";

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="section-shell">
        <Reveal>
          <h2 className="section-title text-brand-blue">Skills</h2>
          <p className="mt-4 max-w-2xl text-sm text-muted md:text-base">
            A blend of engineering depth and interaction design to produce modern, high-quality web products.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {skills.map((skill, idx) => (
            <Reveal key={skill.title}>
              <motion.article
                className="glass-panel rounded-3xl p-6 md:p-8"
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                style={{ transitionDelay: `${idx * 70}ms` }}
                data-cursor="view"
              >
                <h3 className="text-lg font-semibold uppercase tracking-[0.06em] text-brand-blue md:text-xl">
                  {skill.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{skill.description}</p>

                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.1em] text-brand-blue">
                    <span>Proficiency</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-brand-blue/10">
                    <motion.div
                      className="h-full rounded-full bg-brand-blue"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
                    />
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}