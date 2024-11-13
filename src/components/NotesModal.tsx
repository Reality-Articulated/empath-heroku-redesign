import React, { useState, useRef } from 'react';
import { X, ArrowLeft, Mic, FileText, Calendar, Save } from 'lucide-react';
import { format } from 'date-fns';

interface Note {
  id: string;
  date: string;
  content: string;
  template?: string;
}

interface NotesModalProps {
  onClose: () => void;
}

const TEMPLATES = [
  { id: 'soap', name: 'SOAP Note' },
  { id: 'dar', name: 'DAP Note' },
  { id: 'birp', name: 'BIRP Note' },
  { id: 'basic', name: 'Basic Progress Note' }
];

const MOCK_NOTES: Note[] = [
  {
    id: '1',
    date: '2024-10-28',
    content: 'Client showed significant progress in anxiety management...',
    template: 'SOAP Note'
  },
  {
    id: '2',
    date: '2024-09-19',
    content: 'Discussed coping strategies for work-related stress...',
    template: 'DAP Note'
  }
];

function NotesModal({ onClose }: NotesModalProps) {
  const [view, setView] = useState<'list' | 'new' | 'view'>('list');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleNewNote = () => {
    setView('new');
    setNewNoteContent('');
    setSelectedTemplate('');
  };

  const handleSaveNote = () => {
    // Save note logic here
    setView('list');
  };

  const handleGenerateNote = () => {
    setIsGenerating(true);
    // Simulate note generation
    setTimeout(() => {
      setNewNoteContent(prev => 
        `[${selectedTemplate}]\n\n` +
        `Date: ${format(new Date(), 'MM/dd/yyyy')}\n\n` +
        `${prev}\n\n` +
        `[Generated Structure Based on Template]`
      );
      setIsGenerating(false);
    }, 1500);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = async (event) => {
        // Handle audio data - in real app would send to speech-to-text service
        console.log('Audio data available');
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {view !== 'list' ? (
            <button
              onClick={() => setView('list')}
              className="flex items-center text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
          ) : (
            <h2 className="text-xl font-semibold">Session Notes</h2>
          )}
          <div className="flex items-center gap-2">
            {view === 'list' && (
              <button
                onClick={handleNewNote}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <FileText className="w-4 h-4 mr-2" />
                New Note
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {view === 'list' && (
            <div className="space-y-4">
              {MOCK_NOTES.map((note) => (
                <button
                  key={note.id}
                  onClick={() => {
                    setSelectedNote(note);
                    setView('view');
                  }}
                  className="w-full p-4 bg-gray-700 rounded-lg hover:bg-gray-600 text-left transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{format(new Date(note.date), 'MMMM d, yyyy')}</span>
                    </div>
                    {note.template && (
                      <span className="text-sm px-2 py-1 bg-gray-600 rounded">
                        {note.template}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 line-clamp-2">{note.content}</p>
                </button>
              ))}
            </div>
          )}

          {view === 'new' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => isRecording ? stopRecording() : startRecording()}
                    className={`p-2 rounded-full ${
                      isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                  {isRecording && (
                    <span className="text-red-500 animate-pulse">Recording...</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="bg-gray-700 border-gray-600 rounded-lg px-3 py-2"
                  >
                    <option value="">Select template...</option>
                    {TEMPLATES.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleGenerateNote}
                    disabled={!selectedTemplate || !newNoteContent || isGenerating}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isGenerating ? 'Generating...' : 'Generate Note'}
                  </button>
                </div>
              </div>
              <textarea
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                placeholder="Write or dictate your notes here..."
                className="w-full h-[calc(100vh-300px)] bg-gray-700 border-gray-600 rounded-lg p-4 resize-none"
              />
            </div>
          )}

          {view === 'view' && selectedNote && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{format(new Date(selectedNote.date), 'MMMM d, yyyy')}</span>
                </div>
                {selectedNote.template && (
                  <span className="text-sm px-2 py-1 bg-gray-600 rounded">
                    {selectedNote.template}
                  </span>
                )}
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="whitespace-pre-wrap">{selectedNote.content}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {view === 'new' && (
          <div className="p-4 border-t border-gray-700 flex justify-end">
            <button
              onClick={handleSaveNote}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Note
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotesModal;