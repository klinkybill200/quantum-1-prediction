import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DateSelector } from './components/DateSelector';
import { TagCloud } from './components/TagCloud';
import { PaymentButton } from './components/PaymentButton';
import { Prediction } from './components/Prediction';
import { Footer } from './components/Footer';
import { PersonalInfo } from './components/PersonalInfo';
import { About } from './pages/About';
import { Impressum } from './pages/Impressum';
import { generatePrediction } from './server/api';
import type { PredictionResponse, PersonalData, PredictionTopic } from './types/prediction';

export default function App() {
  const [personalData, setPersonalData] = useState<PersonalData>({
    gender: '',
    age: '',
    maritalStatus: '',
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<PredictionTopic>(null);
  const [prediction, setPrediction] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [remainingCredits, setRemainingCredits] = useState<number | null>(null);

  // Simple routing
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Load credits from localStorage
  useEffect(() => {
    const loadCredits = () => {
      const storedCredits = localStorage.getItem('predictionCredits');
      if (storedCredits) {
        const credits = parseInt(storedCredits, 10);
        if (!isNaN(credits)) {
          setRemainingCredits(credits);
        }
      }
    };

    // Load initial credits
    loadCredits();

    // Set up storage event listener for cross-tab synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'predictionCredits') {
        loadCredits();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handlePayment = async () => {
    if (!selectedDate || !personalData.gender || !personalData.age || !personalData.maritalStatus) {
      setError('Please fill in all personal information and select a date');
      return;
    }

    setLoading(true);
    setError('');
    setPrediction('');
    setAudioUrl(null);
    
    try {
      // Check remaining credits
      const credits = remainingCredits;
      
      if (typeof credits !== 'number' || credits <= 0) {
        throw new Error('No predictions remaining. Please purchase more credits.');
      }

      // Generate prediction
      const response = await generatePrediction(selectedDate, personalData, selectedTopic);
      setPrediction(response.prediction);
      setAudioUrl(response.audioUrl);

      // Update remaining credits
      const newCredits = credits - 1;
      localStorage.setItem('predictionCredits', newCredits.toString());
      setRemainingCredits(newCredits);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate prediction';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (currentPath === '/about') {
    return <About />;
  }

  if (currentPath === '/impressum') {
    return <Impressum />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Header />
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-purple-500/20">
          <div className="space-y-12">
            {typeof remainingCredits === 'number' && !isNaN(remainingCredits) && (
              <div className="text-center text-purple-200">
                <span className="font-medium">{remainingCredits}</span> prediction{remainingCredits !== 1 ? 's' : ''} remaining
              </div>
            )}

            <PersonalInfo 
              data={personalData}
              onChange={setPersonalData}
            />

            <DateSelector 
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />

            <TagCloud
              selectedTopic={selectedTopic}
              onTopicSelect={setSelectedTopic}
            />
            
            <PaymentButton 
              onPayment={handlePayment}
              disabled={!selectedDate || !personalData.gender || !personalData.age || !personalData.maritalStatus || loading}
              loading={loading}
            />
            
            {error && (
              <div className="text-red-400 text-center bg-red-900/20 rounded-lg p-4 border border-red-500/30">
                {error}
              </div>
            )}
            
            <Prediction 
              prediction={prediction} 
              audioUrl={audioUrl}
            />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}