// Clean version of chatUtils.js - keeping only what's actually used

export const formatTime = (date) => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// Additional utility functions for chat functionality
export const generateMessageId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const isValidMessage = (message) => {
  return message && typeof message === 'string' && message.trim().length > 0;
};

// Helper to format chat history for API calls
export const formatChatHistory = (messages, maxMessages = 5) => {
  return messages
    .slice(-maxMessages)
    .map(m => `${m.sender === "user" ? "User" : "Igma"}: ${m.text}`)
    .join("\n");
};