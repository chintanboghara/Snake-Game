
import { useEffect, useCallback } from 'react';

interface UseKeyboardControlsProps {
  gameRunning: boolean;
  gamePaused: boolean;
  resetGame: () => void;
  togglePause: () => void;
  changeDirection: (direction: { x: number; y: number }) => void;
}

export const useKeyboardControls = ({
  gameRunning,
  gamePaused,
  resetGame,
  togglePause,
  changeDirection,
}: UseKeyboardControlsProps) => {
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    // Global shortcuts that work regardless of game state
    if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      resetGame();
      return;
    }

    if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
      e.preventDefault();
      togglePause();
      return;
    }

    if (!gameRunning || gamePaused) return;

    // Movement controls - Arrow keys
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        changeDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        e.preventDefault();
        changeDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        e.preventDefault();
        changeDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        e.preventDefault();
        changeDirection({ x: 1, y: 0 });
        break;
      // WASD controls
      case 'w':
      case 'W':
        e.preventDefault();
        changeDirection({ x: 0, y: -1 });
        break;
      case 's':
      case 'S':
        e.preventDefault();
        changeDirection({ x: 0, y: 1 });
        break;
      case 'a':
      case 'A':
        e.preventDefault();
        changeDirection({ x: -1, y: 0 });
        break;
      case 'd':
      case 'D':
        e.preventDefault();
        changeDirection({ x: 1, y: 0 });
        break;
    }
  }, [gameRunning, gamePaused, togglePause, resetGame, changeDirection]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
};
