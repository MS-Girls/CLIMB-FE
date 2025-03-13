"use client";
import React, { useEffect, useRef, useState } from "react";
import GetJobTitle from "./components/GetJobTitle";
import GetJobDescription from "./components/GetJobDescription";
import UploadResume from "./components/UploadResume";
import Header from "./components/Header";
import Message from "./components/Message";
import SubmitButton from "./components/SubmitButton";

const page = () => {
  const [showfirstMsg, setShowFirstMsg] = useState(true);
  const [showSecondMsg, setShowSecondMsg] = useState(false);
  const [showTitleMsg, setShowTitleMsg] = useState(false);
  const [showTMsgResp, setShowTMsgResp] = useState(false);
  const [showDMsg, setShowDMsg] = useState(false);
  const [showDMsgResp, setShowDMsgResp] = useState(false);
  const [showUploadMsg, setShowUploadMsg] = useState(false);
  const [showUMsgResp, setShowUMsgResp] = useState(false);
  const [showSubmitMsg, setShowSubmitMsg] = useState(false);

  // required inputs for backend
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const bottomRef = useRef<null | HTMLDivElement>(null); // ref for scrolling

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [
    showfirstMsg,
    showSecondMsg,
    showTitleMsg,
    showTMsgResp,
    showDMsg,
    showDMsgResp,
    showUploadMsg,
    showSubmitMsg,
  ]);

  useEffect(() => {
    setTimeout(() => {
      setShowFirstMsg(false);
      setShowSecondMsg(true);
    }, 2000);
    setTimeout(() => {
      setShowSecondMsg(false);
      setShowTitleMsg(true);
    }, 4000);
  }, []);

  useEffect(() => {
    if (jobTitle !== "") {
      setShowTMsgResp(true);
      setTimeout(() => {
        setShowDMsg(true);
      }, 2000);
    }
  }, [jobTitle]);

  useEffect(() => {
    if (jobDesc !== "") {
      setShowDMsgResp(true);
      setTimeout(() => {
        setShowUploadMsg(true);
      }, 2000);
    }
  }, [jobDesc]);

  useEffect(() => {
    if (file) {
      setShowUMsgResp(true);
      setTimeout(() => {
        setShowSubmitMsg(true);
      }, 2000);
    }
  }, [file]);

  return (
    <div className="flex flex-col h-screen gap-3 bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      <div className="flex-1 overflow-y-auto px-14">
        {showfirstMsg && (
          <Message
            content="Hello!! I assist in cover letter generation"
            _key="init_msg1"
          />
        )}
        {showSecondMsg && (
          <Message
            _key="init_msg2"
            content="Go ahead and enter the following details for the same"
          />
        )}
        {showTitleMsg && <Message _key="title_msg" content="Enter Job Title" />}
        {showTMsgResp && (
          <Message
            _key="title_msg_resp"
            content={`Received Job Title : ${jobTitle}`}
          />
        )}
        {showDMsg && (
          <Message _key="desc_msg" content="Enter Job Description" />
        )}
        {showDMsgResp && (
          <Message
            _key="job_desc_resp"
            content={`Received Job Description : ${jobDesc.slice(0, 17)} ...`}
          />
        )}
        {showUploadMsg && (
          <Message _key="upload_msg" content="Upload your Resume" />
        )}
        {showUMsgResp && (
          <Message
            _key="upload_msg_resp"
            content={`Received File : ${file!.name}`}
          />
        )}
        {showSubmitMsg && (
          <Message
            _key="submit_msg"
            content="Now, you can go ahead and submit to generate cover letter"
          />
        )}
        {/* This div acts as a scroll anchor */}
        <div ref={bottomRef} />
      </div>
      <div>
        {showTitleMsg && !showTMsgResp && (
          <GetJobTitle setJobTitle={setJobTitle} />
        )}
        {showDMsg && !showDMsgResp && (
          <GetJobDescription setJobDesc={setJobDesc} />
        )}
        {showUploadMsg && !showUMsgResp && <UploadResume setFile={setFile} />}
        {showSubmitMsg && <SubmitButton title={jobTitle} desc={jobDesc} resume={file} />}
      </div>
    </div>
  );
};

export default page;
