'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import { Project } from '@/types'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Project Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        <span className="text-4xl font-bold text-primary-600 dark:text-primary-400 opacity-50">
          {project.title.charAt(0)}
        </span>
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
            Featured
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <ul className="mb-4 space-y-1">
            {project.highlights.slice(0, 2).map((highlight, idx) => (
              <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                {highlight}
              </li>
            ))}
          </ul>
        )}

        {/* Links */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Github size={18} />
                <span className="text-sm">Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <ExternalLink size={18} />
                <span className="text-sm">Live</span>
              </a>
            )}
          </div>
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center text-primary-600 dark:text-primary-400 font-semibold text-sm"
          >
            <span>View Details</span>
            <ArrowRight size={16} className="ml-1" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
