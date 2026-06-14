import React from 'react';
import { Calendar, Trash2, Eye } from 'lucide-react';

export default function NoteCard({ note, onDelete, onView }) {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return dateString;
    }
  };

  const truncateBody = (text, maxLength = 120) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="glass-card hover:border-slate-700/80 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 rounded-xl p-5 flex flex-col justify-between h-56 group relative overflow-hidden">
      {/* Background hover highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-slate-100 font-sans tracking-wide leading-tight group-hover:text-indigo-400 transition-colors duration-200 line-clamp-1 pr-4">
            {note.title}
          </h3>
        </div>
        <p className="text-slate-400 text-sm font-light leading-relaxed line-clamp-4 break-words">
          {note.body || <span className="italic text-slate-600">No content</span>}
        </p>
      </div>

      <div className="flex justify-between items-center mt-4 border-t border-slate-800/60 pt-3 relative z-10">
        <div className="flex items-center text-xs text-slate-500 font-light">
          <Calendar className="w-3.5 h-3.5 mr-1" />
          <span>{formatDate(note.created_at)}</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onView(note)}
            className="p-1.5 rounded-lg bg-slate-800/40 hover:bg-indigo-600/20 text-slate-400 hover:text-indigo-400 border border-slate-700/30 hover:border-indigo-500/30 transition-all duration-200"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
            className="p-1.5 rounded-lg bg-slate-800/40 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 border border-slate-700/30 hover:border-rose-500/30 transition-all duration-200"
            title="Delete Note"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
