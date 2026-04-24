"use client";

import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/utils/data";
import { Navbar } from "@/components/Navbar";
import { useEffect, useState } from "react";

const EASE_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="flex h-screen items-center justify-center bg-cream">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brand-blue">Project not found</h1>
          <Link href="/projects" className="mt-4 inline-block text-brand-blue underline">
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream selection:bg-brand-blue selection:text-cream">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="section-shell">
          <div className="mb-12 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-blue/60 transition-colors hover:text-brand-blue"
            >
              <span className="text-lg">←</span> Back
            </button>
            <div className="flex gap-4">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-brand-blue px-6 py-3 text-xs font-bold uppercase tracking-widest text-cream transition-transform hover:scale-105 active:scale-95"
                >
                  Live Preview
                </a>
              )}
            </div>
          </div>

          <div className="grid gap-16 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE_EXPO }}
                className="relative aspect-[16/10] overflow-hidden rounded-4xl border border-brand-blue/10"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority
                  className="object-cover object-top"
                />
              </motion.div>

              <div className="grid gap-12 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: EASE_EXPO }}
                >
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-blue/50 mb-4">Problem</h3>
                  <p className="text-lg leading-relaxed text-brand-blue/80">
                    {project.problem}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: EASE_EXPO }}
                >
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-blue/50 mb-4">Solution</h3>
                  <p className="text-lg leading-relaxed text-brand-blue/80">
                    {project.solution}
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: EASE_EXPO }}
              >
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-blue/50 mb-6">Key Features</h3>
                <ul className="grid gap-4 md:grid-cols-2">
                  {project.highlight.map((item, idx) => (
                    <li key={idx} className="flex gap-4 items-start p-6 rounded-2xl bg-brand-blue/5 border border-brand-blue/5">
                      <span className="text-brand-blue font-bold">0{idx + 1}.</span>
                      <span className="text-brand-blue/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <aside className="space-y-12">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: EASE_EXPO }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-blue/50 mb-2">{project.category}</p>
                <h1 className="text-5xl font-bold tracking-tighter text-brand-blue leading-none mb-6">
                  {project.title}
                </h1>
                <p className="text-xl text-brand-blue/70 leading-relaxed">
                  {project.tagline}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: EASE_EXPO }}
              >
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-blue/50 mb-4">Description</h3>
                <p className="text-base leading-relaxed text-brand-blue/80">
                  {project.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: EASE_EXPO }}
              >
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-blue/50 mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="rounded-full border border-brand-blue/20 px-4 py-2 text-xs font-bold text-brand-blue/70">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>

              {project.url && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: EASE_EXPO }}
                  className="pt-8"
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between w-full p-8 rounded-3xl bg-brand-blue text-cream transition-all hover:shadow-2xl hover:shadow-brand-blue/20"
                  >
                    <span className="text-xl font-bold uppercase tracking-widest">Visit Project</span>
                    <span className="text-3xl transition-transform group-hover:translate-x-2">→</span>
                  </a>
                </motion.div>
              )}
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
