import React, { Dispatch, SetStateAction, useState } from "react";
import InputBox from "./InputBox";
import * as motion from "motion/react-client";
import { Send } from "lucide-react";

interface Props {
  setJobTitle: Dispatch<SetStateAction<string>>;
}

const GetJobTitle: React.FC<Props> = ({ setJobTitle }) => {
  const [ctrlInput, setCtrlInput] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setJobTitle(ctrlInput);
  };
  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      key="job_title_input"
    >
      <form
        className="w-full bg-white flex gap-2 justify-center items-center p-3"
        onSubmit={handleSubmit}
      >
        <InputBox setCtrlInput={setCtrlInput} type="title" />
        <button
          type="submit"
          disabled={ctrlInput == "" ? true : false}
          className={`p-3 rounded-full focus:outline-none ${
            ctrlInput === ""
              ? "bg-gray-200 text-gray-400"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          <Send size={18} />
        </button>
      </form>
    </motion.div>
  );
};

export default GetJobTitle;
