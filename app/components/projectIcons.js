import Image from 'next/image'
import Lottie from 'react-lottie-player'
import MemoryGame from './memory.json'
import SleepyGallows from './SG.json'
import CosmicTales from './sun.json'
import CandyFluffs from './cf.json'


const  AnimatedIcons = ({title, src}) =>{
  let animation = MemoryGame;

  if (title === 'MemoryGame') {
    animation = MemoryGame;
  } else if (title === 'SleepyGallows') {
    animation = SleepyGallows;
  } else if (title === 'CosmicTales') {
    animation = CosmicTales;
  } else if (title === 'CandyFluffs') {
    animation = CandyFluffs;
  } else {
    animation = null;
  }

    return (

        animation !== null ? (<Lottie
          loop
          animationData={animation}
          play
          style={{ width: 'auto', height: 150 }}
        />) : (
          <Image
            className='project-icon'
            src={src}
            width={150}
            height={150}
            loading='lazy'
            style={{objectFit: "contain"}}/>
        )

    );
}

export default AnimatedIcons;
