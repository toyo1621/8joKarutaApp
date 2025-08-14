import React from 'react';

interface KeyboardHintsProps {
  isVisible: boolean;
}

const KeyboardHints: React.FC<KeyboardHintsProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="mt-4 p-3 bg-slate-100 rounded-lg">
      <p className="text-xs text-slate-600 text-center">
        💡 キーボードショートカット: 
        <span className="mx-2 px-2 py-1 bg-white rounded text-slate-700 font-mono">1-4</span>
        で選択肢を選択、
        <span className="mx-2 px-2 py-1 bg-white rounded text-slate-700 font-mono">R</span>
        でリセット
      </p>
    </div>
  );
};

export default KeyboardHints;