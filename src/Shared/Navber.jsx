import { Link, NavLink } from "react-router";
import {
    Home,
    Users,
    Star,
    MessageSquare,
    LogIn,
    UserPlus,
    LogOut,
    ShieldCheck,
} from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../Components/Hooks/useAuth";

const Navber = () => {
    const { user, dbUser, logoutUser } = useAuth();

    const handleLogout = async () => {
        try {
            await logoutUser();

            Swal.fire({
                icon: "success",
                title: "Logged Out",
                text: "You have been successfully signed out.",
                confirmButtonColor: "#0f172a",
                timer: 1600,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error("Logout error:", error);

            Swal.fire({
                icon: "error",
                title: "Logout Failed",
                text: "Something went wrong. Please try again.",
                confirmButtonColor: "#0f172a",
            });
        }
    };

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
            isActive
                ? "bg-slate-900 text-white border border-slate-800 shadow-xs"
                : "text-slate-300 hover:bg-slate-900/70 hover:text-white"
        }`;

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-18 items-center justify-between">
                    {/* ================= LOGO ================= */}
                    <Link
                        to="/"
                        className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
                    >
                        {/* Logo Icon */}
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs group-hover:bg-indigo-500 transition-colors">
                            <Star className="h-5 w-5 fill-white text-white" />
                        </div>

                        {/* Logo Text */}
                        <div>
                            <h1 className="text-xl font-extrabold tracking-tight text-white">
                                Campus<span className="text-indigo-400">Rate</span>
                            </h1>

                            <p className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">
                                Anonymous Senior Rating
                            </p>
                        </div>
                    </Link>

                    {/* ================= NAVIGATION ================= */}
                    <div className="hidden items-center gap-1.5 md:flex">
                        <NavLink to="/" end className={navLinkClass}>
                            <Home size={16} />
                            Home
                        </NavLink>

                        <NavLink to="/seniors" className={navLinkClass}>
                            <Users size={16} />
                            Seniors
                        </NavLink>

                        <NavLink to="/my-ratings" className={navLinkClass}>
                            <Star size={16} />
                            My Ratings
                        </NavLink>

                        <NavLink to="/reviews" className={navLinkClass}>
                            <MessageSquare size={16} />
                            Reviews
                        </NavLink>
                    </div>

                    {/* ================= RIGHT SIDE ================= */}
                    <div className="flex items-center gap-2.5">
                        {user ? (
                            <>
                                {dbUser?.role === "admin" && (
                                    <Link
                                        to="/admin"
                                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-slate-800"
                                    >
                                        <ShieldCheck size={14} className="text-indigo-400" />
                                        <span>Admin Panel</span>
                                    </Link>
                                )}

                                {/* Profile info */}
                                <div className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-1.5">
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName || "User"}
                                            className="h-8 w-8 rounded-lg object-cover ring-1 ring-slate-700"
                                        />
                                    ) : (
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-bold text-xs text-white">
                                            {user.displayName?.charAt(0) || user.email?.charAt(0)?.toUpperCase() || "U"}
                                        </div>
                                    )}

                                    <div className="hidden text-left sm:block">
                                        <p className="max-w-[130px] truncate text-xs font-bold text-white leading-tight">
                                            {dbUser?.name || user.displayName || "Student"}
                                        </p>
                                        <p className="max-w-[130px] truncate text-[10px] text-slate-400 leading-tight">
                                            {dbUser?.batch ? `${dbUser.batch} • ` : ""}{user.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Logout */}
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-red-900 hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
                                >
                                    <LogOut size={14} />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Login */}
                                <Link
                                    to="/login"
                                    className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-bold text-slate-200 transition hover:bg-slate-800 hover:text-white"
                                >
                                    <LogIn size={14} />
                                    <span>Sign In</span>
                                </Link>

                                {/* Register */}
                                <Link
                                    to="/register"
                                    className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-500 hover:scale-[1.02]"
                                >
                                    <UserPlus size={14} />
                                    <span>Register</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navber;
