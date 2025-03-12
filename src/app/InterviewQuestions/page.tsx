"use client";
import { useState, useRef, FormEvent, ChangeEvent, useEffect } from "react";
import { Send, FileUp, Bot, User, Paperclip, Play, Square } from "lucide-react";
import axios from "axios";

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
  Response : string;
  
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

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setIsUploading(true);

      setTimeout(() => {
        setIsUploading(false);
        // setMessages((prev) => [
        //   ...prev,
        //   { role: "user", content: `Uploaded file: ${e.target.files![0].name}` },
        //   { role: "bot", content: `Received your resume: ${e.target.files![0].name}. Click "Start Test" when you're ready to begin.` },
        // ]);
        setAskFromResume(true);
        scrollToBottom();
      }, 1500);
    }
  };

  
  const formatMessagesForAPI = (): ChatMessage[] => {
    return messages.map(msg => ({
      sender: msg.role === "user" ? "user" : "assistant",
      message: msg.content
    }));
  };

  const getAPIResponse = async (userPrompt: string): Promise<string> => {
    setIsLoading(true);
    try {
      const chatRequest: ChatRequest = {
        prompt: userPrompt,
        role: jobRole || undefined,
        history: formatMessagesForAPI()
      };

      const response = await axios.post<ChatResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Resume/chat`, chatRequest);
      return response.data.Response;
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
    
    // Handle setup flow based on current stage
    if (setupStage === "role") {
      setJobRole(input);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Great! Please paste the job description or summarize the key responsibilities:" },
      ]);
      setSetupStage("jobDesc");
    } else if (setupStage === "jobDesc") {
      setJobDescription(input);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "What topics would you like to practice? (e.g. React, TypeScript, System Design)" },
      ]);
      setSetupStage("topics");
    } else if (setupStage === "topics") {
      setTopics(input);
      setMessages((prev) => [
        ...prev,
        { 
          role: "bot", 
          content: "Thank you! You can upload your resume now, or skip this step and click 'Start Test' to begin."
        },
      ]);
      setSetupStage("ready");
    } else {
      
      const apiResponse = await getAPIResponse(input);
      
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: apiResponse }
      ]);
    }
    
    setInput("");
    scrollToBottom();
  };

  const toggleTestMode = async () => {
    if (!testMode) {
      // Starting test
      setTestMode(true);
      const startMessage = `Starting interview test for ${jobRole} role focusing on: ${topics}.${askFromResume ? " I'll reference your resume in my questions." : ""}`;
      
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: startMessage }
      ]);
      
      const context = `You are an interviewer for a ${jobRole} position. Ask one interview question related to these topics: ${topics}. Stimulate a real interview process. Assume that you are taking interview for the candidate. Ask questions one after the other correcting the previous one if there is mistakes.`;
      const firstQuestion = await getAPIResponse(context);
      
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: firstQuestion }

      ]);
      
    } else {
      // Ending test
      setTestMode(false);
      const feedbackPrompt = `This interview for the ${jobRole} position has concluded. Please provide constructive feedback on the candidate's responses, highlighting strengths and areas for improvement.`;
      
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Interview test has ended. Processing your feedback..." },
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

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="py-4 px-6 bg-white shadow-sm border-b border-indigo-100">
        <div className="max-w-4xl mx-auto flex items-center">
          <div className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
            <Bot size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-indigo-900">Interview Assistant</h1>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex mb-4 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex max-w-[80%] items-end ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0 ${
                    message.role === "user"
                      ? "bg-indigo-600 ml-2"
                      : "bg-gray-700 mr-2"
                  }`}
                >
                  {message.role === "user" ? (
                    <User size={16} className="text-white" />
                  ) : (
                    <Bot size={16} className="text-white" />
                  )}
                </div>
                <div
                  className={`p-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-800 shadow-sm border border-gray-100"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex mb-4 justify-start">
              <div className="flex items-end">
                <div className="flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0 bg-gray-700 mr-2">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="p-4 rounded-2xl bg-white text-gray-800 shadow-sm border border-gray-100">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-indigo-600 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="h-2 w-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Upload area - only shown when setup is complete, file not uploaded, and not in test mode */}
      {setupStage === "ready" && !file && !testMode && (
        <div className="flex justify-center mb-6 px-4">
          <div className="w-full max-w-lg">
            <div
              onClick={triggerFileInput}
              className="border-2 border-dashed border-indigo-200 rounded-xl p-8 text-center cursor-pointer hover:bg-indigo-50 transition-colors"
            >
              <div className="bg-indigo-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                <FileUp className="h-8 w-8 text-indigo-600" />
              </div>
              <p className="mt-4 text-sm font-medium text-indigo-800">
                Click to upload your resume (optional)
              </p>
              <p className="mt-1 text-xs text-indigo-500">
                PDF, DOCX up to 10MB
              </p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.doc,.docx"
            />
          </div>
        </div>
      )}

      {/* Upload status */}
      {isUploading && (
        <div className="flex justify-center mb-6">
          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
            <div className="flex space-x-1 mr-2">
              <div className="h-2 w-2 bg-indigo-600 rounded-full animate-bounce"></div>
              <div className="h-2 w-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="h-2 w-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
            <span className="text-sm font-medium text-indigo-800">Processing your resume...</span>
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          {/* Test controls - only shown when setup is complete */}
          {setupStage === "ready" && (
            <div className="flex items-center mb-3 px-2">
              <div className="flex items-center mr-4">
                <input
                  type="checkbox"
                  id="resumeCheck"
                  checked={askFromResume}
                  onChange={() => setAskFromResume(!askFromResume)}
                  disabled={!file}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="resumeCheck" className="ml-2 text-sm text-gray-700">
                  Ask questions from resume
                </label>
              </div>
              
              <button
                type="button"
                onClick={toggleTestMode}
                disabled={isLoading}
                className="flex items-center px-3 py-1 text-sm font-medium rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:bg-indigo-300"
              >
                {testMode ? (
                  <>
                    <Square size={14} className="mr-1" />
                    End Test
                  </>
                ) : (
                  <>
                    <Play size={14} className="mr-1" />
                    Start Test
                  </>
                )}
              </button>
            </div>
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
    </div>
  );
}