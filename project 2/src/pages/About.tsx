import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from '../components/Link';

export function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Predictions
        </Link>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-purple-500/20">
          <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
            About Quantum Future Sight
          </h1>
          
          <div className="space-y-4 text-purple-200">
            <p>
              Welcome to Quantum Future Sight, where artificial intelligence meets mystical prediction. 
              Our cutting-edge AI technology harnesses the power of advanced language models to provide 
              unique, personalized glimpses into potential future outcomes.
            </p>
            
            <p>
              While our predictions are generated using sophisticated AI algorithms, we remind our users 
              that these insights should be taken as entertainment rather than definitive forecasts. 
              The future remains unwritten, and our service aims to inspire and provoke thought about 
              the possibilities that lie ahead.
            </p>
            
            <p>
              Our system considers various personal factors to create tailored predictions that resonate 
              with your individual journey. Whether you're curious about career developments, personal 
              growth, or life's general direction, Quantum Future Sight offers a unique perspective on 
              what might come.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}