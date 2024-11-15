import OpenAI from 'openai';
import axios from 'axios';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { date } = req.body;
    const selectedDate = new Date(date);
    
    // Generate prediction text
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a mystical AI oracle that provides intriguing and thought-provoking predictions about the future. Keep responses between 2-3 sentences, focusing on personal growth, technological advances, or societal changes. Be creative but maintain a positive tone."
        },
        {
          role: "user",
          content: `Generate a prediction for what will happen on ${selectedDate.toLocaleDateString()}. Make it specific to this date.`
        }
      ],
      temperature: 0.9,
    });

    const prediction = completion.choices[0].message.content;

    // Generate speech from the prediction
    const speechResponse = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova",
      input: prediction,
    });

    // Convert the audio stream to base64
    const audioBuffer = Buffer.from(await speechResponse.arrayBuffer());
    const audioBase64 = audioBuffer.toString('base64');
    const audioUrl = `data:audio/mp3;base64,${audioBase64}`;

    // Return prediction and audio URL
    return res.status(200).json({
      prediction,
      audioUrl,
    });
  } catch (error) {
    console.error('Prediction generation failed:', error);
    return res.status(500).json({ message: 'Failed to generate prediction' });
  }
}