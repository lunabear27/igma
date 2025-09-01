import React from "react";
import logo from "../assets/igmalogo.png";

const LoaderChat = ({ darkMode }) => {
  return (
    <div
      className={`${
        darkMode
          ? "text-gray-800 text-gray-100 border border-gray-700"
          : "bg-white text-gray-800 shadow-md"
      }rounded-2xl px-5 max-w-[80%] md:max-w-[70%] `}
    >
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="w-6 h-6" />
        <div className="flex space-x-1">
          <div
            className={`w-2.5 h-2.5 ${
              darkMode
                ? "bg-gray-500"
                : "bg-gradient-to-r from-red-500 to-red-300 text-white shadow-md"
            } rounded-full animate-bounce`}
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className={`w-2.5 h-2.5 ${
              darkMode
                ? "bg-gray-500"
                : "bg-gradient-to-r from-red-500 to-red-300 text-white shadow-md"
            } rounded-full animate-bounce`}
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className={`w-2.5 h-2.5 ${
              darkMode
                ? "bg-gray-500"
                : "bg-gradient-to-r from-red-500 to-red-300 text-white shadow-md"
            } rounded-full animate-bounce`}
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoaderChat;
