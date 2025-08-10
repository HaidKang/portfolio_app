import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { HeroSection } from "./components/sections/hero-section"
import { ProjectsSection } from "./components/sections/projects-section"
import { SkillsSection } from "./components/sections/skills-section"
import { ExperienceSection } from "./components/sections/experience-section"
import { ContactSection } from "./components/sections/contact-section"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
