import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import YouTubeCTA from '../components/YouTubeCTA';
import SuggestedQuestion from '../components/SuggestedQuestion';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      // TO DO: edit the initial message from the bot
      text: "Hello there! I'm Soulguru, your personal spiritual guide. I'm here to explore your beliefs and help you become more aware of them. To begin our journey together, just tell me about your current spiritual views or feel free to ask any questions you have. Let's dive in!",
      sender: 'bot',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageId, setMessageId] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // TO DO: Define an array of suggested questions
  const suggestedQuestions = [
    'What is the meaning of life?',
    'What is your perspective on spirituality?',
    'What is your opinion on meditation?',
  ];

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;

    const newUserMessage: Message = {
      id: messageId,
      text: inputValue,
      sender: 'user',
    };

    setMessageId(messageId + 1);
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/ask`,
        {
          question: inputValue,
        }
      );
      const answer = response.data.answer;

      const newBotMessage: Message = {
        id: messageId + 1,
        text: answer,
        sender: 'bot',
      };

      setMessageId(messageId + 2);
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      scrollToBottom();
    } catch (error) {
      console.error('Error communicating with the API:', error);
    }

    setLoading(false);
  };

  const handleSuggestedQuestionClick = (question: string) => {
    setInputValue(question);
    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
    handleMessageSubmit(fakeEvent);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="h-64 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div
              key={`${index}-${message.id}`}
              className={`${
                message.sender === 'user' ? 'text-right' : 'text-left'
              } mb-2`}
            >
              <span
                className={`${
                  message.sender === 'user'
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-300 text-black'
                } inline-block px-3 py-1 rounded-lg text-sm`}
              >
                {message.text}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} className="pt-4"></div>
        </div>
        <form
          id={'chatbot-form'}
          onSubmit={handleMessageSubmit}
          className="flex flex-row justify-center items-center"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow bg-white border border-gray-300 text-gray-500 rounded-lg p-2 mr-2 mb-0"
            placeholder="Ask SoulGuru a question..."
          />
          <button
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 mb-0"
          >
            Send
          </button>
          {loading && (
            <AiOutlineLoading3Quarters
              className="animate-spin ml-2 text-teal-500"
              size={24}
            />
          )}
        </form>

        <h2 className="text-gray-800 font-medium text-lg mt-4 mb-2">
          Suggested Questions:
        </h2>

        <div className="flex flex-wrap justify-center mt-4">
          {suggestedQuestions.map((question) => (
            <div className="w-full" key={question}>
              <SuggestedQuestion
                question={question}
                onClick={handleSuggestedQuestionClick}
              />
            </div>
          ))}
        </div>
        {/* TO DO: add or remove this YouTube call to action for Stephen's channel */}
        <YouTubeCTA />
      </div>
    </div>
  );
};

export default Chatbot;
