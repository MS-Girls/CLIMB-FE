import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import { CircleCheck, Copy } from "lucide-react";
import copy from "clipboard-copy";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface Props {
  handleClickOpen: any;
  handleClose: any;
  open: any;
  cvContent: string;
}

const ModalDialog: React.FC<Props> = ({ handleClose, open, cvContent }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopyClick = async () => {
    try {
      await copy(cvContent);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Cover Letter
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="flex flex-col gap-2">
            <Tooltip
              title={`${
                isCopied ? "Copied to clipboard!" : "Copy to clipboard"
              }`}
              placement="top"
            >
              <div
                className="cursor-pointer p-2 rounded-full hover:bg-slate-100 w-8 flex justify-center h-auto"
                onClick={handleCopyClick}
              >
                {isCopied ? <CircleCheck size={17} /> : <Copy size={17} />}
              </div>
            </Tooltip>
            <div style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
              {cvContent}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default ModalDialog;
