import type { Metadata } from 'next'
import { Inter } from "next/font/google";
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { InitialLoading } from "@/components/InitialLoading";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: 'Mohammad Harake | Software Developer',
  description: 'Portfolio of Mohammad Harake - Software Developer specializing in responsive React and Next.js applications with modern full-stack workflows.',
  keywords: ['Software Developer', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Web Development'],
  authors: [{ name: 'Mohammad Harake' }],
  creator: 'Mohammad Harake',
  icons: {
    icon: '/images/icon.png',
    shortcut: '/images/icon.png',
    apple: '/images/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${inter.variable} bg-[var(--canvas-light)] text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100`}
      >
        <InitialLoading />
        <ThemeProvider>{children}</ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
