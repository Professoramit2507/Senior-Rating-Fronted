import { useState } from "react";
import { NavLink, Link, Outlet, useNavigate } from "react-router";
import {
    LayoutDashboard,
    Users,
    MessageSquare,
    Home,
    LogOut,
    X,
    ShieldCheck,
    Star,
} from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You will be logged out of the admin panel.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#4f46e5",
                cancelButtonColor: "#ef4444",
                confirmButtonText: "Yes, logout",
            });

            if (result.isConfirmed) {
                await logoutUser();
                await Swal.fire({
                    icon: "success",
                    title: "Logged Out!",
                    text: "Admin logged out successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });
                navigate("/login");
            }
        } catch (error) {
            console.error("Logout error:", error);
            Swal.fire({
                icon: "error",
                title: "Logout Failed!",
                text: error?.message || "Something went wrong.",
            });
        }
    };

    const navItems = [
        {
            to: "/admin",
            label: "Dashboard",
            icon: LayoutDashboard,
            end: true,
        },
        {
            to: "/admin/users",
            label: "Manage Users",
            icon: Users,
            end: false,
        },
        {
            to: "/admin/reviews",
            label: "Manage Reviews",
            icon: MessageSquare,
            end: false,
        },
    ];

    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Mobile Backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-950 text-white transition-transform duration-300 ease-in-out ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                }`}
            >
                {/* Header / Brand */}
                <div className="flex h-[72px] items-center justify-between border-b border-white/10 px-6">
                    <Link
                        to="/admin"
                        onClick={closeSidebar}
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 shadow-md">
                            <Star size={20} className="fill-white text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-extrabold tracking-tight">
                                Campus<span className="text-indigo-400">Rate</span>
                            </h1>
                            <p className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">
                                Administration
                            </p>
                        </div>
                    </Link>

                    {/* Mobile Close Button */}
                    <button
                        onClick={closeSidebar}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto px-4 py-6">
                    <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Admin Menu
                    </p>

                    <nav className="space-y-1.5">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.end}
                                    onClick={closeSidebar}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                                            isActive
                                                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30"
                                                : "text-slate-300 hover:bg-white/10 hover:text-white"
                                        }`
                                    }
                                >
                                    <Icon size={19} />
                                    <span>{item.label}</span>
                                </NavLink>
                            );
                        })}

                        <div className="my-4 border-t border-white/10 pt-4">
                            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                General
                            </p>

                            <Link
                                to="/"
                                onClick={closeSidebar}
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
                            >
                                <Home size={19} />
                                <span>Back to Home</span>
                            </Link>
                        </div>
                    </nav>
                </div>

                {/* Sidebar Footer / Profile & Logout */}
                <div className="border-t border-white/10 p-4">
                    {user && (
                        <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-sm">
                                {user?.displayName?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || "A"}
                            </div>
                            <div className="overflow-hidden">
                                <p className="truncate text-xs font-bold text-white">
                                    {user?.displayName || "Admin User"}
                                </p>
                                <p className="truncate text-[10px] text-slate-400">
                                    {user?.email}
                                </p>
                                <div className="mt-1 flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                                    <ShieldCheck size={12} />
                                    <span>Admin Role</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="lg:pl-64">
                {/* Admin Navbar */}
                <AdminNavbar
                    onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
                    onLogout={handleLogout}
                />

                {/* Page Content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
