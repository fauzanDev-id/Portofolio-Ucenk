"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
    const mouseX = useMotionValue(-120);
    const mouseY = useMotionValue(-120);
    const scale = useMotionValue(1);
    const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
    const springScale = useSpring(scale, { stiffness: 220, damping: 18 });
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const move = (event: MouseEvent) => {
            mouseX.set(event.clientX);
            mouseY.set(event.clientY);
            setVisible(true);
        };

        const enter = (event: MouseEvent) => {
            const target = (event.target as HTMLElement | null)?.closest(
                "a, button, [data-cursor]"
            );

            if (!target) {
                scale.set(1);
                return;
            }

            scale.set(1.8);
        };

        const leave = () => {
            scale.set(1);
            setVisible(false);
        };

        window.addEventListener("mousemove", move);
        window.addEventListener("mouseover", enter);
        window.addEventListener("mouseout", enter);
        window.addEventListener("blur", leave);

        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseover", enter);
            window.removeEventListener("mouseout", enter);
            window.removeEventListener("blur", leave);
        };
    }, [mouseX, mouseY, scale]);

    return (
        <>
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-999 hidden h-2 w-2 rounded-full bg-brand-blue md:block"
                style={{
                    translateX: springX,
                    translateY: springY,
                    x: "-50%",
                    y: "-50%",
                    scale: springScale,
                    opacity: visible ? 1 : 0,
                }}
            />

            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-998 hidden h-8 w-8 rounded-full border border-brand-blue/35 md:block"
                style={{
                    translateX: springX,
                    translateY: springY,
                    x: "-50%",
                    y: "-50%",
                    scale: springScale,
                    opacity: visible ? 1 : 0,
                }}
            />
        </>
    );
}
