
import React, { useState } from 'react';
import { MoodEntry } from '../types';

interface MoodTrackerModalProps {
  onClose: () => void;
  onSubmit: (entry: MoodEntry) => void;
}

const moodOptions = [
  { emoji: '😔', label: 'Sad', value: 1 },
  { emoji: '😟', label: 'Worried', value: 2 },
  { emoji: '😐', label: 'Neutral', value: 3 },
  { emoji: '🙂', label: 'Okay', value: 4 },
  { emoji: '😊', label: 'Happy', value: 5 },
];

const MoodTrackerModal: React.FC<MoodTrackerModalProps> = ({ onClose, onSubmit }) => {
  const [selectedMood, setSelectedMood] = useState<number>(3);
  const [intensity, setIntensity] = useState<number>(5);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
    onSubmit({ date, mood: selectedMood, intensity, notes });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-4xl shadow-2xl p-8 w-full max-w-md animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-text-main">How are you feeling?</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <p className="text-center font-medium mb-4 text-gray-600">Select your current mood</p>
            <div className="flex justify-around items-center">
              {moodOptions.map((mood) => (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => setSelectedMood(mood.value)}
                  className={`text-4xl p-2 rounded-full transition-all duration-300 ${
                    selectedMood === mood.value ? 'bg-primary-light scale-125' : 'grayscale opacity-60 hover:opacity-100 hover:scale-110'
                  }`}
                >
                  {mood.emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="intensity" className="block text-center font-medium mb-4 text-gray-600">
              Intensity: <span className="font-bold text-primary">{intensity}</span>
            </label>
            <input
              id="intensity"
              type="range"
              min="1"
              max="10"
              value={intensity}
              onChange={(e) => setIntensity(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div className="mb-8">
             <label htmlFor="notes" className="block font-medium mb-2 text-gray-600">
              Add a note (optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What's on your mind?"
              rows={3}
              className="w-full p-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-light"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-full hover:bg-primary-light transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Save Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default MoodTrackerModal;
