import React from "react";
import logo from "../assets/igmalogo.png";
import {  Sun, Moon } from "lucide-react";
const Header = ({ toggleDarkMode, darkMode }) => {
  return (
    <header
      className={`${
        darkMode ? "bg-gray-800 text-white" : "bg-white"
      } shadow-lg py-4 px-6 border-b ${
        darkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        {/*Left Side Content : The Logo*/}
        <div className="flex items-center space-x-3">
          <div>
            <img src={logo} alt="Logo" className="w-20 h-20 p-2" />
          </div>
          <h1 className="text-2xl font-bold">Igma Chatbot</h1>
        </div>
        {/*Right Side Content : Placeholder for future elements*/}
        <div className="flex item-center space-x-3">
          <button
            className={` p-3 rounded-full cursor-pointer ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-200"
            }`}
            onClick={toggleDarkMode}
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
