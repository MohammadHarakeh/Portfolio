import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'
import { BehindTheScenes } from '@/components/sections/BehindTheScenes'
import { DevStackBackdrop } from '@/components/layout/DevStackBackdrop'

export default function Home() {
  return (
    <main className="relative min-h-screen isolate">
      {/* Static wash + soft radials; DevStackBackdrop adds the single slow 3D motion */}
      <div className="page-ambient" aria-hidden="true" />
      <DevStackBackdrop />
      {/* Transparent so .page-ambient + [data-dev-grid] stay visible in light (opaque bg was hiding the grid) */}
      <div className="relative z-10 min-h-screen bg-transparent">
        <Header />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <BehindTheScenes />
        <Footer />
      </div>
    </main>
  )
}
