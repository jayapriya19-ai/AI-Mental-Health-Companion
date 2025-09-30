import React, { useState, useEffect, useRef } from 'react';
import { Message, Page } from '../types';
import { getAIResponse } from '../services/mockAiService';

interface ChatViewProps {
  messages: Message[];
  addMessage: (message: Message) => void;
  navigateTo: (page: Page) => void;
}

const TypingIndicator: React.FC = () => (
  <div className="flex items-center space-x-1 p-3">
    <div className="w-2.5 h-2.5 bg-gray-300 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
    <div className="w-2.5 h-2.5 bg-gray-300 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
    <div className="w-2.5 h-2.5 bg-gray-300 rounded-full animate-pulse"></div>
  </div>
);

const CrisisMessage: React.FC<{ message: Message }> = ({ message }) => (
    <div className="w-full my-4 p-4 bg-alert/10 border-l-4 border-alert rounded-r-lg" role="alert">
        <div className="flex">
            <div className="py-1">
                <svg className="h-6 w-6 text-alert mr-4" xmlns="http://www.w.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 011-1h.008a1 1 0 011 1v3.013a1 1 0 01-1 1H9a1 1 0 01-1-1V5z" clipRule="evenodd" />
                </svg>
            </div>
            <div>
                <p className="font-bold text-alert">Important: Support is Available</p>
                <p className="text-sm text-text-main mb-3">{message.text}</p>
                <div className="space-y-1">
                     <a href="tel:1800-599-0019" className="block text-sm font-semibold text-primary hover:underline">Call KIRAN Helpline: 1800-599-0019</a>
                     <a href="tel:9999666555" className="block text-sm font-semibold text-primary hover:underline">Call Vandrevala Foundation: 9999666555</a>
                </div>
            </div>
        </div>
    </div>
);

const ChatView: React.FC<ChatViewProps> = ({ messages, addMessage, navigateTo }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    addMessage(userMessage);
    setInputValue('');
    setIsTyping(true);

    const aiMessage = await getAIResponse(inputValue);
    addMessage(aiMessage);
    setIsTyping(false);
  };

  return (
    <div className="relative flex flex-col h-[calc(100vh-8rem)] bg-white rounded-4xl shadow-lg overflow-hidden">
       <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <div></div>
        <h1 className="text-xl font-semibold text-center text-text-main">Your Companion</h1>
        <button 
          onClick={() => navigateTo(Page.Resources)}
          className="w-10 h-10 bg-red-100 text-alert rounded-full flex items-center justify-center shadow-sm hover:bg-red-200 transition-colors" aria-label="Emergency Resources">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
        </button>
      </div>
      <div className="flex-grow p-4 overflow-y-auto space-y-2">
        {messages.map((msg) =>
          msg.isCrisis ? <CrisisMessage key={msg.id} message={msg} /> : (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary text-sm font-bold flex-shrink-0">
                S
              </div>
            )}
            <div
              className={`max-w-[70%] p-3 rounded-2xl shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-gray-100 text-text-main rounded-bl-none'
              }`}
            >
              <p className="leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex items-start gap-2.5 justify-start">
             <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary text-sm font-bold flex-shrink-0">S</div>
             <div className="bg-gray-100 rounded-2xl rounded-bl-none">
                <TypingIndicator />
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-light transition-shadow"
          />
          <button
            type="submit"
            className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 hover:bg-primary-light transition-colors shadow-md hover:shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatView;