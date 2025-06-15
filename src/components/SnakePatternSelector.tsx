
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export type SnakePattern = 'solid' | 'striped' | 'dotted' | 'gradient';

interface SnakePatternSelectorProps {
  pattern: SnakePattern;
  onPatternChange: (pattern: SnakePattern) => void;
  disabled?: boolean;
}

const SnakePatternSelector = ({ pattern, onPatternChange, disabled }: SnakePatternSelectorProps) => {
  const { colors } = useTheme();

  const patterns: { value: SnakePattern; label: string; preview: string }[] = [
    { value: 'solid', label: 'Solid', preview: 'bg-current' },
    { value: 'striped', label: 'Striped', preview: 'bg-gradient-to-r from-current to-transparent bg-repeat-x' },
    { value: 'dotted', label: 'Dotted', preview: 'bg-current opacity-80' },
    { value: 'gradient', label: 'Gradient', preview: 'bg-gradient-to-br from-current to-current/60' }
  ];

  return (
    <div className="mb-4">
      <label className={`block text-sm font-medium mb-2 font-mono ${colors.text}`}>
        Snake Pattern
      </label>
      <div className="flex gap-2 flex-wrap justify-center">
        {patterns.map(({ value, label, preview }) => (
          <button
            key={value}
            onClick={() => onPatternChange(value)}
            disabled={disabled}
            className={`
              px-3 py-2 text-xs font-mono rounded-lg border-2 flex items-center gap-2 transition-all
              ${pattern === value 
                ? `${colors.border} ${colors.text}` 
                : 'border-gray-600 text-gray-400 hover:border-gray-500'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className={`w-3 h-3 rounded-sm ${preview} ${colors.snake.replace('bg-', 'text-')}`} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SnakePatternSelector;
