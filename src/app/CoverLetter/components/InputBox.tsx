import { TextField } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  setCtrlInput: any;
  type: string;
}

const InputBox: React.FC<Props> = ({ setCtrlInput, type }) => {
  return (
      <TextField
        id="outlined-search"
        placeholder={`${type == "title" ? "Enter Job Title" : "Enter Job Description"}`}
        type="input"
        size="medium"
        className="w-full"
        autoFocus
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "lightgray", // Default outline color (gray)
            },
            "&:hover fieldset": {
              borderColor: "#4F46E5", // Outline color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4F46E5", // Outline color when focused
            },
          },
        }}
        onChange={(e) => setCtrlInput(e.target.value)}
      />
  );
};

export default InputBox;
