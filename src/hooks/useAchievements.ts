
import { useState, useEffect, useCallback } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  target?: number;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-score',
    title: 'First Points',
    description: 'Score your first 10 points',
    icon: '🎯',
    unlocked: false,
    target: 10,
  },
  {
    id: 'century',
    title: 'Century Club',
    description: 'Score 100 points in a single game',
    icon: '💯',
    unlocked: false,
    target: 100,
  },
  {
    id: 'food-lover',
    title: 'Food Lover',
    description: 'Eat 50 foods total',
    icon: '🍎',
    unlocked: false,
    target: 50,
  },
  {
    id: 'persistent',
    title: 'Persistent Player',
    description: 'Play 10 games',
    icon: '🎮',
    unlocked: false,
    target: 10,
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Score 50 points on fast difficulty',
    icon: '⚡',
    unlocked: false,
    target: 50,
  },
  {
    id: 'survivor',
    title: 'Survivor',
    description: 'Win 5 games in a row',
    icon: '🏆',
    unlocked: false,
    target: 5,
  },
];

const ACHIEVEMENTS_KEY = 'snake-achievements';

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement[]>([]);

  useEffect(() => {
    try {
      const savedAchievements = localStorage.getItem(ACHIEVEMENTS_KEY);
      if (savedAchievements) {
        const parsed = JSON.parse(savedAchievements);
        if (Array.isArray(parsed)) {
          setAchievements(parsed);
        }
      }
    } catch (error) {
      console.warn('Failed to load achievements:', error);
      setAchievements(ACHIEVEMENTS);
    }
  }, []);

  const saveAchievements = useCallback((newAchievements: Achievement[]) => {
    setAchievements(newAchievements);
    try {
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(newAchievements));
    } catch (error) {
      console.warn('Failed to save achievements:', error);
    }
  }, []);

  const checkAchievements = useCallback((score: number, foodsEaten: number, gamesPlayed: number, streak: number, difficulty: string) => {
    setAchievements(prevAchievements => {
      const updatedAchievements = prevAchievements.map(achievement => {
        if (achievement.unlocked) return achievement;

        let shouldUnlock = false;
        let progress = 0;

        switch (achievement.id) {
          case 'first-score':
            progress = Math.min(score, achievement.target || 10);
            shouldUnlock = score >= 10;
            break;
          case 'century':
            progress = Math.min(score, achievement.target || 100);
            shouldUnlock = score >= 100;
            break;
          case 'food-lover':
            progress = Math.min(foodsEaten, achievement.target || 50);
            shouldUnlock = foodsEaten >= 50;
            break;
          case 'persistent':
            progress = Math.min(gamesPlayed, achievement.target || 10);
            shouldUnlock = gamesPlayed >= 10;
            break;
          case 'speed-demon':
            if (difficulty === 'fast') {
              progress = Math.min(score, achievement.target || 50);
              shouldUnlock = score >= 50;
            } else {
              progress = achievement.progress || 0;
            }
            break;
          case 'survivor':
            progress = Math.min(streak, achievement.target || 5);
            shouldUnlock = streak >= 5;
            break;
          default:
            progress = achievement.progress || 0;
        }

        if (shouldUnlock && !achievement.unlocked) {
          const unlockedAchievement: Achievement = {
            ...achievement,
            unlocked: true,
            unlockedAt: new Date().toISOString(),
            progress: achievement.target,
          };
          setNewlyUnlocked(prev => [...prev, unlockedAchievement]);
          return unlockedAchievement;
        }

        return { ...achievement, progress };
      });

      // Only save if there are actual changes
      const hasChanges = updatedAchievements.some((achievement, index) => {
        const prev = prevAchievements[index];
        return achievement.progress !== prev.progress || achievement.unlocked !== prev.unlocked;
      });

      if (hasChanges) {
        try {
          localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(updatedAchievements));
        } catch (error) {
          console.warn('Failed to save achievements:', error);
        }
      }

      return updatedAchievements;
    });
  }, []);

  const clearNewlyUnlocked = useCallback(() => {
    setNewlyUnlocked([]);
  }, []);

  const resetAchievements = useCallback(() => {
    const resetAchievements = ACHIEVEMENTS.map(achievement => ({
      ...achievement,
      unlocked: false,
      unlockedAt: undefined,
      progress: 0,
    }));
    saveAchievements(resetAchievements);
    setNewlyUnlocked([]);
  }, [saveAchievements]);

  return {
    achievements,
    newlyUnlocked,
    checkAchievements,
    clearNewlyUnlocked,
    resetAchievements,
  };
};
