import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const PerformanceComparison = ({ metrics }) => {
  const weekChange = parseFloat(metrics.weekOverWeekChange);

  const getTrendIcon = () => {
    if (weekChange > 0) return <TrendingUp className="w-5 h-5 text-green-500" />;
    if (weekChange < 0) return <TrendingDown className="w-5 h-5 text-red-500" />;
    return <Minus className="w-5 h-5 text-gray-500" />;
  };

  const getTrendColor = () => {
    if (weekChange > 0) return 'text-green-600 dark:text-green-400';
    if (weekChange < 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Performance Comparison
      </h2>

      {/* Weekly Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">This Week</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {metrics.thisWeekHours}h
          </div>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Last Week</div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {metrics.lastWeekHours}h
          </div>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Change</div>
          <div className={`flex items-center justify-center gap-2 text-3xl font-bold ${getTrendColor()}`}>
            {getTrendIcon()}
            <span>{weekChange > 0 ? '+' : ''}{weekChange}%</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {metrics.currentStreak}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Current Streak</div>
          </div>

          <div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {metrics.longestStreak}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Longest Streak</div>
          </div>


          <div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {metrics.goalCompletionRate}%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Goals Achieved</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceComparison;

