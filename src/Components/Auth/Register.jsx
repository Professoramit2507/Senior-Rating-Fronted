import { Link } from "react-router";
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    GraduationCap,
} from "lucide-react";
import { useState } from "react";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Register API এখানে call করবে
        console.log("Register submitted");
    };


    return (
        <div className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#f8fafc] px-4 py-8 sm:py-10">

            {/* Background Glow */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl" />

            <div className="relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-4xl border border-white bg-white shadow-2xl shadow-slate-200/70 lg:grid-cols-2">

                {/* ================= LEFT SIDE ================= */}
                <div className="relative hidden overflow-hidden bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 p-10 text-white lg:flex lg:flex-col lg:justify-between">

                    {/* Decorative Glow */}
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

                    <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative">

                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl backdrop-blur-md">
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

                        {/* Heading */}
                        <div className="mt-20">

                            <p className="text-sm font-medium text-indigo-100">
                                Join the community 🚀
                            </p>

                            <h1 className="mt-3 text-4xl font-extrabold leading-tight">
                                Your experience
                                <br />
                                matters.
                            </h1>

                            <p className="mt-5 max-w-sm text-sm leading-7 text-indigo-100">
                                Create your CampusRate account and share
                                your honest experience with seniors while
                                keeping your identity private.
                            </p>

                        </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="relative rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">

                        <p className="text-sm font-semibold">
                            🔒 Privacy first
                        </p>

                        <p className="mt-1 text-xs leading-5 text-indigo-100">
                            Your identity stays protected when you submit
                            anonymous reviews.
                        </p>

                    </div>
                </div>

                {/* ================= RIGHT SIDE ================= */}
                <div className="p-6 sm:p-10 lg:p-12">

                    {/* Mobile Logo */}
                    <div className="mb-7 flex items-center justify-center gap-2 lg:hidden">

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
                            Get started
                        </p>

                        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
                            Create your account
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Join CampusRate and start sharing your experience.
                        </p>
                    </div>

                   

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        {/* Name */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Full name
                            </label>

                            <div className="relative">
                                <User
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Your full name"
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                                />
                            </div>
                        </div>

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
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                                />
                            </div>
                        </div>

                        {/* Department + Batch */}
                        <div className="grid grid-cols-2 gap-3">

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Department
                                </label>

                                <div className="relative">
                                    <GraduationCap
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <select
                                        required
                                        className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-10 pr-2 text-sm outline-none focus:border-indigo-500 focus:bg-white"
                                    >
                                        <option value="">
                                            Select
                                        </option>
                                        <option value="CSE">
                                            CSE
                                        </option>
                                
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Batch
                                </label>

                                <select
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3.5 text-sm outline-none focus:border-indigo-500 focus:bg-white"
                                >
                                    <option value="">
                                        Select
                                    </option>
                                    <option value="7th Batch">
                                        7th Batch
                                    </option>
                                    <option value="6th Batch">
                                        6th Batch
                                    </option>
                                    <option value="5th Batch">
                                        5th Batch
                                    </option>
                                    <option value="4th Batch">
                                        4th Batch
                                    </option>
                                    <option value="3rd Batch">
                                        3rd Batch
                                    </option>
                                    <option value="2nd Batch">
                                        2nd Batch
                                    </option>
                                    <option value="1st Batch">
                                        1st Batch
                                    </option>
                                </select>
                            </div>

                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Password
                            </label>

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
                                    placeholder="Create a password"
                                    required
                                    minLength={6}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
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

                        {/* Confirm Password */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Confirm password
                            </label>

                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Confirm your password"
                                    required
                                    minLength={6}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Terms */}
                        <label className="flex cursor-pointer items-start gap-2 pt-1">
                            <input
                                type="checkbox"
                                required
                                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />

                            <span className="text-xs leading-5 text-slate-500">
                                I agree to the{" "}
                                <span className="font-semibold text-indigo-600">
                                    Terms of Service
                                </span>{" "}
                                and{" "}
                                <span className="font-semibold text-indigo-600">
                                    Privacy Policy
                                </span>
                            </span>
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                        >
                            Create Account

                            <ArrowRight
                                size={17}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </button>

                    </form>

                    {/* Login */}
                    <p className="mt-6 text-center text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-bold text-indigo-600 hover:text-purple-600"
                        >
                            Sign in
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Register;
