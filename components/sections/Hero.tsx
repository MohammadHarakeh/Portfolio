'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { CodeEditor } from '@/components/ui/CodeEditor'
import { personalInfo } from '@/lib/data'

const codeSnippet = `// Welcome to my portfolio
const developer = {
  name: 'Mohammad Harake',
  role: 'Software Developer',
  skills: ['React', 'Next.js', 'TypeScript', 'Material UI'],
  location: 'Beirut, Lebanon',
  passion: 'Building high-impact web products'
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
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent"
    >
      <div className="container relative z-10 mx-auto px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
        <div className="max-w-5xl mx-auto">
          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            {showCode && <CodeEditor code={codeSnippet} />}
          </motion.div>

          {/* Buttons below terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#projects"
              className="px-8 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg text-center"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-primary-600/70 text-primary-700 dark:text-primary-300 rounded-xl font-semibold hover:bg-primary-50/70 dark:hover:bg-primary-900/20 transition-colors text-center"
            >
              Get In Touch
            </a>
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
            className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors bg-white/85 dark:bg-gray-900/85 backdrop-blur-sm rounded-full p-3 shadow-md hover:shadow-lg border border-gray-200/70 dark:border-gray-700/70"
            aria-label="Scroll down"
          >
            <ChevronDown className="animate-bounce" size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
