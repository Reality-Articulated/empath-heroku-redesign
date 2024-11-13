import React, { useState } from 'react';
import { MessageSquarePlus, Bell, BarChart2, Activity } from 'lucide-react';
import type { Client } from '../App';
import ClientHeader from './ClientHeader';
import Summary from './Summary';
import JournalPrompts from './JournalPrompts';
import Notifications from './Notifications';
import HealthMetrics from './HealthMetrics';
import MoodChart from './MoodChart';
import EmotionsPieChart from './EmotionsPieChart';

interface ClientDashboardProps {
  client: Client;
  sidebarOpen: boolean;
}

function ClientDashboard({ client, sidebarOpen }: ClientDashboardProps) {
  const [showPrompts, setShowPrompts] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState('2024-02-13');
  const [endDate, setEndDate] = useState('2024-11-13');

  const handleGenerateSummary = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSummary(true);
    }, 2000);
  };

  // Adjust grid columns based on sidebar state and screen size
  const gridCols = sidebarOpen ? 'lg:grid-cols-3' : 'lg:grid-cols-4';

  return (
    <div className="space-y-6">
      <ClientHeader
        client={client}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onGenerateSummary={handleGenerateSummary}
        isLoading={isLoading}
      />

      <Summary visible={showSummary} isLoading={isLoading} />

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6">
        <button
          onClick={() => setShowPrompts(true)}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          <MessageSquarePlus className="w-5 h-5 sm:mr-2" />
          <span className="hidden sm:inline">Add Journal Prompt</span>
        </button>
        <button
          onClick={() => setShowNotifications(true)}
          className="flex items-center justify-center px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
        >
          <Bell className="w-5 h-5 sm:mr-2" />
          <span className="hidden sm:inline">Send Notification</span>
        </button>
      </div>

      {/* Main Dashboard Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-4 sm:gap-6`}>
        {/* Health Metrics */}
        <div className={`bg-gray-800 rounded-xl p-4 sm:p-6 ${!sidebarOpen ? 'lg:col-span-2' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Health Metrics
            </h2>
          </div>
          <HealthMetrics />
        </div>

        {/* Mood Analysis */}
        <div className="bg-gray-800 rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold flex items-center">
              <BarChart2 className="w-5 h-5 mr-2" />
              Mood Analysis
            </h2>
          </div>
          <MoodChart />
        </div>

        {/* Emotions Distribution */}
        <div className="bg-gray-800 rounded-xl p-4 sm:p-6">
          <EmotionsPieChart />
        </div>
      </div>

      {/* Activity Tracking */}
      <div className={`grid grid-cols-1 ${sidebarOpen ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-4 sm:gap-6`}>
        <div className={`bg-gray-800 rounded-xl p-4 sm:p-6 ${!sidebarOpen ? 'lg:col-span-2' : ''}`}>
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Yearly Journal Activity</h3>
          <div className="h-48 bg-gray-700 rounded-lg"></div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Hourly Journal Activity</h3>
          <div className="h-48 bg-gray-700 rounded-lg"></div>
        </div>
      </div>

      {/* Modals */}
      {showPrompts && (
        <JournalPrompts onClose={() => setShowPrompts(false)} />
      )}
      {showNotifications && (
        <Notifications onClose={() => setShowNotifications(false)} />
      )}
    </div>
  );
}

export default ClientDashboard;