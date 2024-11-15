import OpenAI from 'openai';
import { PredictionResponse, PredictionTopic, PersonalData } from '../types/prediction';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generatePrediction(
  date: Date,
  personalData: PersonalData,
  topic: PredictionTopic = null
): Promise<PredictionResponse> {
  try {
    const topicPrompt = topic ? `Focus specifically on ${topic}-related aspects.` : '';
    const personalContext = `Consider that the person is ${personalData.age} years old, ${personalData.gender}, and ${personalData.maritalStatus}.`;

    // Generate prediction text
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a mystical AI oracle that provides intriguing and thought-provoking predictions about the future. Keep responses between 2-3 sentences, focusing on personal growth, technological advances, or societal changes. Be creative but maintain a positive tone."
        },
        {
          role: "user",
          content: `${personalContext} Generate a prediction for what will happen on ${date.toLocaleDateString()}. ${topicPrompt} Make it specific to this date and personalized to their characteristics.`
        }
      ],
      temperature: 0.9,
    });

    const prediction = completion.choices[0].message.content || '';

    // Generate speech from the prediction
    const mp3Response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',
        voice: 'nova',
        input: prediction,
      }),
    });

    if (!mp3Response.ok) {
      throw new Error('Failed to generate audio');
    }

    const audioBlob = await mp3Response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    return {
      prediction,
      audioUrl,
    };
  } catch (error) {
    console.error('Prediction generation failed:', error);
    throw new Error('Failed to generate prediction. Please try again.');
  }
}