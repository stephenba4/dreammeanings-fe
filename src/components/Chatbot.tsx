import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      // TO DO: Edit the first message the chatbot shows
      text: 'Hi! I am here to interpret your dream for you, please offer as much detail as possible.',
      sender: 'bot',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageId, setMessageId] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      (messagesEndRef.current && loading) ||
      (messagesEndRef.current && !loading)
    ) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [messages, loading]);

  const handleMessageSubmit = async (
    event?: React.FormEvent,
    question?: string
  ) => {
    if (event) {
      event.preventDefault();
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
    <div className="w-full min-h-screen flex flex-col">
      <div className="bg-gray-100 flex flex-col flex-grow rounded-lg min-h-screen max-h-screen">
        {/* TO DO: Edit the app title */}
        <h1 className="text-4xl font-bold text-center text-teal-500 bg-gray-200">
          DreamMeanings
        </h1>
        <div className="flex-grow overflow-y-auto relative p-2">
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
                } inline-block px-3 py-1 rounded-lg text-sm break-words`}
              >
                {message.text}
              </span>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
        {loading && messages.length > 0 && (
          <p className=" text-black inline-block px-3 py-1 text-sm">
            Typing...
          </p>
        )}
        <form
          onSubmit={handleMessageSubmit}
          className="flex flex-row justify-center items-center p-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow bg-white border border-gray-300 text-gray-800 rounded-lg p-2 mr-2 mb-0"
            // TO DO: Edit placeholder text in input area
            placeholder="Ask DreamMeanings a question..."
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
      </div>
    </div>
  );
};

export default Chatbot;
