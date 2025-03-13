import React from "react";
import { Bot } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

interface Props {
  content: string;
}

const BotMessage: React.FC<Props> = ({ content }) => {
  return (
    <div className="flex gap-2 p-1 items-center">
      <div className="bg-[#374151] text-white flex justify-center items-center rounded-full p-2">
        <Bot size={16} />
      </div>
      <div className="bg-white p-3 rounded-b-lg rounded-xl text-[14px]">
        {content}
      </div>
    </div>
  );
};

export default BotMessage;
