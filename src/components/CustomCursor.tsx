"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const x = useMotionValue(-120);
  const y = useMotionValue(-120);
  const smoothX = useSpring(x, { stiffness: 500, damping: 35, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 500, damping: 35, mass: 0.5 });

  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      x.set(e.clientX - 18);
      y.set(e.clientY - 18);
      setVisible(true);
    };

    const onHover = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [data-cursor]"
      );

      if (!target) {
        setActive(false);
        setLabel("");
        return;
      }

      setActive(true);
      setLabel(target.dataset.cursor ?? "");
    };

    const onLeaveWindow = () => setVisible(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onHover);
    window.addEventListener("mouseout", onHover);
    window.addEventListener("blur", onLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onHover);
      window.removeEventListener("mouseout", onHover);
      window.removeEventListener("blur", onLeaveWindow);
    };
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[130] hidden items-center justify-center rounded-full border border-brand-blue bg-brand-blue/10 text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-blue md:flex"
      style={{ x: smoothX, y: smoothY }}
      animate={{
        width: active ? 86 : 36,
        height: active ? 86 : 36,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    >
      <span className="px-2 text-center">{label || ""}</span>
    </motion.div>
  );
}