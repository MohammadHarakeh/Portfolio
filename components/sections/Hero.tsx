'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* Background decoration - Neon green glows */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 dark:opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-primary-400 rounded-full mix-blend-screen filter blur-3xl opacity-8 dark:opacity-15 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-primary-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 dark:opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 lg:pt-24 pb-20 lg:pb-24">
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
              className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl text-center"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border-2 border-primary-600 text-primary-600 dark:text-primary-400 rounded-lg font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors text-center"
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
