import { Message } from '../types';

const crisisKeywords = [
  "want to die", "end my life", "suicide", "kill myself",
  "hurt myself", "cut myself", "harm",
  "can't go on", "no hope", "no point"
];

const crisisResponseText = "It sounds like you are in a lot of pain, and it takes courage to talk about it. Please know that help is available and you don't have to go through this alone. It's important to talk to someone who can support you right now. Here are some resources you can contact immediately:";

const responses = [
  "I hear that you're feeling that way. It's completely valid. Could you tell me more about what's on your mind?",
  "That sounds really tough. Thank you for sharing that with me. Remember to be kind to yourself.",
  "It takes a lot of strength to talk about these things. Let's explore this a bit. What was the situation when this feeling started?",
  "I see. Let's try a simple grounding exercise. Can you name three things you see around you right now? This helps bring us back to the present moment.",
  "That's a powerful thought. Let's gently challenge it. Is there another way to look at this situation, perhaps a more compassionate one towards yourself?",
  "It sounds like you're being very hard on yourself. What's one small thing you've accomplished recently, even just getting out of bed, that you can acknowledge?",
  "Thank you for your honesty. It's okay not to be okay. We can just sit with this feeling for a moment if you'd like. No pressure to feel any differently.",
];

let responseIndex = 0;

export const getAIResponse = async (userMessage: string): Promise<Message> => {
  const lowerCaseMessage = userMessage.toLowerCase();
  const isCrisis = crisisKeywords.some(keyword => lowerCaseMessage.includes(keyword));

  return new Promise(resolve => {
    setTimeout(() => {
      let response: Partial<Message> = {};

      if (isCrisis) {
        response = {
          text: crisisResponseText,
          isCrisis: true,
        };
      } else {
        response = {
          text: responses[responseIndex],
          isCrisis: false,
        };
        responseIndex = (responseIndex + 1) % responses.length;
      }
      
      const aiMessage: Message = {
        id: Date.now(),
        sender: 'ai',
        timestamp: new Date().toISOString(),
        text: response.text || '',
        isCrisis: response.isCrisis,
      };
      resolve(aiMessage);
    }, isCrisis ? 500 : 1000 + Math.random() * 500); // Faster response for crisis
  });
};