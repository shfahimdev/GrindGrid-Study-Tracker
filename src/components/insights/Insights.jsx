import React from 'react';
import { useStudy } from '../../context/StudyContext';
import { useMetrics } from '../../hooks/useMetrics';
import WeakAreas from './WeakAreas';
import StrongAreas from './StrongAreas';
import Recommendations from './Recommendations';
import PerformanceComparison from './PerformanceComparison';
import DetailedStats from './DetailedStats';
import { Loader } from 'lucide-react';

const Insights = () => {
  const { getFilteredEntries, loading } = useStudy();
  const filteredEntries = getFilteredEntries();
  const metrics = useMetrics(filteredEntries);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!filteredEntries.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No data available for insights.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PerformanceComparison metrics={metrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeakAreas metrics={metrics} />
        <StrongAreas metrics={metrics} />
      </div>

      <Recommendations metrics={metrics} entries={filteredEntries} />
      
      <DetailedStats metrics={metrics} />
    </div>
  );
};

export default Insights;

