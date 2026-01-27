'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { User } from 'lucide-react'
import { personalInfo } from '@/lib/data'

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 bg-white dark:bg-gray-900 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              About Me
            </h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-2xl p-8 h-96 flex items-center justify-center">
                <User size={120} className="text-primary-600 dark:text-primary-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {personalInfo.bio}
              </p>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I&apos;m passionate about creating innovative solutions that solve real-world problems.
                With experience in both frontend and backend development, I bring a comprehensive
                approach to building web applications that are both functional and user-friendly.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
