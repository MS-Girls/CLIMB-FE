"use client";
import { useState, useRef, FormEvent, ChangeEvent, useEffect } from "react";
import { Send } from "lucide-react";
import axios from "axios";
import Header from "./components/Header";
import UserMessage from "./components/UserMessage";
import BotMessage from "./components/BotMessage";
import BotLoader from "./components/BotLoader";
import { v4 } from "uuid";
import UploadContainser from "./components/UploadContainser";
import UploadLoader from "./components/UploadLoader";
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
    {
      role: "bot",
      content:
        "Hello!! I assist to practise Resume Based Interview Questions. Go ahead and upload your resume",
    },
  ]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ramya
  const [boxstats, setboxstats] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [resumecont, setresumecont] = useState("");
  const [testMode, setTestMode] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false); // for getapiresponse endpoint
  const [qnsarray, setqnsarray] = useState<Array<string>>([]);
  const [ptr, setptr] = useState(0);

  const getNextQn = (ptr: number, array: Array<string>) => {
    const msg: Message = {
      role: "bot",
      content: array[ptr],
    };
    setMessages((prev) => [...prev, msg]);
    setptr(ptr+1);
  };

  const getResumeContent = async (filedata: File) => {
    const formdata = new FormData();
    formdata.append("ResumeFile", filedata!);
    try {
      setIsUploading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ResumeContent`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setresumecont(response.data);
      setMessages((prev) => [
        ...prev,
        { role: "user", content: `Uploaded file: ${filedata.name}` },
        {
          role: "bot",
          content: `Received your resume: ${filedata.name}. Click "Start Test" when you're ready to begin.`,
        },
      ]);
      setboxstats(false);
      scrollToBottom();
    } catch (error: any) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Error Uploading Resume" },
      ]);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      getResumeContent(e.target.files[0]);
    }
  };

  const getAPIResponse = async (userPrompt: string): Promise<string> => {
    setIsLoading(true);
    try {
      const chatRequest: ChatRequest = {
        prompt: userPrompt,
        role: "You are an interviewer. You must generate resume based interview questions and check the answers for the same",
        history: formatMessagesForAPI(),
      };

      const response = await axios.post<ChatResponse>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Resume/chat`,
        chatRequest
      );
      return response.data.Response; // returns the array as string
    } catch (error) {
      console.error("Error calling chat API:", error);
      return "Sorry, I encountered an error while processing your request.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() === "" || isLoading) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    const responsereview = await getAPIResponse(checkansprompt);
    console.log(responsereview);
    const msg: Message = {
      role: "bot",
      content: responsereview,
    };
    setMessages((prev) => [...prev, msg]);
    if (ptr >= qnsarray.length) {
      const msg: Message = {
        role: "bot",
        content:
          "Congratulations!! You have reached the end of the Interview Questions test. Thank you!!",
      };
      setMessages((prev) => [...prev, msg]);
      setTestMode(true);
      setptr(0);
    } else {
      getNextQn(ptr, qnsarray);
    }
    scrollToBottom();
    setInput("");
  };

  const toggleTestMode = () => {
    setTestMode(!testMode);
  };

  const formatMessagesForAPI = (): ChatMessage[] => {
    return messages.map((msg) => ({
      sender: msg.role === "user" ? "user" : "assistant",
      message: msg.content,
    }));
  };

  const resumeqnsprompt = `Generate 3 resume based interview questions based on the skill sets, projects, achievements from the given resume. Do not ask any irrelevant questions. Only ask those questions that shall be useful to determine the eligibility to recruit a preson.Please note that you will have to give the 3 questions as an array with each element being the string representing the question. You will return only the array such that if I parse your the response returned by you I should get a perfectly working array. Do not return any other text other than the array that is to be parsed. The resume is as follows.\n\n${resumecont}`;

  const checkansprompt =
    "Check if the answer given to the question is correct. Give a one line review";

  const extractArrayFromString = (input: string) => {
    const match = input.match(/\[\s*([\s\S]*?)\s*\]/); // Match content inside square brackets
    if (!match) return null; // Return null if no match is found

    const arrayString = match[0]; // Extract matched array part

    try {
      return JSON.parse(arrayString); // Parse and return the array
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  };

  const useEffectFn = async () => {
    if (testMode == null) return;
    if (testMode) {
      const msg: Message = {
        role: "bot",
        content: "Alright!! Starting Resume based Interview Questions test",
      };
      setMessages((prev) => [...prev, msg]);
      const response = await getAPIResponse(resumeqnsprompt);
      const questionsArray = extractArrayFromString(response); // parsed array
      console.log(questionsArray);
      setqnsarray(questionsArray);
      getNextQn(ptr, questionsArray);
    } else {
      const msg: Message = {
        role: "bot",
        content: "The Interview test has ended. Thank you!!",
      };
      setMessages((prev) => [...prev, msg]);
      setTestMode(true);
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

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <Header />

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-14 py-3 flex-col gap-2">
        {messages.map((item: any) =>
          item.role == "user" ? (
            <UserMessage content={item.content} key={v4()} />
          ) : (
            <BotMessage content={item.content} key={v4()} />
          )
        )}
        {isLoading && <BotLoader />}
        <div ref={messagesEndRef} />
      </div>

      {boxstats && !isUploading && (
        <UploadContainser
          triggerFileInput={triggerFileInput}
          fileInputRef={fileInputRef}
          handleFileUpload={handleFileUpload}
        />
      )}

      {/* Upload status */}
      {isUploading && <UploadLoader />}

      {/* Input area */}
      {!boxstats && !isUploading && (
        <div className="p-4 bg-white border-t border-gray-200">
          <TestControls
            toggleTestMode={toggleTestMode}
            isLoading={isLoading}
            testMode={testMode == null ? false : true}
          />
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="flex items-center">
              <div className="flex-1 mx-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
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
        </div>
      )}
    </div>
  );
}
