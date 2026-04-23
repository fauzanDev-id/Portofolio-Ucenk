"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Preloader } from "@/components/Preloader";
import { AboutSection } from "@/sections/AboutSection";
import { CertificatesSection } from "@/sections/CertificatesSection";
import { ContactSection } from "@/sections/ContactSection";
import { ExperienceSection } from "@/sections/ExperienceSection";
import { HeroSection } from "@/sections/HeroSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { SkillsSection } from "@/sections/SkillsSection";

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />

      <div
        className={`transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        aria-hidden={!ready}
      >
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <CertificatesSection />
          <ExperienceSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
}
