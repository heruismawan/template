import React from 'react';
import { Smartphone, List, StickyNote } from 'lucide-react';

export function Navbar({ currentView, setCurrentView }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-2xl mx-auto glass rounded-2xl p-2 flex justify-between items-center shadow-lg">
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentView('generate')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
              currentView === 'generate'
                ? 'bg-primary text-primary-foreground shadow-md scale-105'
                : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
            }`}
          >
            <Smartphone size={18} />
            <span className="hidden sm:inline">Generate</span>
          </button>
          
          <button
            onClick={() => setCurrentView('pricelist')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
              currentView === 'pricelist'
                ? 'bg-primary text-primary-foreground shadow-md scale-105'
                : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
            }`}
          >
            <List size={18} />
            <span className="hidden sm:inline">Daftar Harga</span>
          </button>

          <button
            onClick={() => setCurrentView('notes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
              currentView === 'notes'
                ? 'bg-primary text-primary-foreground shadow-md scale-105'
                : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
            }`}
          >
            <StickyNote size={18} />
            <span className="hidden sm:inline">Catatan</span>
          </button>
        </div>
        <div className="pr-2">
          <h1 className="font-bold text-lg bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            iSales Gen
          </h1>
        </div>
      </div>
    </nav>
  );
}
