
import React, { useEffect, useRef } from 'react';
import { useAchievements } from '../hooks/useAchievements';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from "@/hooks/use-toast";
import { Trophy } from 'lucide-react';

interface AchievementDisplayProps {
  score: number;
  foodsEaten: number;
  gamesPlayed: number;
  streak: number;
  difficulty: string;
}

const AchievementDisplay = ({ score, foodsEaten, gamesPlayed, streak, difficulty }: AchievementDisplayProps) => {
  const { achievements, newlyUnlocked, checkAchievements, clearNewlyUnlocked } = useAchievements();
  const { colors } = useTheme();
  const { toast } = useToast();
  const prevPropsRef = useRef<AchievementDisplayProps>();

  useEffect(() => {
    const prevProps = prevPropsRef.current;
    const hasChanged = !prevProps || 
      prevProps.score !== score ||
      prevProps.foodsEaten !== foodsEaten ||
      prevProps.gamesPlayed !== gamesPlayed ||
      prevProps.streak !== streak ||
      prevProps.difficulty !== difficulty;

    if (hasChanged) {
      checkAchievements(score, foodsEaten, gamesPlayed, streak, difficulty);
      prevPropsRef.current = { score, foodsEaten, gamesPlayed, streak, difficulty };
    }
  }, [score, foodsEaten, gamesPlayed, streak, difficulty, checkAchievements]);

  useEffect(() => {
    if (newlyUnlocked.length > 0) {
      newlyUnlocked.forEach(achievement => {
        toast({
          title: "🏆 Achievement Unlocked!",
          description: `${achievement.icon} ${achievement.title}: ${achievement.description}`,
          variant: "default",
        });
      });
      clearNewlyUnlocked();
    }
  }, [newlyUnlocked, toast, clearNewlyUnlocked]);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="mb-4">
      <h3 className={`${colors.text} font-mono text-lg mb-3 text-center flex items-center justify-center gap-2`}>
        <Trophy className="w-5 h-5" />
        ACHIEVEMENTS ({unlockedCount}/{achievements.length})
      </h3>
      
      <div className="max-h-32 overflow-y-auto">
        <div className="grid grid-cols-3 gap-2">
          {achievements.map(achievement => (
            <div
              key={achievement.id}
              className={`
                p-2 rounded-lg text-center font-mono text-xs transition-all duration-200 cursor-help
                ${achievement.unlocked 
                  ? `${colors.accent} opacity-100 shadow-sm` 
                  : 'bg-gray-800 opacity-40 hover:opacity-60'
                }
              `}
              title={`${achievement.title}: ${achievement.description}${
                achievement.progress !== undefined && achievement.target 
                  ? ` (${achievement.progress}/${achievement.target})`
                  : ''
              }`}
            >
              <div className="text-lg mb-1">{achievement.icon}</div>
              <div className="text-xs leading-tight font-medium">{achievement.title}</div>
              
              {achievement.progress !== undefined && achievement.target && !achievement.unlocked && (
                <div className="mt-2">
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (achievement.progress / achievement.target) * 100)}%` }}
                    />
                  </div>
                  <div className="text-xs mt-1 opacity-75">
                    {achievement.progress}/{achievement.target}
                  </div>
                </div>
              )}
              
              {achievement.unlocked && achievement.unlockedAt && (
                <div className="text-xs opacity-60 mt-1">
                  ✓ {new Date(achievement.unlockedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementDisplay;
