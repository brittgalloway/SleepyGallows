import Lottie from 'react-lottie-player'
import MemoryGame from '@/json/memory.json'
import SleepyGallows from '@/json/SG.json'
import CandyFluffs from '@/json/cf.json'


const  AnimatedIcons = ({title}) =>{
  let animation = MemoryGame;

  if (title === 'MemoryGame') {
    animation = MemoryGame;
  } else if (title === 'SleepyGallows') {
    animation = SleepyGallows;
  }  else if (title === 'CandyFluffs') { 
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
