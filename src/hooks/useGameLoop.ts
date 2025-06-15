
import { useEffect } from 'react';
import { ActivePowerUp } from '../components/PowerUpStatus';

interface UseGameLoopProps {
  moveSnake: () => void;
  difficulty: 'slow' | 'normal' | 'fast';
  activePowerUps: ActivePowerUp[];
  setActivePowerUps: React.Dispatch<React.SetStateAction<ActivePowerUp[]>>;
  speedSettings: Record<string, number>;
  gameRunning: boolean;
  gamePaused: boolean;
  gameOver: boolean;
}

export const useGameLoop = ({
  moveSnake,
  difficulty,
  activePowerUps,
  setActivePowerUps,
  speedSettings,
  gameRunning,
  gamePaused,
  gameOver,
}: UseGameLoopProps) => {
  // Main game loop
  useEffect(() => {
    if (!gameRunning || gamePaused || gameOver) return;

    const currentSpeed = activePowerUps.some(p => p.type === 'speed') 
      ? Math.max(50, speedSettings[difficulty] * 0.7)
      : speedSettings[difficulty];
      
    const gameInterval = setInterval(moveSnake, currentSpeed);
    return () => clearInterval(gameInterval);
  }, [moveSnake, difficulty, activePowerUps, speedSettings, gameRunning, gamePaused, gameOver]);

  // Power-up timer
  useEffect(() => {
    if (activePowerUps.length === 0 || !gameRunning || gamePaused || gameOver) return;

    const interval = setInterval(() => {
      setActivePowerUps(prev => 
        prev.map(powerUp => ({
          ...powerUp,
          timeLeft: Math.max(0, powerUp.timeLeft - 100)
        })).filter(powerUp => powerUp.timeLeft > 0)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [activePowerUps.length, setActivePowerUps, gameRunning, gamePaused, gameOver]);
};
