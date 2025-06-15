
import React from 'react';

export interface ActivePowerUp {
  type: 'speed' | 'invincible' | 'bonus';
  timeLeft: number;
}

interface PowerUpStatusProps {
  activePowerUps: ActivePowerUp[];
}

const PowerUpStatus = React.memo(({ activePowerUps }: PowerUpStatusProps) => {
  if (activePowerUps.length === 0) return null;

  const getPowerUpConfig = (type: string) => {
    const configs = {
      speed: {
        name: 'SPEED BOOST',
        color: 'text-yellow-400 border-yellow-400',
        icon: '⚡'
      },
      invincible: {
        name: 'INVINCIBLE',
        color: 'text-purple-400 border-purple-400',
        icon: '🛡️'
      },
      bonus: {
        name: 'BONUS POINTS',
        color: 'text-blue-400 border-blue-400',
        icon: '💎'
      }
    };
    return configs[type as keyof typeof configs] || {
      name: type.toUpperCase(),
      color: 'text-gray-400 border-gray-400',
      icon: '❓'
    };
  };

  return (
    <div className="mb-4 flex flex-wrap gap-2 justify-center">
      {activePowerUps.map((powerUp, index) => {
        const config = getPowerUpConfig(powerUp.type);
        const secondsLeft = Math.ceil(powerUp.timeLeft / 1000);
        const isExpiring = secondsLeft <= 3;
        
        return (
          <div
            key={`${powerUp.type}-${index}`}
            className={`px-3 py-1 border rounded-lg font-mono text-xs flex items-center gap-1 ${config.color} ${
              isExpiring ? 'animate-pulse' : ''
            }`}
          >
            <span>{config.icon}</span>
            <span>{config.name}</span>
            <span className="ml-1">({secondsLeft}s)</span>
          </div>
        );
      })}
    </div>
  );
});

PowerUpStatus.displayName = 'PowerUpStatus';

export default PowerUpStatus;
