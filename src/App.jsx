// src/App.jsx
import React, { useState } from 'react';
import { StudyProvider } from './context/StudyContext';
import Header from './components/layout/Header';
import TabNavigation from './components/layout/TabNavigation';
import Dashboard from './components/dashboard/Dashboard';
import AddSession from './components/forms/AddSession';
import History from './components/history/History';
import Analytics from './components/analytics/Analytics';
import Insights from './components/insights/Insights';
import Settings from './components/settings/Settings';
import { Toaster } from './components/ui/Toast';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'add':
        return <AddSession />;
      case 'history':
        return <History />;
      case 'analytics':
        return <Analytics />;
      case 'insights':
        return <Insights />;
      case 'settings':
        return <Settings darkMode={darkMode} setDarkMode={setDarkMode} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <StudyProvider>
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="max-w-7xl mx-auto px-4 py-6">
            {renderContent()}
          </main>
          <Toaster />
        </div>
      </div>
    </StudyProvider>
  );
}

export default App;

