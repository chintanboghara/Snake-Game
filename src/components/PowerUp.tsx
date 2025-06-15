
interface Position {
  x: number;
  y: number;
}

export type PowerUpType = 'speed' | 'invincible' | 'bonus';

export interface PowerUp {
  position: Position;
  type: PowerUpType;
  duration: number;
}

interface PowerUpProps {
  powerUp: PowerUp;
  cellSize: string;
}

const PowerUp = ({ powerUp, cellSize }: PowerUpProps) => {
  const getPowerUpStyle = (type: PowerUpType) => {
    switch (type) {
      case 'speed':
        return 'bg-yellow-400 animate-pulse';
      case 'invincible':
        return 'bg-purple-500 animate-bounce';
      case 'bonus':
        return 'bg-blue-400 animate-ping';
      default:
        return 'bg-yellow-400';
    }
  };

  const getPowerUpIcon = (type: PowerUpType) => {
    switch (type) {
      case 'speed':
        return '⚡';
      case 'invincible':
        return '🛡️';
      case 'bonus':
        return '💎';
      default:
        return '⚡';
    }
  };

  return (
    <div
      className={`${cellSize} ${getPowerUpStyle(powerUp.type)} rounded-full flex items-center justify-center text-xs font-bold`}
    >
      {getPowerUpIcon(powerUp.type)}
    </div>
  );
};

export default PowerUp;
