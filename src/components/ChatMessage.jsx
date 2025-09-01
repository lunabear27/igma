import { User } from "lucide-react";
import React from "react";
import logo from "../assets/igmalogo.png";
const ChatMessage = ({ darkMode, messages, formatTime }) => {
  return (
    <div
      className={`flex ${
        messages.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-[80%] md:max-w-[70%] rounded-2xl px-5 py-3.5 ${
          messages.sender === "user"
            ? "bg-gradient-to-r from-red-500 to-red-300 text-white shadow-md"
            : darkMode
            ? "bg-gray-700 text-gray-100 border border-gray-700"
            : "bg-white text-gray-800 shadow-md"
        }`}
      >
        <div
          className={`flex-shrink-0 mr-3 ${
            messages.sender === "user"
              ? "opacity-70"
              : darkMode
              ? "text-gray-400"
              : "text-gray-600"
          }`}
        >
          {messages.sender === "user" ? (
            <User />
          ) : (
            <img src={logo} alt="Logo" className="w-6 h-6" />
          )}
        </div>
        <div className="flex-1">
          <div className="mb-1 flex justify-between items-center">
            <span className="font-medium">
              {messages.sender === "user" ? "You" : "Igma"}
            </span>
            <span
              className={`text-xs ${
                messages.sender === "user"
                  ? "opacity-70"
                  : darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              } ml-2`}
            >
              {formatTime(messages.timestamp)}
            </span>
          </div>
          <p className="text-sm md:text-base whitespace-pre-wrap break-words leading-relaxed">
            {messages.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
