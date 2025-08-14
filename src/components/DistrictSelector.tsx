import React from 'react';
import { District } from '../types';
import { HACHIJO_DISTRICTS } from '../constants';

interface DistrictSelectorProps {
  selectedDistrict: District;
  onSelectDistrict: (district: District) => void;
}

const DistrictSelector: React.FC<DistrictSelectorProps> = ({ selectedDistrict, onSelectDistrict }) => {
  return (
    <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg">
      <h3 className="text-center text-lg font-bold text-slate-700 mb-3">地区を選択してください</h3>
      <div className="flex flex-wrap justify-center gap-2">
        {HACHIJO_DISTRICTS.map((district) => (
          <button
            key={district}
            onClick={() => onSelectDistrict(district)}
            className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-all duration-200 ease-in-out transform hover:scale-105 ${
              selectedDistrict === district
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white text-amber-600 hover:bg-amber-100'
            }`}
          >
            {district}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DistrictSelector;