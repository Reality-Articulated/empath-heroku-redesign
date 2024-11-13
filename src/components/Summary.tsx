import React from 'react';
import { Loader2 } from 'lucide-react';

interface SummaryProps {
  visible: boolean;
  isLoading: boolean;
}

function Summary({ visible, isLoading }: SummaryProps) {
  if (!visible && !isLoading) return null;

  return (
    <div className="relative p-[2px] rounded-xl mb-6 gradient-border">
      <div className="bg-gray-800 rounded-xl p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p className="text-gray-400">Generating summary...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Summary</h3>
            
            <section>
              <h4 className="text-lg font-medium mb-2">Notes:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                <li>Ut enim ad minim veniam, quis nostrud exercitation.</li>
                <li>Duis aute irure dolor in reprehenderit in voluptate.</li>
                <li>Excepteur sint occaecat cupidatat non proident.</li>
              </ul>
            </section>

            <section>
              <h4 className="text-lg font-medium mb-2">Journal Summary:</h4>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h5 className="font-medium">Key Observations:</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div>
                  <h5 className="font-medium">Recommendations:</h5>
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
              </div>
            </section>

            <button className="w-full py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
              Add Feedback
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Summary;