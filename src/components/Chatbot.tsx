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
      text: "Greetings! I'm Soulguru, your spiritual friend. Let's take a journey to learn about spirituality. If you have any questions, feel free to ask me and we'll begin!",
      sender: 'bot',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageId, setMessageId] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the last message when the component updates
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const suggestedQuestions = [
    'What is the meaning of life?',
    'What is your perspective on spirituality?',
    'What is your opinion on meditation?',
  ];

  const handleMessageSubmit = async (
    event?: React.FormEvent,
    question?: string
  ) => {
    if (event) {
      event.preventDefault(); // prevent default form submission behavior
    }
    const inputValueToUse = question ? question : inputValue;
    if (!inputValueToUse) return;

    const newUserMessage: Message = {
      id: messageId,
      text: inputValueToUse,
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
          question: inputValueToUse,
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
    } catch (error) {
      console.error('Error communicating with the API:', error);
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <div
          id="chatbot-messages"
          className="h-64 overflow-y-auto mb-4 relative"
        >
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
          {/* Add a reference to the last message */}
          <div ref={messagesEndRef} />
          {loading && messages.length > 0 && (
            <AiOutlineLoading3Quarters
              className="animate-spin ml-2 text-teal-500"
              size={24}
            />
          )}
        </div>
        <form
          onSubmit={handleMessageSubmit}
          className="flex flex-row justify-center items-center mb-4"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow bg-white border border-gray-300 text-gray-800 rounded-lg p-2 mr-2 mb-0"
            placeholder="Ask SoulGuru a question..."
          />
          <button
            type="submit"
            className={`${
              loading ? 'bg-teal-600 cursor' : 'bg-teal-500 hover:bg-teal-600'
            } text-white px-4 py-2 rounded-lg mb-0`}
            onClick={loading ? undefined : handleMessageSubmit}
            disabled={loading}
          >
            Send
          </button>
        </form>

        <h2 className="text-gray-800 font-medium text-lg mt-4 mb-4">
          Suggested Questions:
        </h2>
        <div className="flex flex-wrap justify-center">
          {suggestedQuestions.map((question) => (
            <div className="w-full mb-2" key={question}>
              <SuggestedQuestion
                question={question}
                onClick={(
                  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                  question: string
                ) => {
                  if (!loading) {
                    handleMessageSubmit(event, question);
                  }
                }}
                disabled={loading}
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
