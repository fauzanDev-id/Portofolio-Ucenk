"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { value: "3+", label: "Years of experience" },
  { value: "20+", label: "Completed projects" },
  { value: "12+", label: "Certificates & awards" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Use gsap.context for completely safe and robust React cleanup
    const ctx = gsap.context(() => {
      // Simple, stable timeline
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      })
      .fromTo(
        cardRef.current,
        { scale: 0.92, opacity: 0.95, transformOrigin: "center center" },
        { scale: 1.05, opacity: 1, ease: "none" }
      )
      .to(cardRef.current, {
        scale: 0.95,
        opacity: 0.98,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert(); // Single, clean revert call
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-30 h-[200vh] bg-cream"
    >
      {/* Sticky layout handles the "pinning" natively without GSAP DOM manipulation */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center">
        {/* Background shapes (kept behind the card) */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-[8%] top-[10%] h-72 w-72 rounded-full bg-brand-blue/5 blur-3xl md:h-112 md:w-[28rem]" />
          <div className="absolute bottom-[-10%] right-[-4%] h-96 w-96 rounded-full bg-brand-blue/8 blur-3xl md:h-136 md:w-136" />
        </div>

        <div className="section-shell flex w-full items-center justify-center">
          <div
            ref={cardRef}
            className="glass-panel grid w-full max-w-7xl gap-10 rounded-4xl border border-brand-blue/10 px-6 py-8 shadow-[0_22px_70px_-40px_rgba(10,38,88,0.35)] will-change-transform md:grid-cols-[1.08fr_0.92fr] md:gap-12 md:rounded-[3rem] md:px-10 md:py-10 lg:px-12 lg:py-12"
          >
            <div className="flex flex-col justify-center text-brand-blue">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.42em] md:text-[0.8rem]">
                About Me
              </p>

              <h2 className="mt-4 max-w-[12ch] font-display text-[clamp(3rem,6vw,5.2rem)] leading-[0.9] tracking-[-0.08em] text-brand-blue md:max-w-[10ch]">
                Crafting calm, cinematic digital experiences.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-ink/80 md:text-base md:leading-8">
                I&apos;m a full-stack developer focused on premium web interfaces, smooth interactions,
                and storytelling through motion. I build responsive products that balance performance,
                clarity, and visual depth.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-brand-blue/12 bg-cream/60 p-4"
                  >
                    <div className="text-2xl font-bold text-brand-blue md:text-3xl">{stat.value}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.16em] text-muted md:text-[0.72rem]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-108 rounded-4xl border border-brand-blue/10 bg-cream/55 p-4 md:max-w-124 md:p-5">
                <div className="relative aspect-4/5 overflow-hidden rounded-[1.6rem] bg-brand-blue/5">
                  <Image
                    src="/asset/UCENK.png"
                    alt="Profile photo for About Me"
                    fill
                    sizes="(min-width: 768px) 30vw, 80vw"
                    className="object-cover object-center"
                    onLoad={() => ScrollTrigger.refresh()}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-cream/25 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}