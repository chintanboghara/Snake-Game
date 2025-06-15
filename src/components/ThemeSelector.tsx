
import React from 'react';
import { useTheme, GameTheme } from '../contexts/ThemeContext';

interface ThemeSelectorProps {
  disabled?: boolean;
}

const ThemeSelector = ({ disabled }: ThemeSelectorProps) => {
  const { theme, setTheme, colors } = useTheme();

  const themes: { value: GameTheme; label: string; preview: string }[] = [
    { value: 'classic', label: 'Classic Green', preview: 'bg-green-500' },
    { value: 'neon', label: 'Neon', preview: 'bg-cyan-500' },
    { value: 'dark', label: 'Dark Mode', preview: 'bg-slate-500' },
    { value: 'retro', label: 'Retro', preview: 'bg-amber-500' }
  ];

  return (
    <div className="mb-4">
      <label className={`block text-sm font-medium mb-2 font-mono ${colors.text}`}>
        Theme
      </label>
      <div className="flex gap-2 flex-wrap justify-center">
        {themes.map(({ value, label, preview }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            disabled={disabled}
            className={`
              px-3 py-2 text-xs font-mono rounded-lg border-2 flex items-center gap-2 transition-all
              ${theme === value 
                ? `${colors.border} ${colors.text}` 
                : 'border-gray-600 text-gray-400 hover:border-gray-500'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className={`w-3 h-3 rounded-full ${preview}`} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
