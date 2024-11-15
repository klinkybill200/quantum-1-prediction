export interface PredictionResponse {
  prediction: string;
  audioUrl: string;
}

export interface PersonalData {
  gender: string;
  age: number | '';
  maritalStatus: string;
}

export type PredictionTopic = 
  | 'career'
  | 'love'
  | 'health'
  | 'wealth'
  | 'travel'
  | 'tech'
  | 'family'
  | 'personal'
  | 'education'
  | 'creativity'
  | 'spirituality'
  | 'success'
  | 'business'
  | 'relationships'
  | 'mindfulness'
  | 'adventure'
  | 'fitness'
  | 'innovation'
  | 'leadership'
  | 'happiness'
  | 'purpose'
  | 'wisdom'
  | 'destiny'
  | null;