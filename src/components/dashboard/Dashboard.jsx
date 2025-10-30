// src/components/dashboard/Dashboard.jsx
import React from 'react';
import { useStudy } from '../../context/StudyContext';
import { useMetrics } from '../../hooks/useMetrics';
import MetricCards from './MetricCards';
import QuickStats from './QuickStats';
import RecentSessions from './RecentSessions';
import QuickInsights from './QuickInsights';
import { Loader } from 'lucide-react';

const Dashboard = () => {
  const { entries, loading, getFilteredEntries } = useStudy();
  const filteredEntries = getFilteredEntries();
  const metrics = useMetrics(filteredEntries);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!entries.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
        <div className="max-w-md mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Welcome to GrindGrid!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start tracking your study sessions to unlock powerful insights and analytics.
          </p>
          <div className="text-left space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>✓ Track study time across subjects and topics</p>
            <p>✓ Monitor focus levels and productivity</p>
            <p>✓ Identify weak areas and strengths</p>
            <p>✓ Visualize your progress with charts</p>
            <p>✓ Build study streaks and level up</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MetricCards metrics={metrics} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickStats metrics={metrics} />
        <QuickInsights metrics={metrics} entries={filteredEntries} />
      </div>
      <RecentSessions entries={filteredEntries} />
    </div>
  );
};

export default Dashboard;

