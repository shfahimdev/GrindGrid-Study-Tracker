// src/components/forms/AddSession.jsx
import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import StudyForm from './StudyForm';
import TemplateSelector from './TemplateSelector';
import { Save } from 'lucide-react';

const AddSession = () => {
  const { addEntry, templates, saveTemplate } = useStudy();
  const [showTemplates, setShowTemplates] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    subject: '',
    chapter: '',
    topic: '',
    source: '',
    startTime: '',
    endTime: '',
    duration: 0,
    focus: 3,
    mood: 3,
    studyType: 'Concept',
    environment: 'Home',
    difficulty: 3,
    notes: '',
    goalAchieved: false
  });

  const resetForm = () => setFormData({
    date: new Date().toISOString().split('T')[0],
    subject: '',
    chapter: '',
    topic: '',
    source: '',
    startTime: '',
    endTime: '',
    duration: 0,
    focus: 3,
    mood: 3,
    studyType: 'Concept',
    environment: 'Home',
    difficulty: 3,
    notes: '',
    goalAchieved: false
  });

  const handleSubmit = async (data) => {
    await addEntry(data);
    resetForm();
  };

  const handleSaveTemplate = () => {
    if (!formData.subject || !formData.chapter) {
      alert('Please fill in at least subject and chapter to save as template');
      return;
    }
    const template = {
      name: `${formData.subject} - ${formData.chapter}`,
      subject: formData.subject,
      chapter: formData.chapter,
      topic: formData.topic,
      source: formData.source,
      studyType: formData.studyType,
      environment: formData.environment
    };
    saveTemplate(template);
  };

  const handleLoadTemplate = (template) => {
    setFormData(prev => ({
      ...prev,
      subject: template.subject,
      chapter: template.chapter,
      topic: template.topic,
      source: template.source,
      studyType: template.studyType,
      environment: template.environment
    }));
    setShowTemplates(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Add Study Session
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="px-4 py-2 text-sm border border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
            >
              {showTemplates ? 'Hide Templates' : 'Use Template'}
            </button>
            <button
              onClick={handleSaveTemplate}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save as Template
            </button>
          </div>
        </div>

        {showTemplates && (
          <TemplateSelector templates={templates} onSelect={handleLoadTemplate} />
        )}

        <StudyForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          submitText="Add Study Session"
        />
      </div>
    </div>
  );
};

export default AddSession;

