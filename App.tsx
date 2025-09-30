import React, { useState, useCallback } from 'react';
import { Page, MoodEntry, Message } from './types';
import BottomNav from './components/BottomNav';
import Dashboard from './components/Dashboard';
import ChatView from './components/ChatView';
import MeditationView from './components/MeditationView';
import ResourcesView from './components/ResourcesView';
import MoodTrackerModal from './components/MoodTrackerModal';
import { PlusIcon } from './components/icons/PlusIcon';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);
  const [isMoodModalOpen, setIsMoodModalOpen] = useState(false);
  
  // Demo mood data for the chart
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    { date: 'Mon', mood: 4, intensity: 8 },
    { date: 'Tue', mood: 3, intensity: 6 },
    { date: 'Wed', mood: 5, intensity: 9 },
    { date: 'Thu', mood: 4, intensity: 7 },
    { date: 'Fri', mood: 2, intensity: 5 },
    { date: 'Sat', mood: 5, intensity: 8 },
    { date: 'Sun', mood: 4, intensity: 7 },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Serene, your mental wellness companion. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date().toISOString(),
    },
  ]);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const addMoodEntry = (entry: MoodEntry) => {
    // In a real app, you'd handle dates properly. Here we just cycle.
    const dayMap = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const todayIndex = new Date().getDay();
    const todayStr = dayMap[todayIndex === 0 ? 6 : todayIndex-1];

    setMoodEntries(prev => {
        const existingIndex = prev.findIndex(e => e.date === todayStr);
        if (existingIndex !== -1) {
            const updated = [...prev];
            updated[existingIndex] = { ...entry, date: todayStr };
            return updated;
        }
        return [...prev, { ...entry, date: todayStr }];
    });
    setIsMoodModalOpen(false);
  };
  
  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const openMoodModal = useCallback(() => {
    setIsMoodModalOpen(true);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Dashboard:
        return <Dashboard moodEntries={moodEntries} navigateTo={navigateTo} openMoodModal={openMoodModal} />;
      case Page.Chat:
        return <ChatView messages={messages} addMessage={addMessage} navigateTo={navigateTo} />;
      case Page.Meditate:
        return <MeditationView />;
      case Page.Resources:
        return <ResourcesView />;
      default:
        return <Dashboard moodEntries={moodEntries} navigateTo={navigateTo} openMoodModal={openMoodModal} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-main font-sans flex flex-col">
      <main className="flex-grow container mx-auto p-4 pb-24 max-w-3xl">
        {renderPage()}
      </main>
      
      <div className="fixed bottom-8 right-8 z-50 lg:hidden">
        <button
          onClick={openMoodModal}
          className="bg-primary hover:bg-primary-light text-white rounded-full p-4 shadow-lg transform transition-transform duration-300 hover:scale-110"
          aria-label="Add Mood Entry"
        >
          <PlusIcon />
        </button>
      </div>

      <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} onPlusClick={openMoodModal} />
      
      {isMoodModalOpen && (
        <MoodTrackerModal onClose={() => setIsMoodModalOpen(false)} onSubmit={addMoodEntry} />
      )}
    </div>
  );
};

export default App;