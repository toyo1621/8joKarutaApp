import React, { useState, useEffect } from 'react';
import { DialectSegment, District } from '../types';
import DialectExplanation from './DialectExplanation';
import KeyboardHints from './KeyboardHints';

interface QuizProps {
  segment: DialectSegment;
  selectedDistrict: District;
  onAnswer: (isCorrect: boolean) => void;
  onSelectOption?: (handler: (index: number) => void) => void;
}

// Helper to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Quiz: React.FC<QuizProps> = ({ segment, selectedDistrict, onAnswer, onSelectOption }) => {
  const [options, setOptions] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [lastAnsweredOption, setLastAnsweredOption] = useState<string | null>(null);
  const correctAnswer = segment.options[selectedDistrict];

  useEffect(() => {
    const distractors = Object.values(segment.options).filter(
      (opt) => opt !== correctAnswer
    );
    const uniqueDistractors = [...new Set(distractors)];
    const shuffledDistractors = shuffleArray(uniqueDistractors).slice(0, 3);
    
    setOptions(shuffleArray([correctAnswer, ...shuffledDistractors]));
    setShowExplanation(false);
    setLastAnsweredOption(null);
  }, [segment, selectedDistrict, correctAnswer]);

  const handleOptionClick = (option: string, index?: number) => {
    setLastAnsweredOption(option);
    setShowExplanation(true);
    onAnswer(option === correctAnswer);
  };

  // キーボードショートカット用のハンドラー
  useEffect(() => {
    if (onSelectOption) {
      const handleSelectOption = (index: number) => {
        if (options[index]) {
          handleOptionClick(options[index], index);
        }
      };
      onSelectOption(handleSelectOption);
    }
  }, [options, onSelectOption]);

  return (
    <div className="w-full p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg">
      <p className="text-center text-slate-600 mb-2">現代語</p>
      <h3 className="text-center text-xl md:text-2xl font-bold text-slate-800 mb-4 font-mplus">
        「{segment.standard}」
      </h3>
      <p className="text-center text-slate-600 mb-4">は、<span className="font-bold text-amber-600">{selectedDistrict}</span>の島言葉で？</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option, index)}
            className={`w-full p-4 text-lg font-mplus font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75 transition-all transform hover:scale-105 relative ${
              lastAnsweredOption === option
                ? option === correctAnswer
                  ? 'bg-green-100 text-green-800 border-2 border-green-300'
                  : 'bg-red-100 text-red-800 border-2 border-red-300'
                : 'text-slate-700 bg-white hover:bg-amber-100'
            }`}
          >
            <span className="absolute top-1 left-2 text-xs text-slate-400 font-mono">
              {index + 1}
            </span>
            {option}
          </button>
        ))}
      </div>
      
      <DialectExplanation
        district={selectedDistrict}
        phrase={correctAnswer}
        standardPhrase={segment.standard}
        isVisible={showExplanation}
      />
      
      <KeyboardHints isVisible={true} />
    </div>
  );
};

export default Quiz;