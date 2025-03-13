"use client";
import { useState, useRef, FormEvent, ChangeEvent, useEffect } from "react";
import { Send, FileUp, Bot, User, Paperclip, Play, Square } from "lucide-react";
import axios from "axios";
import Header from "./components/Header";
import BotMessage from "./components/BotMessage";
import UserMessage from "./components/UserMessage";
import LoaderComp from "./components/LoaderComp";
import { v4 } from "uuid";
import ResumeLoader from "./components/ResumeLoader";
import UploadFile from "./components/UploadFile";
import TestControls from "./components/TestControls";

interface Message {
  role: "user" | "bot";
  content: string;
}

interface ChatMessage {
  sender: string;
  message: string;
}

interface ChatRequest {
  prompt: string;
  role?: string;
  history?: ChatMessage[];
}

interface ChatResponse {
  Response: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Which role would you like to interview for?" },
  ]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [askFromResume, setAskFromResume] = useState(false);
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [topics, setTopics] = useState("");
  const [setupStage, setSetupStage] = useState("role");
  const [testMode, setTestMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const formatMessagesForAPI = (): ChatMessage[] => {
    return messages.map((msg) => ({
      sender: msg.role === "user" ? "user" : "assistant",
      message: msg.content,
    }));
  };

  const getAPIResponse = async (userPrompt: string): Promise<string> => {
    setIsLoading(true);
    try {
      const chatRequest: ChatRequest = {
        prompt: userPrompt,
        role: "You are an interviewer. Simulate the process of an interview. Satisfy the condition given in the context",
        history: formatMessagesForAPI(),
      };

      const response = await axios.post<ChatResponse>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Resume/chat`,
        chatRequest
      );
      return response.data.Response;
    } catch (error) {
      console.error("Error calling chat API:", error);
      return "Sorry, I encountered an error while processing your request.";
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   if (input.trim() === "" || isLoading) return;

  //   const userMessage = { role: "user" as const, content: input };
  //   setMessages((prev) => [...prev, userMessage]);

  //   // Handle setup flow based on current stage
  //   if (setupStage === "role") {
  //     setJobRole(input);
  //     setMessages((prev) => [
  //       ...prev,
  //       {
  //         role: "bot",
  //         content:
  //           "Great! Please paste the job description or summarize the key responsibilities:",
  //       },
  //     ]);
  //     setSetupStage("jobDesc");
  //   } else if (setupStage === "jobDesc") {
  //     setJobDescription(input);
  //     setMessages((prev) => [
  //       ...prev,
  //       {
  //         role: "bot",
  //         content:
  //           "What topics would you like to practice? (e.g. React, TypeScript, System Design)",
  //       },
  //     ]);
  //     setSetupStage("topics");
  //   } else if (setupStage === "topics") {
  //     setTopics(input);
  //     setMessages((prev) => [
  //       ...prev,
  //       {
  //         role: "bot",
  //         content:
  //           "Thank you! You can upload your resume now, or skip this step and click 'Start Test' to begin.",
  //       },
  //     ]);
  //     setSetupStage("ready");
  //   } else {
  //     const apiResponse = await getAPIResponse(input);

  //     setMessages((prev) => [...prev, { role: "bot", content: apiResponse }]);
  //   }

  // setInput("");
  // scrollToBottom();
  // };

  const toggleTestMode = async () => {
    if (!testMode) {
      // Starting test
      setTestMode(true);
      const startMessage = `Starting interview test for ${jobRole} role focusing on: ${topics}.${
        askFromResume ? " I'll reference your resume in my questions." : ""
      }`;

      setMessages((prev) => [...prev, { role: "bot", content: startMessage }]);

      const context = `You are an interviewer for a ${jobRole} position. Ask one interview question related to these topics: ${topics}. Stimulate a real interview process. Assume that you are taking interview for the candidate. Ask questions one after the other correcting the previous one if there is mistakes.`;
      const firstQuestion = await getAPIResponse(context);

      setMessages((prev) => [...prev, { role: "bot", content: firstQuestion }]);
    } else {
      // Ending test
      setTestMode(false);
      const feedbackPrompt = `This interview for the ${jobRole} position has concluded. Please provide constructive feedback on the candidate's responses, highlighting strengths and areas for improvement.`;

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Interview test has ended. Processing your feedback...",
        },
      ]);

      // Get feedback from API
      const feedback = await getAPIResponse(feedbackPrompt);
    }
    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ramya

  const [jobrolestats, setjobrolestats] = useState(true);
  const [jobdescstats, setjobdescstats] = useState(false);
  const [jobtopicsstats, setjobtopicsstats] = useState(false);
  const [yesnostat, setyesnostat] = useState(false);
  const [ctrlInput, setCtrlInput] = useState("");
  const [jobrole, setjobRole] = useState("");
  const [jobdesc, setjobDesc] = useState("");
  const [topicstest, setTopicsTest] = useState("");
  const [yesorno, setyesorno] = useState(false);
  const [showupload, setshowupload] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    var msg: Message;
    var msg_user: Message = {
      role: "user",
      content: ctrlInput,
    };
    if (jobrolestats) {
      msg = {
        role: "bot",
        content: `Great! Received Role: ${ctrlInput}. Enter the Job Description`,
      };
      setMessages((prev) => [...prev, msg_user, msg]);
      setjobRole(ctrlInput);
      setjobrolestats(false);
      setjobdescstats(true);
    } else if (jobdescstats) {
      msg = {
        role: "bot",
        content: `Great! Received Job Description. Enter the topics for Test (such as.. React, Typescript etc..)`,
      };
      setMessages((prev) => [...prev, msg_user, msg]);
      setjobDesc(ctrlInput);
      setjobdescstats(false);
      setjobtopicsstats(true);
    } else if (jobtopicsstats) {
      msg = {
        role: "bot",
        content: `Great! Received Topics for test. Would you like me to question & answer Resume based questions as well..?`,
      };
      setMessages((prev) => [...prev, msg_user, msg]);
      setTopicsTest(ctrlInput);
      setjobtopicsstats(false);
      setyesnostat(true);
    } else if (yesnostat) {
      if (ctrlInput.toLowerCase().trim() == "yes") {
        setshowupload(true);
        var msg_1: Message = {
          role: "bot",
          content: `Great!! Go ahead and upload the resume`,
        };
        setMessages((prev) => [...prev, msg_user, msg_1]);
      }
    }
    setCtrlInput("");
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setIsUploading(true);

      setTimeout(() => {
        setIsUploading(false);
        setMessages((prev) => [
          ...prev,
          { role: "user", content: `Uploaded file: ${e.target.files![0].name}` },
          { role: "bot", content: `Received your resume: ${e.target.files![0].name}. Click "Start Test" when you're ready to begin.` },
        ]);
        setshowupload(false);
        setAskFromResume(true);
        setSetupStage("ready");
        scrollToBottom();
      }, 1500);
    }
  };



  useEffect(() => {
    if (jobrolestats) {
    } else if (jobdescstats) {
    } else if (jobtopicsstats) {
    }
  });

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />

      <div className="flex-1 px-16 py-4 gap-3 flex flex-col overflow-y-auto">
        {messages.map((item: any) =>
          item.role == "user" ? (
            <UserMessage content={item.content} key={v4()} />
          ) : (
            <BotMessage content={item.content} key={v4()} />
          )
        )}
        {isLoading && <LoaderComp />}
        <div ref={messagesEndRef} />
      </div>

      {showupload && (
        <UploadFile
          triggerFileInput={triggerFileInput}
          fileInputRef={fileInputRef}
          handleFileUpload={handleFileUpload}
        />
      )}

      {/* Upload status */}
      {isUploading && <ResumeLoader />}

      {/* Input area */}
      {!showupload && <div className="p-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          {/* Test controls - only shown when setup is complete */}
          {setupStage === "ready" && (
            <TestControls
              askFromResume={askFromResume}
              setAskFromResume={setAskFromResume}
              file={file}
              toggleTestMode={toggleTestMode}
              isLoading={isLoading}
              testMode={testMode}
            />
          )}

          <form onSubmit={handleSubmit} className="flex items-center">
            {!testMode && setupStage === "ready" && (
              <button
                type="button"
                onClick={triggerFileInput}
                className="p-2 text-gray-500 hover:text-indigo-600 focus:outline-none"
              >
                <Paperclip size={20} />
              </button>
            )}
            <div className="flex-1 mx-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={ctrlInput}
                onChange={(e) => setCtrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={input.trim() === "" || isLoading}
              className={`p-3 rounded-full focus:outline-none ${
                input.trim() === "" || isLoading
                  ? "bg-gray-200 text-gray-400"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>}
    </div>
  );
}
