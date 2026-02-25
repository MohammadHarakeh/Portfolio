'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { projects } from '@/lib/data'
import { ProjectCard } from '@/components/ui/ProjectCard'

const INITIAL_COUNT = 3

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [showAll, setShowAll] = useState(false)

  const sortedProjects = [...projects].sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1))
  const displayedProjects = showAll ? sortedProjects : sortedProjects.slice(0, INITIAL_COUNT)
  const hasMore = sortedProjects.length > INITIAL_COUNT

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
              Projects
            </h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
              A selection of projects I&apos;ve built, showcasing my skills and passion for development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-3 rounded-lg font-semibold text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30 hover:bg-primary-200 dark:hover:bg-primary-800/40 transition-colors"
              >
                {showAll ? 'Show less' : `View all (${sortedProjects.length})`}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
