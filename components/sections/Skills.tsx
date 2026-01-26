'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { skills } from '@/lib/data'
import { Code2, Database, Wrench, Layers, ChevronDown } from 'lucide-react'

const categoryConfig = {
  language: {
    name: 'Languages',
    icon: Code2,
    color: 'text-blue-600 dark:text-blue-400',
  },
  framework: {
    name: 'Frameworks',
    icon: Layers,
    color: 'text-purple-600 dark:text-purple-400',
  },
  database: {
    name: 'Databases',
    icon: Database,
    color: 'text-green-600 dark:text-green-400',
  },
  tool: {
    name: 'Tools',
    icon: Wrench,
    color: 'text-orange-600 dark:text-orange-400',
  },
}

export function Skills() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const categoriesRef = useRef(null)
  
  const isHeaderInView = useInView(headerRef, { once: true, margin: '0px' })
  const isCategoriesInView = useInView(categoriesRef, { once: true, margin: '0px' })
  
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  const getSkillsByCategory = (category: string) => {
    return skills.filter((skill) => skill.category === category)
  }

  const categories = ['language', 'framework', 'database', 'tool']

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(category)) {
        newSet.delete(category)
      } else {
        newSet.add(category)
      }
      return newSet
    })
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                Skills & Technologies
              </h2>
              <div className="w-24 h-1 bg-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                Technologies I work with to build amazing applications
              </p>
            </div>
          </motion.div>
        </div>

        <div ref={categoriesRef} className="max-w-5xl mx-auto space-y-4">
          {categories.map((category, categoryIndex) => {
            const categorySkills = getSkillsByCategory(category)
            if (categorySkills.length === 0) return null

            const config = categoryConfig[category as keyof typeof categoryConfig]
            const Icon = config.icon
            const isExpanded = expandedCategories.has(category)

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 40 }}
                animate={isCategoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ delay: categoryIndex * 0.15, duration: 0.6, ease: 'easeOut' }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 text-left"
                >
                  <div className="flex items-center">
                    <Icon className={`${config.color} mr-3`} size={24} />
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {config.name}
                    </h3>
                    <span className="ml-3 px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                      {categorySkills.length}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-gray-500 dark:text-gray-400" size={24} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2">
                        <div className="flex flex-wrap gap-3">
                          {categorySkills.map((skill, skillIndex) => (
                            <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                delay: skillIndex * 0.03,
                                duration: 0.2,
                              }}
                              whileHover={{ scale: 1.05 }}
                              className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-700 dark:hover:text-primary-400 transition-all duration-200"
                            >
                              {skill.name}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
