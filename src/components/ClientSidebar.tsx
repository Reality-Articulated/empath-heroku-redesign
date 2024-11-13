import React, { useState, useMemo } from 'react';
import { User, Search } from 'lucide-react';
import type { Client } from '../App';

interface ClientSidebarProps {
  isExpanded: boolean;
  selectedClientId: number;
  onClientSelect: (client: Client) => void;
}

function ClientSidebar({ isExpanded, selectedClientId, onClientSelect }: ClientSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const clients: Client[] = [
    { id: 1, name: 'Karan Personal', lastVisit: '10-09-2024', image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop' },
    { id: 2, name: 'John Smith', lastVisit: '10-08-2024', image: null },
    { id: 3, name: 'Emma Wilson', lastVisit: '10-07-2024', image: null },
    { id: 4, name: 'Sarah Johnson', lastVisit: '10-06-2024', image: null },
    { id: 5, name: 'Michael Brown', lastVisit: '10-05-2024', image: null },
    { id: 6, name: 'David Lee', lastVisit: '10-04-2024', image: null },
  ];

  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) return clients;
    const query = searchQuery.toLowerCase();
    return clients.filter(client => 
      client.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {isExpanded && (
        <div className="p-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clients..."
              className="w-full bg-gray-700 border-gray-600 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto">
        {filteredClients.length === 0 ? (
          <div className="p-4 text-center text-gray-400 text-sm">
            No clients found
          </div>
        ) : (
          filteredClients.map((client) => (
            <button
              key={client.id}
              onClick={() => onClientSelect(client)}
              className={`w-full p-3 hover:bg-gray-700 flex items-center gap-3 transition-colors ${
                client.id === selectedClientId ? 'bg-gray-700' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">
                {client.image ? (
                  <img src={client.image} alt={client.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
              {isExpanded && (
                <div className="text-left overflow-hidden">
                  <div className="truncate font-medium">{client.name}</div>
                  <div className="text-sm text-gray-400 truncate">Last: {client.lastVisit}</div>
                </div>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default ClientSidebar;