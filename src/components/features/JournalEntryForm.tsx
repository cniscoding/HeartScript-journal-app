'use client'

import { runInference } from '@/lib/emotions';
import React, { useEffect, useState } from 'react';
import { DatePicker } from './DatePicker';
import { emojiTable } from '@/lib/emojiTable'
import { TextClassificationOutput } from '@huggingface/inference';



const JournalEntryForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  const [testing, setTesting] = useState('hello')
  const [output, setOutput] = useState<TextClassificationOutput>([]);
  const defaultColor = 'red-500'
  const [color, setColor] = useState(defaultColor)
  const [filteredResponseArray, setFilteredResponseArray] = useState<(TextClassificationOutput | undefined)[]>([]);



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Title and content are required');
      return;
    }
    console.log('Submitting journal entry:', { title, content });
    setTitle('');
    setContent('');
    setError('');
  };

  useEffect(() => {
    const inputTimeout = setTimeout(() => {
      inputContent();
    }, 1000);

    return () => clearTimeout(inputTimeout);
  }, [content]);

  async function inputContent() {
    if (content) {
      setLoading(true);
      try {
        const response = await runInference(content);
        setOutput(response)
        console.log('runInference:', response[0].label);

        console.log('API response:', response);

      } catch (error) {
        console.error('Error:', error);
        // Handle error
      } finally {
        setLoading(false);
      }
    }
  }


  function handleColor() {
    if (output && output.length > 0) {
      const colorKey = (output as any[])[0].label;
      const colorHex = (emojiTable as any)[colorKey].color
      setColor(colorHex)
    }
  }

  useEffect(() => {
    const filteredResponse = filterResponses([...output]);
    setFilteredResponseArray(filteredResponse);
    console.log('FilteredResponseArray', filteredResponseArray)
}, [output]);

function filterResponses(emotions: TextClassificationOutput[]) {
    const filteredEmotionArray: (TextClassificationOutput | undefined)[] = [];
    const firstEmotion = emotions.shift();
    filteredEmotionArray.push(firstEmotion);
    let score = firstEmotion?.score;
    while (emotions.length > 0) {
        const secondEmotion = emotions.shift();
        if (secondEmotion && secondEmotion.score > score! * 0.5) {
            filteredEmotionArray.push(secondEmotion);
            score = secondEmotion.score;
        } else {
            break;
        }
    }
    return filteredEmotionArray;
}

  return (
    <>
      <div className={`bg-${color}`}>
        <div>test box</div>
        <div>{testing}</div>
        <div>
          {/* {output.map((label, index) => (
            <div key={index}>{label.label}</div>
          ))} */}
          {/* {filteredResponseArray} */}

        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div>
          {content}
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
    </>
  );
};

export default JournalEntryForm;