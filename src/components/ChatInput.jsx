import { Send } from "lucide-react";

const Chatinput = ({
  darkMode,
  input,
  setInput,
  loading,
  handleSendMessage,
}) => {
  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-800 border-t border-gray-700"
          : "bg-white border-t border-gray-200 "
      } p-4`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !loading) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            disabled={loading}
            placeholder="type your message"
            className={`flex-1 border ${
              darkMode
                ? "bg-gray-700 border-gray-700 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            } ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            } rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent`}
          />
          <button
            className={`p-3 rounded-full transition-colors shadow-md ${
              loading || !input.trim() 
                ? "opacity-50 cursor-not-allowed" 
                : "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
          >
            <Send className={`${darkMode ? "text-white" : "text-gray-900"}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatinput;
