import React, { useState, useEffect, useRef } from 'react';
import { SoundOnIcon } from './icons/SoundOnIcon';
import { SoundOffIcon } from './icons/SoundOffIcon';

const MeditationView: React.FC = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [timer, setTimer] = useState(0);
  const [breathingText, setBreathingText] = useState('Start');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let timerInterval: number | undefined;
    let textTimeout: number | undefined;

    if (isBreathing) {
      timerInterval = window.setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      
      const cycle = () => {
        setBreathingText('Breathe in...');
        textTimeout = window.setTimeout(() => {
          setBreathingText('Hold...');
          textTimeout = window.setTimeout(() => {
            setBreathingText('Breathe out...');
            textTimeout = window.setTimeout(cycle, 8000); // Exhale for 8s
          }, 7000); // Hold for 7s
        }, 4000); // Inhale for 4s
      };
      
      cycle();
      
      return () => {
        clearInterval(timerInterval);
        clearTimeout(textTimeout);
      };
    } else {
        setTimer(0);
        setBreathingText('Start');
        if (audioRef.current) {
          audioRef.current.pause();
        }
        setIsAudioPlaying(false);
    }

    return () => {
      clearInterval(timerInterval);
      clearTimeout(textTimeout);
    };
  }, [isBreathing]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => console.error("Audio playback failed:", error));
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative flex flex-col items-center justify-center text-center h-[calc(100vh-8rem)]">
      {/* Placeholder audio source. Replace with your desired ambient sound file. */}
      <audio 
        ref={audioRef} 
        src="https://storage.googleapis.com/serenemind-assets/ambient-rain.mp3" 
        loop 
      />

      <div className="absolute top-0 right-0">
        <button 
          onClick={toggleAudio}
          className="bg-white/50 text-text-main rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 hover:bg-white transition-colors shadow-md"
          aria-label={isAudioPlaying ? 'Pause ambient sound' : 'Play ambient sound'}
        >
          {isAudioPlaying ? <SoundOnIcon /> : <SoundOffIcon />}
        </button>
      </div>

      <h1 className="text-3xl font-bold text-text-main mb-4">4-7-8 Breathing</h1>
      <p className="text-lg text-gray-500 mb-12">Follow the circle and text prompts to relax.</p>

      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mb-12">
        <div className="absolute inset-0 bg-primary-light rounded-full opacity-20 animate-ping-slow"></div>
        <div className={`w-full h-full bg-accent rounded-full flex items-center justify-center transition-all duration-1000 ${isBreathing ? 'breathing-circle-active' : ''}`}>
          <div className="text-center">
            <div className="text-white text-2xl font-medium">{breathingText}</div>
            {isBreathing && <div className="text-white text-lg mt-2">{formatTime(timer)}</div>}
          </div>
        </div>
      </div>
      
      <button
        onClick={() => setIsBreathing(!isBreathing)}
        className="bg-white text-text-main font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        {isBreathing ? 'End Session' : 'Begin Breathing'}
      </button>
    </div>
  );
};

export default MeditationView;
