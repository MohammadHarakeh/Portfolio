'use client'

import { useEffect, useState } from 'react'

// Hexagon perimeter approximation for stroke animation (scaled up)
const HEXAGON_PERIMETER = 396 // ~264 * 1.5 for larger hexagon

export function InitialLoading() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    // Animation sequence timing - smoother with longer duration
    const phaseDuration = 200 // ms per phase - increased for smoother animation
    const totalPhases = 8 // Phase 7: to top, Phase 8: to top-right, then show H
    
    // Trigger phases sequentially with smoother timing
    for (let i = 1; i <= totalPhases; i++) {
      setTimeout(() => {
        setAnimationPhase(i)
      }, i * phaseDuration)
    }

    // Minimum display time - ensure H is visible for ~1 second
    // Phase 8 starts at 8 * 500 = 4000ms, so H appears at 4000ms
    // H should stay visible for at least 1 second, so until at least 5000ms
    const minDisplayTime = 4500
    const startTime = Date.now()

    const hideLoading = () => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minDisplayTime - elapsed)
      
      setTimeout(() => {
        setIsFadingOut(true)
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }, remaining)
    }

    if (document.readyState === 'complete') {
      setTimeout(hideLoading, 200)
    } else {
      window.addEventListener('load', () => {
        setTimeout(hideLoading, 200)
      })
    }

    const maxTimer = setTimeout(() => {
      setIsFadingOut(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }, 6100)

    return () => {
      clearTimeout(maxTimer)
      window.removeEventListener('load', hideLoading)
    }
  }, [])

  if (!isLoading) return null

  // Calculate stroke dash offset based on animation phase
  const getStrokeDashoffset = () => {
    switch (animationPhase) {
      case 0: // Start - nothing visible
        return HEXAGON_PERIMETER
      case 1: // Top diagonal to bottom right (~1/6 of perimeter)
        return HEXAGON_PERIMETER * (5/6)
      case 2: // To bottom (~2/6 of perimeter)
        return HEXAGON_PERIMETER * (4/6)
      case 3: // To bottom left (~3/6 of perimeter)
        return HEXAGON_PERIMETER * (3/6)
      case 4: // To left (~4/6 of perimeter)
        return HEXAGON_PERIMETER * (2/6)
      case 5: // Complete hexagon (~5/6 of perimeter)
        return HEXAGON_PERIMETER * (1/6)
      case 6: // Full loop complete - show entire hexagon
        return 0
      case 7: // Continue from start to top (full hexagon + 1/6 more)
        return -HEXAGON_PERIMETER * (1/6)
      case 8: // Continue to top-right (full hexagon + 2/6 more)
        return -HEXAGON_PERIMETER * (2/6)
      default:
        return HEXAGON_PERIMETER
    }
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gray-950 transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
      aria-label="Loading"
    >
      <div className="flex items-center justify-center">
        <div
          className={`transition-all duration-700 ${
            isFadingOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <svg
            width="180"
            height="180"
            viewBox="0 0 150 150"
            className="relative overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Glow filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Animated stroke hexagon - no fill, only stroke - scaled up and centered */}
            {/* Use larger dasharray to allow continuation past the start point */}
            <polygon
              points="75,15 135,45 135,105 75,135 15,105 15,45"
              fill="none"
              stroke="#00ff41"
              strokeWidth="4.5"
              opacity="0.9"
              filter="url(#glow)"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: HEXAGON_PERIMETER * 2,
                strokeDashoffset: getStrokeDashoffset() + HEXAGON_PERIMETER,
                transition: 'stroke-dashoffset 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                transformOrigin: 'center',
              }}
            />

            {/* Center "M" letter - appears after phase 8 (when stroke reaches top-right) */}
            <g
  style={{
    opacity: animationPhase >= 8 ? 1 : 0,
    transform: animationPhase >= 8 ? 'scale(1)' : 'scale(0.5)',
    transformOrigin: '75px 75px',
    transition: 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  }}
>
  {/* Single thick filled M */}
  <text
    x="75"
    y="75"
    fontSize="72"
    fontWeight="900"
    fill="#00ff41"
    textAnchor="middle"
    dominantBaseline="middle"
    style={{
      fontFamily: 'var(--font-poppins), Poppins, sans-serif',
    }}
  >
    M
  </text>
</g>
          </svg>
        </div>
      </div>
    </div>
  )
}