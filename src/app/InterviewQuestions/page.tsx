"use client";
import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { Send, FileUp, Bot, User, Paperclip } from "lucide-react";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setIsUploading(true);

      setTimeout(() => {
        setIsUploading(false);
        setMessages((prev) => [
          ...prev,
          { role: "user", content: `Uploaded file: ${e.target.files![0].name}` },
          { role: "bot", content: `Received: ${e.target.files![0].name}. What would you like to know?` },
        ]);
        scrollToBottom();
      }, 1500);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: `Here's my response to: \"${input}\"` },
      ]);
      scrollToBottom();
    }, 1000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

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
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Upload area */}
      {!file && (
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
                Click to upload a file
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
            <span className="text-sm font-medium text-indigo-800">Processing your file...</span>
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex items-center">
            <button
              type="button"
              onClick={triggerFileInput}
              className="p-2 text-gray-500 hover:text-indigo-600 focus:outline-none"
            >
              <Paperclip size={20} />
            </button>
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
              />
            </div>
            <button
              type="submit"
              disabled={input.trim() === ""}
              className={`p-3 rounded-full focus:outline-none ${
                input.trim() === ""
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