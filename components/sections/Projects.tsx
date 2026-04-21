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
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  const sortedProjects = [...projects].sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1))
  const displayedProjects = showAll ? sortedProjects : sortedProjects.slice(0, INITIAL_COUNT)
  const hasMore = sortedProjects.length > INITIAL_COUNT
  const selectedProject = selectedProjectId ? sortedProjects.find((project) => project.id === selectedProjectId) : null

  return (
    <section
      id="projects"
      ref={ref}
      className="section-shell"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="section-title">
              Projects
            </h2>
            <div className="section-divider"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
              Selected work focused on real products, measurable outcomes, and reliable engineering.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onViewDetails={setSelectedProjectId}
              />
            ))}
          </div>

          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-8 minimal-card p-6 md:p-8"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedProject.title}</h3>
                  {selectedProject.role && (
                    <p className="text-sm mt-1 text-primary-700 dark:text-primary-300">
                      Role: {selectedProject.role}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProjectId(null)}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Close
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">Problem</p>
                  <p className="text-gray-600 dark:text-gray-400">{selectedProject.problem ?? selectedProject.description}</p>
                </div>
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">Solution</p>
                  <p className="text-gray-600 dark:text-gray-400">{selectedProject.solution ?? selectedProject.longDescription ?? selectedProject.description}</p>
                </div>
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">Impact</p>
                  <p className="text-gray-600 dark:text-gray-400">{selectedProject.impact ?? selectedProject.highlights?.[0] ?? 'Delivered a reliable production-ready implementation.'}</p>
                </div>
              </div>
            </motion.div>
          )}

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
