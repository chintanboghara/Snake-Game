
import React, { createContext, useContext, useState } from 'react';

export type GameTheme = 'classic' | 'neon' | 'dark' | 'retro';

interface ThemeColors {
  background: string;
  board: string;
  border: string;
  snake: string;
  snakeHead: string;
  food: string;
  obstacle: string;
  text: string;
  accent: string;
}

const themes: Record<GameTheme, ThemeColors> = {
  classic: {
    background: 'bg-gray-900',
    board: 'bg-gray-800',
    border: 'border-green-400',
    snake: 'bg-green-500',
    snakeHead: 'bg-green-300',
    food: 'bg-red-500',
    obstacle: 'bg-gray-600',
    text: 'text-green-400',
    accent: 'text-gray-400'
  },
  neon: {
    background: 'bg-black',
    board: 'bg-gray-900',
    border: 'border-cyan-400',
    snake: 'bg-cyan-500',
    snakeHead: 'bg-cyan-300',
    food: 'bg-pink-500',
    obstacle: 'bg-purple-600',
    text: 'text-cyan-400',
    accent: 'text-pink-400'
  },
  dark: {
    background: 'bg-slate-900',
    board: 'bg-slate-800',
    border: 'border-slate-400',
    snake: 'bg-slate-500',
    snakeHead: 'bg-slate-300',
    food: 'bg-orange-500',
    obstacle: 'bg-slate-700',
    text: 'text-slate-300',
    accent: 'text-slate-400'
  },
  retro: {
    background: 'bg-amber-900',
    board: 'bg-amber-800',
    border: 'border-amber-400',
    snake: 'bg-amber-500',
    snakeHead: 'bg-amber-300',
    food: 'bg-red-600',
    obstacle: 'bg-amber-700',
    text: 'text-amber-300',
    accent: 'text-amber-400'
  }
};

interface ThemeContextType {
  theme: GameTheme;
  setTheme: (theme: GameTheme) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<GameTheme>('classic');

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
