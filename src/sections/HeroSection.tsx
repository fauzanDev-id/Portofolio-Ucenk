"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { letterRise, staggerContainer } from "@/animations/variants";
import { useParallax } from "@/hooks/useParallax";

const headline = "PORTFOLIO";

function AnimatedWord({ word }: { word: string }) {
  return (
    <motion.span
      className="block overflow-hidden"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      aria-hidden
    >
      {word.split("").map((letter, idx) => (
        <motion.span key={`${letter}-${idx}`} className="inline-block" variants={letterRise}>
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function HeroSection() {
  const { ref, y } = useParallax(90);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [15, -30]);

  return (
    <section id="home" className="grain-overlay relative min-h-screen overflow-hidden bg-cream pb-10 pt-26">
      {/* Noise Texture Overlay for Premium Feel */}
      <div
        className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Background Shapes */}
      <div className="pointer-events-none absolute -left-[40vw] -top-[36vw] z-0 h-[72vw] w-[72vw] rounded-full border-[20px] border-brand-blue opacity-[0.15] md:-left-[15vw] md:-top-[25vw] md:h-[50vw] md:w-[50vw] md:border-[30px]" />
      <div className="pointer-events-none absolute -bottom-[35vw] -right-[42vw] z-0 h-[72vw] w-[72vw] rounded-full border-[20px] border-brand-blue opacity-[0.15] md:-bottom-[20vw] md:-right-[20vw] md:h-[50vw] md:w-[50vw] md:border-[30px]" />

      <div className="section-shell relative flex min-h-[89vh] w-full items-center justify-center" ref={ref}>
        {/* Corner Typography */}
        <motion.p
          className="absolute left-5 top-5 z-20 text-xs font-medium tracking-[0.12em] text-brand-blue md:left-10 md:top-10 md:text-sm md:tracking-[0.15em] lg:text-[0.95rem]"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          WEB DEVELOPER
        </motion.p>

        <motion.p
          className="absolute bottom-5 left-5 z-20 text-xs font-medium tracking-[0.12em] text-brand-blue md:bottom-10 md:left-10 md:text-sm md:tracking-[0.15em] lg:text-[0.95rem]"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          FULLSTACK DEVELOPER
        </motion.p>

        <motion.p
          className="absolute right-5 top-5 z-20 text-right text-xs font-medium tracking-[0.12em] text-brand-blue md:right-10 md:top-10 md:text-sm md:tracking-[0.15em] lg:text-[0.95rem]"
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          FAUZAN DZAKI
          <br />
          ARDYAN
        </motion.p>

        <motion.a
          href="#contact"
          data-cursor="talk"
          className="absolute bottom-5 right-5 z-20 text-right text-xs font-medium tracking-[0.12em] text-brand-blue transition-colors hover:text-brand-blue-deep md:bottom-10 md:right-10 md:text-sm md:tracking-[0.15em] lg:text-[0.95rem]"
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          +6285-1906-5432-6
        </motion.a>

        {/* Main Headline Typography */}
        <motion.div
          style={{ y }}
          className="hero-display relative z-10 flex flex-col items-center justify-center text-brand-blue"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="text-[17.5vw] leading-[0.72] tracking-[-0.01em] md:text-[15.5vw]"
            style={{ textShadow: "0 10px 30px rgba(9,44,102,0.06)" }}
          >
            <AnimatedWord word={headline} />
          </p>
          <p
            className="text-[17.5vw] leading-[0.72] tracking-[-0.01em] md:text-[15.5vw]"
            style={{ textShadow: "0 10px 30px rgba(9,44,102,0.06)" }}
          >
            <AnimatedWord word={headline} />
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          style={{ y: imageY }}
          className="absolute left-1/2 top-[47%] z-30 h-[75vh] w-[min(92vw,800px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-transparent md:h-[88vh]"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Profile image container"
        >
          <motion.div
            className="relative h-full w-full"
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
          >
            <Image
              src="/asset/UCENK.png"
              alt="Fauzan Dzaki Ardyan profile"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 90vw"
              className="object-contain object-center scale-[1.25] [filter:drop-shadow(0_20px_40px_rgba(9,44,102,0.18))] md:scale-[1.3]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}