import React, { useState } from 'react';
import { Activity, Moon, Footprints } from 'lucide-react';
import { healthData } from '../data/mockData';

type TimeFrame = '1week' | '2weeks' | '1month';

function HealthMetrics() {
  const [selectedMetric, setSelectedMetric] = useState('steps');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('1week');

  // Get data based on timeframe
  const getTimeFrameData = () => {
    switch (timeFrame) {
      case '1week':
        return healthData.slice(-7);
      case '2weeks':
        return healthData.slice(-14);
      case '1month':
        return healthData.slice(-30);
      default:
        return healthData.slice(-7);
    }
  };

  const timeFrameData = getTimeFrameData();

  // Calculate averages
  const averages = {
    steps: Math.round(timeFrameData.reduce((acc, day) => acc + day.steps, 0) / timeFrameData.length),
    sleep: (timeFrameData.reduce((acc, day) => acc + day.sleep, 0) / timeFrameData.length).toFixed(1),
    exercise: Math.round(timeFrameData.reduce((acc, day) => acc + day.exercise, 0) / timeFrameData.length)
  };

  const metrics = {
    steps: { icon: Footprints, value: averages.steps.toLocaleString(), unit: 'avg', label: 'Steps' },
    sleep: { icon: Moon, value: averages.sleep, unit: 'hrs', label: 'Sleep' },
    exercise: { icon: Activity, value: averages.exercise, unit: 'min', label: 'Exercise' }
  };

  // Get data for selected metric trend
  const trendData = timeFrameData.map(day => ({
    date: day.date,
    value: day[selectedMetric as keyof typeof day]
  }));

  return (
    <div className="space-y-4">
      {/* Time Frame Selection */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setTimeFrame('1week')}
          className={`px-3 py-1 rounded-md text-sm ${
            timeFrame === '1week' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          1 Week
        </button>
        <button
          onClick={() => setTimeFrame('2weeks')}
          className={`px-3 py-1 rounded-md text-sm ${
            timeFrame === '2weeks' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          2 Weeks
        </button>
        <button
          onClick={() => setTimeFrame('1month')}
          className={`px-3 py-1 rounded-md text-sm ${
            timeFrame === '1month' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          1 Month
        </button>
      </div>

      {/* Metric Selection */}
      <div className="flex space-x-2">
        {Object.entries(metrics).map(([key, metric]) => {
          const Icon = metric.icon;
          return (
            <button
              key={key}
              onClick={() => setSelectedMetric(key)}
              className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                selectedMetric === key ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{metric.label}</span>
            </button>
          );
        })}
      </div>

      {/* All Metrics Overview */}
      <div className="grid grid-cols-3 gap-3">
        {Object.entries(metrics).map(([key, metric]) => {
          const Icon = metric.icon;
          return (
            <div
              key={key}
              className={`bg-gray-700 rounded-lg p-4 text-center ${
                selectedMetric === key ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <Icon className="w-5 h-5 mx-auto mb-2" />
              <div className="text-xl font-bold">{metric.value}</div>
              <div className="text-sm text-gray-400">{metric.unit}</div>
            </div>
          );
        })}
      </div>

      {/* Selected Metric Trend */}
      <div className="h-48 bg-gray-700 rounded-lg p-4">
        <div className="w-full h-full flex items-end justify-between gap-1">
          {trendData.map((day, i) => {
            const maxValue = Math.max(...trendData.map(d => d.value));
            const height = (day.value / maxValue) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-500 rounded-t"
                  style={{ height: `${height}%` }}
                />
                <div className="text-xs text-gray-400 mt-1 rotate-45 origin-left">
                  {day.date.split('-')[2]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HealthMetrics;