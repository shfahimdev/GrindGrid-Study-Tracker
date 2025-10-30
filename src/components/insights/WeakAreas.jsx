import React from 'react';
import { AlertTriangle } from 'lucide-react';

const WeakAreas = ({ metrics }) => {
  if (!metrics.weakAreas.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Areas Needing Attention
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Great job! No weak areas detected. Keep up the focused studying!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-6 h-6 text-red-500" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Areas Needing Attention
        </h2>
      </div>

      <div className="space-y-3">
        {metrics.weakAreas.map((area, idx) => (
          <div
            key={idx}
            className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="font-semibold text-gray-800 dark:text-gray-200">
                {area.topic}
              </div>
              <div className="text-sm font-bold text-red-600 dark:text-red-400">
                Focus: {area.focus}/5
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Time spent: {area.hours.toFixed(2)}h
            </div>
            <div className="mt-2 text-xs text-red-600 dark:text-red-400">
              💡 Suggestion: Try different study methods, take breaks, or study during your peak hours.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeakAreas;

