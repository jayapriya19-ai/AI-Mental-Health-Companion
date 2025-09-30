import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MoodEntry, Page } from '../types';
import { ChatIcon } from './icons/ChatIcon';
import { MeditateIcon } from './icons/MeditateIcon';
import { ResourcesIcon } from './icons/ResourcesIcon';
import { PlusIcon } from './icons/PlusIcon';


interface DashboardProps {
  moodEntries: MoodEntry[];
  navigateTo: (page: Page) => void;
  openMoodModal: () => void;
}

const ActionCard: React.FC<{label: string, icon: React.ReactNode, onClick: () => void}> = ({label, icon, onClick}) => (
    <button onClick={onClick} className="bg-white p-4 rounded-3xl shadow-md text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full flex flex-col items-center justify-center space-y-2 aspect-square">
        <div className="text-primary">{icon}</div>
        <p className="font-semibold text-sm text-text-main">{label}</p>
    </button>
);


const Dashboard: React.FC<DashboardProps> = ({ moodEntries, navigateTo, openMoodModal }) => {
  const wellnessScore = 78; // Example static score
  
  const moodData = moodEntries.map(entry => ({ name: entry.date, intensity: entry.intensity }));

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold text-text-main">Welcome back,</h1>
        <p className="text-lg text-gray-500">Let's continue your wellness journey.</p>
      </header>
      
      <section className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300">
        <h2 className="font-semibold text-lg mb-4">Weekly Mood Trend</h2>
         <div style={{ width: '100%', height: 250 }}>
          <ResponsiveContainer>
            <AreaChart data={moodData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8BC6A8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8BC6A8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} domain={[0, 10]} />
              <Tooltip
                contentStyle={{
                  borderRadius: '1rem',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                  border: 'none',
                  fontFamily: 'Lexend',
                }}
              />
              <Area type="monotone" dataKey="intensity" stroke="#4A9B8E" fillOpacity={1} fill="url(#colorUv)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
      
      <section>
        <h2 className="font-semibold text-lg mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ActionCard label="Chat" onClick={() => navigateTo(Page.Chat)} icon={<ChatIcon />} />
          <ActionCard label="Breathe" onClick={() => navigateTo(Page.Meditate)} icon={<MeditateIcon />} />
          <ActionCard label="Resources" onClick={() => navigateTo(Page.Resources)} icon={<ResourcesIcon />} />
          <ActionCard label="Log Mood" onClick={openMoodModal} icon={<PlusIcon />} />
        </div>
      </section>

    </div>
  );
};

export default Dashboard;