"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
};

export function Reveal({ children, className, as = "div" }: RevealProps) {
  const Tag = as === "section" ? motion.section : motion.div;

  return (
    <Tag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15%" }}
    >
      {children}
    </Tag>
  );
}