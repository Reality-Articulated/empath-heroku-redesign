import React from 'react';
import { Settings } from 'lucide-react';

function TherapistPreferences() {
  const preferences = [
    { name: 'Therapeutic Approach', value: 'Psychodynamic' },
    { name: 'Preference for Goal Setting', options: ['Short-term', 'Long-term', 'Mixed'] },
    { name: 'Emphasis on Client\'s Strengths', options: ['High', 'Moderate', 'Low'] },
    { name: 'Approach to Client Resistance', options: ['Explore', 'Challenge', 'Support'] },
    { name: 'Importance of Homework/Outside Tasks', options: ['Essential', 'Helpful', 'Optional'] },
    { name: 'Preference for Therapeutic Metaphors/Analogies', options: ['Frequent', 'Occasional', 'Rare'] },
    { name: 'Approach to Feedback', options: ['Direct', 'Gentle', 'Mixed'] },
    { name: 'Use of External Resources', options: ['Extensive', 'Moderate', 'Minimal'] }
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <Settings className="w-5 h-5 mr-2" />
        Therapist Preferences
      </h2>
      <p className="text-gray-400 mb-6">
        Changing these preferences will affect how we show you summaries and recommendations.
      </p>
      <div className="space-y-6">
        {preferences.map((pref, index) => (
          <div key={index} className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              {pref.name}
            </label>
            {pref.value ? (
              <div className="px-4 py-2 bg-gray-700 rounded-md">
                {pref.value}
              </div>
            ) : (
              <select className="w-full bg-gray-700 border-gray-600 rounded-md px-4 py-2">
                {pref.options?.map((option, i) => (
                  <option key={i}>{option}</option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TherapistPreferences;