import React from 'react'
import Lottie from 'react-lottie-player'
import avitar from '@/json/webHeader'

export default function BrittneyAvitar() {
  return (
    <Lottie 
      loop
      animationData={avitar}
      play
    />
  )
}
