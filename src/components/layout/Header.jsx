// src/components/layout/Header.jsx
import React from 'react';
import { Sun, Moon } from 'lucide-react';

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">GrindGrid</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Master Your Study Journey</p>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-700" />}
        </button>
      </div>
    </header>
  );
};

export default Header;

