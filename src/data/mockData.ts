import { subDays, format } from 'date-fns';

export interface HealthData {
  date: string;
  steps: number;
  sleep: number;
  exercise: number;
}

// Generate last 30 days of health data
export const healthData: HealthData[] = Array.from({ length: 30 }, (_, i) => {
  const date = subDays(new Date(), i);
  return {
    date: format(date, 'yyyy-MM-dd'),
    steps: Math.floor(Math.random() * 5000) + 3000, // 3000-8000 steps
    sleep: Math.floor(Math.random() * 3) + 6, // 6-9 hours
    exercise: Math.floor(Math.random() * 45) + 15, // 15-60 minutes
  };
});

// Generate emotions data
export const emotionsData = [
  { name: 'Excitement', percentage: 35, color: '#3B82F6' },
  { name: 'Enthusiasm', percentage: 25, color: '#34D399' },
  { name: 'Joy', percentage: 15, color: '#FBBF24' },
  { name: 'Ecstasy', percentage: 15, color: '#F97316' },
  { name: 'Amusement', percentage: 10, color: '#EF4444' },
];

// Generate mood radar data
export const moodData = {
  alert: 0.8,
  excited: 0.6,
  content: 0.7,
  calm: 0.5,
  bored: 0.3,
  sad: 0.4,
  angry: 0.2,
  anxious: 0.9,
};