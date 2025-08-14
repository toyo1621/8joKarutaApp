@@ .. @@
 import React, { useState, useEffect, useCallback } from 'react';
 import { District, CardData } from './types';
 import { cardTo, HACHIJO_DISTRICTS } from './constants';
 import DistrictSelector from './components/DistrictSelector';
 import Quiz from './components/Quiz';
+import ProgressBar from './components/ProgressBar';
+import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

@@ .. @@
 const App: React.FC = () => {
     const [card] = useState<CardData>(cardTo);
     const [selectedDistrict, setSelectedDistrict] = useState<District>(HACHIJO_DISTRICTS[0]);
     const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
     const [completedSegments, setCompletedSegments] = useState<string[]>([]);
     const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
     const [isImageLoading, setIsImageLoading] = useState(true);
+    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
+    const [totalAttempts, setTotalAttempts] = useState(0);
+    const [quizOptionHandler, setQuizOptionHandler] = useState<((index: number) => void) | null>(null);

     const isQuizComplete = currentSegmentIndex >= card.dialectPhrases.length;

@@ .. @@
     const resetGame = useCallback(() => {
         setCurrentSegmentIndex(0);
         setCompletedSegments([]);
         setFeedback(null);
+        setCorrectAnswersCount(0);
+        setTotalAttempts(0);
     }, []);

@@ .. @@
     const handleAnswer = (isCorrect: boolean) => {
+        setTotalAttempts(prev => prev + 1);
         setFeedback(isCorrect ? 'correct' : 'incorrect');

         setTimeout(() => {
             if (isCorrect) {
+                setCorrectAnswersCount(prev => prev + 1);
                 const correctPhrase = card.dialectPhrases[currentSegmentIndex].options[selectedDistrict];
                 setCompletedSegments(prev => [...prev, correctPhrase]);
                 setCurrentSegmentIndex(prev => prev + 1);
             }
             setFeedback(null);
         }, 1500);
     };

+    // キーボードショートカットの設定
+    useKeyboardShortcuts({
+        onSelectOption: (index: number) => {
+            if (quizOptionHandler && !feedback) {
+                quizOptionHandler(index);
+            }
+        },
+        onReset: resetGame,
+        optionsCount: 4,
+        isQuizActive: !isQuizComplete && !feedback
+    });

     return (
         <div className="min-h-screen bg-sky-100 text-slate-800 p-4 sm:p-6 lg:p-8">
             <div className="max-w-3xl mx-auto">
                 <header className="text-center mb-6">
                     <h1 className="text-3xl sm:text-4xl font-bold text-sky-800 font-mplus">八丈島ことばカルタ</h1>
                     <p className="text-sky-600 mt-1">Hachijo Dialect Karuta Quiz</p>
                 </header>

                 <main className="space-y-6">
+                    {/* Progress Bar */}
+                    <ProgressBar 
+                        current={totalAttempts}
+                        total={card.dialectPhrases.length}
+                        correctCount={correctAnswersCount}
+                    />
+
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

@@ .. @@
                         )}
                         {!isQuizComplete ? (
-                            <Quiz segment={card.dialectPhrases[currentSegmentIndex]} selectedDistrict={selectedDistrict} onAnswer={handleAnswer} />
+                            <Quiz 
+                                segment={card.dialectPhrases[currentSegmentIndex]} 
+                                selectedDistrict={selectedDistrict} 
+                                onAnswer={handleAnswer}
+                                onSelectOption={setQuizOptionHandler}
+                            />
                         ) : (
                             <div className="text-center p-6 bg-green-100 border-2 border-green-300 rounded-xl shadow-lg">
                                 <h3 className="text-2xl font-bold text-green-800 font-mplus">お見事！</h3>
-                                <p className="mt-2 text-green-700">すべてのフレーズを完成させました！</p>
+                                <p className="mt-2 text-green-700">
+                                    すべてのフレーズを完成させました！<br/>
+                                    <span className="text-sm">
+                                        最終正解率: {totalAttempts > 0 ? Math.round((correctAnswersCount / totalAttempts) * 100) : 0}%
+                                    </span>
+                                </p>
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