
import React, { useState, useEffect } from 'react';
import { DialectSegment, District } from '../types';

interface QuizProps {
  segment: DialectSegment;
  selectedDistrict: District;
  onAnswer: (isCorrect: boolean) => void;
}

// Helper to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Quiz: React.FC<QuizProps> = ({ segment, selectedDistrict, onAnswer }) => {
  const [options, setOptions] = useState<string[]>([]);
  const correctAnswer = segment.options[selectedDistrict];

  useEffect(() => {
    const distractors = Object.values(segment.options).filter(
      (opt) => opt !== correctAnswer
    );
    const uniqueDistractors = [...new Set(distractors)];
    const shuffledDistractors = shuffleArray(uniqueDistractors).slice(0, 3);
    
    setOptions(shuffleArray([correctAnswer, ...shuffledDistractors]));
  }, [segment, selectedDistrict, correctAnswer]);

  const handleOptionClick = (option: string) => {
    onAnswer(option === correctAnswer);
  };

  return (
    <div className="w-full p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg mt-4">
      <p className="text-center text-slate-600 mb-2">現代語</p>
      <h3 className="text-center text-xl md:text-2xl font-bold text-slate-800 mb-4 font-mplus">
        「{segment.standard}」
      </h3>
      <p className="text-center text-slate-600 mb-4">は、<span className="font-bold text-amber-600">{selectedDistrict}</span>の島言葉で？</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className="w-full p-4 text-lg font-mplus font-medium text-slate-700 bg-white rounded-lg shadow-md hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
