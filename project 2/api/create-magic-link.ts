import { nanoid } from 'nanoid';

// In a real application, you would store this in a database
const magicLinks = new Map();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { orderId, credits } = req.body;

    // Generate a unique magic link token
    const token = nanoid(32);

    // Store the token and credits (in a real app, this would go to a database)
    magicLinks.set(token, {
      orderId,
      credits,
      remainingCredits: credits,
      createdAt: new Date().toISOString(),
    });

    // Generate the magic link URL
    const magicLink = `${process.env.SITE_URL}/predictions?token=${token}`;

    return res.status(200).json({ magicLink });
  } catch (error) {
    console.error('Failed to create magic link:', error);
    return res.status(500).json({ message: 'Failed to create magic link' });
  }
}