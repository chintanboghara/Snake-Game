
import React from 'react';
import { useGameStats } from '../hooks/useGameStats';
import { useTheme } from '../contexts/ThemeContext';
import { Activity, Award, Clock, Target } from 'lucide-react';

const GameStatistics = () => {
  const { stats, resetStats } = useGameStats();
  const { colors } = useTheme();

  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const StatCard = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) => (
    <div className={`${colors.accent} p-3 rounded-lg font-mono text-xs text-center transition-colors duration-200`}>
      <div className="flex items-center justify-center gap-1 mb-2">
        <Icon className="w-4 h-4" />
        <span className="uppercase tracking-wide">{label}</span>
      </div>
      <span className="text-lg font-bold block">{value}</span>
    </div>
  );

  return (
    <div className="mb-4">
      <h3 className={`${colors.text} font-mono text-lg mb-3 text-center flex items-center justify-center gap-2`}>
        <Activity className="w-5 h-5" />
        STATISTICS
      </h3>
      
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto mb-3">
        <StatCard icon={Activity} label="Games" value={stats.gamesPlayed} />
        <StatCard icon={Target} label="Avg Score" value={stats.averageScore} />
        <StatCard icon={Award} label="Best Streak" value={stats.bestStreak} />
        <StatCard icon={Clock} label="Play Time" value={formatTime(stats.totalPlayTime)} />
      </div>
      
      <div className={`${colors.accent} p-2 rounded-lg font-mono text-xs text-center`}>
        <span>Foods Eaten: <strong>{stats.foodsEaten}</strong> | Current Streak: <strong>{stats.currentStreak}</strong></span>
      </div>
      
      {stats.gamesPlayed > 0 && (
        <button
          onClick={resetStats}
          className="mt-2 text-xs text-red-400 hover:text-red-300 font-mono underline transition-colors duration-200"
        >
          Reset All Statistics
        </button>
      )}
    </div>
  );
};

export default GameStatistics;
