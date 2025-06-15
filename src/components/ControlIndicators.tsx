
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ControlIndicatorsProps {
  gameRunning: boolean;
  gameOver: boolean;
}

const ControlIndicators = ({ gameRunning, gameOver }: ControlIndicatorsProps) => {
  const { colors } = useTheme();

  return (
    <div className={`${colors.accent} mt-4 p-3 rounded-lg font-mono text-xs bg-opacity-50`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-center">
        <div>
          <p className="font-bold mb-1 text-sm">Movement:</p>
          <p className="mb-1">Arrow Keys / WASD</p>
          <p className="md:hidden text-xs opacity-75">Swipe / Touch buttons</p>
        </div>
        
        <div>
          <p className="font-bold mb-1 text-sm">Game Controls:</p>
          <p className="mb-1">SPACE / P - Pause</p>
          <p>R - Restart</p>
        </div>
      </div>
      
      {!gameRunning && !gameOver && (
        <div className="mt-3 pt-2 border-t border-current border-opacity-30 text-center">
          <p className="text-green-400 font-bold animate-pulse">Press START to begin!</p>
        </div>
      )}
    </div>
  );
};

export default ControlIndicators;
