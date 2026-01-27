'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { projects } from '@/lib/data'
import { ProjectCard } from '@/components/ui/ProjectCard'

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 bg-white dark:bg-gray-900 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
              A selection of projects I&apos;ve built, showcasing my skills and passion for development
            </p>
          </div>

          {/* Featured Projects */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Other Projects
                </h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={featuredProjects.length + index}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
