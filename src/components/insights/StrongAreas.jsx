import React from 'react';
import { ThumbsUp } from 'lucide-react';

const StrongAreas = ({ metrics }) => {
  if (!metrics.strongAreas.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Strong Areas
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Keep studying with high focus to build your strengths!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <ThumbsUp className="w-6 h-6 text-green-500" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Strong Areas
        </h2>
      </div>

      <div className="space-y-3">
        {metrics.strongAreas.map((area, idx) => (
          <div
            key={idx}
            className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="font-semibold text-gray-800 dark:text-gray-200">
                {area.topic}
              </div>
              <div className="text-sm font-bold text-green-600 dark:text-green-400">
                Focus: {area.focus}/5
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              Time spent: {area.hours.toFixed(2)}h
            </div>

            <div className="mt-2 text-xs text-green-600 dark:text-green-400">
              ⭐ Excellent! Your focused approach is paying off. Keep it up!
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrongAreas;

