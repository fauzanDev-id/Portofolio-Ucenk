"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/utils/data";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";

const EASE_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-cream selection:bg-brand-blue selection:text-cream">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="section-shell">
          <Reveal>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-brand-blue mb-12">
              all projects.
            </h1>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 mt-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  ease: EASE_EXPO,
                  delay: index * 0.1 
                }}
              >
                <Link 
                  href={`/projects/${project.id}`}
                  className="group block relative aspect-[16/10] overflow-hidden rounded-4xl border border-brand-blue/10 bg-[#0f2344]"
                >
                  <motion.div
                    className="relative h-full w-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.2, ease: EASE_EXPO }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top"
                    />
                  </motion.div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071934]/95 via-[#0a2244]/40 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-cream">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cream/60 mb-2">
                      {project.category}
                    </p>
                    <h3 className="text-3xl font-bold tracking-tight">{project.title}</h3>
                    <p className="mt-2 text-sm text-cream/70 max-w-md line-clamp-2">
                      {project.tagline}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
