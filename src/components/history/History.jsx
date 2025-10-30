import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import Filters from './Filters';
import EntryList from './EntryList';
import EditModal from './EditModal';
import { Search } from 'lucide-react';

const History = () => {
  const { getFilteredEntries } = useStudy();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEntry, setEditingEntry] = useState(null);
  
  const filteredEntries = getFilteredEntries();
  const searchedEntries = filteredEntries.filter(entry => {
    const search = searchTerm.toLowerCase();
    return (
      entry.subject.toLowerCase().includes(search) ||
      entry.chapter.toLowerCase().includes(search) ||
      entry.topic.toLowerCase().includes(search) ||
      entry.notes.toLowerCase().includes(search)
    );
  });

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Study History
        </h2>
        
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search sessions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
        </div>

        <Filters />
      </div>

      <EntryList entries={searchedEntries} onEdit={setEditingEntry} />

      {editingEntry && (
        <EditModal
          entry={editingEntry}
          onClose={() => setEditingEntry(null)}
        />
      )}
    </div>
  );
};

export default History;

