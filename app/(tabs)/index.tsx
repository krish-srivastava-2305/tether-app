import { TetherProvider } from '@/src/context/TetherContext';
import { TetherApp } from '@/src/screens/TetherScreen';
import React from 'react';

export default function HomeScreen() {
  return (
    <TetherProvider>
      <TetherApp />
    </TetherProvider>
  );
}
