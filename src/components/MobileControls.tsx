
import React, { useEffect, useState, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface MobileControlsProps {
  onDirectionChange: (direction: { x: number; y: number }) => void;
  disabled: boolean;
}

interface TouchPosition {
  x: number;
  y: number;
}

const MobileControls = ({ onDirectionChange, disabled }: MobileControlsProps) => {
  const { colors } = useTheme();
  const [touchStart, setTouchStart] = useState<TouchPosition | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (disabled) return;
    const touch = e.touches[0];
    if (!touch) return;
    
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  }, [disabled]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (disabled || !touchStart) return;
    
    const touch = e.changedTouches[0];
    if (!touch) return;
    
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const minSwipeDistance = 30;

    if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
      setTouchStart(null);
      return;
    }

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      onDirectionChange(deltaX > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 });
    } else {
      // Vertical swipe
      onDirectionChange(deltaY > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
    }

    setTouchStart(null);
  }, [touchStart, disabled, onDirectionChange]);

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);

  const handleButtonPress = useCallback((direction: { x: number; y: number }) => {
    if (!disabled) {
      onDirectionChange(direction);
    }
  }, [disabled, onDirectionChange]);

  const buttonClass = `p-3 rounded-lg ${colors.accent} disabled:opacity-30 transition-all duration-200 active:scale-95 touch-manipulation`;

  return (
    <div className="md:hidden mt-4">
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => handleButtonPress({ x: 0, y: -1 })}
          disabled={disabled}
          className={buttonClass}
          aria-label="Move up"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
        
        <div className="flex gap-2">
          <button
            onClick={() => handleButtonPress({ x: -1, y: 0 })}
            disabled={disabled}
            className={buttonClass}
            aria-label="Move left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => handleButtonPress({ x: 1, y: 0 })}
            disabled={disabled}
            className={buttonClass}
            aria-label="Move right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        <button
          onClick={() => handleButtonPress({ x: 0, y: 1 })}
          disabled={disabled}
          className={buttonClass}
          aria-label="Move down"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
      
      <p className={`${colors.text} font-mono text-xs text-center mt-2 opacity-60`}>
        Swipe or tap to control
      </p>
    </div>
  );
};

export default MobileControls;
