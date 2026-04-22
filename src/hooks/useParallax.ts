"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

export function useParallax(distance = 60) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return { ref, y };
}