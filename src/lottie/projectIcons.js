import React from 'react'
import Lottie from 'react-lottie'
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


    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      }
    }

    return (
        <Lottie
          options={defaultOptions}
          width={200}
          height={'auto'}
        />
    );
}

export default AnimatedIcons;
