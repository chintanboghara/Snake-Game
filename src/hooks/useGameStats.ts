
import { useState, useEffect, useCallback } from 'react';

interface GameStats {
  gamesPlayed: number;
  totalScore: number;
  averageScore: number;
  bestStreak: number;
  currentStreak: number;
  foodsEaten: number;
  totalPlayTime: number;
}

const INITIAL_STATS: GameStats = {
  gamesPlayed: 0,
  totalScore: 0,
  averageScore: 0,
  bestStreak: 0,
  currentStreak: 0,
  foodsEaten: 0,
  totalPlayTime: 0,
};

const GAME_STATS_KEY = 'snake-game-stats';

const isValidStats = (stats: any): stats is GameStats => {
  return (
    typeof stats === 'object' &&
    stats !== null &&
    typeof stats.gamesPlayed === 'number' &&
    typeof stats.totalScore === 'number' &&
    typeof stats.averageScore === 'number' &&
    typeof stats.bestStreak === 'number' &&
    typeof stats.currentStreak === 'number' &&
    typeof stats.foodsEaten === 'number' &&
    typeof stats.totalPlayTime === 'number'
  );
};

export const useGameStats = () => {
  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const savedStats = localStorage.getItem(GAME_STATS_KEY);
        if (savedStats) {
          const parsed = JSON.parse(savedStats);
          if (isValidStats(parsed)) {
            setStats(parsed);
          } else {
            console.warn('Invalid stats format, resetting...');
            setStats(INITIAL_STATS);
          }
        }
      } catch (error) {
        console.warn('Failed to load game stats:', error);
        setStats(INITIAL_STATS);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  const saveStats = useCallback((newStats: GameStats) => {
    setStats(newStats);
    try {
      localStorage.setItem(GAME_STATS_KEY, JSON.stringify(newStats));
    } catch (error) {
      console.warn('Failed to save game stats:', error);
    }
  }, []);

  const updateGameEnd = useCallback((score: number, foodsEaten: number, playTime: number) => {
    if (score < 0 || foodsEaten < 0 || playTime < 0) return;

    setStats(prevStats => {
      const newGamesPlayed = prevStats.gamesPlayed + 1;
      const newTotalScore = prevStats.totalScore + score;
      
      const newStats: GameStats = {
        ...prevStats,
        gamesPlayed: newGamesPlayed,
        totalScore: newTotalScore,
        averageScore: Math.round(newTotalScore / newGamesPlayed),
        foodsEaten: prevStats.foodsEaten + foodsEaten,
        totalPlayTime: prevStats.totalPlayTime + playTime,
      };

      // Update streak
      if (score > 0) {
        newStats.currentStreak = prevStats.currentStreak + 1;
        newStats.bestStreak = Math.max(prevStats.bestStreak, newStats.currentStreak);
      } else {
        newStats.currentStreak = 0;
      }

      try {
        localStorage.setItem(GAME_STATS_KEY, JSON.stringify(newStats));
      } catch (error) {
        console.warn('Failed to save game stats:', error);
      }

      return newStats;
    });
  }, []);

  const updateFoodEaten = useCallback(() => {
    setStats(prevStats => {
      const newStats = {
        ...prevStats,
        foodsEaten: prevStats.foodsEaten + 1,
      };
      
      try {
        localStorage.setItem(GAME_STATS_KEY, JSON.stringify(newStats));
      } catch (error) {
        console.warn('Failed to save food eaten stat:', error);
      }
      
      return newStats;
    });
  }, []);

  const resetStats = useCallback(() => {
    saveStats(INITIAL_STATS);
  }, [saveStats]);

  return {
    stats,
    updateGameEnd,
    updateFoodEaten,
    resetStats,
    isLoading,
  };
};
