import React, { useState } from 'react';
import { Calendar, User, Loader2 } from 'lucide-react';
import type { Client } from '../App';
import NotesModal from './NotesModal';

interface ClientHeaderProps {
  client: Client;
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onGenerateSummary: () => void;
  isLoading: boolean;
}

function ClientHeader({ 
  client, 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange, 
  onGenerateSummary,
  isLoading 
}: ClientHeaderProps) {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <>
      <div className="bg-gray-800 rounded-xl p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
              {client.image ? (
                <img
                  src={client.image}
                  alt={client.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold">{client.name}</h1>
              <p className="text-gray-400">Last visited: {client.lastVisit}</p>
            </div>
          </div>
          <div className="flex gap-2 sm:ml-auto">
            <button 
              onClick={() => setShowNotes(true)}
              className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Notes
            </button>
            <button className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700">
              Documents
            </button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <div className="w-full sm:w-auto">
              <span className="block sm:inline text-gray-400 mb-1 sm:mb-0 sm:mr-2">Start:</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => onStartDateChange(e.target.value)}
                className="w-full sm:w-auto bg-gray-700 border-gray-600 rounded-md px-3 py-2"
              />
            </div>
            <div className="w-full sm:w-auto">
              <span className="block sm:inline text-gray-400 mb-1 sm:mb-0 sm:mr-2">End:</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => onEndDateChange(e.target.value)}
                className="w-full sm:w-auto bg-gray-700 border-gray-600 rounded-md px-3 py-2"
              />
            </div>
          </div>
          <button
            onClick={onGenerateSummary}
            disabled={isLoading}
            className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 sm:ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Calendar className="w-4 h-4 mr-2" />
            )}
            Generate Summary
          </button>
        </div>
      </div>

      {showNotes && <NotesModal onClose={() => setShowNotes(false)} />}
    </>
  );
}

export default ClientHeader;