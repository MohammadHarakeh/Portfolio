'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, GraduationCap, Award } from 'lucide-react'
import { experiences, education, certificates } from '@/lib/data'
import { formatDate } from '@/lib/utils'

export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="experience"
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
              Experience & Education
            </h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* Work Experience */}
            <div>
              <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white flex items-center">
                <Briefcase className="mr-3 text-primary-600 dark:text-primary-400" size={28} />
                Work Experience
              </h3>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="relative pl-8 border-l-2 border-primary-300 dark:border-primary-700"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary-600 rounded-full"></div>
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          {exp.title}
                        </h4>
                        <span className="text-sm text-gray-600 dark:text-gray-400 mt-1 sm:mt-0">
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : (exp.endDate ? formatDate(exp.endDate) : '')}
                        </span>
                      </div>
                      <p className="text-primary-600 dark:text-primary-400 font-semibold mb-3">
                        {exp.company} • {exp.location}
                      </p>
                      <ul className="space-y-2">
                        {exp.description.map((desc, idx) => (
                          <li key={idx} className="text-gray-700 dark:text-gray-300 flex items-start">
                            <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1.5">•</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white flex items-center">
                <GraduationCap className="mr-3 text-primary-600 dark:text-primary-400" size={28} />
                Education
              </h3>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative pl-8 border-l-2 border-primary-300 dark:border-primary-700"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary-600 rounded-full"></div>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {education.degree}
                    </h4>
                    <span className="text-sm text-gray-600 dark:text-gray-400 mt-1 sm:mt-0">
                      {formatDate(education.startDate)} - {formatDate(education.endDate)}
                    </span>
                  </div>
                  <p className="text-primary-600 dark:text-primary-400 font-semibold mb-3">
                    {education.institution} • {education.location}
                  </p>
                  {education.description && (
                    <p className="text-gray-700 dark:text-gray-300">{education.description}</p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Certificates */}
            <div>
              <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white flex items-center">
                <Award className="mr-3 text-primary-600 dark:text-primary-400" size={28} />
                Certificates
              </h3>
              <div className="space-y-6">
                {certificates.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                    className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md"
                  >
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {cert.name}
                    </h4>
                    <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
                      {cert.issuer} • {formatDate(cert.date)}
                    </p>
                    {cert.description && (
                      <p className="text-gray-700 dark:text-gray-300">{cert.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
