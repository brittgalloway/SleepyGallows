'use client'
import { useRive, Layout, Fit } from '@rive-app/react-canvas-lite';

export default function Animation({src}) {
  const { rive, RiveComponent } = useRive({
    src: `${src}`,
    stateMachines: 'State Machine 1',
    autoplay: true,
        layout: new Layout({
        fit: Fit.Contain,
    }),
  });

  return (
    <RiveComponent/>
  );
}