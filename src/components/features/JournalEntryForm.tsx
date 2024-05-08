'use client'

import { runInference } from '@/lib/emotions';
import React, { useEffect, useState } from 'react';
import { DatePicker } from './DatePicker';
import { emojiTable } from '@/lib/emojiTable'
import { TextClassificationOutput } from '@huggingface/inference';
import { writeJournalEntry } from '@/app/api/journalEntries';
import { Calendar } from "@/components/ui/calendar"



const JournalEntryForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState<TextClassificationOutput>([]);
  const defaultColor = 'red-500'
  const [color, setColor] = useState(defaultColor)
  // const [filteredResponseArray, setFilteredResponseArray] = useState<(TextClassificationOutput | undefined)[]>([]);
  const [date, setDate] = React.useState<Date | undefined>(new Date())


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
        if (response) {
          const entry = {
            title,
            content,
            date,
            sentiments: response[0].label,
            sentimentScore: response[0].score
          };
          writeJournalEntry(entry);
          console.log('Data written to the database successfully.');
        } else {
          console.log('Inference process did not return valid data.');
        }
      } catch (error) {
        console.error('Error:', error);
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

  //   useEffect(() => {
  //     const filteredResponse = filterResponses([...output]);
  //     setFilteredResponseArray(filteredResponse);
  //     console.log('FilteredResponseArray', filteredResponseArray)
  // }, [output]);

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
      <form onSubmit={handleSubmit} className="p-4 border-2 rounded-xl flex flex-col md:flex-row w-full">
        {/* calender */}
        <div className="">
          {/* <DatePicker /> */}
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="border rounded-xl mr-4"
          />
        </div>
        {/* Content Area with Submit */}
        <div className="w-full flex flex-col">
          <div className="">
            <label htmlFor="title" className="block text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
              placeholder="Enter title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
              placeholder="Enter content"
              rows={6}
            ></textarea>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="text-white bg-blue-500 rounded-lg hover:bg-blue-600">Submit</button>
        </div>
      </form>
    </>
  );
};

export default JournalEntryForm;