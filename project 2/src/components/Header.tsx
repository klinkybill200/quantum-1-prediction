import React from 'react';
import { GemIcon } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center mb-16">
      <div className="flex justify-center mb-6">
        <GemIcon className="w-16 h-16 text-purple-300 animate-pulse" />
      </div>
      <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
        Quantum Future Sight
      </h1>
      <p className="text-xl text-purple-200 max-w-2xl mx-auto">
        Peek into your destiny with AI-powered predictions
      </p>
    </div>
  );
}