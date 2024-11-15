import React from 'react';
import { Tag } from 'lucide-react';
import type { PredictionTopic } from '../types/prediction';

interface TagCloudProps {
  selectedTopic: PredictionTopic;
  onTopicSelect: (topic: PredictionTopic) => void;
}

const topicsRow1 = [
  { id: 'career', label: '💼 Career' },
  { id: 'love', label: '❤️ Love' },
  { id: 'health', label: '🏥 Health' },
  { id: 'wealth', label: '💰 Wealth' },
  { id: 'travel', label: '✈️ Travel' },
  { id: 'tech', label: '💻 Technology' },
  { id: 'spirituality', label: '🕉️ Spirituality' },
  { id: 'success', label: '🏆 Success' },
] as const;

const topicsRow2 = [
  { id: 'family', label: '👨‍👩‍👧‍👦 Family' },
  { id: 'personal', label: '🎯 Personal Growth' },
  { id: 'education', label: '📚 Education' },
  { id: 'creativity', label: '🎨 Creativity' },
  { id: 'business', label: '🏢 Business' },
  { id: 'relationships', label: '🤝 Relationships' },
  { id: 'mindfulness', label: '🧘‍♀️ Mindfulness' },
] as const;

const topicsRow3 = [
  { id: 'adventure', label: '🗺️ Adventure' },
  { id: 'fitness', label: '💪 Fitness' },
  { id: 'innovation', label: '💡 Innovation' },
  { id: 'leadership', label: '👑 Leadership' },
  { id: 'happiness', label: '😊 Happiness' },
  { id: 'purpose', label: '🎯 Life Purpose' },
  { id: 'wisdom', label: '🦉 Wisdom' },
  { id: 'destiny', label: '✨ Destiny' },
] as const;

export function TagCloud({ selectedTopic, onTopicSelect }: TagCloudProps) {
  const renderTopicPill = (topic: { id: PredictionTopic; label: string }, index: number) => (
    <button
      key={`${topic.id}-${index}`}
      onClick={() => onTopicSelect(topic.id)}
      className={`
        px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
        transition-all duration-200 transform hover:scale-105
        ${selectedTopic === topic.id
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
          : 'bg-purple-900/50 text-purple-200 hover:bg-purple-800/50 border border-purple-500/30'
        }
      `}
    >
      {topic.label}
    </button>
  );

  const renderRow = (topics: typeof topicsRow1, direction: 'left' | 'right', yOffset: number = 0) => (
    <div 
      className={`tag-cloud-row ${direction === 'left' ? 'animate-slide-left' : 'animate-slide-right'}`}
      style={{ top: `${yOffset}px` }}
    >
      <div className="tag-cloud-row-content">
        {topics.map((topic, index) => renderTopicPill(topic, index))}
      </div>
      <div className="tag-cloud-row-content">
        {topics.map((topic, index) => renderTopicPill(topic, index + topics.length))}
      </div>
    </div>
  );

  return (
    <div className="w-full my-8">
      <div className="flex items-center gap-2 mb-4 justify-center text-purple-200">
        <Tag className="w-4 h-4" />
        <span>Select a topic (optional)</span>
      </div>
      
      <div className="tag-cloud-container">
        <div className="tag-cloud-mask" />
        {renderRow(topicsRow1, 'left', 0)}
        {renderRow(topicsRow2, 'right', 52)}
        {renderRow(topicsRow3, 'left', 104)}
      </div>
    </div>
  );
}