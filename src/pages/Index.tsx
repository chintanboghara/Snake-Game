
import { useState } from 'react';
import GameBoard from '../components/GameBoard';
import GameStats from '../components/GameStats';
import DifficultySelector from '../components/DifficultySelector';
import ThemeSelector from '../components/ThemeSelector';
import SnakePatternSelector, { SnakePattern } from '../components/SnakePatternSelector';
import HighScoreDisplay from '../components/HighScoreDisplay';
import GameStatistics from '../components/GameStatistics';
import AchievementDisplay from '../components/AchievementDisplay';
import PowerUpStatus from '../components/PowerUpStatus';
import MobileControls from '../components/MobileControls';
import ControlIndicators from '../components/ControlIndicators';
import { useTheme } from '../contexts/ThemeContext';
import { useGameLogic } from '../hooks/useGameLogic';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { useGameLoop } from '../hooks/useGameLoop';

const Index = () => {
  const [snakePattern, setSnakePattern] = useState<SnakePattern>('solid');
  const { colors } = useTheme();
  
  const {
    // Game state
    snake,
    food,
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
  } = useGameLogic();

  useKeyboardControls({
    gameRunning,
    gamePaused,
    resetGame,
    togglePause,
    changeDirection,
  });

  useGameLoop({
    moveSnake,
    difficulty,
    activePowerUps,
    setActivePowerUps,
    speedSettings: SPEED_SETTINGS,
    gameRunning,
    gamePaused,
    gameOver,
  });

  return (
    <div className={`min-h-screen ${colors.background} flex items-center justify-center p-4`}>
      <div className="text-center max-w-4xl mx-auto">
        <h1 className={`text-4xl font-bold ${colors.text} mb-8 font-mono animate-pulse`}>
          🐍 SNAKE GAME
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <HighScoreDisplay />
            <GameStatistics />
          </div>
          
          <div className="lg:col-span-1">
            <AchievementDisplay 
              score={score}
              foodsEaten={stats.foodsEaten}
              gamesPlayed={stats.gamesPlayed}
              streak={stats.currentStreak}
              difficulty={difficulty}
            />
          </div>
          
          <div className="lg:col-span-1">
            <ThemeSelector disabled={gameRunning} />
            <DifficultySelector 
              difficulty={difficulty}
              onDifficultyChange={setDifficulty}
              disabled={gameRunning}
            />
            <SnakePatternSelector
              pattern={snakePattern}
              onPatternChange={setSnakePattern}
              disabled={gameRunning}
            />
          </div>
        </div>
        
        <PowerUpStatus activePowerUps={activePowerUps} />
        
        <GameStats 
          score={score}
          lives={lives}
          gameRunning={gameRunning}
          gameOver={gameOver}
          onStart={startGame}
          onReset={resetGame}
        />
        
        {gamePaused && (
          <div className="mb-4 p-4 bg-yellow-900/50 border border-yellow-500 rounded-lg">
            <p className="text-yellow-400 font-mono text-xl">⏸️ PAUSED</p>
            <p className="text-yellow-300 font-mono text-sm mt-1">Press SPACE or P to resume</p>
          </div>
        )}
        
        <div className="mb-4">
          <GameBoard 
            snake={snake}
            food={food}
            boardSize={BOARD_SIZE}
            powerUp={powerUp}
            obstacles={obstacles}
            particles={particles}
            onParticleComplete={removeParticleEffect}
            snakePattern={snakePattern}
            ghostTrail={ghostTrail}
          />
        </div>
        
        <MobileControls 
          onDirectionChange={changeDirection}
          disabled={!gameRunning || gamePaused}
        />
        
        <ControlIndicators 
          gameRunning={gameRunning}
          gameOver={gameOver}
        />
        
        {gameOver && (
          <div className="mt-4 p-4 bg-red-900/30 border border-red-500 rounded-lg animate-scale-in">
            <p className="text-red-400 font-mono text-xl mb-2">💀 Game Over!</p>
            <p className="text-gray-300 font-mono">Final Score: {score}</p>
            <p className="text-gray-400 font-mono text-sm mt-1">
              Best: {getBestScore().toString().padStart(4, '0')}
            </p>
            <p className="text-gray-500 font-mono text-xs mt-2">
              Press R to restart
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
