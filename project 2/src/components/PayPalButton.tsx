import React, { useEffect, useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

interface PayPalButtonProps {
  amount: number;
  onSuccess: (details: any) => void;
}

export function PayPalButton({ amount, onSuccess }: PayPalButtonProps) {
  const [{ isResolved }] = usePayPalScriptReducer();
  const [error, setError] = useState<string | null>(null);

  if (!isResolved) {
    return (
      <div className="flex justify-center items-center h-[150px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {error && (
        <div className="text-red-400 text-center p-3 bg-red-900/20 rounded-lg border border-red-500/30">
          {error}
        </div>
      )}
      
      <PayPalButtons
        style={{
          layout: 'vertical',
          shape: 'rect',
          color: 'gold',
        }}
        createOrder={(_data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount.toString(),
                currency_code: 'USD'
              }
            }]
          });
        }}
        onApprove={async (data, actions) => {
          try {
            const details = await actions.order.capture();
            onSuccess(details);
          } catch (err) {
            console.error('Payment capture error:', err);
            setError('Payment failed. Please try again.');
          }
        }}
        onError={(err) => {
          console.error('PayPal Error:', err);
          setError('Payment system error. Please try again later.');
        }}
        onCancel={() => {
          setError('Payment cancelled. Please try again if you wish to complete the purchase.');
        }}
      />
    </div>
  );
}