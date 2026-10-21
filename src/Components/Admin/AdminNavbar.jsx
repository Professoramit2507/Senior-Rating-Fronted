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
        <header className="sticky top-0 z-30 border-b border-slate-900 bg-slate-950/95 backdrop-blur-md shadow-xs">
            <div className="flex h-[72px] items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Left: Mobile hamburger & Section Info */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onToggleSidebar}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-300 transition hover:bg-slate-800 lg:hidden cursor-pointer"
                        aria-label="Toggle Sidebar"
                    >
                        <Menu size={18} />
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-300">
                            <ShieldCheck size={13} className="text-indigo-400" />
                            Admin Console
                        </span>
                        <span className="hidden text-xs text-slate-700 sm:inline">|</span>
                        <h2 className="hidden text-xs font-semibold text-slate-400 sm:inline">
                            CampusRate Central Control
                        </h2>
                    </div>
                </div>

                {/* Right: Quick Actions, Profile & Logout */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                    >
                        <Home size={14} />
                        <span className="hidden sm:inline">Public Site</span>
                    </Link>

                    {user && (
                        <div className="hidden items-center gap-2.5 rounded-xl bg-slate-900 border border-slate-800 px-3 py-1.5 md:flex">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white shadow-xs">
                                {user?.displayName?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || "A"}
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-bold text-white leading-tight">
                                    {user?.displayName || "Admin User"}
                                </p>
                                <p className="text-[10px] text-slate-400 max-w-[120px] truncate leading-tight">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 rounded-xl bg-red-500/10 border border-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500 hover:text-white cursor-pointer"
                    >
                        <LogOut size={14} />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;
