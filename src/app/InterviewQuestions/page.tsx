"use client";
import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { Send, FileUp, Bot, User } from "lucide-react";
import { TextField, InputAdornment, Button } from "@mui/material";

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
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="py-4 px-6 border-b bg-white">
        <h1 className="text-xl font-bold text-center">ChatBot Assistant</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-full mx-auto">
          {messages.map((message, index) => (
            <div key={index} className={`flex mb-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex w-full ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`flex items-center justify-center h-8 w-8 rounded-full mx-2 ${message.role === "user" ? "bg-primary text-white" : "bg-secondary-200 text-white"}`}>
                  {message.role === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-3 rounded-lg w-full ${message.role === "user" ? "bg-primary text-white text-right" : "bg-secondary-200 text-white"}`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {!file && (
        <div className="flex justify-center my-6">
          <div className="w-full max-w-md">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <FileUp className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Click to upload a file</p>
              <p className="mt-1 text-xs text-gray-500">PDF, DOCX up to 10MB</p>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf,.doc,.docx" />
          </div>
        </div>
      )}

      {isUploading && (
        <div className="flex justify-center mb-6">
          <div className="animate-pulse flex items-center">
            <div className="h-2 w-2 bg-primary rounded-full mr-1"></div>
            <div className="h-2 w-2 bg-primary rounded-full mr-1 animation-delay-200"></div>
            <div className="h-2 w-2 bg-primary rounded-full animation-delay-400"></div>
            <span className="ml-2 text-sm text-gray-600">Uploading...</span>
          </div>
        </div>
      )}

      <div className="border-t p-4">
        <TextField
          variant="outlined"
          placeholder="Type your message..."
          fullWidth
          className="bg-white rounded-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button variant="contained" onClick={handleSubmit}>
                  <Send size={16} />
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
}