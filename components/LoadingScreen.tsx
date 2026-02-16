'use client'

import { useState } from 'react'

export function LoadingScreen() {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <div className="flex items-center justify-center">
      {!imgFailed ? (
        <img
          src="/loading-h.png"
          alt=""
          width={120}
          height={120}
          className="animate-pulse opacity-90 dark:opacity-95 object-contain"
          onError={() => setImgFailed(true)}
        />
      ) : null}
      {imgFailed ? (
        <span
          className="text-8xl font-bold tracking-tighter text-gray-800 dark:text-gray-200 animate-pulse select-none"
          aria-hidden
        >
          H
        </span>
      ) : null}
    </div>
  )
}
