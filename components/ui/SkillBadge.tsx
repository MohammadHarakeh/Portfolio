'use client'

import { Skill } from '@/types'
import { cn } from '@/lib/utils'

interface SkillBadgeProps {
  skill: Skill
}

const levelColors = {
  beginner: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  intermediate: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  advanced: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  expert: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <div
      className={cn(
        'px-4 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer',
        'hover:scale-105 hover:shadow-md',
        levelColors[skill.level]
      )}
    >
      {skill.name}
    </div>
  )
}
