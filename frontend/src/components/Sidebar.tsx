import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 p-5">

      <h1 className="text-xl font-bold mb-8">
        CVMatch AI
      </h1>

      <nav className="space-y-4">

        <Link to="/dashboard" className="block hover:text-blue-400">
          📊 Dashboard
        </Link>

        <Link to="/history" className="block hover:text-blue-400">
          📁 Scan History
        </Link>

        <Link to="/" className="block hover:text-red-400">
          🚪 Logout
        </Link>

      </nav>

    </div>
  );
}