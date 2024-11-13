import React, { useState } from 'react';
import { X } from 'lucide-react';

interface NotificationsProps {
  onClose: () => void;
}

function Notifications({ onClose }: NotificationsProps) {
  const [message, setMessage] = useState('');
  const [schedule, setSchedule] = useState('now');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle notification submission
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Send Notification</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-gray-700 border-gray-600 rounded-md px-4 py-2 h-24"
              placeholder="Enter notification message..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Schedule
            </label>
            <select
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="w-full bg-gray-700 border-gray-600 rounded-md px-4 py-2"
            >
              <option value="now">Send Now</option>
              <option value="1hour">In 1 Hour</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="custom">Custom Time</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Notifications;