import React from 'react'
import Lottie from 'react-lottie-player'
import MemoryGame from '../assets/memory.json'
import SleepyGallows from '../assets/SG.json'
import CosmicTales from '../assets/sun.json'
import CandyFluffs from '../assets/cf.json'


const  AnimatedIcons = ({title}) =>{
  let animation = MemoryGame;

  if (title === 'MemoryGame') {
    animation = MemoryGame;
  } else if (title === 'SleepyGallows') {
    animation = SleepyGallows;
  } else if (title === 'CosmicTales') {
    animation = CosmicTales;
  } else if (title === 'CandyFluffs') {
    animation = CandyFluffs;
  }

    return (
        <Lottie
          loop
          animationData={animation}
          play
          height={'auto'}
        />
    );
}

export default AnimatedIcons;
