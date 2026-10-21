import { Link, useNavigate } from "react-router";
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    GraduationCap,
    Sparkles,
    ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
    const { createUser, logoutUser } = useAuth();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        department: "",
        batch: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            name,
            email,
            department,
            batch,
            password,
            confirmPassword,
        } = formData;

        if (password !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Password Mismatch!",
                text: "Password and Confirm Password do not match.",
                confirmButtonColor: "#4f46e5",
            });
            return;
        }

        if (password.length < 6) {
            Swal.fire({
                icon: "warning",
                title: "Weak Password!",
                text: "Password must be at least 6 characters.",
                confirmButtonColor: "#4f46e5",
            });
            return;
        }

        try {
            setLoading(true);

            // Firebase Registration
            const result = await createUser(email, password, name);

            // MongoDB User Record
            const userInfo = {
                firebaseUid: result.user.uid,
                name: name,
                email: email,
                department: department,
                batch: batch,
                role: "user",
                status: "pending", // Requires admin approval
                createdAt: new Date().toISOString(),
            };

            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to save user in database");
            }

            // Immediately sign out so unapproved user cannot access platform
            await logoutUser();

            await Swal.fire({
                icon: "info",
                title: "Registration Submitted! ⏳",
                html: `
                    <div class="text-left space-y-2">
                        <p class="text-sm text-slate-700">
                            Your account registration for <strong>${email}</strong> has been created.
                        </p>
                        <div class="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
                            <strong>🔒 Admin Verification Required:</strong>
                            Your account is set to <strong>Pending Approval</strong>. Once an administrator approves your batch credentials in Manage Users, you will be able to log in.
                        </div>
                    </div>
                `,
                confirmButtonColor: "#4f46e5",
                confirmButtonText: "Return to Login",
            });

            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error);

            let errorMessage = "Something went wrong. Please try again.";
            if (error.code === "auth/email-already-in-use") {
                errorMessage = "This email is already registered!";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "Invalid email address!";
            } else if (error.code === "auth/weak-password") {
                errorMessage = "Password is too weak!";
            } else if (error.message) {
                errorMessage = error.message;
            }

            Swal.fire({
                icon: "error",
                title: "Registration Failed!",
                text: errorMessage,
                confirmButtonColor: "#4f46e5",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-[calc(100vh-72px)] bg-slate-950 text-white px-4 py-12 flex items-center justify-center">
            <div className="relative mx-auto grid w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl lg:grid-cols-2 animate-fade-in">
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

                        {/* Pitch */}
                        <div className="mt-16">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-4">
                                <Sparkles size={12} className="text-amber-400" />
                                Student Verification
                            </div>

                            <h1 className="text-3xl font-extrabold leading-tight text-white tracking-tight">
                                Join the verified student network.
                            </h1>

                            <p className="mt-4 text-sm leading-relaxed text-slate-400">
                                Register your academic batch credentials to unlock peer ratings, evaluate mentors, and build a more transparent campus community.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Security Note */}
                    <div className="relative rounded-xl border border-slate-800 bg-slate-900/80 p-4">
                        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                            <ShieldCheck size={16} />
                            Peer Privacy Guaranteed
                        </div>
                        <p className="mt-1 text-xs text-slate-400 leading-normal">
                            All ratings are severed from your student identity upon submission.
                        </p>
                    </div>
                </div>

                {/* ================= RIGHT SIDE (FORM) ================= */}
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold mb-2">
                            New Account
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            Create your account
                        </h2>
                        <p className="mt-1 text-xs text-slate-400">
                            Please provide your official university details for batch validation.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
                        {/* Full Name */}
                        <div>
                            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-300">
                                Full name
                            </label>
                            <div className="relative">
                                <User size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Jane Doe"
                                    required
                                    className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-300">
                                University email
                            </label>
                            <div className="relative">
                                <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="student@campus.edu"
                                    required
                                    className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        {/* Dept & Batch */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-300">
                                    Department
                                </label>
                                <div className="relative">
                                    <GraduationCap size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-9 pr-3 text-sm text-white outline-none transition focus:border-indigo-500 cursor-pointer"
                                    >
                                        <option value="" className="bg-slate-950 text-white">Select Dept</option>
                                        <option value="CSE" className="bg-slate-950 text-white">CSE</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-300">
                                    Batch
                                </label>
                                <select
                                    name="batch"
                                    value={formData.batch}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 px-3 text-sm text-white outline-none transition focus:border-indigo-500 cursor-pointer"
                                >
                                    <option value="" className="bg-slate-950 text-white">Select Batch</option>
                                    <option value="7th Batch" className="bg-slate-950 text-white">7th Batch</option>
                                    <option value="6th Batch" className="bg-slate-950 text-white">6th Batch</option>
                                    <option value="5th Batch" className="bg-slate-950 text-white">5th Batch</option>
                                    <option value="4th Batch" className="bg-slate-950 text-white">4th Batch</option>
                                    <option value="3rd Batch" className="bg-slate-950 text-white">3rd Batch</option>
                                    <option value="2nd Batch" className="bg-slate-950 text-white">2nd Batch</option>
                                    <option value="1st Batch" className="bg-slate-950 text-white">1st Batch</option>
                                </select>
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-300">
                                Password
                            </label>
                            <div className="relative">
                                <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Min. 6 characters"
                                    required
                                    minLength={6}
                                    className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-11 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
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

                        {/* Confirm Password */}
                        <div>
                            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-300">
                                Confirm password
                            </label>
                            <div className="relative">
                                <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Repeat password"
                                    required
                                    minLength={6}
                                    className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-11 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white cursor-pointer"
                                >
                                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-indigo-500 disabled:opacity-60 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Submitting Registration...
                                </>
                            ) : (
                                <>
                                    Register Account
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="mt-6 text-center text-xs text-slate-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
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
