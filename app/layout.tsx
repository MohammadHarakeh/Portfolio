import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mohammad Harake | Full-Stack Developer',
  description: 'Portfolio of Mohammad Harake - Full-Stack Developer specializing in React, Next.js, TypeScript, and Node.js',
  keywords: ['Full-Stack Developer', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Web Development'],
  authors: [{ name: 'Mohammad Harake' }],
  creator: 'Mohammad Harake',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
