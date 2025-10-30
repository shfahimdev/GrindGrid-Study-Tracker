// src/components/forms/StudyForm.jsx
import React, { useState, useEffect } from 'react';

const StudyForm = ({ formData, setFormData, onSubmit, submitText = 'Submit' }) => {
  const [errors, setErrors] = useState({});

  // Calculate duration whenever startTime or endTime changes
  useEffect(() => {
    if (formData.startTime && formData.endTime) {
      const start = new Date(`2000-01-01T${formData.startTime}`);
      const end = new Date(`2000-01-01T${formData.endTime}`);
      const diff = (end - start) / (1000 * 60 * 60);
      if (diff > 0) {
        setFormData(prev => ({ ...prev, duration: parseFloat(diff.toFixed(2)) }));
      }
    }
  }, [formData.startTime, formData.endTime, setFormData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.chapter.trim()) newErrors.chapter = 'Chapter is required';
    if (!formData.topic.trim()) newErrors.topic = 'Topic is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    if (formData.duration <= 0) newErrors.duration = 'End time must be after start time';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setErrors({});
    }
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Date *
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-200 ${
            errors.date ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        />
        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Subject *
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-200 ${
            errors.subject ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="e.g., Mathematics"
        />
        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
      </div>

      {/* Chapter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Chapter *
        </label>
        <input
          type="text"
          name="chapter"
          value={formData.chapter}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-200 ${
            errors.chapter ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="e.g., Calculus"
        />
        {errors.chapter && <p className="text-red-500 text-xs mt-1">{errors.chapter}</p>}
      </div>

      {/* Topic */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Topic *
        </label>
        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-200 ${
            errors.topic ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="e.g., Derivatives"
        />
        {errors.topic && <p className="text-red-500 text-xs mt-1">{errors.topic}</p>}
      </div>

      {/* Source */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Source
        </label>
        <input
          type="text"
          name="source"
          value={formData.source}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200"
          placeholder="e.g., Textbook, YouTube"
        />
      </div>

      {/* Start Time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Start Time *
        </label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-200 ${
            errors.startTime ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        />
        {errors.startTime && <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>}
      </div>

      {/* End Time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          End Time *
        </label>
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-200 ${
            errors.endTime ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        />
        {errors.endTime && <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>}
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Duration (hours)
        </label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-600 dark:text-gray-200"
        />
        {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
      </div>

      {/* Focus */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Focus (1-5): {formData.focus}
        </label>
        <input
          type="range"
          name="focus"
          min="1"
          max="5"
          value={formData.focus}
          onChange={handleChange}
          className="w-full"
        />
      </div>

      {/* Mood */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Mood (1-5): {formData.mood}
        </label>
        <input
          type="range"
          name="mood"
          min="1"
          max="5"
          value={formData.mood}
          onChange={handleChange}
          className="w-full"
        />
      </div>

      {/* Study Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Study Type
        </label>
        <select
          name="studyType"
          value={formData.studyType}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200"
        >
          <option>Concept</option>
          <option>Practice</option>
          <option>Revision</option>
          <option>Test</option>
        </select>
      </div>

      {/* Environment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Environment
        </label>
        <select
          name="environment"
          value={formData.environment}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200"
        >
          <option>Home</option>
          <option>College</option>
          <option>Coaching</option>
          <option>Library</option>
          <option>Cafe</option>
        </select>
      </div>

      {/* Difficulty */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Difficulty (1-5): {formData.difficulty}
        </label>
        <input
          type="range"
          name="difficulty"
          min="1"
          max="5"
          value={formData.difficulty}
          onChange={handleChange}
          className="w-full"
        />
      </div>

      {/* Notes */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Special Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200"
          rows="2"
          placeholder="Any special observations..."
        />
      </div>

      {/* Goal Achieved */}
      <div className="flex items-center">
        <input
          type="checkbox"
          name="goalAchieved"
          checked={formData.goalAchieved}
          onChange={handleChange}
          className="w-4 h-4 text-indigo-600 rounded"
        />
        <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Goal Achieved
        </label>
      </div>

      {/* Submit */}
      <div className="md:col-span-2 lg:col-span-3">
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition font-semibold"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
};

export default StudyForm;

