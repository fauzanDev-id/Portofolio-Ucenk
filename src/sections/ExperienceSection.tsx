"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { experiences } from "@/utils/data";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="section-shell">
        <Reveal>
          <h2 className="section-title text-brand-blue">experience.</h2>
        </Reveal>

        <div className="relative mt-12 pl-8 md:pl-12">
          <motion.span
            className="absolute left-2 top-0 h-full w-[2px] origin-top bg-brand-blue/25 md:left-5"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          />

          <div className="space-y-7 md:space-y-9">
            {experiences.map((item) => (
              <Reveal key={`${item.year}-${item.role}`}>
                <article className="glass-panel relative rounded-3xl p-5 md:p-7">
                  <span className="absolute -left-8 top-8 h-3.5 w-3.5 rounded-full border-2 border-brand-blue bg-cream md:-left-[2.55rem]" />
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">{item.year}</p>
                  <h3 className="mt-2 text-lg font-bold text-ink md:text-2xl">{item.role}</h3>
                  <p className="mt-1 text-sm font-semibold text-brand-blue">{item.company}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{item.summary}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}