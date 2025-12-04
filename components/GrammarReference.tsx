import React from 'react';
import { GRAMMAR_TOPICS } from '../constants';
import { BookOpenIcon } from './IconComponents';

const GrammarReference: React.FC = () => {
  return (
    <div className="bg-night-800 border border-slate-800 rounded-xl p-6 h-full overflow-y-auto shadow-xl">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
        <div className="p-2 bg-blue-900/30 rounded-lg text-blue-400">
          <BookOpenIcon />
        </div>
        <h2 className="text-xl font-bold text-white">قواعد الجملة الفعلية</h2>
      </div>
      
      <div className="space-y-4">
        {GRAMMAR_TOPICS.map((topic, index) => (
          <div key={index} className="group">
            <h3 className="text-lg font-semibold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors">
              {topic.title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              {topic.description}
            </p>
            <div className="bg-night-900/50 rounded-md p-3 border-r-2 border-blue-600">
              <span className="text-xs text-slate-500 block mb-1">أمثلة:</span>
              <ul className="list-disc list-inside text-sm text-slate-400">
                {topic.examples.map((ex, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: ex }} />
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrammarReference;