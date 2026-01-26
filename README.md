# Mohammad Harake - Portfolio Website

A modern, balanced portfolio website showcasing my full-stack development skills, projects, and experience.

## Features

- 🎨 **Modern Design**: Balanced professional and creative design with smooth animations
- 🌓 **Dark Mode**: Full dark/light mode support with system preference detection
- 📱 **Responsive**: Fully responsive design that works on all devices
- ⚡ **Performance**: Optimized with Next.js 14 App Router and server-side rendering
- 🎯 **Interactive Elements**: 
  - Animated code editor in hero section
  - Interactive skill visualization with project connections
  - Smooth scroll animations
  - 3D hover effects on project cards
- 🚀 **Unique Features**:
  - Behind the scenes section showing tech stack
  - Interactive timeline for experience
  - Smart contact form with project type selection
  - Skill-to-project connections on hover

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── layout/             # Layout components (Header, Footer)
│   ├── sections/           # Page sections (Hero, About, Skills, etc.)
│   ├── ui/                 # Reusable UI components
│   └── providers/          # Context providers (Theme)
├── lib/
│   ├── data.ts             # Portfolio data
│   ├── utils.ts            # Utility functions
│   └── constants.ts        # Constants
└── types/
    └── index.ts            # TypeScript type definitions
```

## Customization

### Update Personal Information

Edit `lib/data.ts` to update:
- Personal information (name, email, location, etc.)
- Skills and technologies
- Projects
- Work experience
- Education and certificates

### Styling

- Colors: Edit `tailwind.config.ts` to customize the color palette
- Fonts: Update `app/globals.css` to change fonts
- Animations: Modify Framer Motion animations in component files

## Deployment

This portfolio can be deployed on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any static hosting service** (after building)

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

## License

This project is open source and available for personal use.

## Contact

- **Email**: mohammad.d.harakeh@gmail.com
- **Phone**: +961 70860668
- **Location**: Beirut, Lebanon
- **LinkedIn**: [Mohammad Harake](https://linkedin.com/in/mohammad-harake)
- **GitHub**: [mohammad-harake](https://github.com/mohammad-harake)
