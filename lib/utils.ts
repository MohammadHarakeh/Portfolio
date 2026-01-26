import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
}

export function getSkillLevelColor(level: string): string {
  const colors = {
    beginner: 'bg-gray-400',
    intermediate: 'bg-blue-400',
    advanced: 'bg-purple-400',
    expert: 'bg-green-400',
  }
  return colors[level as keyof typeof colors] || colors.beginner
}
