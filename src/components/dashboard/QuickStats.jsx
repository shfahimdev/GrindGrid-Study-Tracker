// src/components/dashboard/QuickStats.jsx
import React from 'react';
import { TrendingUp, Clock, MapPin, Sun } from 'lucide-react';

const QuickStats = ({ metrics }) => {
  if (!metrics) return null;

  const stats = [
    { label: 'Best Study Day', value: metrics.bestStudyDay, icon: TrendingUp },
    { label: 'Avg Session Length', value: `${metrics.avgSessionLength}h`, icon: Clock },
    { label: 'Best Environment', value: "Home", icon: MapPin },
    { label: 'Peak Time', value: metrics.mostProductiveTime, icon: Sun }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Quick Stats</h2>
      <div className="space-y-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{stat.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Hours by Subject</h3>
        {Object.entries(metrics.hoursBySubject).slice(0, 5).map(([subject, hours]) => (
          <div key={subject} className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">{subject}</span>
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{hours.toFixed(2)}h</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStats;

