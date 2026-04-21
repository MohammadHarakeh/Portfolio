import { LoadingScreen } from '@/components/LoadingScreen'

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--canvas-light)] dark:bg-gray-900"
      aria-label="Loading"
    >
      <LoadingScreen />
    </div>
  )
}
