
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Difficulty = 'slow' | 'normal' | 'fast';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  disabled: boolean;
}

const DifficultySelector = ({ difficulty, onDifficultyChange, disabled }: DifficultySelectorProps) => {
  return (
    <div className="mb-6">
      <p className="text-gray-400 font-mono text-sm mb-2">DIFFICULTY</p>
      <Select 
        value={difficulty} 
        onValueChange={(value: Difficulty) => onDifficultyChange(value)}
        disabled={disabled}
      >
        <SelectTrigger className="w-32 bg-gray-800 border-green-400 text-green-400 font-mono">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-green-400">
          <SelectItem value="slow" className="text-green-400 font-mono focus:bg-green-400/20">
            SLOW
          </SelectItem>
          <SelectItem value="normal" className="text-green-400 font-mono focus:bg-green-400/20">
            NORMAL
          </SelectItem>
          <SelectItem value="fast" className="text-green-400 font-mono focus:bg-green-400/20">
            FAST
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DifficultySelector;
