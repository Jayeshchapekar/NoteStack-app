import React, { useState, useEffect } from 'react';
import { PlusCircle, Search, Sparkles, X, AlertCircle, FileText, Trash2, Calendar, FileDown } from 'lucide-react';
import { getNotes, createNote, deleteNote } from '../utils/api';
import NoteCard from '../components/NoteCard';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form states
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Selected note for modal view
  const [selectedNote, setSelectedNote] = useState(null);

  // Toast status feedback
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Failed to connect to backend server. Make sure the database and API are running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Title is required', 'error');
      return;
    }
    if (title.length > 200) {
      showToast('Title cannot exceed 200 characters', 'error');
      return;
    }

    setFormSubmitting(true);
    try {
      const newNote = await createNote({ 
        title: title.trim(), 
        body: body.trim() || null 
      });
      setNotes([newNote, ...notes]);
      setTitle('');
      setBody('');
      showToast('Note created successfully!');
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.detail || 'Failed to create note.', 'error');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await deleteNote(id);
      setNotes(notes.filter(n => n.id !== id));
      showToast('Note deleted successfully!');
      if (selectedNote && selectedNote.id === id) {
        setSelectedNote(null);
      }
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.detail || 'Failed to delete note.', 'error');
    }
  };

  const filteredNotes = notes.filter(note => {
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      (note.body && note.body.toLowerCase().includes(query))
    );
  });

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return dateString;
    }
  };

  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="glass-card animate-pulse rounded-xl p-5 flex flex-col justify-between h-56">
          <div>
            <div className="h-6 bg-slate-800 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-slate-800/80 rounded w-full mb-2"></div>
            <div className="h-4 bg-slate-800/80 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-slate-800/80 rounded w-2/3"></div>
          </div>
          <div className="flex justify-between items-center border-t border-slate-800/50 pt-3">
            <div className="h-4 bg-slate-800 rounded w-1/3"></div>
            <div className="flex space-x-2">
              <div className="h-7 w-7 bg-slate-800 rounded"></div>
              <div className="h-7 w-7 bg-slate-800 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl relative min-h-screen">
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center p-4 rounded-xl border shadow-xl transition-all duration-300 translate-y-0 ${
          toast.type === 'error' 
            ? 'bg-rose-950/90 border-rose-800 text-rose-200' 
            : 'bg-emerald-950/90 border-emerald-800 text-emerald-200'
        }`}>
          <AlertCircle className="w-5 h-5 mr-3 shrink-0" />
          <p className="text-sm font-medium">{toast.message}</p>
          <button onClick={() => setToast(null)} className="ml-4 hover:opacity-75">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <header className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center border-b border-slate-800/60 pb-6">
        <div>
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              NoteStack
            </h1>
          </div>
          <p className="text-slate-400 text-sm md:text-base font-light">
            Organize thoughts, records, and ideas in a beautiful glassmorphic space.
          </p>
        </div>
        
        {/* Statistics or Actions */}
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2 text-center">
            <span className="text-xs text-slate-500 block uppercase tracking-wider font-semibold">Total Notes</span>
            <span className="text-xl font-bold text-indigo-400">{notes.length}</span>
          </div>
        </div>
      </header>

      {/* Primary Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input Form */}
        <div className="lg:col-span-4">
          <div className="glass-card rounded-2xl p-6 sticky top-6 glow-indigo">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-slate-200">
              <PlusCircle className="w-5 h-5 text-indigo-400 mr-2" />
              Create New Note
            </h2>
            <form onSubmit={handleCreateNote} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={200}
                  required
                  className="w-full bg-slate-900/90 border border-slate-800 focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/60 rounded-xl p-3 text-slate-100 placeholder-slate-500 outline-none transition-all duration-200"
                />
                <div className="flex justify-end text-[10px] text-slate-500 mt-1 font-light">
                  {title.length}/200 chars
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Body (Optional)
                </label>
                <textarea
                  placeholder="Start typing your note here..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={6}
                  className="w-full bg-slate-900/90 border border-slate-800 focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/60 rounded-xl p-3 text-slate-100 placeholder-slate-500 outline-none resize-none transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={formSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-[0.98] disabled:opacity-50 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg shadow-indigo-500/20"
              >
                {formSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Note
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Search + Grid */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          
          {/* Search bar & statistics bar */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search notes by title or body..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800/80 focus:border-indigo-500/50 rounded-xl py-3 pl-10 pr-4 text-slate-100 placeholder-slate-500 outline-none transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="bg-rose-950/40 border border-rose-900/50 rounded-2xl p-5 flex items-start space-x-3 text-rose-200">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
              <div>
                <h3 className="font-semibold text-rose-300 mb-1">Server Error</h3>
                <p className="text-sm font-light text-rose-200">{error}</p>
                <button 
                  onClick={fetchNotes}
                  className="mt-3 text-xs bg-rose-900/50 hover:bg-rose-800 border border-rose-700/60 px-3 py-1.5 rounded-lg transition-colors font-medium text-rose-100"
                >
                  Retry Connection
                </button>
              </div>
            </div>
          )}

          {/* Grid Render */}
          {loading ? (
            <SkeletonLoader />
          ) : filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onView={setSelectedNote}
                  onDelete={handleDeleteNote}
                />
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[350px]">
              <div className="bg-slate-900 p-4 rounded-full mb-4 border border-slate-800">
                <FileText className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-300 mb-1">
                {searchQuery ? 'No matching notes' : 'Your space is empty'}
              </h3>
              <p className="text-sm text-slate-500 max-w-sm font-light">
                {searchQuery 
                  ? 'Try searching with a different term or clear the filter.'
                  : 'Start adding notes on the left column to populate your NoteStack dashboard.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Note Detail Modal */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur overlay */}
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setSelectedNote(null)}
          />

          {/* Modal Content */}
          <div className="glass-card border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-850 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-slate-100 leading-snug pr-4">
                  {selectedNote.title}
                </h3>
                <div className="flex items-center text-xs text-slate-500 mt-2">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  <span>Created on {formatDate(selectedNote.created_at)}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedNote(null)}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              {selectedNote.body ? (
                <p className="text-slate-300 text-base font-light leading-relaxed whitespace-pre-wrap break-words">
                  {selectedNote.body}
                </p>
              ) : (
                <p className="italic text-slate-600 text-sm font-light">No content provided for this note.</p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-900/30 border-t border-slate-850 flex justify-end space-x-3">
              <button
                onClick={() => handleDeleteNote(selectedNote.id)}
                className="px-4 py-2 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 border border-transparent hover:border-rose-900/40 rounded-xl transition-all duration-200 flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Note
              </button>
              <button
                onClick={() => setSelectedNote(null)}
                className="px-5 py-2 text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
