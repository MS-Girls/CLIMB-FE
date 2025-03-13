import React from "react";
import { User } from "lucide-react";

interface Props {
  content: string;
}

const UserMessage: React.FC<Props> = ({ content }) => {
  return (
    <div className="flex gap-2 p-1 items-center self-end">
      <div className="bg-indigo-600 text-white flex justify-center items-center rounded-full p-2">
        <User size={16} />
      </div>
      <div className="bg-indigo-600 text-white p-3 rounded-b-lg rounded-xl text-[14px]">
        {content}
      </div>
    </div>
  );
};

export default UserMessage;
