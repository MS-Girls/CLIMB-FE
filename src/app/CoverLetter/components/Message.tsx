import React from "react";
import * as motion from "motion/react-client";
import MessageBoxBot from "./MessageBoxBot";

interface Props {
  content: string;
  _key: string;
}

const Message: React.FC<Props> = ({ content, _key }) => {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      key={_key}
    >
      <MessageBoxBot content={content} />
    </motion.div>
  );
};

export default Message;
