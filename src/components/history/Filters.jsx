import React from 'react';
import { useStudy } from '../../context/StudyContext';

const Filters = () => {
  const { entries, filters, setFilters } = useStudy();

  const uniqueSubjects = [...new Set(entries.map(e => e.subject))];
  const uniqueChapters = [...new Set(entries.map(e => e.chapter))];
  const studyTypes = ['Concept', 'Practice', 'Revision', 'Test'];
  const environments = ['Home', 'College', 'Coaching', 'Library', 'Cafe'];

  const handleReset = () => {
    setFilters({
      subject: '',
      chapter: '',
      dateFrom: '',
      dateTo: '',
      studyType: '',
      environment: ''
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Filters</h3>
        <button
          onClick={handleReset}
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Reset All
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Subject
          </label>
          <select
            value={filters.subject}
            onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="">All Subjects</option>
            {uniqueSubjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Chapter
          </label>
          <select
            value={filters.chapter}
            onChange={(e) => setFilters({ ...filters, chapter: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="">All Chapters</option>
            {uniqueChapters.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Study Type
          </label>
          <select
            value={filters.studyType}
            onChange={(e) => setFilters({ ...filters, studyType: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="">All Types</option>
            {studyTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Environment
          </label>
          <select
            value={filters.environment}
            onChange={(e) => setFilters({ ...filters, environment: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="">All Environments</option>
            {environments.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date From
          </label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date To
          </label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;

