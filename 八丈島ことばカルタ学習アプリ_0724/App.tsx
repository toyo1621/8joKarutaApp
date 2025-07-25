import React, { useState, useEffect, useCallback } from 'react';
import { District, CardData } from './types';
import { cardTo, HACHIJO_DISTRICTS } from './constants';
import DistrictSelector from './components/DistrictSelector';
import Quiz from './components/Quiz';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const XCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const App: React.FC = () => {
    const [card] = useState<CardData>(cardTo);
    const [selectedDistrict, setSelectedDistrict] = useState<District>(HACHIJO_DISTRICTS[0]);
    const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
    const [completedSegments, setCompletedSegments] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isImageLoading, setIsImageLoading] = useState(true);

    const isQuizComplete = currentSegmentIndex >= card.dialectPhrases.length;

    const resetGame = useCallback(() => {
        setCurrentSegmentIndex(0);
        setCompletedSegments([]);
        setFeedback(null);
    }, []);

    useEffect(() => {
        resetGame();
    }, [selectedDistrict, resetGame]);

    const handleAnswer = (isCorrect: boolean) => {
        setFeedback(isCorrect ? 'correct' : 'incorrect');

        setTimeout(() => {
            if (isCorrect) {
                const correctPhrase = card.dialectPhrases[currentSegmentIndex].options[selectedDistrict];
                setCompletedSegments(prev => [...prev, correctPhrase]);
                setCurrentSegmentIndex(prev => prev + 1);
            }
            setFeedback(null);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-sky-100 text-slate-800 p-4 sm:p-6 lg:p-8">
            <div className="max-w-3xl mx-auto">
                <header className="text-center mb-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-sky-800 font-mplus">八丈島ことばカルタ</h1>
                    <p className="text-sky-600 mt-1">Hachijo Dialect Karuta Quiz</p>
                </header>

                <main className="space-y-6">
                    {/* Card Image */}
                    <div className="relative w-full aspect-[911/1235] bg-white rounded-xl shadow-lg overflow-hidden">
                        {isImageLoading && (
                            <div className="absolute inset-0 w-full h-full bg-slate-200 animate-pulse"></div>
                        )}
                        <img 
                            src={card.image} 
                            alt="Karuta" 
                            className={`relative w-full h-full object-contain transition-opacity duration-500 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                            onLoad={() => setIsImageLoading(false)}
                            onError={() => setIsImageLoading(false)}
                        />
                    </div>

                    {/* Standard Japanese and Dialect Builder */}
                    <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg">
                        <p className="text-center text-slate-600 mb-2">現代語</p>
                        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-lg sm:text-xl font-bold text-center text-slate-700 font-mplus mb-4">
                            {card.standardJapanese.map((phrase, index) => (
                                <span key={index}>{phrase}</span>
                            ))}
                        </div>
                        <hr className="my-4 border-slate-300"/>
                        <p className="text-center text-slate-600 mb-2">{selectedDistrict}の島言葉</p>
                        <div className="min-h-[3rem] flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xl sm:text-2xl font-bold text-center text-amber-700 font-mplus">
                            {card.dialectPhrases.map((_, index) => (
                                <span key={index} className={`transition-opacity duration-500 ${completedSegments[index] ? 'opacity-100' : 'opacity-0 -z-10'}`}>
                                    {completedSegments[index] || '...'}
                                </span>
                            ))}
                            {!isQuizComplete && <span className="animate-pulse">...？</span>}
                        </div>
                    </div>

                    <DistrictSelector selectedDistrict={selectedDistrict} onSelectDistrict={setSelectedDistrict} />

                    {/* Quiz Area or Completion message */}
                    <div className="relative">
                        {feedback && (
                            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl z-10 flex items-center justify-center animate-fade-in">
                                 <div className="text-center animate-jump-in">
                                    {feedback === 'correct' ? (
                                        <>
                                            <CheckIcon />
                                            <p className="text-2xl font-bold text-green-600 mt-2 font-mplus">正解！</p>
                                        </>
                                    ) : (
                                        <>
                                            <XCircleIcon />
                                            <p className="text-2xl font-bold text-red-600 mt-2 font-mplus">残念！</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                        {!isQuizComplete ? (
                            <Quiz segment={card.dialectPhrases[currentSegmentIndex]} selectedDistrict={selectedDistrict} onAnswer={handleAnswer} />
                        ) : (
                            <div className="text-center p-6 bg-green-100 border-2 border-green-300 rounded-xl shadow-lg">
                                <h3 className="text-2xl font-bold text-green-800 font-mplus">お見事！</h3>
                                <p className="mt-2 text-green-700">すべてのフレーズを完成させました！</p>
                                <button
                                    onClick={() => resetGame()}
                                    className="mt-4 px-6 py-2 bg-amber-500 text-white font-bold rounded-full hover:bg-amber-600 transition-colors"
                                >
                                    もう一度挑戦
                                </button>
                            </div>
                        )}
                    </div>
                </main>

                <footer className="text-center mt-8 text-slate-500 text-sm">
                    <p>八丈島ことば学習アプリデモ</p>
                </footer>
            </div>
        </div>
    );
};

export default App;