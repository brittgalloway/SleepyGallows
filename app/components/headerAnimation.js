'use client'
import React from 'react'
import Lottie from 'react-lottie-player'
import avitar from './webHeader'

export default function BrittneyAvitar() {
  return (
    <Lottie
      loop
      animationData={avitar}
      play
    />
  )
}