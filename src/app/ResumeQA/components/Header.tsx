import { Bot } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className="py-4 px-6 bg-white shadow-sm border-b border-indigo-100">
      <div className="max-w-4xl mx-auto flex items-center">
        <div className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
          <Bot size={20} className="text-white" />
        </div>
        <h1 className="text-xl font-bold text-indigo-900">
          Resume Q&A Assistant
        </h1>
      </div>
    </header>
  );
};

export default Header;
