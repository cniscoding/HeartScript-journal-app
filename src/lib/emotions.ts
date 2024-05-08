'use server'

import { writeJournalEntry } from '@/app/api/journalEntries';
import { HfInference } from '@huggingface/inference';
const apiKeyHF = process.env.HF_TOKEN
const hf = new HfInference(apiKeyHF);

export async function runInference(input: string) {
  try {
    const modelName = 'SamLowe/roberta-base-go_emotions';
    const inferenceRes = await hf.textClassification({
      model: modelName,
      inputs: input
    });
    if (!inferenceRes) {
      throw new Error('Failed to post data');
    }
    return inferenceRes
    // const filteredResponse = filterResponses([...inferenceRes])
    // console.log('inferenceRes', inferenceRes)
    // return ({
    //   inferenceRes,
    //   filteredResponse
    // });
    // return inferenceRes
  } catch (error) {
    console.error('Error running inference:', error);
    throw new Error('Failed to run inference');
  }
}

function filterResponses(emotions) {
  const filteredEmotionArray = []
  const firstEmotion = emotions.shift();
  filteredEmotionArray.push(firstEmotion);
  let score = firstEmotion?.score;
  while (emotions.length > 0) {
    const secondEmotion = emotions.shift();
    if (emotions?.score > score * 0.5) {
      filteredEmotionArray.push(secondEmotion);
      score = secondEmotion?.score;
    } else {
      break;
    }

  }
  return filteredEmotionArray
}
