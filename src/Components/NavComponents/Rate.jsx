import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import {
    ArrowLeft,
    GraduationCap,
    Star,
    Sparkles,
    MessageSquare,
    Send,
    Lock,
    ShieldCheck,
    LogIn,
} from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import { getSeniorPhoto } from "../../utils/studentPhotos";

const API_URL = "http://localhost:3000";

const parseBatchNumber = (batchStr) => {
    if (!batchStr) return null;
    const match = String(batchStr).match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
};

const RateSenior = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, dbUser } = useAuth();

    const [senior, setSenior] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [ratings, setRatings] = useState({});
    const [review, setReview] = useState("");

    const userBatchNum = parseBatchNumber(dbUser?.batch);
    const seniorBatchNum = parseBatchNumber(senior?.batch);

    // Rule: Cannot rate junior or classmate
    const isJuniorOrClassmate =
        user &&
        dbUser &&
        dbUser.role !== "admin" &&
        userBatchNum !== null &&
        seniorBatchNum !== null &&
        seniorBatchNum >= userBatchNum;

    const categories = [
        {
            id: "behavior",
            title: "Behavior & Attitude",
            subtitle: "Professionalism and conduct with juniors",
            emoji: "😊",
        },
        {
            id: "movement",
            title: "Leadership Presence",
            subtitle: "Campus presence and mentorship drive",
            emoji: "✨",
        },
        {
            id: "friendly",
            title: "Approachability",
            subtitle: "Ease of interaction and friendliness",
            emoji: "🤝",
        },
        {
            id: "helpful",
            title: "Helpfulness",
            subtitle: "Assistance during projects, exams and labs",
            emoji: "💙",
        },
        {
            id: "respect",
            title: "Mutual Respect",
            subtitle: "Respect toward peers and junior batches",
            emoji: "❤️",
        },
        {
            id: "communication",
            title: "Communication",
            subtitle: "Clarity and transparency of advice",
            emoji: "💬",
        },
    ];

    useEffect(() => {
        const fetchSenior = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(`${API_URL}/senior`);
                if (!response.ok) {
                    throw new Error("Failed to fetch seniors");
                }

                const data = await response.json();
                const foundSenior = data.find(
                    (item) => String(item._id) === String(id)
                );

                if (!foundSenior) {
                    throw new Error("Senior profile not found");
                }

                setSenior(foundSenior);
            } catch (err) {
                console.error("Error:", err);
                setError("Senior information could not be retrieved");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchSenior();
        }
    }, [id]);

    const handleRating = (category, rating) => {
        setRatings((prev) => ({
            ...prev,
            [category]: rating,
        }));
    };

    const ratedCount = Object.keys(ratings).length;
    const average =
        ratedCount > 0
            ? (
                Object.values(ratings).reduce(
                    (total, value) => total + value,
                    0
                ) / ratedCount
            ).toFixed(1)
            : "0.0";

    const handleSubmitRating = async () => {
        // STRICT REQUIREMENT 1: User MUST be logged in
        if (!user) {
            Swal.fire({
                icon: "warning",
                title: "Login Required! 🔒",
                text: "You must be signed in with your student account to submit a rating.",
                confirmButtonColor: "#4f46e5",
                confirmButtonText: "Go to Login",
                showCancelButton: true,
                cancelButtonColor: "#334155",
            }).then((res) => {
                if (res.isConfirmed) {
                    navigate("/login");
                }
            });
            return;
        }

        if (isJuniorOrClassmate) {
            Swal.fire({
                icon: "error",
                title: "Cannot Rate Junior or Classmate! 🚫",
                text: `You belong to ${dbUser.batch}. You can only rate seniors who started before your batch.`,
                confirmButtonColor: "#0f172a",
            });
            return;
        }

        if (dbUser && dbUser.status === "pending") {
            Swal.fire({
                icon: "warning",
                title: "Permission Pending",
                text: "Your account is awaiting admin approval in Manage Users.",
                confirmButtonColor: "#0f172a",
            });
            return;
        }

        if (ratedCount !== categories.length) {
            Swal.fire({
                icon: "warning",
                title: "Incomplete Rating",
                text: `Please rate all ${categories.length} categories before submitting.`,
                confirmButtonColor: "#4f46e5",
            });
            return;
        }

        try {
            setSubmitting(true);

            const payload = {
                seniorId: String(senior._id),
                seniorName: senior.name,
                seniorBatch: senior.batch || "N/A",
                seniorDepartment: senior.department || "N/A",
                seniorImage: senior.image || "",
                userEmail: user?.email || "anonymous@student.edu",
                userName: user?.displayName || "Anonymous Student",
                rating: parseFloat(average),
                categories: ratings,
                review: review.trim() || "Great senior! Highly recommend.",
                status: "Published",
                date: new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }),
                createdAt: new Date().toISOString(),
            };

            const response = await fetch(`${API_URL}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to submit rating");
            }

            const data = await response.json();
            const savedItem = {
                ...payload,
                _id: data.insertedId || Date.now().toString(),
            };

            try {
                const localReviews = JSON.parse(
                    localStorage.getItem("my_ratings") || "[]"
                );
                localStorage.setItem(
                    "my_ratings",
                    JSON.stringify([savedItem, ...localReviews])
                );
            } catch (storageErr) {
                console.error("Local storage error:", storageErr);
            }

            await Swal.fire({
                icon: "success",
                title: "Rating Submitted!",
                text: "Your anonymous rating has been recorded successfully.",
                timer: 1800,
                showConfirmButton: false,
            });

            navigate("/my-ratings");
        } catch (submitErr) {
            console.error("Submit rating error:", submitErr);
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: submitErr.message || "Failed to submit rating. Please try again.",
                confirmButtonColor: "#4f46e5",
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
                <div className="text-center animate-fade-in">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-3 border-slate-700 border-t-indigo-500" />
                    <p className="mt-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Loading senior profile...
                    </p>
                </div>
            </div>
        );
    }

    if (error || !senior) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-white">
                <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8 text-center border border-slate-800 shadow-xl animate-fade-in">
                    <h2 className="text-lg font-bold text-white">
                        Senior Not Found
                    </h2>
                    <p className="mt-2 text-xs text-slate-400">
                        The requested senior record could not be loaded.
                    </p>
                    <Link
                        to="/seniors"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-500"
                    >
                        <ArrowLeft size={14} />
                        Back to Seniors
                    </Link>
                </div>
            </div>
        );
    }

    const photoUrl = getSeniorPhoto(senior);

    return (
        <section className="min-h-screen bg-slate-950 text-white px-4 py-8 sm:px-6 sm:py-10">
            <div className="mx-auto max-w-7xl animate-fade-in">
                {/* Back Button */}
                <Link
                    to="/seniors"
                    className="mb-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 shadow-xs transition hover:bg-slate-800 hover:text-white"
                >
                    <ArrowLeft size={15} />
                    Back to Seniors Directory
                </Link>

                {/* Main Grid */}
                <div className="grid items-start gap-6 lg:grid-cols-[360px_1fr]">
                    {/* LEFT SIDE - SENIOR DETAILS WITH PHOTO */}
                    <div className="lg:sticky lg:top-24">
                        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
                            {/* Photo Banner */}
                            <div className="relative h-64 w-full overflow-hidden bg-slate-950">
                                <img
                                    src={photoUrl}
                                    alt={senior.name}
                                    className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />

                                <div className="absolute top-3 left-3 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-200">
                                    <GraduationCap size={13} className="inline mr-1 text-indigo-400" />
                                    {senior.batch}
                                </div>

                                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 px-2.5 py-1 text-xs font-bold text-amber-400">
                                    <Star size={13} className="fill-amber-400" />
                                    <span>{senior.rating || "0.0"}</span>
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className="p-6 pt-3">
                                <div>
                                    <h1 className="text-xl font-bold text-white">
                                        {senior.name}
                                    </h1>
                                    <p className="text-xs text-slate-400 mt-1">
                                        {senior.department} • {senior.batch}
                                    </p>
                                </div>

                                {/* Quick Specs */}
                                <div className="mt-5 space-y-2.5 border-t border-slate-800 pt-4">
                                    <div className="flex items-center justify-between text-xs text-slate-400">
                                        <span>Role</span>
                                        <span className="font-semibold text-white">{senior.designation || "Senior Mentor"}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-slate-400">
                                        <span>Department</span>
                                        <span className="font-semibold text-white">{senior.department || "N/A"}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-slate-400">
                                        <span>Total Reviews</span>
                                        <span className="font-semibold text-white">{senior.reviews || 0}</span>
                                    </div>
                                </div>

                                {/* Confidential Guarantee */}
                                <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                                        <ShieldCheck size={16} className="text-emerald-400" />
                                        100% Anonymous Delivery
                                    </div>
                                    <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                                        Your student identity is never exposed or linked to your ratings.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - RATING WORKFLOW OR LOGIN GATE */}
                    <div>
                        {/* ================= CONDITION 1: NOT LOGGED IN ================= */}
                        {!user ? (
                            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 sm:p-10 text-center shadow-xl animate-slide-up">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 text-indigo-400 border border-slate-700">
                                    <Lock size={30} />
                                </div>

                                <h2 className="mt-4 text-2xl font-bold text-white">
                                    Sign In Required to Rate
                                </h2>

                                <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-slate-400 leading-relaxed">
                                    To maintain the integrity of peer evaluations and verify batch eligibility, you must sign in with your student account before submitting ratings.
                                </p>

                                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                                    <Link
                                        to="/login"
                                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-xs transition hover:bg-indigo-500 hover:scale-[1.02]"
                                    >
                                        <LogIn size={16} />
                                        Sign In to Rate
                                    </Link>

                                    <Link
                                        to="/register"
                                        className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-xs sm:text-sm font-semibold text-slate-300 transition hover:bg-slate-700"
                                    >
                                        Create New Account
                                    </Link>
                                </div>
                            </div>
                        ) : isJuniorOrClassmate ? (
                            /* ================= CONDITION 2: JUNIOR / CLASSMATE RESTRICTION ================= */
                            <div className="rounded-2xl border border-amber-900/50 bg-slate-900 p-8 text-center shadow-xl animate-slide-up">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                    <Lock size={26} />
                                </div>

                                <h2 className="mt-4 text-xl font-bold text-white">
                                    Rating Restricted
                                </h2>

                                <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-slate-400 leading-relaxed">
                                    You are registered as a <strong>{dbUser?.batch}</strong> student.
                                    <strong> {senior.name}</strong> is in <strong>{senior.batch}</strong>, which makes them your{" "}
                                    <span className="font-bold text-amber-400">
                                        {seniorBatchNum === userBatchNum ? "classmate" : "junior"}
                                    </span>.
                                    CampusRate guidelines strictly reserve ratings for seniors belonging to preceding batches.
                                </p>

                                <div className="mt-6">
                                    <Link
                                        to="/seniors"
                                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-indigo-500"
                                    >
                                        <ArrowLeft size={14} />
                                        Return to Senior Directory
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            /* ================= CONDITION 3: RATING FORM ================= */
                            <div className="animate-slide-up">
                                {/* Rating Header */}
                                <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-xl border border-slate-800">
                                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                                Peer Evaluation
                                            </p>
                                            <h2 className="mt-1 text-2xl font-extrabold text-white">
                                                Rate {senior.name?.split(" ")[0]}
                                            </h2>
                                            <p className="mt-0.5 text-xs text-slate-400">
                                                Select stars for each mentorship category below.
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <Star size={18} className="fill-amber-400 text-amber-400" />
                                                <span className="text-2xl font-black text-white">
                                                    {average}
                                                </span>
                                                <span className="text-xs text-slate-400">/ 5.0</span>
                                            </div>
                                            <p className="mt-0.5 text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                                                Your Score
                                            </p>
                                        </div>
                                    </div>

                                    {/* Progress */}
                                    <div className="mt-5 border-t border-slate-800 pt-4">
                                        <div className="mb-1.5 flex items-center justify-between text-xs text-slate-400">
                                            <span>Progress</span>
                                            <span className="font-bold text-white">
                                                {ratedCount} of {categories.length} Categories Rated
                                            </span>
                                        </div>
                                        <div className="h-1.5 w-full rounded-full bg-slate-950 overflow-hidden">
                                            <div
                                                className="h-full bg-indigo-500 transition-all duration-300"
                                                style={{
                                                    width: `${(ratedCount / categories.length) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Category Cards */}
                                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                    {categories.map((category, index) => {
                                        const rating = ratings[category.id] || 0;

                                        return (
                                            <div
                                                key={category.id}
                                                className={`rounded-xl border p-4 transition-all duration-200 ${
                                                    rating
                                                        ? "border-indigo-500/70 bg-slate-900 shadow-xs"
                                                        : "border-slate-800 bg-slate-900/90 hover:border-slate-700"
                                                }`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="text-sm font-bold text-white">
                                                            {category.title}
                                                        </h3>
                                                        <p className="mt-0.5 text-xs text-slate-400">
                                                            {category.subtitle}
                                                        </p>
                                                    </div>
                                                    <span className="text-[11px] font-bold text-slate-600">
                                                        0{index + 1}
                                                    </span>
                                                </div>

                                                <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-950 border border-slate-800 px-3 py-1.5">
                                                    <div className="flex gap-1">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <button
                                                                key={star}
                                                                type="button"
                                                                onClick={() => handleRating(category.id, star)}
                                                                className={`cursor-pointer text-xl transition hover:scale-125 ${
                                                                    star <= rating
                                                                        ? "text-amber-400"
                                                                        : "text-slate-600 hover:text-amber-300"
                                                                }`}
                                                            >
                                                                ★
                                                            </button>
                                                        ))}
                                                    </div>

                                                    <span className="text-xs font-bold text-slate-300">
                                                        {rating ? `${rating}/5` : "Rate"}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Review Comment Box */}
                                <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xs">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <MessageSquare size={16} className="text-indigo-400" />
                                            <h3 className="text-sm font-bold text-white">
                                                Written Feedback (Optional)
                                            </h3>
                                        </div>
                                        <span className="text-xs text-slate-500">
                                            {review.length}/300
                                        </span>
                                    </div>

                                    <textarea
                                        value={review}
                                        onChange={(e) => setReview(e.target.value.slice(0, 300))}
                                        rows={4}
                                        placeholder={`Share helpful insights about working with ${senior.name}...`}
                                        className="mt-3 w-full resize-none rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="button"
                                    onClick={handleSubmitRating}
                                    disabled={ratedCount !== categories.length || submitting}
                                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-xs sm:text-sm font-bold transition shadow-xs ${
                                        ratedCount === categories.length && !submitting
                                            ? "bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer active:scale-[0.99]"
                                            : "bg-slate-800 text-slate-500 cursor-not-allowed"
                                    }`}
                                >
                                    {submitting ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Submitting Rating...
                                        </>
                                    ) : ratedCount === categories.length ? (
                                        <>
                                            <Send size={15} />
                                            Submit Anonymous Rating
                                        </>
                                    ) : (
                                        <>
                                            {categories.length - ratedCount} categories remaining to rate
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RateSenior;
