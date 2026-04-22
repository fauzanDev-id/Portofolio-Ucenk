"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { Reveal } from "@/components/Reveal";

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setTimeout(() => {
      setSent(true);
      setPending(false);
      (e.currentTarget as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <section id="contact" className="pb-28 pt-24 md:pb-36 md:pt-32">
      <div className="section-shell">
        <Reveal>
          <h2 className="section-title text-brand-blue">Contact</h2>
          <p className="mt-4 max-w-xl text-sm text-muted md:text-base">
            Let&apos;s build meaningful digital products together. Reach out for collaboration or opportunities.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-5 md:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  required
                  type="text"
                  placeholder="Your Name"
                  className="rounded-2xl border border-brand-blue/20 bg-white/65 px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-blue"
                />
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  className="rounded-2xl border border-brand-blue/20 bg-white/65 px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-blue"
                />
              </div>

              <textarea
                required
                placeholder="Tell me about your project..."
                rows={6}
                className="mt-4 w-full rounded-2xl border border-brand-blue/20 bg-white/65 px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-blue"
              />

              <motion.button
                type="submit"
                data-cursor="send"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-cream transition hover:bg-brand-blue-deep"
                disabled={pending}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M4 12L20 4L14 20L11 13L4 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {pending ? "Sending" : "Send Message"}
              </motion.button>

              {sent && <p className="mt-4 text-sm font-semibold text-brand-blue">Message sent successfully.</p>}
            </form>
          </Reveal>

          <Reveal>
            <div className="glass-panel rounded-3xl p-5 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">Direct Contact</p>
              <h3 className="mt-3 text-xl font-bold text-ink md:text-3xl">fauzan.dev@portfolio.com</h3>
              <p className="mt-2 text-sm text-muted">+62 85 1906 5432 6</p>

              <div className="mt-8 flex items-center gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-brand-blue/25 p-3 text-brand-blue transition hover:-translate-y-1 hover:bg-brand-blue hover:text-cream"
                  data-cursor="visit"
                  aria-label="Github"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2C6.48 2 2 6.58 2 12.24C2 16.77 4.87 20.62 8.84 21.98C9.34 22.08 9.52 21.76 9.52 21.48C9.52 21.23 9.51 20.56 9.5 19.7C6.73 20.32 6.14 18.34 6.14 18.34C5.68 17.13 5.03 16.81 5.03 16.81C4.12 16.17 5.1 16.18 5.1 16.18C6.11 16.25 6.64 17.24 6.64 17.24C7.54 18.82 9 18.37 9.57 18.1C9.67 17.43 9.92 16.97 10.2 16.7C7.99 16.44 5.67 15.54 5.67 11.55C5.67 10.41 6.06 9.48 6.7 8.75C6.6 8.49 6.25 7.44 6.8 6.02C6.8 6.02 7.65 5.74 9.5 7.04C10.31 6.81 11.18 6.69 12.05 6.69C12.92 6.69 13.79 6.81 14.6 7.04C16.45 5.74 17.3 6.02 17.3 6.02C17.85 7.44 17.5 8.49 17.4 8.75C18.04 9.48 18.43 10.41 18.43 11.55C18.43 15.55 16.11 16.44 13.89 16.69C14.25 17.01 14.57 17.66 14.57 18.67C14.57 20.13 14.56 21.14 14.56 21.48C14.56 21.76 14.74 22.09 15.25 21.98C19.22 20.62 22.09 16.77 22.09 12.24C22.09 6.58 17.61 2 12.09 2H12Z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-brand-blue/25 p-3 text-brand-blue transition hover:-translate-y-1 hover:bg-brand-blue hover:text-cream"
                  data-cursor="visit"
                  aria-label="LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M6.94 8.5C8.14 8.5 9.12 7.52 9.12 6.31C9.12 5.11 8.14 4.13 6.94 4.13C5.73 4.13 4.75 5.11 4.75 6.31C4.75 7.52 5.73 8.5 6.94 8.5ZM4.98 19.87H8.9V9.92H4.98V19.87ZM11.36 19.87H15.27V14.92C15.27 13.61 15.52 12.34 17.13 12.34C18.72 12.34 18.74 13.82 18.74 15V19.87H22.66V14.24C22.66 11.47 22.06 9.34 18.82 9.34C17.26 9.34 16.21 10.2 15.78 11.02H15.73V9.92H11.98C12.03 10.65 11.98 19.87 11.98 19.87H11.36Z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-brand-blue/25 p-3 text-brand-blue transition hover:-translate-y-1 hover:bg-brand-blue hover:text-cream"
                  data-cursor="visit"
                  aria-label="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M7.75 2H16.25C19.42 2 22 4.58 22 7.75V16.25C22 19.42 19.42 22 16.25 22H7.75C4.58 22 2 19.42 2 16.25V7.75C2 4.58 4.58 2 7.75 2ZM7.57 3.9C5.55 3.9 3.9 5.55 3.9 7.57V16.43C3.9 18.45 5.55 20.1 7.57 20.1H16.43C18.45 20.1 20.1 18.45 20.1 16.43V7.57C20.1 5.55 18.45 3.9 16.43 3.9H7.57ZM17.25 5.33C17.94 5.33 18.5 5.89 18.5 6.58C18.5 7.27 17.94 7.83 17.25 7.83C16.56 7.83 16 7.27 16 6.58C16 5.89 16.56 5.33 17.25 5.33ZM12 7.13C14.69 7.13 16.87 9.31 16.87 12C16.87 14.69 14.69 16.87 12 16.87C9.31 16.87 7.13 14.69 7.13 12C7.13 9.31 9.31 7.13 12 7.13ZM12 9.03C10.36 9.03 9.03 10.36 9.03 12C9.03 13.64 10.36 14.97 12 14.97C13.64 14.97 14.97 13.64 14.97 12C14.97 10.36 13.64 9.03 12 9.03Z" />
                  </svg>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}