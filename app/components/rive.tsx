'use client'
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas-lite';

type AnimationProps = {
  src: string
}

export default function Animation({ src }: AnimationProps) {
  const { RiveComponent } = useRive({
    src: src,
    stateMachines: 'State Machine 1',
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.TopCenter,
    }),
  });

  return (
    <RiveComponent/>
  );
}