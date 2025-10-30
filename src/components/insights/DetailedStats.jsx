import React from 'react';
import { BookOpen, Clock, Target, Activity } from 'lucide-react';

const DetailedStats = ({ metrics }) => {
  const statGroups = [
    {
      title: 'Study Coverage',
      icon: BookOpen,
      stats: [
        { label: 'Unique Subjects', value: metrics.uniqueSubjects },
        { label: 'Unique Chapters', value: metrics.uniqueChapters },
        { label: 'Unique Topics', value: metrics.uniqueTopics },
        { label: 'Study Days', value: metrics.studyDays },
      ],
    },
    {
      title: 'Session Analysis',
      icon: Clock,
      stats: [
        { label: 'Total Sessions', value: metrics.totalSessions },
        { label: 'Avg Session Length', value: `${metrics.avgSessionLength}h` },
        { label: 'Max Session', value: `${metrics.maxSessionLength}h` },
        { label: 'Min Session', value: `${metrics.minSessionLength}h` },
      ],
    },
    {
      title: 'Balance & Goals',
      icon: Target,
      stats: [
        { label: 'Study Balance', value: `${metrics.balanceScore}%` },
        { label: 'Goal Completion', value: `${metrics.goalCompletionRate}%` },
        { label: 'Burnout Risk', value: metrics.burnoutRisk },
        { label: 'Current Level', value: metrics.level },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {statGroups.map((group, idx) => {
        const Icon = group.icon;
        return (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{group.title}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {group.stats.map((stat, statIdx) => (
                <div key={statIdx} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stat.value}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DetailedStats;

