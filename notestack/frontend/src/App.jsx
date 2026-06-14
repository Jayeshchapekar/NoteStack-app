import React from 'react';
import Home from './pages/Home';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Decorative background glow circles for glassmorphism ambient effect */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[120px]" />
      </div>

      {/* Main page content */}
      <main className="flex-1 relative z-10">
        <Home />
      </main>

      {/* Modern styled footer */}
      <footer className="py-6 border-t border-slate-900/60 text-center text-xs text-slate-600 font-light relative z-10">
        <p>© {new Date().getFullYear()} NoteStack. Built with React & FastAPI.</p>
      </footer>
    </div>
  );
}
