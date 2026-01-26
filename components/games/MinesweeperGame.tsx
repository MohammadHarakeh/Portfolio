'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MinesweeperGameProps {
  onClose: () => void
}

export function MinesweeperGame({ onClose }: MinesweeperGameProps) {
  const [grid, setGrid] = useState<number[][]>([])
  const [revealed, setRevealed] = useState<boolean[][]>([])
  const [flagged, setFlagged] = useState<boolean[][]>([])
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [recentlyRevealed, setRecentlyRevealed] = useState<Set<string>>(new Set())
  const gridSize = 10
  const mineCount = 15

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const newGrid: number[][] = Array(gridSize)
      .fill(0)
      .map(() => Array(gridSize).fill(0))
    const newRevealed: boolean[][] = Array(gridSize)
      .fill(false)
      .map(() => Array(gridSize).fill(false))
    const newFlagged: boolean[][] = Array(gridSize)
      .fill(false)
      .map(() => Array(gridSize).fill(false))

    // Place mines
    let minesPlaced = 0
    while (minesPlaced < mineCount) {
      const x = Math.floor(Math.random() * gridSize)
      const y = Math.floor(Math.random() * gridSize)
      if (newGrid[y][x] !== -1) {
        newGrid[y][x] = -1
        minesPlaced++
      }
    }

    // Calculate numbers
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        if (newGrid[y][x] === -1) continue
        let count = 0
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy
            const nx = x + dx
            if (
              ny >= 0 &&
              ny < gridSize &&
              nx >= 0 &&
              nx < gridSize &&
              newGrid[ny][nx] === -1
            ) {
              count++
            }
          }
        }
        newGrid[y][x] = count
      }
    }

    setGrid(newGrid)
    setRevealed(newRevealed)
    setFlagged(newFlagged)
    setGameOver(false)
    setGameWon(false)
  }

  const revealCell = (x: number, y: number) => {
    if (gameOver || gameWon || revealed[y][x] || flagged[y][x]) return

    const newRevealed = revealed.map((row) => [...row])
    const newRecentlyRevealed = new Set<string>()
    newRevealed[y][x] = true
    newRecentlyRevealed.add(`${x},${y}`)

    if (grid[y][x] === -1) {
      setGameOver(true)
      // Reveal all mines
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          if (grid[i][j] === -1) newRevealed[i][j] = true
        }
      }
    } else if (grid[y][x] === 0) {
      // Auto-reveal adjacent cells
      const queue = [{ x, y }]
      while (queue.length > 0) {
        const { x: cx, y: cy } = queue.shift()!
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nx = cx + dx
            const ny = cy + dy
            if (
              nx >= 0 &&
              nx < gridSize &&
              ny >= 0 &&
              ny < gridSize &&
              !newRevealed[ny][nx] &&
              !flagged[ny][nx]
            ) {
              newRevealed[ny][nx] = true
              newRecentlyRevealed.add(`${nx},${ny}`)
              if (grid[ny][nx] === 0) {
                queue.push({ x: nx, y: ny })
              }
            }
          }
        }
      }
    }

    setRevealed(newRevealed)
    setRecentlyRevealed(newRecentlyRevealed)
    
    // Clear recently revealed after animation
    setTimeout(() => setRecentlyRevealed(new Set()), 300)

    // Check win condition
    let revealedCount = 0
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (newRevealed[i][j]) revealedCount++
      }
    }
    if (revealedCount === gridSize * gridSize - mineCount) {
      setGameWon(true)
    }
  }

  const toggleFlag = (x: number, y: number, e: React.MouseEvent) => {
    e.preventDefault()
    if (gameOver || gameWon || revealed[y][x]) return

    const newFlagged = flagged.map((row) => [...row])
    newFlagged[y][x] = !newFlagged[y][x]
    setFlagged(newFlagged)
  }

  const getNumberColor = (num: number) => {
    const colors: { [key: number]: string } = {
      1: 'text-blue-400',
      2: 'text-green-400',
      3: 'text-red-400',
      4: 'text-purple-400',
      5: 'text-yellow-400',
      6: 'text-pink-400',
      7: 'text-orange-400',
      8: 'text-gray-400',
    }
    return colors[num] || 'text-gray-300'
  }

  return (
    <div className="relative p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center w-full h-full">
      <div className="mb-4 flex items-center justify-between w-full max-w-md flex-shrink-0">
        <motion.div 
          className="text-blue-400 font-mono text-base font-bold flex items-center gap-2"
          animate={gameWon ? { scale: [1, 1.1, 1], color: '#10b981' } : gameOver ? { scale: [1, 1.1, 1], color: '#ef4444' } : {}}
          transition={{ duration: 0.3 }}
        >
          <span className="text-xl">💣</span>
          <span>{gameWon ? 'You Won! 🎉' : gameOver ? 'Game Over! 💥' : 'Minesweeper'}</span>
        </motion.div>
        <div className="flex gap-2">
          <button
            onClick={initializeGame}
            className="px-3 py-1.5 bg-gray-700 text-gray-300 rounded-lg text-xs hover:bg-gray-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-gray-700 text-gray-300 rounded-lg text-xs hover:bg-gray-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
          >
            Exit
          </button>
        </div>
      </div>
      <div className="grid grid-cols-10 gap-1.5 p-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border-2 border-gray-700 shadow-2xl">
        {Array.from({ length: gridSize * gridSize }).map((_, i) => {
          const x = i % gridSize
          const y = Math.floor(i / gridSize)
          const cell = grid[y]?.[x] ?? 0
          const isRevealed = revealed[y]?.[x] ?? false
          const isFlagged = flagged[y]?.[x] ?? false
          const isRecentlyRevealed = recentlyRevealed.has(`${x},${y}`)
          const isMine = cell === -1
          const isExploded = isMine && isRevealed && gameOver

          return (
            <motion.button
              key={i}
              onClick={() => revealCell(x, y)}
              onContextMenu={(e) => toggleFlag(x, y, e)}
              initial={false}
              animate={{
                scale: isRecentlyRevealed ? [1, 1.2, 1] : isExploded ? [1, 1.3, 1.1] : 1,
                rotate: isExploded ? [0, 10, -10, 0] : 0,
              }}
              transition={{
                duration: isExploded ? 0.5 : 0.2,
                ease: 'easeOut',
              }}
              whileHover={!isRevealed && !isFlagged ? { scale: 1.1 } : {}}
              whileTap={!isRevealed && !isFlagged ? { scale: 0.95 } : {}}
              className={`w-8 h-8 text-sm font-bold flex items-center justify-center rounded-md transition-all duration-200 shadow-md ${
                isRevealed
                  ? isMine
                    ? 'bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white shadow-red-500/50'
                    : 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-200 shadow-inner'
                  : isFlagged
                  ? 'bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-600 text-white shadow-yellow-500/50 hover:from-yellow-600 hover:via-yellow-500 hover:to-yellow-700'
                  : 'bg-gradient-to-br from-gray-600 to-gray-700 text-gray-300 hover:from-gray-500 hover:to-gray-600 shadow-gray-800/50'
              }`}
            >
              <AnimatePresence mode="wait">
                {isFlagged ? (
                  <motion.span
                    key="flag"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.2 }}
                  >
                    🚩
                  </motion.span>
                ) : isRevealed ? (
                  isMine ? (
                    <motion.span
                      key="mine"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.5, 1], rotate: [0, 360] }}
                      transition={{ duration: 0.5 }}
                    >
                      💣
                    </motion.span>
                  ) : (
                    <motion.span
                      key={`cell-${cell}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2, delay: isRecentlyRevealed ? 0.1 : 0 }}
                      className={getNumberColor(cell)}
                    >
                      {cell || ''}
                    </motion.span>
                  )
                ) : (
                  <motion.span
                    key="hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    className="w-2 h-2 rounded-full bg-gray-400"
                  />
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </div>
      <motion.div 
        className="mt-3 text-xs text-gray-400 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Left click to reveal • Right click to flag
      </motion.div>
    </div>
  )
}
