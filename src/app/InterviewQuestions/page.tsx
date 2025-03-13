"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Paperclip } from "lucide-react";
import axios from "axios";
import Header from "./components/Header";
import BotMessage from "./components/BotMessage";
import UserMessage from "./components/UserMessage";
import LoaderComp from "./components/LoaderComp";
import { v4 } from "uuid";
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
  const [setupStage, setSetupStage] = useState("role");
  const [testMode, setTestMode] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [jobrolestats, setjobrolestats] = useState(true);
  const [jobdescstats, setjobdescstats] = useState(false);
  const [jobtopicsstats, setjobtopicsstats] = useState(false);
  const [ctrlInput, setCtrlInput] = useState("");
  const [jobrole, setjobRole] = useState("");
  const [jobdesc, setjobDesc] = useState("");
  const [topicstest, setTopicsTest] = useState("");
  const [displayInput, setDisplayInput] = useState(true);

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
        role: "You are an interviewer. Simulate the process of conducting an interview. Satisfy the condition given in the prompt",
        history: formatMessagesForAPI(),
      };

      const response = await axios.post<ChatResponse>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Resume/chat`,
        chatRequest
      );
      return response.data.Response;
    } catch (error) {
      return "Sorry, I encountered an error while processing your request.";
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTestMode = () => {
    setTestMode(!testMode);
  };

  const setMessagesFn = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  const questionPrompt = `Ask only one short interview question for the job position ${jobrole} related to the topics: ${topicstest}. Only questions. No other additional text`;
  const answerPrompt = `Check if the answer given to the above question is right. Be short.\n\nAnswer: ${ctrlInput}`;

  const useEffectFn = async () => {
    if (testMode == null) return;
    if (testMode) {
      // indicates the start of the test
      const startMsg = `Interview test is starting for the role: ${jobrole}, on the topics ${topicstest}`;
      const msg: Message = {
        role: "bot",
        content: startMsg,
      };
      setMessagesFn(msg);
      const question = await getAPIResponse(questionPrompt);
      const msg_qn: Message = {
        role: "bot",
        content: question,
      };
      setMessages((prev) => [...prev, msg_qn]);
      setCheckAns(true);
    } else {
      // indicates the end of the test
      const endMsg = "The Interview test has been ended. Thank you!!";
      const msg: Message = {
        role: "bot",
        content: endMsg,
      };
      setMessagesFn(msg);
      setDisplayInput(false);
    }
    scrollToBottom();
  };

  useEffect(() => {
    useEffectFn();
  }, [testMode]);

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

  const [checkans, setCheckAns] = useState(false);
  const handleSubmit = async (e: any) => {
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
        content: `Great! Received Topics for test. Click "Start Test" when you are ready to begin`,
      };
      setMessages((prev) => [...prev, msg_user, msg]);
      setTopicsTest(ctrlInput);
      setjobtopicsstats(false);
      setSetupStage("ready");
    } else if (checkans) {
      setCtrlInput("");
      const ans: Message = {
        role: "user",
        content: ctrlInput,
      };
      setMessages((prev) => [...prev, ans]);
      const response = await getAPIResponse(answerPrompt);
      const msg_ans_feedback: Message = {
        role: "bot",
        content: response,
      };
      setMessages((prev) => [...prev, msg_ans_feedback]);
      setCheckAns(false);
      const question = await getAPIResponse(questionPrompt);
      const msg_qn: Message = {
        role: "bot",
        content: question,
      };
      setMessages((prev) => [...prev, msg_qn]);
      setCheckAns(true);
    }
    setCtrlInput("");
  };

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

      {/* Input area */}
      {displayInput && (
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            {setupStage === "ready" && (
              <TestControls
                toggleTestMode={toggleTestMode}
                isLoading={isLoading}
                testMode={testMode == null ? false : true}
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
                disabled={ctrlInput.trim() === "" || isLoading}
                className={`p-3 rounded-full focus:outline-none ${
                  ctrlInput.trim() === "" || isLoading
                    ? "bg-gray-200 text-gray-400"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
