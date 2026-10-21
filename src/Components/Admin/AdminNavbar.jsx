import { Menu, LogOut, ShieldCheck, Home } from "lucide-react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";

const AdminNavbar = ({ onToggleSidebar, onLogout }) => {
    const { user, logoutUser } = useAuth();

    const handleLogout = async () => {
        if (onLogout) {
            onLogout();
            return;
        }

        try {
            await logoutUser();
            await Swal.fire({
                icon: "success",
                title: "Logged Out!",
                text: "Admin logged out successfully.",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Logout Failed!",
                text: error?.message || "Failed to logout",
            });
        }
    };

    return (
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
            <div className="flex h-[72px] items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Left: Mobile hamburger & Section Info */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onToggleSidebar}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
                        aria-label="Toggle Sidebar"
                    >
                        <Menu size={20} />
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                            <ShieldCheck size={14} />
                            Admin Panel
                        </span>
                        <span className="hidden text-sm text-slate-400 sm:inline">|</span>
                        <h2 className="hidden text-sm font-semibold text-slate-700 sm:inline">
                            CampusRate Administration
                        </h2>
                    </div>
                </div>

                {/* Right: Quick Actions, Profile & Logout */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                        <Home size={15} />
                        <span className="hidden sm:inline">View Site</span>
                    </Link>

                    {user && (
                        <div className="hidden items-center gap-2.5 rounded-xl bg-slate-50 px-3 py-1.5 md:flex">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white shadow-xs">
                                {user?.displayName?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || "A"}
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-bold text-slate-800 leading-tight">
                                    {user?.displayName || "Admin User"}
                                </p>
                                <p className="text-[10px] text-slate-400 max-w-[120px] truncate leading-tight">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 hover:text-red-700"
                    >
                        <LogOut size={16} />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;
