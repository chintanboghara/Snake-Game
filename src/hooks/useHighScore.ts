
import { useState, useEffect, useCallback } from 'react';

interface HighScore {
  score: number;
  date: string;
  difficulty: string;
}

const HIGH_SCORES_KEY = 'snake-high-scores';
const MAX_HIGH_SCORES = 10;

export const useHighScore = () => {
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHighScores = async () => {
      try {
        const savedScores = localStorage.getItem(HIGH_SCORES_KEY);
        if (savedScores) {
          const parsed = JSON.parse(savedScores);
          if (Array.isArray(parsed) && parsed.every(score => 
            typeof score === 'object' && 
            typeof score.score === 'number' && 
            typeof score.date === 'string' && 
            typeof score.difficulty === 'string'
          )) {
            setHighScores(parsed);
          } else {
            console.warn('Invalid high scores format, resetting...');
            setHighScores([]);
          }
        }
      } catch (error) {
        console.warn('Failed to load high scores:', error);
        setHighScores([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadHighScores();
  }, []);

  const saveHighScores = useCallback((scores: HighScore[]) => {
    try {
      localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(scores));
    } catch (error) {
      console.warn('Failed to save high scores:', error);
    }
  }, []);

  const addHighScore = useCallback((score: number, difficulty: string) => {
    if (score <= 0 || !difficulty) return;
    
    const newScore: HighScore = {
      score,
      date: new Date().toLocaleDateString(),
      difficulty: difficulty.toLowerCase()
    };

    setHighScores(prevScores => {
      const updatedScores = [...prevScores, newScore]
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_HIGH_SCORES);

      saveHighScores(updatedScores);
      return updatedScores;
    });
  }, [saveHighScores]);

  const getBestScore = useCallback((): number => {
    return highScores.length > 0 ? highScores[0].score : 0;
  }, [highScores]);

  const clearHighScores = useCallback(() => {
    setHighScores([]);
    try {
      localStorage.removeItem(HIGH_SCORES_KEY);
    } catch (error) {
      console.warn('Failed to clear high scores:', error);
    }
  }, []);

  return {
    highScores,
    addHighScore,
    getBestScore,
    clearHighScores,
    isLoading
  };
};
