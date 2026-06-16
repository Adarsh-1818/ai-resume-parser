import { Link, useNavigate } from "react-router-dom";

export default function AppLayout({ children }: any) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 space-y-6">

        <h1 className="text-lg font-semibold">AI Resume</h1>

        <nav className="space-y-3 text-sm">
          <Link className="block hover:text-black text-gray-600" to="/dashboard">
            Dashboard
          </Link>

          <Link className="block hover:text-black text-gray-600" to="/history">
            History
          </Link>
        </nav>

        <button
          onClick={logout}
          className="mt-10 text-sm text-red-500 hover:text-red-700"
        >
          Logout
        </button>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}