import type { Variants } from "framer-motion";

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export const letterRise: Variants = {
  hidden: { opacity: 0, y: "0.9em" },
  show: {
    opacity: 1,
    y: "0em",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};