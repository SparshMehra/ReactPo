/**
 * ChatbotWindow Component
 *
 * @file ChatbotWindow.js
 * @author Abdiaziz Muse (A00471783) - Chatbot UI/UX, API integration, animations
 * @description Main chatbot interface window with AI-powered conversation capabilities.
 *              Connects to the chatbot API for intelligent responses about the conservation area.
 *
 * Features:
 * - Real-time chat interface with message history
 * - Integration with fine-tuned GPT-2 model via API
 * - Suggested questions for quick access
 * - Auto-scroll to latest messages
 * - Loading states during API calls
 * - Error handling for API failures
 * - Timestamp display for messages
 * - Responsive design with dark mode support
 *
 * @param {Function} onClose - Callback to close the chatbot window
 * @returns {JSX.Element} Chatbot window with conversation interface
 */

import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

// Expanded suggested questions from training data
const ALL_SUGGESTED_QUESTIONS = [
  "What are the local fauna?",
  "Can I see a map of the area?",
  "I'd like to volunteer",
  "How do I register?",
  "Where is this organization based?",
  "What animals might I encounter here?",
  "Can I upload my own photos?",
  "How do I contact support?",
  "What sections are available on the site?",
  "How do I find directions to a location?",
  "What are the support hours?",
  "Can I explore animals or fungi too?",
  "What's going on at the Woodland Conservation Area?",
  "Do you support accessibility features?",
  "What do visitors say about it?",
  "How can I get in touch with support?",
  "What browsers do you support?",
  "I want to support your cause",
  "How do I share my favorite nature shots?"
];

// Function to get random suggested questions
const getRandomQuestions = (count = 3) => {
  const shuffled = [...ALL_SUGGESTED_QUESTIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const ChatbotWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState(getRandomQuestions(3));
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  const scrollToShowLatestMessage = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const lastMessage = container.lastElementChild?.previousElementSibling;
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  useEffect(() => {
    // Delay scroll slightly to ensure DOM has updated
    const timer = setTimeout(() => {
      if (messages.length > 1 && !isLoading) {
        scrollToShowLatestMessage();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [messages, isLoading]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      text: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call the backend API
      const response = await fetch('http://localhost:8744/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();

      // Add bot response
      const botMessage = {
        type: 'bot',
        text: data.response || 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

      // Refresh suggested questions after each interaction
      setSuggestedQuestions(getRandomQuestions(3));
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        type: 'bot',
        text: 'Sorry, I\'m having trouble connecting. Please try again later.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);

      // Refresh suggested questions even on error
      setSuggestedQuestions(getRandomQuestions(3));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleSuggestedQuestion = (question) => {
    sendMessage(question);
  };

  return (
    <div className="chatbot-window">
      {/* Header */}
      <div className="chatbot-header">
        <div className="chatbot-header-content">
          <div className="chatbot-header-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
          </div>
          <div>
            <h3 className="chatbot-title">Woodland Assistant</h3>
            <p className="chatbot-subtitle">Ask me anything</p>
          </div>
        </div>
        <button onClick={onClose} className="chatbot-close-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="chatbot-messages" ref={messagesContainerRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div className="message-content">
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions - Show after first interaction */}
      {messages.length > 1 && !isLoading && (
        <div className="suggested-questions">
          <p className="suggested-questions-title">You might also ask:</p>
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              className="suggested-question-btn"
              onClick={() => handleSuggestedQuestion(question)}
            >
              {question}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="chatbot-input-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="chatbot-input"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="chatbot-send-btn"
          disabled={isLoading || !inputValue.trim()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatbotWindow;

