// src/components/dashboard/RecentSessions.jsx
import React from 'react';
import { Clock, TrendingUp } from 'lucide-react';

const RecentSessions = ({ entries }) => {
  // Sort entries by date descending and take the 5 most recent
  const recentEntries = [...entries]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (!recentEntries.length) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Recent Sessions</h2>
      <div className="space-y-3">
        {recentEntries.map(entry => (
          <div
            key={entry.id}
            className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-800 dark:text-gray-200">{entry.subject}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{entry.topic}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                <span>{entry.date}</span>
                <span>•</span>
                <span>{entry.startTime} - {entry.endTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-center">
                <div className="flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  <Clock className="w-4 h-4" />
                  {entry.duration}h
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-sm font-semibold text-purple-600 dark:text-purple-400">
                  <TrendingUp className="w-4 h-4" />
                  {entry.focus}/5
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSessions;

