import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import { Edit, Trash2, CheckSquare, Square } from 'lucide-react';
import ConfirmDialog from '../ui/ConfirmDialog';

const EntryList = ({ entries, onEdit }) => {
  const { deleteEntry, bulkDelete } = useStudy();
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === entries.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(entries.map(e => e.id));
    }
  };

  const handleBulkDelete = () => {
    bulkDelete(selectedIds);
    setSelectedIds([]);
    setDeleteConfirm(null);
  };

  if (!entries.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No sessions found matching your filters.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSelectAll}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              {selectedIds.length === entries.length ? 
                <CheckSquare className="w-5 h-5 text-indigo-600" /> : 
                <Square className="w-5 h-5 text-gray-400" />
              }
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {selectedIds.length > 0
                ? `${selectedIds.length} selected`
                : `${entries.length} sessions`}
            </span>
          </div>

          {selectedIds.length > 0 && (
            <button
              onClick={() => setDeleteConfirm('bulk')}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete Selected
            </button>
          )}
        </div>

        <div className="space-y-2">
          {entries.map(entry => (
            <div
              key={entry.id}
              className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <button onClick={() => toggleSelect(entry.id)} className="p-1">
                {selectedIds.includes(entry.id) ? 
                  <CheckSquare className="w-5 h-5 text-indigo-600" /> : 
                  <Square className="w-5 h-5 text-gray-400" />
                }
              </button>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">{entry.subject}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{entry.chapter}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">{entry.topic}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Date: {entry.date}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{entry.startTime} - {entry.endTime}</div>
                  <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{entry.duration}h</div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Focus: {entry.focus}/5</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Mood: {entry.mood}/5</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{entry.studyType} • {entry.environment}</div>
                </div>

                <div>
                  {entry.goalAchieved && (
                    <span className="inline-block px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">
                      Goal Achieved
                    </span>
                  )}
                  {entry.notes && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{entry.notes}</div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(entry)}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(entry.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmDialog
        isOpen={deleteConfirm === 'bulk'}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleBulkDelete}
        title="Delete Multiple Sessions"
        message={`Are you sure you want to delete ${selectedIds.length} selected sessions? This action cannot be undone.`}
        confirmText="Delete All"
      />

      <ConfirmDialog
        isOpen={deleteConfirm && deleteConfirm !== 'bulk'}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => {
          deleteEntry(deleteConfirm);
          setDeleteConfirm(null);
        }}
        title="Delete Session"
        message="Are you sure you want to delete this study session? This action cannot be undone."
        confirmText="Delete"
      />
    </>
  );
};

export default EntryList;

