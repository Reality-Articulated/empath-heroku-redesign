import React from 'react';
import { PieChart } from 'lucide-react';
import { emotionsData } from '../data/mockData';

function EmotionsPieChart() {
  const total = emotionsData.reduce((sum, emotion) => sum + emotion.percentage, 0);
  let currentAngle = 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <PieChart className="w-5 h-5" />
          Top Emotions Distribution
        </h3>
      </div>
      
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="200" height="200" viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }}>
            {emotionsData.map((emotion, i) => {
              const angleSize = (emotion.percentage / total) * Math.PI * 2;
              const x1 = Math.cos(currentAngle);
              const y1 = Math.sin(currentAngle);
              const x2 = Math.cos(currentAngle + angleSize);
              const y2 = Math.sin(currentAngle + angleSize);
              const largeArc = angleSize > Math.PI ? 1 : 0;
              const path = `M 0 0 L ${x1} ${y1} A 1 1 0 ${largeArc} 1 ${x2} ${y2} Z`;
              currentAngle += angleSize;
              return <path key={i} d={path} fill={emotion.color} />;
            })}
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {emotionsData.map((emotion) => (
          <div key={emotion.name} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: emotion.color }}
            />
            <span className="text-sm text-gray-300">{emotion.name}</span>
            <span className="text-sm text-gray-400 ml-auto">{emotion.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmotionsPieChart;