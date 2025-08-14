import React from 'react';
import { District } from '../types';

interface DialectExplanationProps {
  district: District;
  phrase: string;
  standardPhrase: string;
  isVisible: boolean;
}

const DIALECT_FEATURES: Record<District, string> = {
  [District.MITSUNE]: "三根地区の特徴：語尾に「〜てぃ」「〜げぇ」がよく使われます",
  [District.OKAGO]: "大賀郷地区の特徴：「〜てー」「〜しぇー」の音変化が特徴的です",
  [District.KASHITATE]: "樫立地区の特徴：「〜とちー」「〜しょ」など独特の語尾があります",
  [District.NAKANOGO]: "中之郷地区の特徴：「〜てん」「〜しゃん」の音韻変化が見られます",
  [District.SUEYOSHI]: "末吉地区の特徴：「〜てに」「〜だぁがー」など力強い表現が特徴です",
};

const DialectExplanation: React.FC<DialectExplanationProps> = ({ 
  district, 
  phrase, 
  standardPhrase, 
  isVisible 
}) => {
  if (!isVisible) return null;

  return (
    <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg animate-fade-in">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h4 className="text-sm font-medium text-blue-800">
            解説
          </h4>
          <div className="mt-1 text-sm text-blue-700">
            <p className="mb-2">
              <span className="font-semibold">現代語:</span> 「{standardPhrase}」<br/>
              <span className="font-semibold">{district}:</span> 「{phrase}」
            </p>
            <p className="text-xs text-blue-600">
              {DIALECT_FEATURES[district]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialectExplanation;