'use client'

import { runInference } from '@/lib/emotions';
import React, { useState } from 'react';
import { DatePicker } from './DatePicker';
import { emojiTable } from '@/lib/emojiTable'
import { TextClassificationOutput } from '@huggingface/inference';
import { writeJournalEntry } from '@/app/api/journalEntries';
import { Calendar } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"

const JournalEntryForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState<TextClassificationOutput>([]);
  const defaultColor = 'red-500'
  const [color, setColor] = useState(defaultColor)
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [buttonText, setButtonText] = useState('Save');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) {
      setError('Please write about your day');
      return;
    }
    setLoading(true);
    setButtonText("Recording and Analyzing your day");
    try {
      console.log('Submitting journal entry:', { title, content });
      await inputContent();
      setTitle('');
      setContent('');
      setError('');

    } catch (error) {
      console.error('Error submitting journal entry:', error);
      setError('Failed to submit journal entry. Please try again.')
    } finally {
      setLoading(false)
      setButtonText('Save');
    }
  };

  async function inputContent() {
    if (content) {
      try {
        const response = await runInference(content);
        if (response) {
          const entry = {
            content,
            date: date!,
            sentiments: response[0].label,
            sentimentScore: response[0].score
          };
          await writeJournalEntry(entry);
          window.location.reload();
          console.log('Data written to the database successfully.');
        } else {
          console.log('Inference process did not return valid data.');
        }
      } catch (error) {
        console.error('Error:', error);
        throw error;
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

  interface Emotion {
    score: number;
    length: number;
    shift: any;
  }
  
  function filterResponses(emotions: Emotion) {
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

          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="border rounded-xl hidden md:block"
          />
        </div>
        {/* Content Area with Submit */}
        <div className="flex flex-col w-full p-1 md:ml-2">
          <div className="flex-1">
            <label htmlFor="content" className="text-center block text-4xl font-extrabold text-gray-800 mb-2">
              How was your day?
              <div className="md:hidden">
                <DatePicker />
              </div>
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="pt-1 pl-2 w-full text-gray-700 bg-gray-200 rounded-lg focus:outline-gray-300 focus:bg-gray-100 resize-none"
              placeholder="What's on your mind?"
              rows={9}
            ></textarea>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className={`text-lg md:text-2xl p-1 text-white rounded-lg ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}>
            {buttonText}
          </button>
        </div>
      </form>
    </>
  );
};

export default JournalEntryForm;