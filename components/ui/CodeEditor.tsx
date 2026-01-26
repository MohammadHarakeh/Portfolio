'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, FileCode, Terminal } from 'lucide-react'
import { SnakeGame } from '@/components/games/SnakeGame'
import { MinesweeperGame } from '@/components/games/MinesweeperGame'

interface CodeEditorProps {
  code?: string
}

export function CodeEditor({ code }: CodeEditorProps) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const [activeGame, setActiveGame] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands = {
    help: () => [
      'Available commands:',
      '  snake     - Play Snake game',
      '  mines    - Play Minesweeper',
      '  clear    - Clear the terminal',
      '  about    - Show about info',
      '  skills   - Show my skills',
      '  projects - Show my projects',
      '',
    ],
    about: () => [
      'Mohammad Harake',
      'Full-Stack Developer',
      'Location: Beirut, Lebanon',
      'Passion: Building innovative solutions',
      '',
    ],
    skills: () => [
      'Languages: JavaScript, TypeScript, Python, PHP, Java, SQL',
      'Frameworks: React, Next.js, Node.js, Laravel, Django',
      'Databases: MongoDB, MySQL',
      'Tools: Git, GitHub, Postman, Figma',
      '',
    ],
    projects: () => [
      'BookHub - Version control for writers',
      'Subway System - Ticket booking platform',
      'Digital Chain - Responsive website',
      'Kids Security - Landing page',
      '',
    ],
    clear: () => {
      setOutput([])
      return []
    },
    snake: () => {
      setActiveGame('snake')
      return ['Starting Snake game...', 'Use arrow keys to play!', '']
    },
    mines: () => {
      setActiveGame('mines')
      return ['Starting Minesweeper...', 'Click cells to reveal!', '']
    },
  }

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    
    if (trimmedCmd === '') {
      setOutput((prev) => [...prev, ''])
      return
    }

    setOutput((prev) => [...prev, `$ ${cmd}`])

    if (trimmedCmd in commands) {
      const result = commands[trimmedCmd as keyof typeof commands]()
      if (result.length > 0) {
        setOutput((prev) => [...prev, ...result])
      }
    } else {
      setOutput((prev) => [
        ...prev,
        `Command not found: ${cmd}`,
        'Type "help" for available commands',
        '',
      ])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input)
      setInput('')
    }
  }

  const handleCopy = async () => {
    const text = output.join('\n')
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    // Show welcome message
    setOutput([
      'Welcome to my interactive portfolio!',
      'Type "help" to see available commands.',
      '',
    ])
  }, [])

  useEffect(() => {
    if (inputRef.current && activeGame === null) {
      inputRef.current.focus()
    }
  }, [activeGame, output])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700 w-full max-w-4xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex items-center space-x-2">
          <Terminal size={14} className="text-gray-400" />
          <span className="text-xs text-gray-400">portfolio-terminal</span>
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 hover:bg-gray-700 rounded transition-colors"
          aria-label="Copy output"
          title="Copy output"
        >
          {copied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Copy size={16} className="text-gray-400" />
          )}
        </button>
      </div>

      {/* Game Area or Terminal */}
      <div className={`h-[500px] bg-gray-900 overflow-x-hidden ${activeGame ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        <AnimatePresence mode="wait">
          {activeGame === 'snake' ? (
            <div key="snake" className="h-full">
              <SnakeGame onClose={() => setActiveGame(null)} />
            </div>
          ) : activeGame === 'mines' ? (
            <div key="mines" className="h-full">
              <MinesweeperGame onClose={() => setActiveGame(null)} />
            </div>
          ) : (
            <div key="terminal" className="p-4 min-h-full">
              <div className="font-mono text-sm text-gray-300 space-y-1">
                {output.map((line, index) => (
                  <div key={index} className="whitespace-pre-wrap">
                    {line}
                  </div>
                ))}
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-transparent text-gray-300 outline-none caret-green-400"
                    placeholder="Type a command..."
                    autoFocus
                  />
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
