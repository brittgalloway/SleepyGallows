'use client'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const  AnimatedIcons = ({title}) =>{
  let animation = 'https://lottie.host/8d693f15-8708-46a2-a046-999364e935e4/VXD69Ru2XZ.json';

  if (title === 'Memory Game') {
    animation = 'https://lottie.host/8d693f15-8708-46a2-a046-999364e935e4/VXD69Ru2XZ.json';
  } else if (title === 'Sleepy Gallows') {
    animation = 'https://lottie.host/8190ecfa-8864-44f5-b7ec-1148b3e2314d/dtIt7hPNe6.lottie';
  }  else if (title === 'Candy Fluffs') { 
    animation = 'https://lottie.host/bb84bac3-6923-4287-83fd-364ef28aee97/p8V69ZCATH.lottie';
  }

    return (
      <DotLottieReact
        src={animation}
        loop
        autoplay
    />
    );
}

export default AnimatedIcons;
