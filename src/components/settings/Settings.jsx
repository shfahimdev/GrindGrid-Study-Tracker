import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import { Download, FileDown, Trash2, Save } from 'lucide-react';
import ConfirmDialog from '../ui/ConfirmDialog';

const Settings = ({ darkMode, setDarkMode }) => {
  const { goals, saveGoals, exportData, exportCSV, clearAllData } = useStudy();
  const [localGoals, setLocalGoals] = useState(goals);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleSaveGoals = () => {
    saveGoals(localGoals);
  };

  return (
    <div className="space-y-6">
      {/* Study Goals */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Study Goals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Weekly Goal (hours)
            </label>
            <input
              type="number"
              value={localGoals.weekly}
              onChange={(e) =>
                setLocalGoals({ ...localGoals, weekly: parseFloat(e.target.value) || 0 })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200"
              placeholder="e.g., 20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Monthly Goal (hours)
            </label>
            <input
              type="number"
              value={localGoals.monthly}
              onChange={(e) =>
                setLocalGoals({ ...localGoals, monthly: parseFloat(e.target.value) || 0 })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200"
              placeholder="e.g., 80"
            />
          </div>
        </div>
        <button
          onClick={handleSaveGoals}
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Goals
        </button>
      </div>

      {/* Appearance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Appearance
        </h2>
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <div className="font-medium text-gray-800 dark:text-gray-200">Dark Mode</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Toggle dark theme</div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative w-14 h-7 rounded-full transition-colors ${
              darkMode ? 'bg-indigo-600' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                darkMode ? 'transform translate-x-7' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Data Management
        </h2>
        <div className="space-y-3">
          <button
            onClick={exportData}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Export Data (JSON)
          </button>
          <button
            onClick={exportCSV}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <FileDown className="w-5 h-5" />
            Export Data (CSV)
          </button>
          <button
            onClick={() => setShowClearConfirm(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            Clear All Data
          </button>
        </div>
      </div>

      {/* About */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">About</h2>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p>
            <strong>GrindGrid Study Tracker</strong>
          </p>
          <p>Version 4.0</p>
          <p>
            A comprehensive study tracking and analytics platform designed to help you master
            your study journey.
          </p>
          <p className="mt-4">Features:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Track study sessions with detailed metrics</li>
            <li>Visualize progress with charts and analytics</li>
            <li>Get personalized insights and recommendations</li>
            <li>Build study streaks and level up</li>
            <li>Export data for backup and analysis</li>
          </ul>
        </div>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={clearAllData}
        title="Clear All Data"
        message="Are you absolutely sure? This will permanently delete all your study sessions, goals, and templates. This action cannot be undone."
        confirmText="Yes, Delete Everything"
      />
    </div>
  );
};

export default Settings;

