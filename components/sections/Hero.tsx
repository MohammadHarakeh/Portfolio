'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, Code2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { CodeEditor } from '@/components/ui/CodeEditor'
import { personalInfo } from '@/lib/data'

const codeSnippet = `// Welcome to my portfolio
const developer = {
  name: 'Mohammad Harake',
  role: 'Full-Stack Developer',
  skills: ['React', 'Next.js', 'TypeScript', 'Node.js'],
  location: 'Beirut, Lebanon',
  passion: 'Building innovative solutions'
};

function buildPortfolio() {
  return createAmazingProjects();
}`

export function Hero() {
  const [showCode, setShowCode] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowCode(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const scrollToAbout = () => {
    const element = document.querySelector('#about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 dark:bg-primary-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20 lg:pb-24">
        <div className="max-w-5xl mx-auto">
          {/* Centered content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
            >
              <Code2 size={18} />
              <span className="text-sm font-medium">Full-Stack Developer</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block text-gray-900 dark:text-white">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                  {personalInfo.name.split(' ')[0]}
                </span>
              </span>
              <span className="block text-gray-700 dark:text-gray-300 mt-2">
                {personalInfo.title}
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              {personalInfo.tagline}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            >
              <a
                href="#projects"
                className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border-2 border-primary-600 text-primary-600 dark:text-primary-400 rounded-lg font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              >
                Get In Touch
              </a>
            </motion.div>
          </motion.div>

          {/* Terminal - Centered below content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center"
          >
            {showCode && <CodeEditor code={codeSnippet} />}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 lg:bottom-6"
        >
          <button
            onClick={scrollToAbout}
            className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl"
            aria-label="Scroll down"
          >
            <ChevronDown className="animate-bounce" size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
