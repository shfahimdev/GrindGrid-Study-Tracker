// Analytics.jsx

import React, { useState, useMemo } from 'react';
import { useStudy } from '../../context/StudyContext';
import { useMetrics } from '../../hooks/useMetrics';
import { Loader } from 'lucide-react';
import DailyStudyTrend from './DailyStudyTrend';
import SubjectDistribution from './SubjectDistribution';
import ChapterBreakdown from './ChapterBreakdown';
import DayOfWeekAnalysis from './DayOfWeekAnalysis';
import TimeOfDayAnalysis from './TimeOfDayAnalysis';
import AnalyticsFilters from './AnalyticsFilters';

const Analytics = () => {
  const { getFilteredEntries, loading } = useStudy();
  const allEntries = getFilteredEntries();

  // Get dates for last 30 days
  const getDefaultDateRange = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    
    return {
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    };
  };

  // Filter state with last 30 days pre-selected
  const [filters, setFilters] = useState({
    subject: '',
    chapter: '',
    topic: '',
    dateRange: getDefaultDateRange()
  });

  // Apply filters to entries
  const filteredEntries = useMemo(() => {
    return allEntries.filter(entry => {
      // Subject filter
      if (filters.subject && entry.subject !== filters.subject) {
        return false;
      }

      // Chapter filter
      if (filters.chapter && entry.chapter !== filters.chapter) {
        return false;
      }

      // Topic filter
      if (filters.topic && entry.topic !== filters.topic) {
        return false;
      }

      // Date range filter
      if (filters.dateRange.start || filters.dateRange.end) {
        const entryDate = new Date(entry.date);
        if (filters.dateRange.start && entryDate < new Date(filters.dateRange.start)) {
          return false;
        }
        if (filters.dateRange.end && entryDate > new Date(filters.dateRange.end)) {
          return false;
        }
      }

      return true;
    });
  }, [allEntries, filters]);

  // Calculate metrics for filtered entries
  const metrics = useMetrics(filteredEntries);

  // Extract unique values for filter dropdowns
  const filterOptions = useMemo(() => {
    const subjects = [...new Set(allEntries.map(e => e.subject).filter(Boolean))];
    const chapters = [...new Set(allEntries.map(e => e.chapter).filter(Boolean))];
    const topics = [...new Set(allEntries.map(e => e.topic).filter(Boolean))];

    return {
      subjects: subjects.sort(),
      chapters: chapters.sort(),
      topics: topics.sort()
    };
  }, [allEntries]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleDateRangeChange = (start, end) => {
    setFilters(prev => ({
      ...prev,
      dateRange: { start, end }
    }));
  };

  const resetFilters = () => {
    setFilters({
      subject: '',
      chapter: '',
      topic: '',
      dateRange: getDefaultDateRange() // Reset to last 30 days, not empty
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!allEntries.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No data available for analytics.
        </p>
      </div>
    );
  }

  if (!metrics || !metrics.hoursByDate) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Unable to generate analytics metrics.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <AnalyticsFilters
        filters={filters}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        onDateRangeChange={handleDateRangeChange}
        onReset={resetFilters}
      />

      {/* Show message if filtered data is empty */}
      {filteredEntries.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No data matches the selected filters.
          </p>
        </div>
      ) : (
        <>
          {/* Daily Study Time Trend */}
          <DailyStudyTrend
            hoursByDate={metrics.hoursByDate}
            hasFilters={filters.subject || filters.chapter || filters.topic || filters.dateRange.start || filters.dateRange.end}
          />

          {/* Grid for other visualizations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SubjectDistribution hoursBySubject={metrics.hoursBySubject} />
            <ChapterBreakdown hoursByChapter={metrics.hoursByChapter} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DayOfWeekAnalysis hoursByDayOfWeek={metrics.hoursByDayOfWeek} />
            <TimeOfDayAnalysis hoursByTimeOfDay={metrics.hoursByTimeOfDay} />
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
