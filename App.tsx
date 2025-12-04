import React from 'react';
import GrammarReference from './components/GrammarReference';
import ExerciseZone from './components/ExerciseZone';
import ChatTutor from './components/ChatTutor';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-night-900 text-slate-100 font-sans selection:bg-blue-500/30">
      
      {/* Navigation Bar */}
      <nav className="border-b border-slate-800 bg-night-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center">
              <span className="text-white font-bold text-lg">ع</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">إعراب <span className="text-blue-400">ماستر</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-400 font-medium hidden md:block">
              الجملة الفعلية
            </div>
            <div className="hidden md:block border-r border-slate-700 h-5"></div>
            <div className="text-sm text-slate-200 font-semibold hidden md:block">
              نهاد مصري
            </div>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <main className="container mx-auto px-4 py-6 h-[calc(100vh-4rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          
          {/* Left Column (Desktop) / Top (Mobile): Learning & Exercises */}
          <div className="lg:col-span-7 flex flex-col gap-6 h-full overflow-y-auto pr-1">
            <div className="shrink-0">
               <ExerciseZone />
            </div>
            <div className="flex-1 min-h-[300px]">
              <GrammarReference />
            </div>
          </div>

          {/* Right Column (Desktop) / Bottom (Mobile): AI Chat */}
          <div className="lg:col-span-5 h-[500px] lg:h-full">
            <ChatTutor />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
