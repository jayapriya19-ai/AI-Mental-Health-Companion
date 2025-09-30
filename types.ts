export enum Page {
  Dashboard = 'DASHBOARD',
  Chat = 'CHAT',
  Meditate = 'MEDITATE',
  Resources = 'RESOURCES',
}

export interface MoodEntry {
  date: string;
  mood: number; // 1-5, representing an emoji
  intensity: number; // 1-10
  triggers?: string[];
  notes?: string;
}

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  isCrisis?: boolean;
}