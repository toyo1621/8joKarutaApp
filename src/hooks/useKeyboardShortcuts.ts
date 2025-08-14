import { useEffect } from 'react';

interface UseKeyboardShortcutsProps {
  onSelectOption: (index: number) => void;
  onReset: () => void;
  optionsCount: number;
  isQuizActive: boolean;
}

export const useKeyboardShortcuts = ({
  onSelectOption,
  onReset,
  optionsCount,
  isQuizActive
}: UseKeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isQuizActive) return;

      const key = event.key.toLowerCase();
      
      // 数字キー 1-4 で選択肢を選択
      if (key >= '1' && key <= '4') {
        const index = parseInt(key) - 1;
        if (index < optionsCount) {
          event.preventDefault();
          onSelectOption(index);
        }
      }
      
      // R キーでリセット
      if (key === 'r') {
        event.preventDefault();
        onReset();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onSelectOption, onReset, optionsCount, isQuizActive]);
};