import { Link } from "react-router";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState } from "react";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Login API এখানে call করবে
        console.log("Login submitted");
    };

    const handleGoogleLogin = () => {
        // Google OAuth এখানে integrate করবে
        console.log("Continue with Google");
    };

    return (
        <div className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden bg-[#f8fafc] px-4 py-10">

            {/* Background Glow */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl" />

            <div className="relative grid w-full max-w-5xl overflow-hidden rounded-4xl border border-white bg-white shadow-2xl shadow-slate-200/70 lg:grid-cols-2">

                {/* ================= LEFT SIDE ================= */}
                <div className="relative hidden overflow-hidden bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 p-10 text-white lg:flex lg:flex-col lg:justify-between">

                    {/* Glow */}
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

                    <div className="relative">

                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                                ⭐
                            </div>

                            <div>
                                <h2 className="text-xl font-bold">
                                    CampusRate
                                </h2>

                                <p className="text-xs text-indigo-100">
                                    Anonymous Senior Rating
                                </p>
                            </div>
                        </div>

                        <div className="mt-20">
                            <p className="text-sm font-medium text-indigo-100">
                                Welcome back 👋
                            </p>

                            <h1 className="mt-3 text-4xl font-extrabold leading-tight">
                                Your voice,
                                <br />
                                your experience.
                            </h1>

                            <p className="mt-5 max-w-sm text-sm leading-7 text-indigo-100">
                                Login to rate seniors, manage your reviews
                                and share your experience with the campus
                                community.
                            </p>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="relative rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                        <p className="text-sm font-medium">
                            🔒 Your identity stays anonymous
                        </p>

                        <p className="mt-1 text-xs text-indigo-100">
                            Your personal information will never be shown
                            with your reviews.
                        </p>
                    </div>
                </div>

                {/* ================= RIGHT SIDE ================= */}
                <div className="p-6 sm:p-10 lg:p-12">

                    {/* Mobile Logo */}
                    <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 text-lg shadow-lg">
                            ⭐
                        </div>

                        <h2 className="text-xl font-extrabold text-slate-800">
                            Campus
                            <span className="bg-linear-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                                Rate
                            </span>
                        </h2>
                    </div>

                    {/* Heading */}
                    <div>
                        <p className="text-sm font-semibold text-indigo-600">
                            Welcome back
                        </p>

                        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
                            Sign in to your account
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Continue your CampusRate journey.
                        </p>
                    </div>

                    {/* Google */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                    >
                        {/* Google Icon */}
                        <svg
                            width="19"
                            height="19"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="#4285F4"
                                d="M21.35 12.23c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 21.6c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.6z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M6.54 13.69A5.85 5.85 0 0 1 6.23 12c0-.59.11-1.16.31-1.69V7.78H3.3A9.73 9.73 0 0 0 2.27 12c0 1.57.38 3.05 1.03 4.22l3.24-2.53z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 6.28c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.37 14.63 2.4 12 2.4a9.74 9.74 0 0 0-8.7 5.38l3.24 2.53C7.31 8 9.46 6.28 12 6.28z"
                            />
                        </svg>

                        Continue with Google
                    </button>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px flex-1 bg-slate-200" />

                        <span className="text-xs font-medium text-slate-400">
                            OR CONTINUE WITH EMAIL
                        </span>

                        <div className="h-px flex-1 bg-slate-200" />
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Email address
                            </label>

                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label className="text-sm font-semibold text-slate-700">
                                    Password
                                </label>

                                <Link
                                    to="/forgot-password"
                                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="••••••••"
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember */}
                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />

                            <span className="text-sm text-slate-500">
                                Remember me
                            </span>
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                        >
                            Sign In

                            <ArrowRight
                                size={17}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </button>
                    </form>

                    {/* Register */}
                    <p className="mt-7 text-center text-sm text-slate-500">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-bold text-indigo-600 hover:text-purple-600"
                        >
                            Create account
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Login;
