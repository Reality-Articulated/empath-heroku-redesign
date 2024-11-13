import React from 'react';
import { User, Mail, Phone, Clock } from 'lucide-react';

function Profile() {
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <User className="w-5 h-5 mr-2" />
        Therapist Profile
      </h2>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Dr. Sarah Johnson</h3>
            <p className="text-gray-400">Licensed Clinical Psychologist</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 text-gray-300">
            <Mail className="w-4 h-4" />
            <span>sarah.johnson@example.com</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <Phone className="w-4 h-4" />
            <span>(555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <Clock className="w-4 h-4" />
            <span>Mon-Fri, 9:00 AM - 5:00 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;