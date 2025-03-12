import { CircleArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import ModalDialog from "./ModalDialog";
import { CircularProgress } from "@mui/material";
import axios from "axios";

interface Props {
  title: string;
  desc: string;
  resume: File | null;
}

const SubmitButton: React.FC<Props> = ({ resume, title, desc }) => {
  const [cvLetterText, setText] = useState("Generate Cover Letter");
  const [open, setOpen] = React.useState(false);
  const [cvContent, setCVcontent] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setCVcontent("");
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("ResumeFile", resume!);
    formData.append("JobTitle", title);
    formData.append("JobDesc", desc);

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/CVLetter`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCVcontent(response.data["Response"]);
    } catch (error: any) {
      console.log(error);
    }finally{
      setLoading(false);
    }
    setOpen(true);
    setText("Regenerate Cover Letter");
  };

  useEffect(() => {
    if (cvContent !== null && cvContent !== ""){
      handleClickOpen();
    }
  }, [cvContent]);

  return (
    <>
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        key="job_desc_input"
        className="w-full flex justify-center"
      >
        <button
          className="p-3 rounded-full focus:outline-none bg-indigo-600 text-white hover:bg-indigo-700 flex gap-2 justify-center items-center w-1/3 mb-4"
          onClick={handleSubmit}
        >
          {loading ? (
            <CircularProgress
              sx={{
                color: "white",
              }}
              size={26}
            />
          ) : (
            <>
              <div>{cvLetterText}</div>
              <CircleArrowRight size={20} color="white" />
            </>
          )}
        </button>
      </motion.div>
      <ModalDialog
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        cvContent={cvContent}
      />
    </>
  );
};

export default SubmitButton;
