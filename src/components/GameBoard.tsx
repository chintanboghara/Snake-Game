import React, { useMemo, useCallback } from 'react';
import PowerUp, { PowerUp as PowerUpType } from './PowerUp';
import ParticleEffect from './ParticleEffect';
import { useTheme } from '../contexts/ThemeContext';
import { SnakePattern } from './SnakePatternSelector';

interface Position {
  x: number;
  y: number;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  type: 'eat' | 'wall' | 'powerup';
}

interface GameBoardProps {
  snake: Position[];
  food: Position;
  boardSize: number;
  powerUp?: PowerUpType | null;
  obstacles: Position[];
  particles: Particle[];
  onParticleComplete: (id: string) => void;
  snakePattern: SnakePattern;
  ghostTrail?: Position[];
}

const GameBoard = ({ 
  snake, 
  food, 
  boardSize, 
  powerUp = null, 
  obstacles, 
  particles, 
  onParticleComplete, 
  snakePattern, 
  ghostTrail = [] 
}: GameBoardProps) => {
  const { colors } = useTheme();
  const cellSize = 16;

  // Memoize position lookups for better performance
  const positionMaps = useMemo(() => {
    const snakeSet = new Set(snake.map(pos => `${pos.x}-${pos.y}`));
    const ghostSet = new Set(ghostTrail.map(pos => `${pos.x}-${pos.y}`));
    const obstacleSet = new Set(obstacles.map(pos => `${pos.x}-${pos.y}`));
    
    return { snakeSet, ghostSet, obstacleSet };
  }, [snake, ghostTrail, obstacles]);

  const getSnakePatternClass = useCallback((isHead: boolean): string => {
    const baseClass = isHead ? colors.snakeHead : colors.snake;
    
    switch (snakePattern) {
      case 'striped':
        return `${baseClass} bg-gradient-to-r from-current via-transparent to-current animate-pulse`;
      case 'dotted':
        return `${baseClass} opacity-80 border-2 border-current/40`;
      case 'gradient':
        return isHead 
          ? `bg-gradient-to-br ${colors.snakeHead} to-current/80 shadow-lg`
          : `bg-gradient-to-br ${colors.snake} to-current/60`;
      default:
        return baseClass;
    }
  }, [snakePattern, colors]);

  const getCellClass = useCallback((x: number, y: number): string => {
    const posKey = `${x}-${y}`;
    let cellClass = "w-4 h-4 border border-gray-700/30 transition-all duration-150 ease-out";
    
    if (food.x === x && food.y === y) {
      cellClass += ` ${colors.food} animate-pulse rounded-full transform hover:scale-110 transition-transform shadow-lg`;
    } else if (positionMaps.obstacleSet.has(posKey)) {
      cellClass += ` ${colors.obstacle} border-gray-500 shadow-inner rounded-sm`;
    } else if (snake[0] && snake[0].x === x && snake[0].y === y) {
      cellClass += ` ${getSnakePatternClass(true)} rounded-sm shadow-lg transform scale-105`;
    } else if (positionMaps.snakeSet.has(posKey)) {
      cellClass += ` ${getSnakePatternClass(false)} rounded-sm`;
    } else if (positionMaps.ghostSet.has(posKey) && !positionMaps.snakeSet.has(posKey)) {
      cellClass += ` ${colors.snake} opacity-20 rounded-sm`;
    } else {
      cellClass += ` ${colors.board}`;
    }
    
    return cellClass;
  }, [food, snake, positionMaps, colors, getSnakePatternClass]);

  // Memoize the board cells for better performance
  const boardCells = useMemo(() => {
    const cells = [];
    
    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
        const key = `${x}-${y}`;
        
        if (powerUp && powerUp.position.x === x && powerUp.position.y === y) {
          cells.push(
            <div key={key} className="relative w-4 h-4">
              <PowerUp powerUp={powerUp} cellSize="w-4 h-4" />
            </div>
          );
        } else {
          cells.push(
            <div
              key={key}
              className={getCellClass(x, y)}
            />
          );
        }
      }
    }
    
    return cells;
  }, [boardSize, powerUp, getCellClass]);

  return (
    <div className="relative inline-block">
      <div 
        className={`inline-grid gap-0 border-2 ${colors.border} ${colors.board} p-2 rounded-lg shadow-2xl transition-all duration-200`}
        style={{
          gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
          gridTemplateRows: `repeat(${boardSize}, 1fr)`,
        }}
      >
        {boardCells}
      </div>
      
      {particles.map(particle => (
        <ParticleEffect
          key={particle.id}
          x={particle.x}
          y={particle.y}
          type={particle.type}
          cellSize={cellSize}
          onComplete={() => onParticleComplete(particle.id)}
        />
      ))}
    </div>
  );
};

export default React.memo(GameBoard);
