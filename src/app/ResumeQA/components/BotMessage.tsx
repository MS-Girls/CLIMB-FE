import React from "react";
import { Bot } from "lucide-react";

interface Props {
  content: string;
}

const BotMessage: React.FC<Props> = ({ content }) => {
  return (
    <div className="flex gap-2 p-2 items-center">
      <div className="bg-[#374151] text-white flex justify-center items-center rounded-full h-1/2 p-2">
        <Bot size={16} />
      </div>
      <div className="bg-white p-4 rounded-b-lg rounded-xl text-[14px]">
        {content}
      </div>
    </div>
  );
};

export default BotMessage;
