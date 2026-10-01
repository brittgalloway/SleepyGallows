'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function ErrorLayout({
  error,
  reset,
  backTo = '/',
  backLabel = 'Go home',
}: {
  error?: Error & { digest?: string }
  reset?: () => void
  backTo?: string
  backLabel?: string
}) {
  useEffect(() => {
    if (error) console.error(error)
  }, [error])

  return (
    <div id="error-layout" role="alert">
      <h2 id="errorH2">Oops, something went wrong</h2>
      <p>Please try again. If the problem persists, email us at{' '}
        <a href="mailto:support@sleepygallows.com">support@sleepygallows.com</a>
      </p>
      <div id="error-actions">
        {reset && (
          <button
            id="errorButton"
            type="button"
            onClick={reset}
          >
            Try again
          </button>
        )}
        <Link href={backTo}>{backLabel}</Link>
      </div>
    </div>
  )
}