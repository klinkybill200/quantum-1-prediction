import Stripe from 'stripe';
import { nanoid } from 'nanoid';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

// In-memory storage for demo purposes
const sessions = new Map();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { packageId, amount, credits, description } = req.body;

    if (!packageId || !amount || !credits) {
      return res.status(400).json({ 
        message: 'Missing required parameters' 
      });
    }

    // Generate a unique token for the magic link
    const token = nanoid(32);

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: description || `${credits} Prediction${credits > 1 ? 's' : ''}`,
              description: `Access to ${credits} AI-powered future prediction${credits > 1 ? 's' : ''}`,
            },
            unit_amount: Math.round(amount * 100), // Convert dollars to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.VITE_SITE_URL}?token=${token}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.VITE_SITE_URL}`,
      metadata: {
        token,
        credits: credits.toString(),
        packageId,
      },
    });

    // Store session information
    sessions.set(session.id, {
      token,
      credits,
      used: false,
      createdAt: new Date().toISOString(),
    });

    return res.status(200).json({
      sessionId: session.id,
    });
  } catch (error) {
    console.error('Stripe session creation failed:', error);
    return res.status(500).json({ 
      message: error instanceof Error ? error.message : 'Failed to create checkout session' 
    });
  }
}