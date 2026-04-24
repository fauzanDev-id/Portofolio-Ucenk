"use client";

import { motion } from "framer-motion";
import { useMagnetic } from "./useMagnetic";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
};

export function Magnetic({ children, className = "" }: MagneticProps) {
  const { ref, style, onMouseMove, onMouseLeave } = useMagnetic();

  return (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`inline-block ${className}`.trim()}
    >
      {children}
    </motion.div>
  );
}
