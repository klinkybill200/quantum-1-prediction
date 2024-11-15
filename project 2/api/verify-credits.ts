export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { token } = req.body;

    // Get the credits info from storage (in a real app, this would be a database query)
    const creditInfo = magicLinks.get(token);

    if (!creditInfo) {
      return res.status(404).json({ message: 'Invalid or expired token' });
    }

    if (creditInfo.remainingCredits <= 0) {
      return res.status(403).json({ message: 'No predictions remaining' });
    }

    // Decrease the remaining credits
    creditInfo.remainingCredits--;
    magicLinks.set(token, creditInfo);

    return res.status(200).json({
      remainingCredits: creditInfo.remainingCredits,
    });
  } catch (error) {
    console.error('Failed to verify credits:', error);
    return res.status(500).json({ message: 'Failed to verify credits' });
  }
}