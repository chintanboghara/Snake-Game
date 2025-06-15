import { useState, useCallback, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useGameSounds } from './useGameSounds';
import { useHighScore } from './useHighScore';
import { useGameStats } from './useGameStats';
import { ActivePowerUp } from '../components/PowerUpStatus';
import { PowerUp, PowerUpType } from '../components/PowerUp';

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

type Difficulty = 'slow' | 'normal' | 'fast';

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const INITIAL_DIRECTION = { x: 0, y: -1 };
const INITIAL_LIVES = 3;

const SPEED_SETTINGS = {
  slow: 250,
  normal: 150,
  fast: 100,
};

const POWER_UP_SPAWN_CHANCE = 0.15;
const POWER_UP_DURATION = 10000;
const OBSTACLE_SPAWN_CHANCE = 0.08;
const MAX_OBSTACLES = 8;

export const useGameLogic = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
  const [gameRunning, setGameRunning] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [powerUp, setPowerUp] = useState<PowerUp | null>(null);
  const [activePowerUps, setActivePowerUps] = useState<ActivePowerUp[]>([]);
  const [obstacles, setObstacles] = useState<Position[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [ghostTrail, setGhostTrail] = useState<Position[]>([]);
  const [foodsEatenThisGame, setFoodsEatenThisGame] = useState(0);
  const [gameStartTime, setGameStartTime] = useState<number>(0);

  const { toast } = useToast();
  const { playEat, playGameOver, playPowerUp, startBackgroundMusic, stopBackgroundMusic } = useGameSounds();
  const { addHighScore, getBestScore, highScores } = useHighScore();
  const { stats, updateGameEnd, updateFoodEaten } = useGameStats();

  const addParticleEffect = useCallback((x: number, y: number, type: 'eat' | 'wall' | 'powerup') => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setParticles(prev => [...prev, { id, x, y, type }]);
    
    // Auto-remove particle after animation
    setTimeout(() => {
      setParticles(current => current.filter(p => p.id !== id));
    }, 2000);
  }, []);

  const removeParticleEffect = useCallback((id: string) => {
    setParticles(prev => prev.filter(p => p.id !== id));
  }, []);

  const generateFood = useCallback((): Position => {
    let newFood: Position;
    let attempts = 0;
    const maxAttempts = 100;
    
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
      attempts++;
    } while (
      attempts < maxAttempts &&
      (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y) ||
       obstacles.some(obstacle => obstacle.x === newFood.x && obstacle.y === newFood.y))
    );
    
    return newFood;
  }, [snake, obstacles]);

  const generatePowerUp = useCallback((): PowerUp => {
    const types: PowerUpType[] = ['speed', 'invincible', 'bonus'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    let newPosition: Position;
    let attempts = 0;
    const maxAttempts = 50;
    
    do {
      newPosition = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
      attempts++;
    } while (
      attempts < maxAttempts &&
      (snake.some(segment => segment.x === newPosition.x && segment.y === newPosition.y) ||
       (food.x === newPosition.x && food.y === newPosition.y) ||
       obstacles.some(obstacle => obstacle.x === newPosition.x && obstacle.y === newPosition.y))
    );

    return {
      position: newPosition,
      type: randomType,
      duration: POWER_UP_DURATION,
    };
  }, [snake, food, obstacles]);

  const generateObstacle = useCallback((): Position => {
    let newObstacle: Position;
    let attempts = 0;
    const maxAttempts = 50;
    
    do {
      newObstacle = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
      attempts++;
    } while (
      attempts < maxAttempts &&
      (snake.some(segment => segment.x === newObstacle.x && segment.y === newObstacle.y) ||
       (food.x === newObstacle.x && food.y === newObstacle.y) ||
       (powerUp && powerUp.position.x === newObstacle.x && powerUp.position.y === newObstacle.y) ||
       obstacles.some(obstacle => obstacle.x === newObstacle.x && obstacle.y === newObstacle.y))
    );
    
    return newObstacle;
  }, [snake, food, powerUp, obstacles]);

  const activatePowerUp = useCallback((type: PowerUpType) => {
    const newActivePowerUp: ActivePowerUp = {
      type,
      timeLeft: POWER_UP_DURATION,
    };

    setActivePowerUps(prev => {
      const filtered = prev.filter(p => p.type !== type);
      return [...filtered, newActivePowerUp];
    });

    playPowerUp();
  }, [playPowerUp]);

  const loseLife = useCallback(() => {
    const newLives = lives - 1;
    setLives(newLives);
    
    if (snake[0]) {
      addParticleEffect(snake[0].x, snake[0].y, 'wall');
    }
    
    if (newLives <= 0) {
      const playTime = gameStartTime > 0 ? Math.floor((Date.now() - gameStartTime) / 1000) : 0;
      
      updateGameEnd(score, foodsEatenThisGame, playTime);
      
      const currentBest = getBestScore();
      if (score > currentBest) {
        addHighScore(score, difficulty);
        try {
          localStorage.setItem(`snake-ghost-trail-${score}`, JSON.stringify(snake));
        } catch (error) {
          console.warn('Failed to save ghost trail:', error);
        }
        toast({
          title: "🎉 NEW HIGH SCORE!",
          description: `Score: ${score} (${difficulty.toUpperCase()})`,
          variant: "default",
        });
      } else if (score > 0) {
        addHighScore(score, difficulty);
      }
      
      setGameOver(true);
      setGameRunning(false);
      stopBackgroundMusic();
      playGameOver();
      toast({
        title: "Game Over!",
        description: `Final Score: ${score}`,
        variant: "destructive",
      });
    } else {
      setSnake(INITIAL_SNAKE);
      setDirection(INITIAL_DIRECTION);
      setActivePowerUps([]);
      toast({
        title: `Life Lost!`,
        description: `${newLives} ${newLives === 1 ? 'life' : 'lives'} remaining`,
        variant: "destructive",
      });
    }
  }, [lives, score, difficulty, toast, stopBackgroundMusic, playGameOver, snake, addParticleEffect, getBestScore, addHighScore, gameStartTime, updateGameEnd, foodsEatenThisGame]);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setGameRunning(false);
    setGamePaused(false);
    setGameOver(false);
    setScore(0);
    setLives(INITIAL_LIVES);
    setPowerUp(null);
    setActivePowerUps([]);
    setObstacles([]);
    setParticles([]);
    setFoodsEatenThisGame(0);
    setGameStartTime(0);
    stopBackgroundMusic();
  }, [stopBackgroundMusic]);

  const startGame = useCallback(() => {
    setGameRunning(true);
    setGamePaused(false);
    setGameOver(false);
    setGameStartTime(Date.now());
    startBackgroundMusic();
  }, [startBackgroundMusic]);

  const togglePause = useCallback(() => {
    if (gameRunning && !gameOver) {
      const newPaused = !gamePaused;
      setGamePaused(newPaused);
      if (newPaused) {
        stopBackgroundMusic();
      } else {
        startBackgroundMusic();
      }
    }
  }, [gameRunning, gameOver, gamePaused, stopBackgroundMusic, startBackgroundMusic]);

  const changeDirection = useCallback((newDirection: Position) => {
    if (!gameRunning || gamePaused || gameOver) return;
    
    setDirection(prev => {
      if (prev.x === -newDirection.x && prev.y === -newDirection.y) {
        return prev;
      }
      return newDirection;
    });
  }, [gameRunning, gamePaused, gameOver]);

  const moveSnake = useCallback(() => {
    if (!gameRunning || gameOver || gamePaused) return;

    setSnake(currentSnake => {
      if (currentSnake.length === 0) return currentSnake;
      
      const newSnake = [...currentSnake];
      const head = { 
        x: newSnake[0].x + direction.x, 
        y: newSnake[0].y + direction.y 
      };

      const isInvincible = activePowerUps.some(p => p.type === 'invincible');
      
      // Boundary checking
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        if (!isInvincible) {
          loseLife();
          return currentSnake;
        } else {
          head.x = (head.x + BOARD_SIZE) % BOARD_SIZE;
          head.y = (head.y + BOARD_SIZE) % BOARD_SIZE;
        }
      }

      // Obstacle collision
      if (obstacles.some(obstacle => obstacle.x === head.x && obstacle.y === head.y)) {
        if (!isInvincible) {
          loseLife();
          return currentSnake;
        }
      }

      // Self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        if (!isInvincible) {
          loseLife();
          return currentSnake;
        }
      }

      newSnake.unshift(head);

      // Power-up collision
      if (powerUp && head.x === powerUp.position.x && head.y === powerUp.position.y) {
        activatePowerUp(powerUp.type);
        setPowerUp(null);
        addParticleEffect(head.x, head.y, 'powerup');
      } 
      // Food collision
      else if (head.x === food.x && head.y === food.y) {
        const bonusMultiplier = activePowerUps.some(p => p.type === 'bonus') ? 2 : 1;
        setScore(prev => prev + (10 * bonusMultiplier));
        setFood(generateFood());
        setFoodsEatenThisGame(prev => prev + 1);
        updateFoodEaten();
        
        addParticleEffect(head.x, head.y, 'eat');
        playEat();
        
        // Spawn power-up
        if (Math.random() < POWER_UP_SPAWN_CHANCE) {
          setPowerUp(generatePowerUp());
        }

        // Spawn obstacle
        if (Math.random() < OBSTACLE_SPAWN_CHANCE && obstacles.length < MAX_OBSTACLES) {
          setObstacles(prev => [...prev, generateObstacle()]);
        }
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, powerUp, gameRunning, gameOver, gamePaused, generateFood, generatePowerUp, activatePowerUp, activePowerUps, obstacles, generateObstacle, loseLife, playEat, addParticleEffect, updateFoodEaten]);

  // Load ghost trail from best score
  useEffect(() => {
    if (highScores.length === 0) return;
    
    const bestScore = highScores[0];
    if (bestScore) {
      try {
        const savedTrail = localStorage.getItem(`snake-ghost-trail-${bestScore.score}`);
        if (savedTrail) {
          const parsed = JSON.parse(savedTrail);
          if (Array.isArray(parsed)) {
            setGhostTrail(parsed);
          }
        }
      } catch (error) {
        console.warn('Failed to load ghost trail:', error);
      }
    }
  }, [highScores]);

  return {
    // Game state
    snake,
    food,
    direction,
    gameRunning,
    gamePaused,
    gameOver,
    score,
    lives,
    difficulty,
    powerUp,
    activePowerUps,
    obstacles,
    particles,
    ghostTrail,
    foodsEatenThisGame,
    stats,
    getBestScore,
    
    // Actions
    setDifficulty,
    setActivePowerUps,
    resetGame,
    startGame,
    togglePause,
    changeDirection,
    moveSnake,
    removeParticleEffect,
    
    // Constants
    BOARD_SIZE,
    SPEED_SETTINGS,
  };
};
