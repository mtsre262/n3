import React, { useState } from 'react';
import { generateExerciseSentence, evaluateIrab } from '../services/geminiService';
import { ExerciseStatus } from '../types';
import { RefreshCwIcon, CheckIcon } from './IconComponents';

const ExerciseZone: React.FC = () => {
  const [status, setStatus] = useState<ExerciseStatus>(ExerciseStatus.IDLE);
  const [sentence, setSentence] = useState<string | null>(null);
  const [userAnalysis, setUserAnalysis] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const handleGenerate = async () => {
    setStatus(ExerciseStatus.GENERATING);
    setFeedback(null);
    setUserAnalysis('');
    
    try {
      const newSentence = await generateExerciseSentence(difficulty);
      setSentence(newSentence);
      setStatus(ExerciseStatus.WAITING_FOR_ANSWER);
    } catch (e) {
      console.error(e);
      setStatus(ExerciseStatus.IDLE);
    }
  };

  const handleSubmit = async () => {
    if (!sentence || !userAnalysis.trim()) return;
    
    setStatus(ExerciseStatus.EVALUATING);
    try {
      const result = await evaluateIrab(sentence, userAnalysis);
      setFeedback(result);
      setStatus(ExerciseStatus.COMPLETED);
    } catch (e) {
      console.error(e);
      setStatus(ExerciseStatus.WAITING_FOR_ANSWER);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-950/40 to-night-900 border border-slate-700/50 rounded-xl p-6 shadow-xl relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>

      <h2 className="text-2xl font-bold text-white mb-6">ساحة التدريب</h2>

      {/* Difficulty Selector */}
      <div className="flex gap-4 mb-6">
        {(['easy', 'medium', 'hard'] as const).map((lvl) => (
          <button
            key={lvl}
            onClick={() => setDifficulty(lvl)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              difficulty === lvl 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {lvl === 'easy' ? 'مبتدئ' : lvl === 'medium' ? 'متوسط' : 'متقدم'}
          </button>
        ))}
      </div>

      {/* Action Area */}
      <div className="space-y-6">
        {!sentence ? (
          <div className="text-center py-10 bg-slate-900/50 rounded-xl border border-dashed border-slate-700">
            <p className="text-slate-400 mb-4">اضغط على الزر للحصول على جملة فعلية جديدة</p>
            <button
              onClick={handleGenerate}
              disabled={status === ExerciseStatus.GENERATING}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50"
            >
               {status === ExerciseStatus.GENERATING ? 'جاري التحضير...' : 'توليد جملة جديدة'}
               {!status.includes('generating') && <RefreshCwIcon />}
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Sentence Display */}
            <div className="bg-black/30 p-6 rounded-xl border border-blue-900/50 text-center">
              <span className="text-sm text-blue-400 block mb-2">أعرب الجملة التالية:</span>
              <h3 className="text-3xl font-bold text-white font-serif">{sentence}</h3>
            </div>

            {/* Input Area */}
            <div className="space-y-3">
              <label className="text-slate-300 text-sm">اكتب الإعراب هنا:</label>
              <textarea
                value={userAnalysis}
                onChange={(e) => setUserAnalysis(e.target.value)}
                placeholder="مثال: شرب: فعل ماض...، الطفل: فاعل..."
                disabled={status === ExerciseStatus.COMPLETED || status === ExerciseStatus.EVALUATING}
                className="w-full h-32 bg-night-800 text-white border border-slate-700 rounded-lg p-4 focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            {status !== ExerciseStatus.COMPLETED && (
              <div className="flex gap-3">
                 <button
                  onClick={handleSubmit}
                  disabled={!userAnalysis.trim() || status === ExerciseStatus.EVALUATING}
                  className="flex-1 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {status === ExerciseStatus.EVALUATING ? 'جاري التصحيح...' : 'تحقق من الإجابة'}
                  {status !== ExerciseStatus.EVALUATING && <CheckIcon />}
                </button>
                <button 
                  onClick={handleGenerate}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                >
                  <RefreshCwIcon />
                </button>
              </div>
            )}

            {/* Feedback Display */}
            {feedback && (
              <div className="bg-night-900/80 border border-green-900/50 p-6 rounded-xl mt-4 animate-in zoom-in-95 duration-300">
                <h4 className="text-green-400 font-bold mb-3 flex items-center gap-2">
                  <CheckIcon /> التقييم
                </h4>
                <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {feedback}
                </div>
                <button
                  onClick={handleGenerate}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold transition-all"
                >
                  جملة جديدة
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseZone;