export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  image?: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  category: 'fullstack' | 'frontend' | 'backend' | 'mobile'
  date: string
  highlights?: string[]
}

export interface Skill {
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  category: 'language' | 'framework' | 'database' | 'tool' | 'other'
  projects?: string[]
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate?: string
  current: boolean
  description: string[]
  technologies?: string[]
}

export interface Education {
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  description?: string
}

export interface Certificate {
  name: string
  issuer: string
  date: string
  description?: string
}

export interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  linkedin?: string
  github?: string
  bio: string
  tagline: string
}
