// src/components/forms/TemplateSelector.jsx
import React from 'react';
import { useStudy } from '../../context/StudyContext';
import { Trash2 } from 'lucide-react';

const TemplateSelector = ({ templates, onSelect }) => {
  const { deleteTemplate } = useStudy();

  if (!templates.length) {
    return (
      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          No templates saved yet. Fill the form and click "Save as Template" to create one.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Select a Template
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {templates.map(template => (
          <div
            key={template.id}
            className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors cursor-pointer"
            onClick={() => onSelect(template)}
          >
            <div>
              <div className="font-medium text-gray-800 dark:text-gray-200">{template.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {template.studyType} • {template.environment}
              </div>
            </div>
            <button
              onClick={e => {
                e.stopPropagation(); // Prevent triggering onSelect
                deleteTemplate(template.id);
              }}
              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;

