import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
            <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link
                                to="/"
                                className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                            >
                                GrindGrid
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-1">
                            <Link
                                to="/"
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    isActive("/")
                                        ? "bg-indigo-100 text-indigo-700"
                                        : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                                }`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/syllabus"
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    isActive("/syllabus")
                                        ? "bg-indigo-100 text-indigo-700"
                                        : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                                }`}
                            >
                                Syllabus
                            </Link>
                            <Link
                                to="/reflection"
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    isActive("/reflection")
                                        ? "bg-indigo-100 text-indigo-700"
                                        : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                                }`}
                            >
                                Reflection
                            </Link>
                            <Link
                                to="/stats"
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    isActive("/stats")
                                        ? "bg-indigo-100 text-indigo-700"
                                        : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                                }`}
                            >
                                Stats
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button className="text-gray-600 hover:text-indigo-600">
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
