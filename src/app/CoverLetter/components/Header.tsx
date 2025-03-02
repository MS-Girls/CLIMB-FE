import { Bot } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className="py-4 px-16 bg-white shadow-sm border-b border-indigo-100">
      <div className="flex items-center">
        <div className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
          <Bot size={20} className="text-white" />
        </div>
        <h1 className="text-xl font-bold text-indigo-900">
          Cover Letter Generation
        </h1>
      </div>
    </header>
  );
};

export default Header;
