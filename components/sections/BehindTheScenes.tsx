'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Zap, Github, Palette } from 'lucide-react'
import { PORTFOLIO_TECH_STACK, SOCIAL_LINKS } from '@/lib/constants'

export function BehindTheScenes() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="behind-the-scenes"
      ref={ref}
      className="py-20 bg-gray-50 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Behind the Scenes
            </h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
              How this portfolio was built - transparency in development
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <Code2 className="text-primary-600 dark:text-primary-400 mr-3" size={28} />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Tech Stack
                  </h3>
                </div>
                <ul className="space-y-2">
                  {PORTFOLIO_TECH_STACK.map((tech) => (
                    <li key={tech} className="flex items-center text-gray-700 dark:text-gray-300">
                      <span className="text-primary-600 dark:text-primary-400 mr-2">▹</span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Performance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <Zap className="text-primary-600 dark:text-primary-400 mr-3" size={28} />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Performance
                  </h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">▹</span>
                    Optimized with Next.js 14 App Router
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">▹</span>
                    Server-side rendering for fast loads
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">▹</span>
                    Smooth animations with Framer Motion
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">▹</span>
                    Responsive design for all devices
                  </li>
                </ul>
              </motion.div>

              {/* Design */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <Palette className="text-primary-600 dark:text-primary-400 mr-3" size={28} />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Design Philosophy
                  </h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">▹</span>
                    Balanced professional & creative
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">▹</span>
                    Dark mode support
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">▹</span>
                    Accessible & user-friendly
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">▹</span>
                    Smooth micro-interactions
                  </li>
                </ul>
              </motion.div>

              {/* Open Source */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <Github className="text-primary-600 dark:text-primary-400 mr-3" size={28} />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Open Source
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  This portfolio is open source! Check out the code on GitHub.
                </p>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Github size={18} className="mr-2" />
                  View Source Code
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
