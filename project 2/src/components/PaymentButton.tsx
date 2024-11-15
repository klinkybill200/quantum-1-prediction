import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { PaywallModal } from './PaywallModal';

interface PaymentButtonProps {
  onPayment: () => void;
  disabled: boolean;
  loading: boolean;
}

export function PaymentButton({ onPayment, disabled, loading }: PaymentButtonProps) {
  const [showPaywall, setShowPaywall] = useState(false);

  const handleClick = () => {
    const credits = localStorage.getItem('predictionCredits');
    const remainingCredits = credits ? parseInt(credits, 10) : 0;

    if (remainingCredits > 0) {
      // If user has credits, proceed with prediction
      onPayment();
    } else {
      // If no credits, show paywall
      setShowPaywall(true);
    }
  };

  const handlePaymentSuccess = (credits: number) => {
    // Store credits in localStorage
    localStorage.setItem('predictionCredits', credits.toString());
    
    // Close modal
    setShowPaywall(false);
    
    // Wait a bit for the state to update before triggering the prediction
    setTimeout(() => {
      onPayment();
    }, 100);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`
          flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold
          ${loading ? 'bg-purple-700 cursor-not-allowed' : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'}
          transform transition-all duration-200 hover:scale-105
          shadow-[0_0_20px_rgba(168,85,247,0.4)]
        `}
      >
        <CreditCard className="w-5 h-5" />
        {loading ? 'Consulting the Stars...' : 'Reveal Your Future'}
      </button>

      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}