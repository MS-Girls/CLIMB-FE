"use client";
import { useState, useEffect } from "react";
import { ExternalLink, CheckCircle } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function OARound() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Record<string, Array<{ name: string; practiceLink: string }>>>({});
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCompany) {
      setLoading(true);
      setError(null);

      fetch(`${API_BASE_URL}/api/BlobStorage/get-problems?companyName=${selectedCompany.toLowerCase()}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch problems");
          }
          return res.json();
        })
        .then((data) => {
          setQuestions((prev) => ({ ...prev, [selectedCompany]: data }));
        })
        .catch((err) => {
          console.error("Error fetching problems:", err);
          setError("Could not load problems. Please try again.");
        })
        .finally(() => setLoading(false));
    }
  }, [selectedCompany]);

  const toggleCompletion = (url: string) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(url)) {
      newCompleted.delete(url);
    } else {
      newCompleted.add(url);
    }
    setCompletedQuestions(newCompleted);
  };

  // Calculate Progress for Progress Bar
  const getCompletionRate = () => {
    if (!selectedCompany || !questions[selectedCompany]) return 0;
    const totalQuestions = questions[selectedCompany].length;
    const completed = questions[selectedCompany].filter(q => completedQuestions.has(q.practiceLink)).length;
    return Math.round((completed / totalQuestions) * 100);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <header className="py-4 px-6 bg-white shadow-sm border-b border-gray-300">
        <h1 className="text-2xl font-bold text-indigo-900 flex items-center">
          Online Assessment Practice
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto">
          {/* Company Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {["Google", "Amazon", "Microsoft", "Facebook", "Apple"].map((company) => (
              <button
                key={company}
                onClick={() => setSelectedCompany(company)}
                className={`flex items-center justify-center p-4 rounded-lg text-lg font-semibold transition-all border shadow-sm ${
                  selectedCompany === company
                    ? "ring-2 ring-indigo-500 bg-indigo-100 text-indigo-900"
                    : "border-gray-300 bg-white hover:bg-gray-100"
                }`}
              >
                {company}
              </button>
            ))}
          </div>

          {/* Loading / Error Handling */}
          {loading && <p className="text-gray-600 text-center">Loading problems...</p>}
          {error && <p className="text-red-600 text-center">{error}</p>}

          {/* Display Problems & Progress */}
          {selectedCompany && questions[selectedCompany] && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-md p-5">
              {/* Progress Bar */}
              <div className="mb-5">
                <h2 className="text-lg font-bold text-gray-800 mb-2">{selectedCompany} Practice Questions</h2>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-indigo-600 h-3 rounded-full transition-all"
                    style={{ width: `${getCompletionRate()}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{getCompletionRate()}% Complete</p>
              </div>

              {/* Questions List */}
              <div className="divide-y divide-gray-200">
                {questions[selectedCompany].map((question, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                    <div className="flex-1">
                      {/* ✅ Problem Name */}
                      <a 
                        href={question.practiceLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-indigo-700 font-medium hover:underline text-lg"
                      >
                        {question.name}
                      </a>
                      {/* ✅ LeetCode Link */}
                      <a
                        href={question.practiceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 text-sm font-medium flex items-center mt-1"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Solve on LeetCode
                      </a>
                    </div>
                    {/* ✅ Completion Checkbox */}
                    <input
                      type="checkbox"
                      checked={completedQuestions.has(question.practiceLink)}
                      onChange={() => toggleCompletion(question.practiceLink)}
                      className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
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
