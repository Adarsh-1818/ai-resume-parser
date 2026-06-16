import { useEffect, useState } from "react";
import api from "../api/axios";
import AppLayout from "../layout/AppLayout";

export default function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/resume/history").then((res) => setData(res.data));
  }, []);

  return (
    <AppLayout>
      <h1 className="text-2xl mb-4">Scan History</h1>

      <div className="space-y-4">
        {data.map((item: any) => (
          <div key={item.id} className="bg-gray-900 p-4 rounded">
            <p className="text-green-400 text-xl">
              ATS Score: {item.atsScore}
            </p>

            <p className="text-gray-300">{item.summary}</p>
          </div>
        ))}
      </div>
    
      {data.map((item: any) => (
        <a
          href={`http://localhost:5000/api/resume/report/${item.id}`}
          className="text-blue-400 underline"
        >
          Download Report
        </a>
      ))}
    </AppLayout>
  );
}