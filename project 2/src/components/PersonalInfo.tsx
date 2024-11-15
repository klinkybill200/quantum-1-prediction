import React from 'react';
import { UserCircle } from 'lucide-react';

export interface PersonalData {
  gender: string;
  age: number | '';
  maritalStatus: string;
}

interface PersonalInfoProps {
  data: PersonalData;
  onChange: (data: PersonalData) => void;
}

export function PersonalInfo({ data, onChange }: PersonalInfoProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-6 justify-center text-purple-200">
        <UserCircle className="w-5 h-5" />
        <span>Tell us about yourself</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        <div className="relative">
          <select
            value={data.gender}
            onChange={(e) => onChange({ ...data, gender: e.target.value })}
            className="w-full bg-purple-900/50 border border-purple-400/30 rounded-xl p-4 
                     text-white appearance-none cursor-pointer
                     focus:ring-2 focus:ring-purple-400 focus:border-transparent
                     hover:border-purple-400/50 transition-all"
          >
            <option value="">Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="non-binary">Non-binary</option>
            <option value="other">Other</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-purple-300">
            ▼
          </div>
        </div>

        <div>
          <input
            type="number"
            min="0"
            max="120"
            placeholder="Age"
            value={data.age}
            onChange={(e) => onChange({ ...data, age: e.target.value ? Number(e.target.value) : '' })}
            className="w-full bg-purple-900/50 border border-purple-400/30 rounded-xl p-4 
                     text-white placeholder-purple-300
                     focus:ring-2 focus:ring-purple-400 focus:border-transparent
                     hover:border-purple-400/50 transition-all"
          />
        </div>

        <div className="relative">
          <select
            value={data.maritalStatus}
            onChange={(e) => onChange({ ...data, maritalStatus: e.target.value })}
            className="w-full bg-purple-900/50 border border-purple-400/30 rounded-xl p-4 
                     text-white appearance-none cursor-pointer
                     focus:ring-2 focus:ring-purple-400 focus:border-transparent
                     hover:border-purple-400/50 transition-all"
          >
            <option value="">Relationship Status</option>
            <option value="single">Single</option>
            <option value="in-relationship">In a Relationship</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-purple-300">
            ▼
          </div>
        </div>
      </div>
    </div>
  );
}