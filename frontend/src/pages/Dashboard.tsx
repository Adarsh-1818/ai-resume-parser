import { useState } from "react";
import api from "../api/axios";
import AppLayout from "../layout/AppLayout";

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [job, setJob] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    try {
      setLoading(true);
  
      const formData = new FormData();
      if (file) formData.append("file", file);
      formData.append("jobDescription", job);
  
      const res = await api.post("/resume/parse", formData);
  
      setResult(res.data);
    } catch (err) {
      alert("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
        <div className = "space-y-8">  
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">AI Resume Parser</h1>
          <p className="text-gray-500 text-sm mt-1">
            Upload CV and get ATS score + insights
          </p>
        </div>

        {/* Upload Card */}
        <div className="border border-gray-300 rounded-xl p-6 bg-white hover:border-black transition cursor-pointer">
        <label className="block text-sm font-medium mb-2">
            Upload CV (PDF)
        </label>

          <input
             type="file"
             onChange={(e) => setFile(e.target.files?.[0] || null)}
             className="block w-full text-sm cursor-pointer"
          />
           <p className="text-xs text-gray-400 mt-2">
    Supported format: PDF only
  </p>

          <textarea
            rows={6}
            placeholder="Paste job description..."
            className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-gray-200"
            onChange={(e) => setJob(e.target.value)}
          />

<button
  onClick={analyze}
  disabled={loading || !file || !job}
  className="bg-black text-white px-6 py-2 rounded-lg 
             hover:bg-gray-800 transition cursor-pointer"
>
  {loading ? "Analysing CV..." : "Analyse Resume"}
  {loading && (
  <p className="text-sm text-gray-500 mt-2 animate-pulse">
    AI is analysing your CV against job description...
  </p>
)}
</button>

        </div>

        {/* Result */}
        {result && (
          <div className="bg-white border rounded-xl p-6 space-y-3">

            <h2 className="text-lg font-semibold">Result</h2>

            <p className="text-gray-700">
              ATS Score: <span className="font-semibold">{result.atsScore}</span>
            </p>

            <p className="text-gray-600">{result.recommendation}</p>

            <div>
              <h3 className="font-medium mb-2">Missing Skills</h3>
              <ul className="list-disc pl-5 text-gray-600">
                {result.missingSkills?.map((s: string) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

          </div>
        )}

      </div>
    </div>
    </div>
    </AppLayout>
  );
}