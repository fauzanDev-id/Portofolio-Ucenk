"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { certificates, type Certificate } from "@/utils/data";

export function CertificatesSection() {
  const [active, setActive] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="py-24 md:py-32">
      <div className="section-shell">
        <Reveal>
          <h2 className="section-title text-brand-blue">Certificates</h2>
        </Reveal>

        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
          {certificates.map((certificate) => (
            <Reveal key={certificate.id} className="w-[86%] min-w-[86%] snap-start md:w-[38%] md:min-w-[38%]">
              <button
                type="button"
                onClick={() => setActive(certificate)}
                className="group block w-full"
                data-cursor="open"
              >
                <article className="glass-panel overflow-hidden rounded-3xl">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={certificate.image}
                      alt={certificate.title}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                    />
                  </div>
                  <div className="p-5 text-left">
                    <h3 className="text-lg font-semibold text-ink">{certificate.title}</h3>
                    <p className="mt-2 text-sm text-muted">
                      {certificate.issuer} · {certificate.year}
                    </p>
                  </div>
                </article>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[110] grid place-items-center bg-ink/65 px-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="glass-panel w-full max-w-3xl rounded-3xl p-5 md:p-8"
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[260px] overflow-hidden rounded-2xl md:h-[420px]">
                <Image src={active.image} alt={active.title} fill className="object-cover" />
              </div>
              <h4 className="mt-5 text-2xl font-bold text-ink">{active.title}</h4>
              <p className="mt-2 text-sm text-muted">
                {active.issuer} · {active.year}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}