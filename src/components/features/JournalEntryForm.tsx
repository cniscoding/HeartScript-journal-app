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
    if (!content) {
      setError('Content is required');
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
      <form onSubmit={handleSubmit} className="p-1 md:p-2 border-2 rounded-xl flex flex-col md:flex-row w-full h-full">
        {/* calender */}
        <div className="flex flex-col  items-center">
          {/* <DatePicker /> */}
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="border rounded-xl"
          />
        </div>
        {/* Content Area with Submit */}
        <div className="flex flex-col w-full p-1 md:ml-2">
          {/* Title but removed */}
          {/* <div className="">
            <label htmlFor="title" className="block text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-1 w-full text-gray-700 bg-gray-200 rounded-lg focus:outline-gray-300 focus:bg-gray-100"
              placeholder="Enter title"
            />
          </div> */}
          <div className="flex-1">
            <label htmlFor="content" className="text-center font-semibold pl-1 block text-gray-700">How was your day?</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="pt-1 pl-2 w-full text-gray-700 bg-gray-200 rounded-lg focus:outline-gray-300 focus:bg-gray-100 resize-none"
              placeholder="I had a good day . . ."
              rows={9}
            ></textarea>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="p-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600">Submit</button>
        </div>
      </form>
    </>
  );
};

export default JournalEntryForm;