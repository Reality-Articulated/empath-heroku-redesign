import React, { useState } from 'react';
import { MessageSquarePlus, Bell, Settings, Users, Home, User, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import TherapistPreferences from './components/TherapistPreferences';
import ClientDashboard from './components/ClientDashboard';
import Profile from './components/Profile';
import ClientSidebar from './components/ClientSidebar';

export interface Client {
  id: number;
  name: string;
  lastVisit: string;
  image: string | null;
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client>({
    id: 1,
    name: 'Karan Personal',
    lastVisit: '10-09-2024',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop'
  });

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    setSidebarOpen(false);
    setMobileMenuOpen(false);
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${sidebarOpen ? 'w-64' : 'w-16'} 
          bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col flex-shrink-0
        `}
      >
        <div className="p-4 flex items-center justify-between mt-14 lg:mt-0">
          {sidebarOpen && <h2 className="font-semibold">Clients</h2>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-gray-700 rounded hidden lg:block"
          >
            {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
        <ClientSidebar 
          isExpanded={sidebarOpen} 
          selectedClientId={selectedClient.id}
          onClientSelect={handleClientSelect}
        />
      </div>

      <div className="flex-1 flex flex-col w-full">
        {/* Navigation */}
        <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-30">
          <div className="px-4 ml-14 lg:ml-0">
            <div className="flex justify-between h-16">
              <div className="flex space-x-1 sm:space-x-4 overflow-x-auto hide-scrollbar">
                <button 
                  className={`flex items-center px-2 sm:px-4 ${activeTab === 'home' ? 'border-b-2 border-blue-500' : ''}`}
                  onClick={() => setActiveTab('home')}
                >
                  <Home className="w-5 h-5 sm:mr-2" />
                  <span className="hidden sm:inline">Home</span>
                </button>
                <button 
                  className={`flex items-center px-2 sm:px-4 ${activeTab === 'profile' ? 'border-b-2 border-blue-500' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <User className="w-5 h-5 sm:mr-2" />
                  <span className="hidden sm:inline">Profile</span>
                </button>
                <button 
                  className={`flex items-center px-2 sm:px-4 ${activeTab === 'settings' ? 'border-b-2 border-blue-500' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="w-5 h-5 sm:mr-2" />
                  <span className="hidden sm:inline">Settings</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className={`flex-1 p-4 sm:p-6 transition-all duration-300 ${sidebarOpen ? 'lg:max-w-[calc(100vw-16rem)]' : 'lg:max-w-[calc(100vw-4rem)]'}`}>
          {activeTab === 'home' && <ClientDashboard client={selectedClient} sidebarOpen={sidebarOpen} />}
          {activeTab === 'settings' && <TherapistPreferences />}
          {activeTab === 'profile' && <Profile />}
        </main>
      </div>
    </div>
  );
}

export default App;