interface LabelInfo {
  color: string; // Tailwind CSS color name
  emoji: string;
}

export const emojiTable: Record<string, LabelInfo> = {
  'neutral': { color: 'gray-500', emoji: '😐' },
  'approval': { color: 'green-500', emoji: '👍' },
  'annoyance': { color: 'red-500', emoji: '😠' },
  'realization': { color: 'yellow-500', emoji: '💡' },
  'anger': { color: 'red-700', emoji: '😡' },
  'admiration': { color: 'blue-500', emoji: '😍' },
  'disappointment': { color: 'purple-500', emoji: '😞' },
  'disapproval': { color: 'orange-500', emoji: '👎' },
  'sadness': { color: 'indigo-500', emoji: '😢' },
  'excitement': { color: 'orange-500', emoji: '😃' },
  'disgust': { color: 'cyan-500', emoji: '🤢' },
  'joy': { color: 'yellow-500', emoji: '😄' },
  'fear': { color: 'indigo-700', emoji: '😨' },
  'confusion': { color: 'indigo-500', emoji: '😕' },
  'amusement': { color: 'pink-500', emoji: '😄' },
  'optimism': { color: 'purple-500', emoji: '😊' },
  'curiosity': { color: 'pink-500', emoji: '🤔' },
  'desire': { color: 'pink-500', emoji: '😍' },
  'caring': { color: 'green-500', emoji: '😊' },
  'love': { color: 'pink-500', emoji: '❤️' },
  'surprise': { color: 'red-500', emoji: '😮' },
  'gratitude': { color: 'green-500', emoji: '🙏' },
  'embarrassment': { color: 'pink-500', emoji: '😳' },
  'grief': { color: 'yellow-500', emoji: '😢' },
  'nervousness': { color: 'gray-500', emoji: '😬' },
  'pride': { color: 'red-500', emoji: '🦁' },
  'relief': { color: 'green-500', emoji: '😌' },
  'remorse': { color: 'pink-500', emoji: '😔' }
};