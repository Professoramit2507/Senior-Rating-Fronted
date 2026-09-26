import { Link } from "react-router";
import {
    Home,
    Users,
    Star,
    MessageSquare,
    LogIn,
    UserPlus,
    Sparkles,
    LogOut,
    User,
} from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../Components/Hooks/useAuth";

const Navber = () => {
    const { user, logoutUser } = useAuth();

    const handleLogout = async () => {
        try {
            await logoutUser();

            Swal.fire({
                icon: "success",
                title: "Logged Out!",
                text: "You have been successfully logged out.",
                confirmButtonColor: "#4f46e5",
                timer: 1800,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error("Logout error:", error);

            Swal.fire({
                icon: "error",
                title: "Logout Failed!",
                text: "Something went wrong. Please try again.",
                confirmButtonColor: "#4f46e5",
            });
        }
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl">

            {/* Animated Gradient Line */}
            <div className="h-1 w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-18 items-center justify-between">

                    {/* ================= LOGO ================= */}
                    <Link
                        to="/"
                        className="group flex items-center gap-3"
                    >
                        {/* Logo Icon */}
                        <div
                            className="relative flex h-11 w-11 items-center justify-center rounded-2xl
                            bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500
                            shadow-lg shadow-indigo-200
                            transition-all duration-300
                            group-hover:rotate-6 group-hover:scale-110"
                        >
                            <Star
                                className="h-6 w-6 fill-white text-white transition-transform duration-300 group-hover:scale-110"
                            />

                            <Sparkles
                                size={13}
                                className="absolute -right-1 -top-1 animate-ping text-yellow-400"
                            />
                        </div>

                        {/* Logo Text */}
                        <div>
                            <h1 className="text-xl font-extrabold tracking-tight text-slate-800">
                                Campus
                                <span className="bg-linear-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                                    Rate
                                </span>
                            </h1>

                            <p className="text-[10px] font-medium tracking-wide text-slate-400">
                                Anonymous Senior Rating
                            </p>
                        </div>
                    </Link>

                    {/* ================= NAVIGATION ================= */}
                    <div className="hidden items-center gap-1 md:flex">

                        {/* Home */}
                        <Link
                            to="/"
                            className="group relative flex items-center gap-2 rounded-xl px-4 py-2.5 font-medium text-slate-600 transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                            <Home
                                size={18}
                                className="transition-transform group-hover:-translate-y-0.5"
                            />
                            Home

                            <span className="absolute bottom-1 left-4 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-indigo-500 transition-transform duration-300 group-hover:scale-x-100" />
                        </Link>

                        {/* Seniors */}
                        <Link
                            to="/seniors"
                            className="group relative flex items-center gap-2 rounded-xl px-4 py-2.5 font-medium text-slate-600 transition-all duration-300 hover:bg-purple-50 hover:text-purple-600"
                        >
                            <Users
                                size={18}
                                className="transition-transform group-hover:scale-110"
                            />
                            Seniors

                            <span className="absolute bottom-1 left-4 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-purple-500 transition-transform duration-300 group-hover:scale-x-100" />
                        </Link>

                        {/* My Ratings */}
                        <Link
                            to="/my-ratings"
                            className="group relative flex items-center gap-2 rounded-xl px-4 py-2.5 font-medium text-slate-600 transition-all duration-300 hover:bg-yellow-50 hover:text-yellow-600"
                        >
                            <Star
                                size={18}
                                className="transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
                            />
                            My Ratings

                            <span className="absolute bottom-1 left-4 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-yellow-500 transition-transform duration-300 group-hover:scale-x-100" />
                        </Link>

                        {/* Reviews */}
                        <Link
                            to="/reviews"
                            className="group relative flex items-center gap-2 rounded-xl px-4 py-2.5 font-medium text-slate-600 transition-all duration-300 hover:bg-pink-50 hover:text-pink-600"
                        >
                            <MessageSquare
                                size={18}
                                className="transition-transform group-hover:-translate-y-0.5"
                            />
                            Reviews

                            <span className="absolute bottom-1 left-4 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-pink-500 transition-transform duration-300 group-hover:scale-x-100" />
                        </Link>

                    </div>

                    {/* ================= RIGHT SIDE ================= */}
                    <div className="flex items-center gap-2 sm:gap-3">

                        {user ? (
                            <>
                                {/* ================= PROFILE ================= */}
                                <Link
                                    to="/profile"
                                    className="group flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-slate-50 sm:gap-3 sm:px-3"
                                >

                                    {/* Profile Image */}
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName || "User"}
                                            className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-100 transition group-hover:ring-indigo-300"
                                        />
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-600 text-white shadow-md">
                                            <User size={19} />
                                        </div>
                                    )}

                                    {/* User Info */}
                                    <div className="hidden text-left sm:block">
                                        <p className="max-w-32.5 truncate text-sm font-bold text-slate-800">
                                            {user.name || "User"}
                                        </p>

                                        <p className="max-w-37.5 truncate text-xs text-slate-400">
                                            {user.email}
                                        </p>
                                    </div>

                                </Link>

                                {/* ================= LOGOUT ================= */}
                                <button
                                    onClick={handleLogout}
                                    className="group flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 transition-all duration-300 hover:bg-red-100 hover:text-red-700 sm:px-4"
                                >
                                    <LogOut
                                        size={18}
                                        className="transition-transform group-hover:translate-x-0.5"
                                    />

                                    <span className="hidden sm:inline">
                                        Logout
                                    </span>
                                </button>
                            </>
                        ) : (
                            <>
                                {/* ================= LOGIN ================= */}
                                <Link
                                    to="/login"
                                    className="group flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-600 sm:px-4"
                                >
                                    <LogIn
                                        size={18}
                                        className="transition-transform group-hover:-translate-x-0.5"
                                    />

                                    <span className="hidden sm:inline">
                                        Login
                                    </span>
                                </Link>

                                {/* ================= REGISTER ================= */}
                                <Link
                                    to="/register"
                                    className="group flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-200 sm:px-5"
                                >
                                    <UserPlus
                                        size={18}
                                        className="transition-transform group-hover:scale-110"
                                    />

                                    <span className="hidden sm:inline">
                                        Register
                                    </span>
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
