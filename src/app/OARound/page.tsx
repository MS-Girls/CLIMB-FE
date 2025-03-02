"use client";
import { useState } from "react";
import { ExternalLink, CheckCircle } from "lucide-react";

const companyQuestions: Record<string, Array<{ title: string; url: string; difficulty: "Easy" | "Medium" | "Hard" }>> = {
  Google: [
    {
      title: "Longest Substring Without Repeating Characters",
      url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      difficulty: "Medium"
    },
    {
      title: "Word Break",
      url: "https://leetcode.com/problems/word-break/",
      difficulty: "Medium"
    },
    {
      title: "Merge Intervals",
      url: "https://leetcode.com/problems/merge-intervals/",
      difficulty: "Medium"
    }
  ],
  Amazon: [
    {
      title: "Two Sum",
      url: "https://leetcode.com/problems/two-sum/",
      difficulty: "Easy"
    },
    {
      title: "Rotting Oranges",
      url: "https://leetcode.com/problems/rotting-oranges/",
      difficulty: "Medium"
    },
    {
      title: "LRU Cache",
      url: "https://leetcode.com/problems/lru-cache/",
      difficulty: "Medium"
    }
  ],
  Microsoft: [
    {
      title: "Word Ladder",
      url: "https://leetcode.com/problems/word-ladder/",
      difficulty: "Hard"
    },
    {
      title: "Kth Largest Element in an Array",
      url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
      difficulty: "Medium"
    },
    {
      title: "Course Schedule",
      url: "https://leetcode.com/problems/course-schedule/",
      difficulty: "Medium"
    }
  ],
  Facebook: [
    {
      title: "Valid Palindrome",
      url: "https://leetcode.com/problems/valid-palindrome/",
      difficulty: "Easy"
    },
    {
      title: "Add Binary",
      url: "https://leetcode.com/problems/add-binary/",
      difficulty: "Easy"
    },
    {
      title: "Clone Graph",
      url: "https://leetcode.com/problems/clone-graph/",
      difficulty: "Medium"
    }
  ],
  Apple: [
    {
      title: "Two Sum",
      url: "https://leetcode.com/problems/two-sum/",
      difficulty: "Easy"
    },
    {
      title: "Valid Parentheses",
      url: "https://leetcode.com/problems/valid-parentheses/",
      difficulty: "Easy"
    },
    {
      title: "Product of Array Except Self",
      url: "https://leetcode.com/problems/product-of-array-except-self/",
      difficulty: "Medium"
    }
  ],
};

// Enhanced Company logo SVGs
const companyLogos: Record<string, React.ReactNode> = {
  Google: (
    <svg viewBox="0 0 272 92" className="w-full h-full">
      <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
      <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
      <path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
      <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/>
      <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
      <path fill="#4285F4" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"/>
    </svg>
  ),
  Amazon: (
    <svg viewBox="0 0 603 182" className="w-full h-full">
      <path fill="#FF9900" d="M374.03 142.71c-34.63 25.5-84.84 39.07-128.08 39.07-60.7 0-115.41-22.4-156.84-59.69-3.24-2.93-.35-6.93 3.56-4.66 44.68 26.03 99.81 41.76 156.76 41.76 38.46 0 80.72-7.98 119.66-24.46 5.84-2.48 10.76 3.84 5.42 7.98h-.47Z"/>
      <path fill="#FF9900" d="M388.54 126.03c-4.43-5.66-29.2-2.67-40.33-1.34-3.39.37-3.91-2.54-.86-4.67 19.7-13.9 52.01-9.88 55.77-5.23 3.76 4.65-1 37.13-19.49 52.65-2.85 2.42-5.55 1.13-4.3-2.03 4.17-10.4 13.5-33.81 9.2-39.38Z"/>
      <path fill="#000000" d="M348.88 20.05V6.63c0-2.14 1.61-3.56 3.55-3.56h62.83c2.02 0 3.63 1.44 3.63 3.56v11.53c-.04 2.01-1.73 4.68-4.79 8.91l-32.53 46.47c12.09-.29 24.86 1.5 35.82 7.63 2.47 1.37 3.16 3.38 3.32 5.38v14.38c0 2.01-2.23 4.36-4.59 3.14-19.14-10.03-44.55-11.14-65.65.12-2.17 1.14-4.44-1.15-4.44-3.16v-13.67c0-2.22.03-6.03 2.28-9.42l37.67-54.01h-32.78c-2.02 0-3.63-1.42-3.63-3.55l.31-.38ZM200.91 103.51h-19.08c-1.82-.13-3.27-1.48-3.4-3.22V6.74c0-1.94 1.63-3.48 3.63-3.48h17.8c1.83.09 3.3 1.49 3.43 3.28v12.23h.35c4.63-12.37 13.38-18.15 25.15-18.15 11.95 0 19.43 5.78 24.79 18.15 4.63-12.37 15.17-18.15 26.4-18.15 8.02 0 16.76 3.3 22.14 10.71 6.05 8.26 4.82 20.21 4.82 30.74l-.03 60.45c0 1.95-1.63 3.52-3.63 3.52h-19.04c-1.9-.13-3.4-1.64-3.4-3.5V48.69c0-3.86.35-13.5-.5-17.16-1.3-6.19-5.23-7.92-10.28-7.92-4.24 0-8.67 2.83-10.47 7.37-1.8 4.54-1.63 12.16-1.63 17.71v51.9c0 1.95-1.63 3.52-3.63 3.52h-19.04c-1.9-.13-3.4-1.64-3.4-3.5V48.69c0-10.21 1.67-25.18-10.78-25.18-12.58 0-12.08 14.64-12.08 25.18v51.9c0 1.95-1.63 3.52-3.63 3.52v-.6ZM578.02 2.74c28.24 0 43.5 24.24 43.5 55.05 0 29.76-16.87 53.38-43.5 53.38-27.71 0-42.82-24.24-42.82-54.3 0-30.36 15.27-54.13 42.82-54.13Zm.17 20.05c-14.05 0-14.95 19.13-14.95 31.06 0 11.95-.17 37.42 14.78 37.42 14.77 0 15.45-20.61 15.45-33.16 0-8.26-.35-18.15-2.85-25.99-2.14-6.87-6.4-9.33-12.43-9.33ZM480.2 103.51h-19c-1.87-.13-3.37-1.64-3.37-3.5V6.62c.16-1.78 1.72-3.16 3.6-3.16h17.67c1.63.08 2.97 1.18 3.33 2.68v14.37h.35c5.34-13.36 12.78-19.77 25.9-19.77 8.52 0 16.84 3.1 22.18 11.54 4.96 7.85 4.96 21.05 4.96 30.56v61.7c-.21 1.68-1.76 3-3.6 3h-19.17c-1.72-.1-3.13-1.4-3.33-3.09V48.8c0-10.08 1.16-24.86-11.24-24.86-4.37 0-8.38 2.9-10.39 7.35-2.5 5.61-2.85 11.18-2.85 17.51v51.3c-.03 1.95-1.69 3.52-3.69 3.52l-.35-.11ZM244.65 63.85c0 7.5.18 13.75-3.6 20.41-3.05 5.44-7.9 8.8-13.28 8.8-7.37 0-11.7-5.61-11.7-13.93 0-16.37 14.66-19.35 28.58-19.35v4.07Zm19.32 46.68c-1.27 1.13-3.08 1.2-4.5.45-6.34-5.27-7.47-7.7-10.96-12.74-10.49 10.7-17.9 13.93-31.52 13.93-16.1 0-28.63-9.93-28.63-29.8 0-15.5 8.42-26.08 20.4-31.23 10.4-4.55 24.9-5.35 36-6.6V41.9c0-4.55.35-9.95-2.33-13.88-2.33-3.53-6.8-4.99-10.75-4.99-7.28 0-13.8 3.76-15.38 11.54-.33 1.74-1.6 3.45-3.35 3.52l-18.46-2c-1.55-.35-3.29-1.63-2.85-4.03C195.96 6.32 217.87 0 237.36 0c9.95 0 22.93 2.63 30.8 10.14 9.95 9.28 9.01 21.62 9.01 35.09v31.73c0 9.55 3.96 13.75 7.69 18.9 1.3 1.8 1.6 4.03-.05 5.4-4.13 3.45-11.43 9.88-15.47 13.47l-.04-.2h-.33Z"/>
    </svg>
  ),
  Microsoft: (
    <svg viewBox="0 0 23 23" className="w-full h-full">
      <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
      <path fill="#f35325" d="M1 1h10v10H1z"/>
      <path fill="#81bc06" d="M12 1h10v10H12z"/>
      <path fill="#05a6f0" d="M1 12h10v10H1z"/>
      <path fill="#ffba08" d="M12 12h10v10H12z"/>
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 48 48" className="w-full h-full">
      <path fill="#3F51B5" d="M42 37a5 5 0 0 1-5 5H11a5 5 0 0 1-5-5V11a5 5 0 0 1 5-5h26a5 5 0 0 1 5 5v26z"/>
      <path fill="#FFF" d="M34.368 25H31v13h-5V25h-3v-4h3v-2.41c.002-3.508 1.459-5.59 5.592-5.59H35v4h-2.287C31.104 17 31 17.6 31 18.723V21h4l-.632 4z"/>
    </svg>
  ),
  Apple: (
    <svg viewBox="0 0 456.008 560.035" className="w-full h-full">
      <path d="M380.844 297.529c.787 84.752 74.349 112.955 75.164 113.314-.622 1.988-11.754 40.191-38.756 79.652-23.343 34.117-47.568 68.107-85.731 68.811-37.499.691-49.557-22.236-92.429-22.236-42.859 0-56.256 21.533-91.753 22.928-36.837 1.395-64.889-36.891-88.424-70.883-48.093-69.53-84.846-196.475-35.496-282.165 24.516-42.554 68.328-69.501 115.882-70.192 36.173-.69 70.315 24.336 92.429 24.336 22.1 0 63.59-30.096 107.208-25.676 18.26.76 69.517 7.384 102.429 55.666-2.652 1.644-61.159 35.704-60.523 106.445M310.369 89.418C329.926 65.745 342.655 32.79 339.255 0 311.236 1.033 277.129 21.24 256.292 45.022c-19.893 23.103-37.271 60.099-32.565 95.514 30.424 2.365 61.606-15.797 86.642-51.118" fill="#000"/>
    </svg>
  )
};

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Hard: "bg-red-100 text-red-800"
};

export default function OARound() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  const toggleCompletion = (url: string) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(url)) {
      newCompleted.delete(url);
    } else {
      newCompleted.add(url);
    }
    setCompletedQuestions(newCompleted);
  };

  const getCompletionRate = (company: string) => {
    if (!company) return 0;
    const questions = companyQuestions[company];
    const completed = questions.filter(q => completedQuestions.has(q.url)).length;
    return Math.round((completed / questions.length) * 100);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="py-4 px-6 bg-white shadow-sm border-b border-indigo-100">
        <div className="max-w-6xl mx-auto flex items-center">
          <div className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
            <CheckCircle size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-indigo-900">Online Assessment Practice</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <p className="text-gray-600">
              Practice company-specific coding questions to prepare for technical interviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {Object.keys(companyQuestions).map((company) => (
              <button
                key={company}
                onClick={() => setSelectedCompany(company)}
                className={`flex items-center p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                  selectedCompany === company
                    ? "ring-2 ring-indigo-500 border-indigo-200 bg-indigo-50"
                    : "border-gray-200 hover:border-indigo-200 bg-white"
                }`}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-3 bg-white border border-gray-200 p-2">
                  {companyLogos[company]}
                </div>
                <div className="flex-1 text-left">
                  <span className="font-semibold text-gray-800 block">{company}</span>
                  <div className="flex items-center mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full" 
                        style={{ width: `${getCompletionRate(company)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{getCompletionRate(company)}%</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {selectedCompany && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-md flex items-center justify-center mr-3 bg-white border border-gray-200 p-1">
                      {companyLogos[selectedCompany]}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">{selectedCompany} Practice Questions</h2>
                      <p className="text-sm text-gray-500">Complete these questions to prepare for your interview</p>
                    </div>
                  </div>
                  <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    {getCompletionRate(selectedCompany)}% Complete
                  </div>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {companyQuestions[selectedCompany].map((question, index) => (
                  <div 
                    key={index}
                    className={`p-4 transition-all ${
                      completedQuestions.has(question.url)
                        ? "bg-green-50"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full mr-2 ${difficultyColors[question.difficulty]}`}>
                            {question.difficulty}
                          </span>
                          <h3 className="font-medium text-gray-800">{question.title}</h3>
                        </div>
                        <div className="mt-2 flex items-center">
                          <a 
                            href={question.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-indigo-600 text-sm font-medium hover:text-indigo-800 flex items-center"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Solve on LeetCode
                          </a>
                        </div>
                      </div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={completedQuestions.has(question.url)}
                          onChange={() => toggleCompletion(question.url)}
                          className="sr-only"
                        />
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                          completedQuestions.has(question.url) 
                            ? "bg-green-500 text-white" 
                            : "border-2 border-gray-300"
                        }`}>
                          {completedQuestions.has(question.url) && (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}