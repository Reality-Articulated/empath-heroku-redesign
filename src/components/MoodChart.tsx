import React from 'react';
import { moodData } from '../data/mockData';

function MoodChart() {
  const moodPoints = [
    { label: 'Alert/Anxious', value: moodData.alert },
    { label: 'Excited/Elated', value: moodData.excited },
    { label: 'Content/Relaxed', value: moodData.content },
    { label: 'Calm/Indifferent', value: moodData.calm },
    { label: 'Depressed/Bored', value: moodData.bored },
    { label: 'Sad', value: moodData.sad },
    { label: 'Angry/Frustrated', value: moodData.angry },
    { label: 'Anxious', value: moodData.anxious },
  ];

  const size = 200;
  const center = size / 2;
  const radius = size * 0.4;

  return (
    <div className="space-y-4">
      <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background lines */}
          {moodPoints.map((_, i) => {
            const angle = (i * 2 * Math.PI) / moodPoints.length;
            const x2 = center + radius * Math.cos(angle);
            const y2 = center + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x2}
                y2={y2}
                stroke="#4B5563"
                strokeWidth="1"
              />
            );
          })}

          {/* Data points */}
          <path
            d={moodPoints
              .map((point, i) => {
                const angle = (i * 2 * Math.PI) / moodPoints.length;
                const r = radius * point.value;
                const x = center + r * Math.cos(angle);
                const y = center + r * Math.sin(angle);
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              })
              .join(' ') + ' Z'}
            fill="rgba(59, 130, 246, 0.3)"
            stroke="#3B82F6"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="bg-gray-700 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Mood Stability</span>
          <span className="text-2xl font-bold">18.0</span>
        </div>
        <p className="text-sm text-gray-400">
          Based on 66 data points. Score indicates low stability.
          Consider discussing strategies for mood regulation.
        </p>
      </div>
    </div>
  );
}

export default MoodChart;