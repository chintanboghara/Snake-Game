
import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface GameStatsProps {
  score: number;
  lives: number;
  gameRunning: boolean;
  gameOver: boolean;
  onStart: () => void;
  onReset: () => void;
}

const GameStats = ({ score, lives, gameRunning, gameOver, onStart, onReset }: GameStatsProps) => {
  const maxLives = 3;
  
  return (
    <div className="mb-6 flex items-center justify-center gap-8 flex-wrap">
      <div className="text-center">
        <p className="text-gray-400 font-mono text-sm uppercase tracking-wider">Score</p>
        <p className="text-green-400 font-mono text-2xl font-bold tabular-nums">
          {score.toString().padStart(4, '0')}
        </p>
      </div>
      
      <div className="text-center">
        <p className="text-gray-400 font-mono text-sm uppercase tracking-wider">Lives</p>
        <div className="flex items-center justify-center gap-1 mt-1">
          {Array.from({ length: maxLives }, (_, index) => (
            <Heart
              key={index}
              className={`w-5 h-5 transition-colors duration-200 ${
                index < lives 
                  ? 'text-red-500 fill-red-500' 
                  : 'text-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="flex gap-2">
        {!gameRunning && !gameOver && (
          <Button 
            onClick={onStart}
            className="bg-green-600 hover:bg-green-700 text-white font-mono px-6 py-2 transition-colors duration-200"
          >
            START
          </Button>
        )}
        
        {(gameRunning || gameOver) && (
          <Button 
            onClick={onReset}
            variant="outline"
            className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white font-mono px-6 py-2 transition-colors duration-200"
          >
            RESET
          </Button>
        )}
      </div>
    </div>
  );
};

export default GameStats;
