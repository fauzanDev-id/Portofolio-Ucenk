"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type PreloaderProps = {
  onComplete: () => void;
};

export function Preloader({ onComplete }: PreloaderProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 1900;

    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(next);

      if (next >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setLoading(false);
          onComplete();
        }, 250);
      }
    }, 24);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="text-center text-brand-blue">
            <p className="hero-display text-5xl tracking-wide md:text-7xl">FAUZAN</p>
            <p className="mt-4 text-sm tracking-[0.45em]">LOADING</p>
            <p className="mt-6 text-xl font-semibold">{progress}%</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}