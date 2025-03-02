"use client";

import { useState } from "react";
import { FileText, Briefcase, Search, Loader2, Building, MapPin, Calendar, Clock, DollarSign, ExternalLink } from "lucide-react";

export default function JobSearching() {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSearch = async () => {
    if (!file) {
      alert("Please upload a resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);

    try {
      const response = await fetch("/api/job-search", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      // Using mock data with more details for UI enhancement
      setResults(data.jobs ? data.jobs.map((job: string, i: number) => ({
        id: i,
        title: job,
        company: "Company " + (i + 1),
        location: "Location " + (i + 1),
        salary: "$80k - $120k",
        type: i % 2 === 0 ? "Full-time" : "Contract",
        posted: "3 days ago",
        matchScore: Math.floor(Math.random() * 30) + 70 // Random score between 70-99
      })) : []);
    } catch (error) {
      console.error("Error searching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-64 p-8">
      <div className="bg-gradient-to-r from-white-50 to-indigo-50 p-8 rounded-xl mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Find Your Perfect Job Match</h2>
        <p className="text-gray-600 mb-6 max-w-2xl">Upload your resume and our AI-powered job matching system will analyze your skills and experience to find the most relevant opportunities for you.</p>
        
        <div className="flex flex-col gap-6 items-center">
          <label htmlFor="resume-upload" className="w-full max-w-2xl">
            <div className="border-2 border-dashed border-blue-300 bg-white/70 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-blue-50 transition cursor-pointer group">
              <div className="bg-blue-100 rounded-full p-4 inline-flex mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-blue-700 font-medium text-lg mb-1">
                {file ? file.name : "Drag & drop or click to upload your resume"}
              </p>
              <p className="text-sm text-gray-500 mb-2">Supports PDF, DOCX files (Max size: 5MB)</p>
              {file && (
                <div className="bg-blue-100 text-blue-800 text-xs font-medium py-1 px-3 rounded-full inline-flex items-center">
                  <FileText className="h-3 w-3 mr-1" /> Resume uploaded
                </div>
              )}
            </div>
            <input 
              id="resume-upload"
              type="file" 
              accept=".pdf,.docx" 
              onChange={handleFileChange} 
              className="hidden" 
            />
          </label>
          
          <button
            onClick={handleSearch}
            disabled={loading || !file}
            className={`bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg text-md max-w-xs
              ${loading || !file ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 transform hover:-translate-y-1'}`}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Searching Jobs...
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                Find Matching Jobs
              </>
            )}
          </button>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <span>Job Matches</span>
              <span className="bg-blue-100 text-blue-800 text-sm py-1 px-3 rounded-full">{results.length} results</span>
            </h2>
            <div className="text-sm text-gray-500">
              Sorted by best match
            </div>
          </div>
          
          <div className="space-y-4">
            {results.map((job) => (
              <div 
                key={job.id} 
                className="p-5 hover:bg-gray-50 transition rounded-lg border border-gray-200 hover:border-blue-200 group"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-700">{job.title}</h3>
                    <div className="flex items-center gap-3 mt-2 text-gray-600 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Posted {job.posted}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 text-green-800 font-bold rounded-full py-1 px-3 text-sm">
                      {job.matchScore}% Match
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <button className="bg-blue-50 text-blue-700 text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-600 hover:text-white transition flex items-center gap-1 group-hover:shadow-sm">
                    View Details
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : loading ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 bg-blue-600/20 rounded-full animate-ping"></div>
            <div className="relative bg-blue-100 rounded-full p-4">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Analyzing Your Resume</h3>
          <p className="text-gray-600 max-w-md mx-auto">We're scanning thousands of job listings to find your perfect matches based on skills and experience...</p>
        </div>
      ) : file ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200 border-dashed">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Ready to Search</h3>
          <p className="text-gray-500">Click "Find Matching Jobs" to start your personalized job search</p>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200 border-dashed">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Resume Uploaded</h3>
          <p className="text-gray-500">Upload your resume to see matching job opportunities</p>
        </div>
      )}
    </div>
  );
}