
import { useEffect, useRef, useCallback } from 'react';

interface GameSounds {
  playEat: () => void;
  playGameOver: () => void;
  playPowerUp: () => void;
  startBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
}

export const useGameSounds = (): GameSounds => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const backgroundMusicRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const melodyIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isInitializedRef = useRef(false);

  const initAudioContext = useCallback(async (): Promise<AudioContext | null> => {
    if (audioContextRef.current?.state !== 'closed') {
      return audioContextRef.current;
    }

    if (isInitializedRef.current) {
      return null;
    }

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        console.warn('Web Audio API not supported');
        isInitializedRef.current = true;
        return null;
      }

      audioContextRef.current = new AudioContextClass();
      isInitializedRef.current = true;
      
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      return audioContextRef.current;
    } catch (error) {
      console.warn('Failed to initialize audio context:', error);
      isInitializedRef.current = true;
      return null;
    }
  }, []);

  const cleanup = useCallback(() => {
    if (melodyIntervalRef.current) {
      clearInterval(melodyIntervalRef.current);
      melodyIntervalRef.current = null;
    }

    if (backgroundMusicRef.current) {
      try {
        backgroundMusicRef.current.stop();
      } catch (error) {
        // Ignore errors when stopping
      }
      backgroundMusicRef.current = null;
    }

    if (gainNodeRef.current) {
      gainNodeRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      cleanup();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(console.warn);
      }
    };
  }, [cleanup]);

  const createTone = useCallback(async (frequency: number, duration: number, type: OscillatorType = 'sine'): Promise<void> => {
    const context = await initAudioContext();
    if (!context || context.state === 'closed') return;

    try {
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.frequency.setValueAtTime(frequency, context.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.1, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);

      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + duration);
    } catch (error) {
      console.warn('Audio playback error:', error);
    }
  }, [initAudioContext]);

  const playEat = useCallback(async () => {
    try {
      await createTone(400, 0.1, 'square');
      setTimeout(() => createTone(600, 0.1, 'square'), 50);
    } catch (error) {
      console.warn('Failed to play eat sound:', error);
    }
  }, [createTone]);

  const playPowerUp = useCallback(async () => {
    try {
      const notes = [523, 659, 784, 1047]; // C, E, G, C octave
      notes.forEach((note, i) => {
        setTimeout(() => createTone(note, 0.1 + (i * 0.05), 'sine'), i * 100);
      });
    } catch (error) {
      console.warn('Failed to play power-up sound:', error);
    }
  }, [createTone]);

  const playGameOver = useCallback(async () => {
    try {
      const notes = [400, 350, 300, 250];
      const durations = [0.3, 0.3, 0.3, 0.5];
      notes.forEach((note, i) => {
        setTimeout(() => createTone(note, durations[i], 'sawtooth'), i * 200);
      });
    } catch (error) {
      console.warn('Failed to play game over sound:', error);
    }
  }, [createTone]);

  const startBackgroundMusic = useCallback(async () => {
    const context = await initAudioContext();
    if (!context || backgroundMusicRef.current || context.state === 'closed') return;

    try {
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      gainNode.gain.setValueAtTime(0.02, context.currentTime);
      oscillator.frequency.setValueAtTime(220, context.currentTime);
      oscillator.type = 'sine';

      const melody = [220, 247, 262, 220, 196, 220, 247, 262];
      let noteIndex = 0;

      const playNote = () => {
        if (oscillator && context && context.state !== 'closed') {
          try {
            oscillator.frequency.setValueAtTime(melody[noteIndex], context.currentTime);
            noteIndex = (noteIndex + 1) % melody.length;
          } catch (error) {
            console.warn('Note playback error:', error);
          }
        }
      };

      oscillator.start();
      backgroundMusicRef.current = oscillator;
      gainNodeRef.current = gainNode;

      melodyIntervalRef.current = setInterval(playNote, 2000);

      oscillator.onended = () => {
        cleanup();
      };
    } catch (error) {
      console.warn('Background music error:', error);
      cleanup();
    }
  }, [initAudioContext, cleanup]);

  const stopBackgroundMusic = useCallback(() => {
    cleanup();
  }, [cleanup]);

  return {
    playEat,
    playGameOver,
    playPowerUp,
    startBackgroundMusic,
    stopBackgroundMusic,
  };
};
