'use client'
import ErrorLayout from '@/components/error'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <ErrorLayout
      error={error}
      reset={reset}
      backTo="/"
      backLabel="Go home"
    />
  )
}