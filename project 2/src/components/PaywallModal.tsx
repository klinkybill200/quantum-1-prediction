import React, { useState } from 'react';
import { X, Wand2 } from 'lucide-react';

interface Package {
  id: string;
  predictions: number;
  price: number;
  popular?: boolean;
}

const packages: Package[] = [
  {
    id: 'single-prediction',
    predictions: 1,
    price: 0.99,
  },
  {
    id: 'six-predictions',
    predictions: 6,
    price: 4.99,
    popular: true,
  },
  {
    id: 'twelve-predictions',
    predictions: 12,
    price: 9.99,
  },
];

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (credits: number) => void;
}

export function PaywallModal({ isOpen, onClose, onSuccess }: PaywallModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePurchase = async () => {
    if (!selectedPackage || processing) return;
    
    try {
      setProcessing(true);
      
      // Open PayPal payment link in a new tab
      window.open('https://www.paypal.com/ncp/payment/UW773LXFLUK7Q', '_blank');
      
      // Simulate successful payment (in production, you'd verify the payment)
      onSuccess(selectedPackage.predictions);
      
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setProcessing(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-purple-950 to-indigo-950 rounded-2xl max-w-2xl w-full shadow-2xl border border-purple-500/20">
        <div className="p-6 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-purple-300 hover:text-purple-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Wand2 className="w-12 h-12 text-purple-300" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Unlock Your Future Insights
            </h2>
            <p className="text-purple-200">
              Choose your preferred package to receive personalized predictions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {packages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg)}
                className={`
                  relative p-6 rounded-xl border transition-all duration-200
                  ${selectedPackage?.id === pkg.id
                    ? 'bg-purple-600/20 border-purple-400'
                    : 'bg-purple-900/20 border-purple-500/20 hover:border-purple-400/40'
                  }
                `}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-sm px-3 py-1 rounded-full">
                    Popular
                  </span>
                )}
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {pkg.predictions} {pkg.predictions === 1 ? 'Prediction' : 'Predictions'}
                  </div>
                  <div className="text-3xl font-bold text-purple-300 mb-2">
                    ${pkg.price}
                  </div>
                  <div className="text-sm text-purple-200">
                    ${(pkg.price / pkg.predictions).toFixed(2)} per prediction
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="max-w-sm mx-auto">
            <button
              onClick={handlePurchase}
              disabled={!selectedPackage || processing}
              className={`
                w-full py-4 px-8 rounded-xl text-white font-semibold
                flex items-center justify-center gap-2
                ${!selectedPackage || processing
                  ? 'bg-purple-700/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                }
                transform transition-all duration-200 hover:scale-105
                shadow-[0_0_20px_rgba(168,85,247,0.4)]
              `}
            >
              {processing ? 'Processing...' : selectedPackage ? 'Continue to PayPal' : 'Select a Package'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}