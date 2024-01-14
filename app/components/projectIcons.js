import Lottie from 'react-lottie-player'
import MemoryGame from './memory.json'
import SleepyGallows from './SG.json'
import CosmicTales from './sun.json'
import CandyFluffs from './cf.json'


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
          style={{ width: 'auto', height: 150 }}
        />
    );
}

export default AnimatedIcons;
