import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, LayoutDashboard, Package, FolderGit2, MessageSquare, Calculator, Menu, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("adminAuth") === "true"
  );
  const [password, setPassword] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isSidebarOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
    } else {
      alert("Invalid password. Hint: admin123");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    navigate("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-oswald">
            Admin Login
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E] sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8B1E1E] hover:bg-[#6A1616] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B1E1E]"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { name: "Quotation Settings", href: "/admin/calculator", icon: Calculator },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile Header for Sidebar Toggle */}
      <div className="md:hidden flex items-center justify-between bg-[#111C27] text-white p-4 shrink-0">
        <Link to="/" className="text-lg font-oswald font-bold tracking-wider hover:text-[#F4C522] transition-colors">
          RUDRA ADMIN
        </Link>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#1A2A3A] text-white flex flex-col shrink-0 transform transition-transform duration-300 ease-in-out md:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 hidden md:flex items-center px-6 bg-[#111C27] border-b border-gray-800">
          <Link to="/" className="text-xl font-oswald font-bold tracking-wider hover:text-[#F4C522] transition-colors">
            RUDRA ADMIN
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-[#2A3F54] hover:text-white",
                    isActive ? "bg-[#2A3F54] text-white" : "text-gray-300"
                  )}
                >
                  <item.icon className={cn(
                    "mr-3 flex-shrink-0 h-5 w-5 group-hover:text-gray-300",
                    isActive ? "text-gray-300" : "text-gray-400"
                  )} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-red-900 hover:text-white transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 sm:px-8 shrink-0">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">Admin Control Panel</h1>
          <div className="text-xs sm:text-sm text-gray-500 hidden sm:block">Logged in as Administrator</div>
        </header>
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
