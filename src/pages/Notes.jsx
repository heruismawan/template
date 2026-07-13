import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function Notes() {
  const [notes, setNotes] = useLocalStorage('iphone_notes', '');

  return (
    <div className="space-y-6 flex flex-col h-full min-h-[60vh]">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-primary">
          Catatan
        </h2>

      </div>

      <div className="flex-1 flex flex-col relative group animate-in fade-in slide-in-from-bottom-4 duration-500">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}

          className="flex-1 w-full min-h-[400px] px-6 py-5 rounded-2xl border border-border bg-white dark:bg-white/5 resize-y outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground placeholder:text-muted-foreground/60 shadow-sm"
        />
        {/* Subtle saved indicator */}
        <div className="absolute bottom-4 right-6 text-xs text-muted-foreground/50 select-none pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">

        </div>
      </div>
    </div>
  );
}
