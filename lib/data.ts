import { PersonalInfo, Project, Skill, Experience, Education, Certificate } from '@/types'

export const personalInfo: PersonalInfo = {
  name: 'Mohammad Harake',
  title: 'Full-Stack Developer',
  email: 'mohammad.d.harakeh@gmail.com',
  phone: '+961 70860668',
  location: 'Beirut, Lebanon',
  linkedin: 'https://linkedin.com/in/mohammad-harake',
  github: 'https://github.com/mohammad-harake',
  bio: 'An ambitious full-stack developer eager to launch my career in a professional environment where I can leverage my robust technical skills and passion for crafting innovative applications.',
  tagline: 'Building innovative solutions, one line of code at a time',
}

export const skills: Skill[] = [
  // Languages
  { name: 'JavaScript', level: 'expert', category: 'language', projects: ['bookhub', 'subway-system', 'digital-chain'] },
  { name: 'TypeScript', level: 'expert', category: 'language', projects: ['bookhub', 'digital-chain'] },
  { name: 'Python', level: 'advanced', category: 'language' },
  { name: 'PHP', level: 'advanced', category: 'language', projects: ['subway-system'] },
  { name: 'Java', level: 'intermediate', category: 'language' },
  { name: 'SQL', level: 'advanced', category: 'language', projects: ['subway-system'] },
  
  // Frameworks
  { name: 'React', level: 'expert', category: 'framework', projects: ['subway-system', 'digital-chain'] },
  { name: 'Next.js', level: 'expert', category: 'framework', projects: ['bookhub'] },
  { name: 'React Native', level: 'advanced', category: 'framework' },
  { name: 'Node.js', level: 'expert', category: 'framework', projects: ['bookhub'] },
  { name: 'Express', level: 'advanced', category: 'framework' },
  { name: 'Laravel', level: 'advanced', category: 'framework', projects: ['subway-system'] },
  { name: 'Django', level: 'intermediate', category: 'framework' },
  { name: 'Bootstrap', level: 'advanced', category: 'framework' },
  { name: 'Electron.js', level: 'intermediate', category: 'framework' },
  
  // Databases
  { name: 'MongoDB', level: 'advanced', category: 'database', projects: ['bookhub'] },
  { name: 'MySQL', level: 'advanced', category: 'database', projects: ['subway-system'] },
  
  // Tools
  { name: 'Git', level: 'expert', category: 'tool' },
  { name: 'GitHub', level: 'expert', category: 'tool' },
  { name: 'Postman', level: 'advanced', category: 'tool' },
  { name: 'Figma', level: 'intermediate', category: 'tool' },
]

export const projects: Project[] = [
  {
    id: 'bookhub',
    title: 'BookHub',
    description: 'A version control website where writers can collaborate to create unique stories.',
    longDescription: 'BookHub is an innovative platform that enables writers to collaborate in real-time on creative stories. The platform features live collaboration, version control, and AI-powered assistance to enhance the writing experience.',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/mohammad-harake/bookhub',
    featured: true,
    category: 'fullstack',
    date: '2024-05',
    highlights: [
      'Live collaboration with real-time updates',
      'Version control system for story management',
      'AI-powered writing assistance',
      'Real-time synchronization across multiple users',
    ],
  },
  {
    id: 'subway-system',
    title: 'Subway System',
    description: 'A collaborative platform where users can book tickets for the subway near them.',
    longDescription: 'A comprehensive subway ticket booking system with interactive map display and integrated chat system for customer support.',
    technologies: ['React.js', 'Laravel', 'MySQL', 'phpMyAdmin'],
    githubUrl: 'https://github.com/mohammad-harake/subway-system',
    featured: true,
    category: 'fullstack',
    date: '2024-04',
    highlights: [
      'Interactive map display for subway locations',
      'Real-time ticket booking system',
      'Integrated chat system for support',
      'User-friendly booking interface',
    ],
  },
  {
    id: 'digital-chain',
    title: 'Digital Chain',
    description: 'A responsive website with smooth UI built using TypeScript.',
    longDescription: 'A modern, responsive website with seamless backend integration, focusing on usability and performance.',
    technologies: ['TypeScript', 'React', 'Node.js'],
    featured: false,
    category: 'fullstack',
    date: '2024-10',
    highlights: [
      'Responsive design across all devices',
      'Smooth UI/UX experience',
      'Optimized performance',
    ],
  },
  {
    id: 'kids-security',
    title: 'Kids Security',
    description: 'A landing page showcasing terms and agreement services with professional UI/UX design.',
    longDescription: 'A fully functional landing page designed from scratch, integrating existing backend services to deliver a professional product.',
    technologies: ['TypeScript', 'React', 'Node.js'],
    featured: false,
    category: 'frontend',
    date: '2024-10',
    highlights: [
      'Professional UI/UX design',
      'Terms and agreement showcase',
      'Backend service integration',
    ],
  },
]

export const experiences: Experience[] = [
  {
    id: 'ark-networks',
    title: 'Software Developer',
    company: 'The Ark Networks',
    location: 'Beirut, Lebanon',
    startDate: '2025-02',
    current: true,
    description: [
      'Enhanced user experience by providing personalized support and resolving issues efficiently',
      'Collaborated with cross-functional teams to gather feedback and implement UI improvements',
      'Contributed to front-end development with a focus on usability, responsiveness, and user satisfaction',
    ],
    technologies: ['React', 'TypeScript', 'JavaScript'],
  },
  {
    id: 'freelance',
    title: 'Freelance Full-Stack Developer',
    company: 'Self-Employed',
    location: 'Remote',
    startDate: '2024-10',
    current: true,
    description: [
      'Built responsive websites with smooth UI using TypeScript',
      'Integrated backend with frontend to ensure smooth functionality and performance',
      'Designed and implemented landing pages from scratch',
      'Focused on usability and responsiveness to enhance user experience',
    ],
    technologies: ['TypeScript', 'React', 'Next.js', 'Node.js'],
  },
]

export const education: Education = {
  degree: 'BS in Computer Science',
  institution: 'American University of Science and Technology',
  location: 'Lebanon',
  startDate: '2019-10',
  endDate: '2023-06',
  description: 'Completed comprehensive computer science program covering algorithms, data structures, software engineering, and system design.',
}

export const certificates: Certificate[] = [
  {
    name: 'Full Stack Development',
    issuer: 'SE Factory',
    date: '2024-05',
    description: 'Successfully completed an intensive 12-week Full-Stack Web Development program covering Front-end and Back-end development, Version Control, Cloud Architecture, and Web Application Development.',
  },
]
