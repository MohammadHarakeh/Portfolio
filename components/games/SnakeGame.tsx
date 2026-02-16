'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface SnakeGameProps {
  onClose: () => void
}

const GRID_SIZE = 15;
const WIN_SCORE = 225;

export function SnakeGame({ onClose }: SnakeGameProps) {
  const [snake, setSnake] = useState([{ x: 7, y: 7 }]);
  const [food, setFood] = useState({ x: 10, y: 10 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0);
  const [foodEaten, setFoodEaten] = useState(false);
  const directionQueue = useRef<Array<{ x: number; y: number }>>([]);
  const currentDirection = useRef({ x: 1, y: 0 });
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const resetGame = () => {
    setSnake([{ x: 7, y: 7 }]);
    setFood({ x: 10, y: 10 });
    const initialDirection = { x: 1, y: 0 };
    setDirection(initialDirection);
    currentDirection.current = initialDirection;
    setGameOver(false);
    setGameWon(false);
    setScore(0);
    setFoodEaten(false);
    directionQueue.current = [];
  };

  const handleDirectionChange = useCallback((newDirection: { x: number; y: number }) => {
    if (gameOver || gameWon) return;

    const lastQueuedDirection =
      directionQueue.current.length > 0
        ? directionQueue.current[directionQueue.current.length - 1]
        : currentDirection.current;

    // Prevent reversing into itself
    if (
      lastQueuedDirection.x === -newDirection.x &&
      lastQueuedDirection.y === -newDirection.y
    ) {
      return;
    }

    // Prevent moving in the same direction
    if (
      lastQueuedDirection.x === newDirection.x &&
      lastQueuedDirection.y === newDirection.y
    ) {
      return;
    }

    // Check if direction is valid (not opposite of current)
    if (lastQueuedDirection.x === 0 && newDirection.x !== 0) {
      // Currently moving vertically, can change to horizontal
      const lastInQueue =
        directionQueue.current[directionQueue.current.length - 1];
      if (
        !lastInQueue ||
        lastInQueue.x !== newDirection.x ||
        lastInQueue.y !== newDirection.y
      ) {
        directionQueue.current.push(newDirection);
      }
    } else if (lastQueuedDirection.y === 0 && newDirection.y !== 0) {
      // Currently moving horizontally, can change to vertical
      const lastInQueue =
        directionQueue.current[directionQueue.current.length - 1];
      if (
        !lastInQueue ||
        lastInQueue.x !== newDirection.x ||
        lastInQueue.y !== newDirection.y
      ) {
        directionQueue.current.push(newDirection);
      }
    }
  }, [gameOver, gameWon]);

  // Keyboard controls
  useEffect(() => {
    if (gameOver || gameWon) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Prevent default scrolling behavior
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      let newDirection: { x: number; y: number } | null = null;

      switch (e.key) {
        case "ArrowUp":
          newDirection = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          newDirection = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
          newDirection = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          newDirection = { x: 1, y: 0 };
          break;
      }

      if (newDirection) {
        handleDirectionChange(newDirection);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameOver, gameWon, handleDirectionChange]);

  // Touch/drag handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (gameOver || gameWon) return;
    e.preventDefault();
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (gameOver || gameWon || !touchStartRef.current) return;
    e.preventDefault();

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const minDragDistance = 20; // Minimum distance to register a direction change

    // Only update direction if drag distance is significant
    if (
      Math.abs(deltaX) < minDragDistance &&
      Math.abs(deltaY) < minDragDistance
    ) {
      return;
    }

    let newDirection: { x: number; y: number } | null = null;

    // Determine direction based on which axis has more movement
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal drag
      if (deltaX > 0) {
        newDirection = { x: 1, y: 0 }; // Right
      } else {
        newDirection = { x: -1, y: 0 }; // Left
      }
    } else {
      // Vertical drag
      if (deltaY > 0) {
        newDirection = { x: 0, y: 1 }; // Down
      } else {
        newDirection = { x: 0, y: -1 }; // Up
      }
    }

    if (newDirection) {
      handleDirectionChange(newDirection);
      // Update touch start to prevent rapid direction changes
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchStartRef.current = null;
  };

  useEffect(() => {
    if (gameOver || gameWon) return;

    const gameLoop = setInterval(() => {
      // Process the next direction from the queue
      if (directionQueue.current.length > 0) {
        const nextDirection = directionQueue.current.shift()!;
        currentDirection.current = nextDirection;
        setDirection(nextDirection);
      }

      setSnake((prev) => {
        // Use the current direction from ref
        const dir = currentDirection.current;

        const head = {
          x: prev[0].x + dir.x,
          y: prev[0].y + dir.y,
        };

        // Check wall collision - game over
        if (
          head.x < 0 ||
          head.x >= GRID_SIZE ||
          head.y < 0 ||
          head.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prev;
        }

        // Check self collision (excluding the head itself)
        const body = prev.slice(1);
        if (
          body.some((segment) => segment.x === head.x && segment.y === head.y)
        ) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [head, ...prev];

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore((prevScore) => {
            const newScore = prevScore + 1;
            // Check win condition
            if (newScore >= WIN_SCORE) {
              setGameWon(true);
            }
            return newScore;
          });
          setFoodEaten(true);
          setTimeout(() => setFoodEaten(false), 200);

          // Generate new food that's not on the snake
          let newFood: { x: number; y: number };
          do {
            newFood = {
              x: Math.floor(Math.random() * GRID_SIZE),
              y: Math.floor(Math.random() * GRID_SIZE),
            };
          } while (
            newSnake.some(
              (segment) => segment.x === newFood.x && segment.y === newFood.y,
            )
          );
          setFood(newFood);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 180);

    return () => clearInterval(gameLoop);
  }, [direction, food, gameOver, gameWon]);

  const getSnakeSegmentStyle = (index: number) => {
    const isHead = index === 0;

    if (isHead) {
      return "bg-gradient-to-br from-green-300 via-green-400 to-green-500 rounded-lg shadow-xl border-2 border-green-200 ring-2 ring-green-400/50";
    }

    // Body segments with slight variation
    return "bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-md shadow-md border border-green-400/30";
  };

  return (
    <div className="p-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center w-full h-full">
      <div className="mb-2 flex items-center justify-between w-full max-w-sm flex-shrink-0">
        <div className="text-green-400 font-mono text-sm font-bold flex items-center gap-1.5">
          <span className="text-lg">🐍</span>
          <span>
            Score: {score} / {WIN_SCORE}
          </span>
        </div>
        <div className="flex gap-1.5">
          {(gameOver || gameWon) && (
            <button
              onClick={resetGame}
              className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-all duration-200 font-medium"
            >
              Restart
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600 transition-all duration-200 font-medium"
          >
            Exit
          </button>
        </div>
      </div>
      <div
        className="relative bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl shadow-2xl overflow-hidden flex-shrink-0 mx-auto"
        style={{ width: "320px", height: "320px" }}
      >
        <div
          data-snake-game
          className="grid gap-0.5 p-0.5 w-full h-full touch-none select-none"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const snakeIndex = snake.findIndex((s) => s.x === x && s.y === y);
            const isSnake = snakeIndex !== -1;
            const isFood = food.x === x && food.y === y;
            const isHead = snakeIndex === 0;

            return (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  scale:
                    isFood && foodEaten
                      ? [1, 1.3, 1]
                      : isHead
                        ? [1, 1.05, 1]
                        : 1,
                }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className={`w-full h-full ${
                  isHead
                    ? getSnakeSegmentStyle(0)
                    : isSnake
                      ? getSnakeSegmentStyle(snakeIndex)
                      : isFood
                        ? "bg-gradient-to-br from-red-400 via-red-500 to-red-600 rounded-full shadow-xl animate-pulse border-2 border-red-300 ring-2 ring-red-400/30"
                        : "bg-gray-800/40 hover:bg-gray-800/60"
                }`}
              />
            );
          })}
        </div>
      </div>
      {gameWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-2 text-green-400 font-mono text-sm font-bold text-center"
        >
          🎉 You Win! Score: {score}
        </motion.div>
      )}
      {gameOver && !gameWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-2 text-red-400 font-mono text-xs font-bold text-center"
        >
          Game Over! Score: {score}
        </motion.div>
      )}
      <div className="mt-1 text-[10px] text-gray-500 text-center">
        {isMobile ? "Drag your finger on the board to control" : "Arrow keys"}
      </div>
    </div>
  );
}
