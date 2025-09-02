import React, { useState } from "react";
import Header from "./components/header";
import ChatMessage from "./components/ChatMessage";
import { formatTime } from "../utils/chatUtils";
import LoaderChat from "./components/LoaderChat";
import Chatinput from "./components/Chatinput";
import { generateContent } from "./Services/geminiAPI";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello, how can I help you?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Build context from conversation history
      const recentMessages = [...messages, userMessage].slice(-5); // last 5
      const contextText = recentMessages
        .map((m) => `${m.sender === "user" ? "User" : "Igma"}: ${m.text}`)
        .join("\n");

      // Await Gemini response
      const botReply = await generateContent(input, contextText);

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: botReply,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "Sorry, something went wrong. Please try again.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className="flex-1 overflow-y-auto p-4 md:p6">
        <div className="max-w-5xl mx-auto space-y-4">
          {messages.map((message) => {
            return (
              <ChatMessage
                key={message.id}
                darkMode={darkMode}
                messages={message}
                formatTime={formatTime}
              />
            );
          })}
          {isLoading && <LoaderChat />}
        </div>
      </div>
      <Chatinput
        darkMode={darkMode}
        input={input}
        setInput={setInput}
        loading={isLoading}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default App;
