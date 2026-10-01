'use client'

import { useEffect, useRef, useState } from 'react'

type PreviewVideoProps = {
  src: string
  type: string
  label: string
}

export default function PreviewVideo({ src, type, label }: PreviewVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduceMotion(prefersReduced)
    if (!prefersReduced) {
      videoRef.current?.play().catch(() => {})
    }
  }, [])

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="metadata"
      controls={reduceMotion}
      aria-label={label}
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    >
      <source src={src} type={type} />
    </video>
  )
}