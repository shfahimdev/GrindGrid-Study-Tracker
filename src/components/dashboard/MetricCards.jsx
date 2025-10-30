// src/components/dashboard/MetricCards.jsx
import React from 'react';
import { Clock, Target, Flame, TrendingUp, Book, Calendar, Award, Zap } from 'lucide-react';

const MetricCards = ({ metrics }) => {
  if (!metrics) return null;

  const cards = [
    {
      label: 'Total Study Hours',
      value: metrics.totalHours,
      icon: Clock,
      gradient: 'from-blue-500 to-blue-600',
      change: metrics.weekOverWeekChange ? `${metrics.weekOverWeekChange}%` : null
    },
    {
      label: 'Goal Completion',
      value: `${metrics.goalCompletionRate}%`,
      icon: Target,
      gradient: 'from-green-500 to-green-600'
    },
    {
      label: 'Current Streak',
      value: `${metrics.currentStreak} days`,
      icon: Flame,
      gradient: 'from-orange-500 to-orange-600',
      subtitle: `Longest: ${metrics.longestStreak} days`
    },
    {
      label: 'Level',
      value: metrics.level,
      icon: Award,
      gradient: 'from-purple-500 to-purple-600',
      subtitle: `${metrics.nextLevelHours}h to next level`
    },
    {
      label: 'This Week',
      value: `${metrics.thisWeekHours}h`,
      icon: Calendar,
      gradient: 'from-pink-500 to-pink-600',
      change: metrics.weekOverWeekChange ? `${metrics.weekOverWeekChange}%` : null
    },
    {
      label: 'Total Sessions',
      value: metrics.totalSessions,
      icon: Book,
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      label: 'Study Balance',
      value: `${metrics.balanceScore}%`,
      icon: TrendingUp,
      gradient: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`bg-gradient-to-br ${card.gradient} text-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="text-sm opacity-90 font-medium">{card.label}</div>
              <Icon className="w-5 h-5 opacity-80" />
            </div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">{card.value}</div>
              {card.change && (
                <div className="text-xs font-semibold px-2 py-1 rounded bg-white/20">
                  {parseFloat(card.change) > 0 ? '+' : ''}{card.change}
                </div>
              )}
            </div>
            {card.subtitle && (
              <div className="text-xs opacity-75 mt-1">{card.subtitle}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MetricCards;

