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
  const imageY = useTransform(scrollYProgress, [0, 1], [12, -26]);

  return (
    <section id="home" className="grain-overlay relative min-h-screen overflow-hidden bg-cream pb-10 pt-26">
      <div className="pointer-events-none absolute -left-[40vw] -top-[36vw] h-[72vw] w-[72vw] rounded-full border-[30px] border-brand-blue md:-left-[18vw] md:-top-[27vw] md:h-[52vw] md:w-[52vw]" />
      <div className="pointer-events-none absolute -bottom-[35vw] -right-[42vw] h-[72vw] w-[72vw] rounded-full border-[30px] border-brand-blue md:-bottom-[24vw] md:-right-[23vw] md:h-[52vw] md:w-[52vw]" />

      <div className="section-shell relative flex min-h-[89vh] items-center justify-center" ref={ref}>
        <motion.p
          className="absolute left-0 top-2 text-xs font-medium tracking-[0.08em] text-brand-blue md:text-[2rem] md:tracking-[0.03em]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.1, duration: 0.6 }}
        >
          WEB DEVELOPER
        </motion.p>

        <motion.p
          className="absolute bottom-6 left-0 text-xs font-medium tracking-[0.08em] text-brand-blue md:text-[2rem] md:tracking-[0.03em]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.25, duration: 0.6 }}
        >
          FULLSTACK DEVELOPER
        </motion.p>

        <motion.p
          className="absolute right-0 top-2 text-right text-xs font-medium tracking-[0.08em] text-brand-blue md:text-[2rem] md:tracking-[0.03em]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
        >
          FAUZAN DZAKI
          <br />
          ARDYAN
        </motion.p>

        <motion.a
          href="#contact"
          data-cursor="talk"
          className="absolute bottom-6 right-0 text-xs font-medium tracking-[0.08em] text-brand-blue transition-colors hover:text-brand-blue-deep md:text-[2rem] md:tracking-[0.03em]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.35, duration: 0.6 }}
        >
          +6285-1906-5432-6
        </motion.a>

        <motion.div
          style={{ y }}
          className="hero-display relative z-10 text-brand-blue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.9 }}
        >
          <p
            className="text-[16.6vw] leading-[0.76] md:text-[13.8vw]"
            style={{ textShadow: "0 4px 0 rgba(9,44,102,0.02)" }}
          >
            <AnimatedWord word={headline} />
          </p>
          <p
            className="text-[16.6vw] leading-[0.76] md:text-[13.8vw]"
            style={{ textShadow: "0 4px 0 rgba(9,44,102,0.02)" }}
          >
            <AnimatedWord word={headline} />
          </p>
        </motion.div>

        <motion.div
          style={{ y: imageY }}
          className="absolute left-1/2 top-[28%] z-20 h-[72vh] w-[min(92vw,800px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-transparent md:h-[82vh]"
          initial={{ opacity: 0, scale: 0.9, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.95, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Profile image container"
        >
          <motion.div
            className="relative h-full w-full"
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 6.2, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
          >
            <Image
              src="/asset/UCENK.png"
              alt="Fauzan Dzaki Ardyan profile"
              fill
              priority
              sizes="(min-width: 768px) 42vw, 88vw"
              className="object-contain object-center scale-[1.2] [filter:drop-shadow(0_0_0_#fff)_drop-shadow(0_0_1px_#fff)] md:scale-[1.18]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}