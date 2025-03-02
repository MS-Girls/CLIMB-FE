import { CircleArrowRight } from "lucide-react";
import React from "react";
import * as motion from "motion/react-client";

const SubmitButton = () => {
  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      key="job_desc_input"
      className="w-full flex justify-center"
    >
      <button className="p-3 rounded-full focus:outline-none bg-indigo-600 text-white hover:bg-indigo-700 flex gap-2 justify-center items-center w-1/3 mb-4">
        <div>Generate Cover Letter</div>
        <CircleArrowRight size={20} color="white" />
      </button>
    </motion.div>
  );
};

export default SubmitButton;
