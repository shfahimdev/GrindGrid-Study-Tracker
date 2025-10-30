// src/components/dashboard/QuickInsights.jsx
import React from 'react';
import { AlertTriangle, ThumbsUp, TrendingDown, TrendingUp } from 'lucide-react';

const QuickInsights = ({ metrics, entries }) => {
  if (!metrics) return null;

  const insights = [];

  // Burnout warning
  if (metrics.burnoutRisk === 'High') {
    insights.push({
      type: 'warning',
      icon: AlertTriangle,
      message: 'Burnout Risk: Consider taking breaks. Your recent focus levels are declining.',
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/20'
    });
  }

  // Streak encouragement
  if (metrics.currentStreak >= 7) {
    insights.push({
      type: 'success',
      icon: ThumbsUp,
      message: `Amazing! ${metrics.currentStreak} day streak! Keep the momentum going!`,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20'
    });
  }

  // Week comparison
  if (metrics.weekOverWeekChange && parseFloat(metrics.weekOverWeekChange) < -20) {
    insights.push({
      type: 'info',
      icon: TrendingDown,
      message: `Study time decreased by ${Math.abs(metrics.weekOverWeekChange)}% this week. Try to bounce back!`,
      color: 'text-yellow-600 dark:text-yellow-400',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20'
    });
  } else if (metrics.weekOverWeekChange && parseFloat(metrics.weekOverWeekChange) > 20) {
    insights.push({
      type: 'success',
      icon: TrendingUp,
      message: `Excellent! Study time increased by ${metrics.weekOverWeekChange}% this week!`,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20'
    });
  }

  // Weak areas
  if (metrics.weakAreas.length > 0) {
    const weakest = metrics.weakAreas[0];
    insights.push({
      type: 'info',
      icon: AlertTriangle,
      message: `Focus needed: "${weakest.topic}" has low focus (${weakest.focus}/5). Consider different study methods.`,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    });
  }

  // Balance warning
  if (parseFloat(metrics.balanceScore) < 50) {
    insights.push({
      type: 'warning',
      icon: AlertTriangle,
      message: 'Study balance is low. Try to distribute time more evenly across subjects.',
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-50 dark:bg-orange-900/20'
    });
  }

  // Goal completion
  if (parseFloat(metrics.goalCompletionRate) < 50) {
    insights.push({
      type: 'info',
      icon: TrendingDown,
      message: `Goal completion at ${metrics.goalCompletionRate}%. Set more realistic goals or push harder!`,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
    });
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Quick Insights</h2>
      {insights.length > 0 ? (
        <div className="space-y-3">
          {insights.slice(0, 4).map((insight, idx) => {
            const Icon = insight.icon;
            return (
              <div key={idx} className={`flex items-start gap-3 p-3 rounded-lg ${insight.bg}`}>
                <Icon className={`w-5 h-5 mt-0.5 ${insight.color}`} />
                <p className={`text-sm ${insight.color} flex-1`}>{insight.message}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-sm">Keep studying to unlock personalized insights!</p>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Study Overview</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{metrics.uniqueSubjects}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Subjects</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{metrics.uniqueTopics}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Topics</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{metrics.studyDays}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Study Days</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickInsights;

