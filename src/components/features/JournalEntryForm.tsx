'use client'

import React, { useState } from 'react';
import { DatePicker } from './DatePicker';


const JournalEntryForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Title and content are required');
      return;
    }
    // You can perform submission logic here
    console.log('Submitting journal entry:', { title, content });
    // Clear form fields after submission
    setTitle('');
    setContent('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div>
        <DatePicker />
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
          placeholder="Enter title"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
          placeholder="Enter content"
          rows={6}
        ></textarea>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">Submit</button>
    </form>
  );
};

export default JournalEntryForm;