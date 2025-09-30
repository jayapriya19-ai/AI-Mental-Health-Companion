
import React from 'react';
import { Page } from '../types';
import { HomeIcon } from './icons/HomeIcon';
import { ChatIcon } from './icons/ChatIcon';
import { MeditateIcon } from './icons/MeditateIcon';
import { ResourcesIcon } from './icons/ResourcesIcon';
import { PlusIcon } from './icons/PlusIcon';


interface BottomNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onPlusClick: () => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full transition-colors duration-300 ${
      isActive ? 'text-primary' : 'text-gray-400 hover:text-primary'
    }`}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, setCurrentPage, onPlusClick }) => {
  const navItems = [
    { page: Page.Dashboard, label: 'Home', icon: <HomeIcon /> },
    { page: Page.Chat, label: 'Chat', icon: <ChatIcon /> },
    { page: Page.Meditate, label: 'Breathe', icon: <MeditateIcon /> },
    { page: Page.Resources, label: 'Resources', icon: <ResourcesIcon /> },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-20 max-w-3xl mx-auto">
        {navItems.slice(0, 2).map((item) => (
          <NavItem
            key={item.page}
            label={item.label}
            icon={item.icon}
            isActive={currentPage === item.page}
            onClick={() => setCurrentPage(item.page)}
          />
        ))}
        <div className="hidden lg:block">
          <button
            onClick={onPlusClick}
            className="bg-primary hover:bg-primary-light text-white rounded-full p-4 -mt-10 shadow-lg transform transition-transform duration-300 hover:scale-110"
            aria-label="Add Mood Entry"
          >
            <PlusIcon />
          </button>
        </div>
        {navItems.slice(2, 4).map((item) => (
          <NavItem
            key={item.page}
            label={item.label}
            icon={item.icon}
            isActive={currentPage === item.page}
            onClick={() => setCurrentPage(item.page)}
          />
        ))}
      </div>
    </footer>
  );
};

export default BottomNav;
