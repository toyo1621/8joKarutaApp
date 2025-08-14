import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  correctCount: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, correctCount }) => {
  const progress = (current / total) * 100;
  const accuracy = current > 0 ? (correctCount / current) * 100 : 0;

  return (
    <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-600">
          進捗: {current}/{total}問
        </span>
        <span className="text-sm font-medium text-slate-600">
          正解率: {accuracy.toFixed(0)}%
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-3">
        <div 
          className="bg-gradient-to-r from-amber-400 to-amber-500 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;