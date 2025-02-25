'use client'
import { useEffect } from 'react'
import Link from 'next/link'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2 id="errorH2">Oops, something went wrong</h2>
      <button
        id="errorButton"
        // Attempt to recover by trying to re-render the segment
        onClick={() => reset()}
        onKeyDown={() => reset()}
      >
        Try again
      </button>
      or <Link href="/">go home</Link>
    </div>
  )
}