
import React from 'react';
import { useHighScore } from '../hooks/useHighScore';
import { useTheme } from '../contexts/ThemeContext';
import { Trophy, Medal, Award } from 'lucide-react';

const HighScoreDisplay = () => {
  const { highScores, clearHighScores } = useHighScore();
  const { colors } = useTheme();

  const getIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 1: return <Medal className="w-4 h-4 text-gray-400" />;
      case 2: return <Award className="w-4 h-4 text-amber-600" />;
      default: return <span className="w-4 h-4 flex items-center justify-center text-xs font-bold">{index + 1}</span>;
    }
  };

  if (highScores.length === 0) {
    return (
      <div className={`${colors.text} font-mono text-sm opacity-60 mb-4`}>
        No high scores yet - start playing to set your first record!
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h3 className={`${colors.text} font-mono text-lg mb-3 text-center flex items-center justify-center gap-2`}>
        <Trophy className="w-5 h-5" />
        HIGH SCORES
      </h3>
      <div className="max-h-40 overflow-y-auto rounded-lg border border-gray-700">
        {highScores.slice(0, 5).map((score, index) => (
          <div 
            key={`${score.score}-${score.date}-${index}`} 
            className={`flex items-center justify-between py-2 px-3 ${colors.accent} font-mono text-xs ${
              index < highScores.length - 1 ? 'border-b border-gray-700' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              {getIcon(index)}
              <span className="uppercase text-xs opacity-75">{score.difficulty}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold tabular-nums">{score.score.toString().padStart(4, '0')}</span>
              <span className="text-xs opacity-60">{score.date}</span>
            </div>
          </div>
        ))}
      </div>
      {highScores.length > 0 && (
        <button
          onClick={clearHighScores}
          className="mt-2 text-xs text-red-400 hover:text-red-300 font-mono underline transition-colors duration-200"
        >
          Clear All Scores
        </button>
      )}
    </div>
  );
};

export default HighScoreDisplay;
