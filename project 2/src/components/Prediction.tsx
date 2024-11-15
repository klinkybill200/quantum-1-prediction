import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';

interface PredictionProps {
  prediction: string;
  audioUrl: string | null;
}

export function Prediction({ prediction, audioUrl }: PredictionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setAudioError(false);
    if (audioUrl) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => {
        setIsPlaying(false);
        // Cleanup the URL object when audio ends
        if (audioUrl.startsWith('blob:')) {
          URL.revokeObjectURL(audioUrl);
        }
      };
      audioRef.current.onerror = () => {
        console.error('Audio playback failed');
        setAudioError(true);
        setIsPlaying(false);
      };

      // Preload and play the audio automatically
      audioRef.current.load();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error('Auto-play failed:', error);
        setAudioError(true);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      // Cleanup the URL object on unmount
      if (audioUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const toggleAudio = async () => {
    if (!audioRef.current || audioError) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Audio playback error:', error);
      setAudioError(true);
      setIsPlaying(false);
    }
  };

  if (!prediction) return null;

  return (
    <div className="mt-8 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl" />
      <div className="relative bg-black/30 rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-start gap-4">
          <Sparkles className="w-6 h-6 text-purple-300 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <p className="text-lg leading-relaxed text-purple-100 mb-4">
              {prediction}
            </p>
            {audioUrl && !audioError && (
              <button
                onClick={toggleAudio}
                className="flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors"
              >
                {isPlaying ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
                {isPlaying ? 'Stop Reading' : 'Read Prediction'}
              </button>
            )}
            {audioError && (
              <p className="text-red-400 text-sm mt-2">
                Failed to load audio. Please try again.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}