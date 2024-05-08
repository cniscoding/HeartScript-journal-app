'use server'

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
    const jsonData = await inferenceRes;
    console.log('jsonData',jsonData)
    return jsonData;
  } catch (error) {
    console.error('Error running inference:', error);
    throw new Error('Failed to run inference');
  }
}