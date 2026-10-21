import { Link, useNavigate } from "react-router";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Sparkles,
    ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";

const Login = () => {
    const { loginUser, logoutUser } = useAuth();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        try {
            setLoading(true);

            // Firebase login
            const result = await loginUser(email, password);
            const loggedInUser = result.user;

            // Fetch user info from MongoDB backend
            const response = await fetch(
                `http://localhost:3000/user?email=${encodeURIComponent(loggedInUser.email)}`
            );

            if (!response.ok) {
                throw new Error("User record not found in system");
            }

            const userData = await response.json();

            // 1. ADMIN CHECK
            if (userData?.role === "admin") {
                await Swal.fire({
                    icon: "success",
                    title: "Welcome Admin! 👑",
                    text: "Login successful. Redirecting to Admin Panel...",
                    confirmButtonColor: "#4f46e5",
                    timer: 1500,
                    showConfirmButton: false,
                });
                navigate("/admin");
                return;
            }

            // 2. APPROVAL / PERMISSION CHECK
            if (userData?.status === "pending") {
                await logoutUser();
                await Swal.fire({
                    icon: "warning",
                    title: "Approval Pending! ⏳",
                    html: `
                        <div class="text-left space-y-2">
                            <p class="text-sm text-slate-700">
                                Hello <strong>${userData?.name || "Student"}</strong>, your registration has been received!
                            </p>
                            <div class="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
                                <strong>🔒 Admin Permission Required:</strong>
                                Your account is awaiting approval from the administration. Once an admin grants you permission from <strong>Manage Users</strong>, you will be able to log in.
                            </div>
                        </div>
                    `,
                    confirmButtonColor: "#4f46e5",
                    confirmButtonText: "I Understand",
                });
                return;
            }

            if (userData?.status === "rejected") {
                await logoutUser();
                await Swal.fire({
                    icon: "error",
                    title: "Access Restricted! 🚫",
                    text: "Your account registration was not approved by the administrator.",
                    confirmButtonColor: "#ef4444",
                });
                return;
            }

            // 3. APPROVED USER ACCESS
            await Swal.fire({
                icon: "success",
                title: "Welcome Back! 🎉",
                text: `Login successful. Welcome, ${userData?.name || "Student"}!`,
                confirmButtonColor: "#4f46e5",
                timer: 1500,
                showConfirmButton: false,
            });

            navigate("/");
        } catch (error) {
            console.error("Login error:", error);

            let errorMessage = "Something went wrong. Please try again.";
            if (
                error.code === "auth/invalid-credential" ||
                error.code === "auth/invalid-login-credentials"
            ) {
                errorMessage = "Invalid email or password!";
            } else if (error.code === "auth/user-not-found") {
                errorMessage = "No account found with this email!";
            } else if (error.code === "auth/wrong-password") {
                errorMessage = "Incorrect password!";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "Please enter a valid email address!";
            } else if (error.code === "auth/too-many-requests") {
                errorMessage = "Too many failed attempts. Please try again later.";
            } else if (error.message) {
                errorMessage = error.message;
            }

            Swal.fire({
                icon: "error",
                title: "Login Failed! ❌",
                text: errorMessage,
                confirmButtonColor: "#4f46e5",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-[calc(100vh-72px)] items-center justify-center bg-slate-950 text-white px-4 py-12">
            <div className="relative grid w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl lg:grid-cols-2 animate-fade-in">
                {/* ================= LEFT SIDE (BRANDING) ================= */}
                <div className="relative hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between border-r border-slate-800">
                    <div className="relative">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-lg shadow-xs">
                                CR
                            </div>
                            <div>
                                <h2 className="text-lg font-bold tracking-tight text-white">CampusRate</h2>
                                <p className="text-[11px] text-slate-400 font-medium">Student Mentorship Hub</p>
                            </div>
                        </div>

                        {/* Middle Pitch */}
                        <div className="mt-20">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-4">
                                <Sparkles size={12} className="text-amber-400" />
                                Verified Portal
                            </div>

                            <h1 className="text-3xl font-extrabold leading-tight text-white tracking-tight">
                                Honest feedback.
                                <br />
                                Complete anonymity.
                            </h1>

                            <p className="mt-4 text-sm leading-relaxed text-slate-400">
                                Sign in to review senior mentors, explore cross-batch evaluation metrics, and contribute to continuous peer growth.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Security Note */}
                    <div className="relative rounded-xl border border-slate-800 bg-slate-900/80 p-4">
                        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                            <ShieldCheck size={16} />
                            Zero-Trace Cryptographic Guarantee
                        </div>
                        <p className="mt-1 text-xs text-slate-400 leading-normal">
                            Your identity remains uncoupled from ratings at all times.
                        </p>
                    </div>
                </div>

                {/* ================= RIGHT SIDE (FORM) ================= */}
                <div className="p-8 sm:p-12 flex flex-col justify-center">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold mb-2">
                            Student Login
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            Sign in to your account
                        </h2>
                        <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
                            Enter your verified campus email to continue.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                        {/* Email */}
                        <div>
                            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail
                                    size={17}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="student@campus.edu"
                                    required
                                    className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="mb-1.5 flex items-center justify-between">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                                    Password
                                </label>
                            </div>
                            <div className="relative">
                                <Lock
                                    size={17}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-10 pr-11 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-xs transition hover:bg-indigo-500 disabled:opacity-60 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Register Link */}
                    <p className="mt-8 text-center text-xs text-slate-400">
                        Don't have an approved account?{" "}
                        <Link
                            to="/register"
                            className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
