export default function ScoreCard({ score }: any) {
    return (
      <div className="bg-gray-900 p-6 rounded-xl">
  
        <h2 className="text-gray-400">ATS Score</h2>
  
        <div className="text-5xl font-bold text-green-400 mt-2">
          {score}/100
        </div>
  
        <div className="w-full bg-gray-800 h-2 rounded mt-4">
          <div
            className="bg-green-500 h-2 rounded"
            style={{ width: `${score}%` }}
          />
        </div>
  
      </div>
    );
  }