import { Link, Outlet } from "react-router";
import {
    Users,
    MessageSquare,
    LayoutDashboard,
    LogOut,
} from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";

const AdminNavbar = () => {
    const { logoutUser } = useAuth();

    const handleLogout = async () => {
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
                text: error.message,
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">

                <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6">

                    {/* Logo */}
                    <Link
                        to="/admin"
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-xl text-white shadow-lg">
                            ⭐
                        </div>

                        <div>
                            <h1 className="text-xl font-extrabold text-slate-800">
                                Campus
                                <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                                    Rate
                                </span>
                            </h1>

                            <p className="text-[10px] font-medium tracking-wide text-slate-400">
                                Admin Panel
                            </p>
                        </div>
                    </Link>

                    {/* Menu */}
                    <div className="flex items-center gap-2">

                        <Link
                            to="/admin"
                            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                        >
                            <LayoutDashboard size={18} />

                            <span className="hidden sm:block">
                                Dashboard
                            </span>
                        </Link>

                        <Link
                            to="/admin/users"
                            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                        >
                            <Users size={18} />

                            <span className="hidden sm:block">
                                Users
                            </span>
                        </Link>

                        <Link
                            to="/admin/reviews"
                            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-pink-50 hover:text-pink-600"
                        >
                            <MessageSquare size={18} />

                            <span className="hidden sm:block">
                                Reviews
                            </span>
                        </Link>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="ml-1 flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                        >
                            <LogOut size={18} />

                            <span className="hidden sm:block">
                                Logout
                            </span>
                        </button>

                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <main>
                <Outlet />
            </main>

        </div>
    );
};

export default AdminNavbar;
