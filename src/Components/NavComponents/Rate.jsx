import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
    ArrowLeft,
    GraduationCap,
    Star,
    Sparkles,
    MessageSquare,
    Send,
    UserRound,
} from "lucide-react";

const API_URL = "http://localhost:3000";

const RateSenior = () => {
    const { id } = useParams();

    const [senior, setSenior] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [ratings, setRatings] = useState({});
    const [review, setReview] = useState("");

    const categories = [
        {
            id: "behavior",
            title: "ব্যবহার",
            subtitle: "আপনার সাথে কেমন আচরণ করে?",
            emoji: "😊",
        },
        {
            id: "movement",
            title: "চলা-ফেরা",
            subtitle: "আচার-আচরণ ও personality কেমন?",
            emoji: "✨",
        },
        {
            id: "friendly",
            title: "মিশুকি",
            subtitle: "অন্যদের সাথে কতটা সহজে মিশে?",
            emoji: "🤝",
        },
        {
            id: "helpful",
            title: "সহযোগিতা",
            subtitle: "প্রয়োজনে কতটা পাশে থাকে?",
            emoji: "💙",
        },
        {
            id: "respect",
            title: "সম্মানবোধ",
            subtitle: "সবার প্রতি কেমন respect দেখায়?",
            emoji: "❤️",
        },
        {
            id: "communication",
            title: "কথাবার্তা",
            subtitle: "কথা বলার ধরন কেমন?",
            emoji: "💬",
        },
    ];

    // =========================
    // GET SENIOR
    // =========================

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
                    throw new Error("Senior not found");
                }

                setSenior(foundSenior);
            } catch (error) {
                console.error("Error:", error);
                setError("Senior information পাওয়া যায়নি");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchSenior();
        }
    }, [id]);

    // =========================
    // HANDLE RATING
    // =========================

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

    // =========================
    // LOADING
    // =========================

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />

                    <p className="mt-4 text-sm font-medium text-slate-500">
                        Loading senior profile...
                    </p>
                </div>
            </div>
        );
    }

    // =========================
    // ERROR
    // =========================

    if (error || !senior) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
                <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-3xl">
                        😕
                    </div>

                    <h2 className="mt-5 text-xl font-bold text-slate-900">
                        Senior Not Found
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        এই senior-এর profile পাওয়া যায়নি।
                    </p>

                    <Link
                        to="/seniors"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                        <ArrowLeft size={17} />
                        Back to Seniors
                    </Link>
                </div>
            </div>
        );
    }

    // =========================
    // INITIALS
    // =========================

    const initials =
        senior.name
            ?.split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "SR";

    return (
        <section className="min-h-screen bg-[#f5f7fb] px-4 py-6 sm:px-6 sm:py-10">
            <div className="mx-auto max-w-7xl">

                {/* =========================
                    BACK BUTTON
                ========================= */}

                <Link
                    to="/seniors"
                    className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-500 shadow-sm transition hover:text-indigo-600 hover:shadow-md"
                >
                    <ArrowLeft size={17} />
                    Back to Seniors
                </Link>

                {/* =========================
                    MAIN GRID
                ========================= */}

                <div className="grid items-start gap-6 lg:grid-cols-[360px_1fr]">

                    {/* ==================================================
                        LEFT SIDE - SENIOR DETAILS
                    ================================================== */}

                    <div className="lg:sticky lg:top-24">

                        <div className="overflow-hidden rounded-[30px] border border-slate-100 bg-white shadow-xl shadow-slate-200/60">

                            {/* Gradient Header */}
                            <div className="relative h-36 overflow-hidden bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500">

                                <div className="absolute -right-10 -top-20 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

                                <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-pink-300/20 blur-3xl" />

                                <div className="absolute left-6 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                                    <Sparkles
                                        size={14}
                                        className="text-yellow-300"
                                    />

                                    <span className="text-xs font-semibold text-white">
                                        Senior Profile
                                    </span>
                                </div>
                            </div>

                            {/* Profile */}
                            <div className="relative px-6 pb-6">

                                {/* Avatar */}
                                <div className="-mt-16 flex items-end justify-between">

                                    <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-[30px] border-4 border-white bg-linear-to-br from-indigo-500 to-purple-600 text-3xl font-bold text-white shadow-xl">

                                        {senior.image ? (
                                            <img
                                                src={senior.image}
                                                alt={senior.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            initials
                                        )}

                                    </div>

                                    {/* Rating */}
                                    <div className="mb-2 flex items-center gap-1.5 rounded-2xl bg-yellow-50 px-3.5 py-2 text-yellow-600">

                                        <Star
                                            size={18}
                                            fill="currentColor"
                                        />

                                        <span className="text-sm font-extrabold">
                                            {senior.rating || "0.0"}
                                        </span>
                                    </div>
                                </div>

                                {/* Name */}
                                <div className="mt-5">

                                    <div className="flex flex-wrap items-center gap-2">

                                        <h1 className="text-2xl font-extrabold text-slate-900">
                                            {senior.name}
                                        </h1>

                                        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-extrabold tracking-wide text-indigo-600">
                                            SENIOR
                                        </span>

                                    </div>

                                    <p className="mt-1 text-sm text-slate-400">
                                        CampusRate Member
                                    </p>
                                </div>

                                {/* Info */}
                                <div className="mt-6 space-y-3">

                                    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                                            <GraduationCap size={20} />
                                        </div>

                                        <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                                Department
                                            </p>

                                            <p className="mt-0.5 text-sm font-bold text-slate-800">
                                                {senior.department || "N/A"}
                                            </p>
                                        </div>

                                    </div>

                                    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                                            <UserRound size={20} />
                                        </div>

                                        <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                                Batch
                                            </p>

                                            <p className="mt-0.5 text-sm font-bold text-slate-800">
                                                {senior.batch || "N/A"}
                                            </p>
                                        </div>

                                    </div>

                                    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
                                            <MessageSquare size={20} />
                                        </div>

                                        <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                                Reviews
                                            </p>

                                            <p className="mt-0.5 text-sm font-bold text-slate-800">
                                                {senior.reviews || 0} Reviews
                                            </p>
                                        </div>

                                    </div>

                                </div>

                                {/* Existing Rating */}
                                <div className="mt-6 rounded-2xl bg-linear-to-br from-indigo-50 to-purple-50 p-5">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-xs font-semibold text-slate-400">
                                                Current Rating
                                            </p>

                                            <div className="mt-1 flex items-center gap-2">

                                                <Star
                                                    size={19}
                                                    fill="#facc15"
                                                    className="text-yellow-400"
                                                />

                                                <span className="text-2xl font-extrabold text-slate-900">
                                                    {senior.rating || "0.0"}
                                                </span>

                                                <span className="text-xs text-slate-400">
                                                    / 5
                                                </span>

                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xs font-semibold text-slate-400">
                                                Total
                                            </p>

                                            <p className="text-lg font-bold text-indigo-600">
                                                {senior.reviews || 0}
                                            </p>
                                        </div>

                                    </div>
                                </div>

                                {/* Anonymous Info */}
                                <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">

                                    <p className="text-sm font-bold text-indigo-700">
                                        🔒 Anonymous Rating
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-indigo-500">
                                        আপনার identity অন্যদের কাছে প্রকাশ
                                        করা হবে না।
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ==================================================
                        RIGHT SIDE - RATING
                    ================================================== */}

                    <div>

                        {/* Rating Header */}
                        <div className="rounded-[30px] bg-slate-900 p-6 text-white shadow-xl sm:p-7">

                            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                                <div>

                                    <div className="flex items-center gap-2">

                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                                            <Sparkles
                                                size={18}
                                                className="text-yellow-400"
                                            />
                                        </div>

                                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                            Your Review
                                        </p>

                                    </div>

                                    <h2 className="mt-3 text-2xl font-extrabold">
                                        Rate {senior.name?.split(" ")[0]}
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-400">
                                        Give your honest experience
                                    </p>

                                </div>

                                {/* Average */}
                                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center backdrop-blur">

                                    <div className="flex items-center justify-center gap-1">

                                        <Star
                                            size={17}
                                            fill="#facc15"
                                            className="text-yellow-400"
                                        />

                                        <span className="text-2xl font-extrabold">
                                            {average}
                                        </span>

                                    </div>

                                    <p className="mt-1 text-[11px] font-medium text-slate-500">
                                        Your Average
                                    </p>

                                </div>

                            </div>

                            {/* Progress */}
                            <div className="mt-6">

                                <div className="mb-2 flex items-center justify-between">

                                    <span className="text-xs font-medium text-slate-400">
                                        Rating Progress
                                    </span>

                                    <span className="text-xs font-bold text-white">
                                        {ratedCount}/{categories.length}
                                    </span>

                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-white/10">

                                    <div
                                        className="h-full rounded-full bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 transition-all duration-500"
                                        style={{
                                            width: `${(ratedCount /
                                                    categories.length) *
                                                100
                                                }%`,
                                        }}
                                    />

                                </div>

                            </div>
                        </div>

                        {/* Category Title */}
                        <div className="mb-4 mt-6 flex items-center justify-between">

                            <div>
                                <h2 className="text-lg font-extrabold text-slate-900">
                                    Rating Categories
                                </h2>

                                <p className="mt-1 text-xs text-slate-400">
                                    প্রতিটি category-তে ১ থেকে ৫ star দিন
                                </p>
                            </div>

                            <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
                                {ratedCount} Rated
                            </span>

                        </div>

                        {/* Categories */}
                        <div className="grid gap-4 md:grid-cols-2">

                            {categories.map((category, index) => {
                                const rating =
                                    ratings[category.id] || 0;

                                return (
                                    <div
                                        key={category.id}
                                        className={`group rounded-[26px] border bg-white p-5 transition-all duration-300 ${rating
                                                ? "border-indigo-200 shadow-lg shadow-indigo-100/50"
                                                : "border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-lg"
                                            }`}
                                    >

                                        {/* Category Top */}
                                        <div className="flex items-center gap-3">

                                            <div
                                                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl transition ${rating
                                                        ? "bg-indigo-50"
                                                        : "bg-slate-50 group-hover:bg-indigo-50"
                                                    }`}
                                            >
                                                {category.emoji}
                                            </div>

                                            <div className="flex-1">

                                                <div className="flex items-center justify-between">

                                                    <h3 className="font-extrabold text-slate-900">
                                                        {category.title}
                                                    </h3>

                                                    <span className="text-[10px] font-extrabold text-slate-300">
                                                        0{index + 1}
                                                    </span>

                                                </div>

                                                <p className="mt-1 text-xs text-slate-400">
                                                    {category.subtitle}
                                                </p>

                                            </div>
                                        </div>

                                        {/* Stars */}
                                        <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2.5">

                                            <div className="flex">

                                                {[1, 2, 3, 4, 5].map(
                                                    (star) => (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            onClick={() =>
                                                                handleRating(
                                                                    category.id,
                                                                    star
                                                                )
                                                            }
                                                            aria-label={`${star} star`}
                                                            className={`flex h-9 w-9 items-center justify-center text-2xl transition-all duration-200 hover:scale-125 ${star <= rating
                                                                    ? "text-yellow-400"
                                                                    : "text-slate-300 hover:text-yellow-300"
                                                                }`}
                                                        >
                                                            ★
                                                        </button>
                                                    )
                                                )}

                                            </div>

                                            <span
                                                className={`text-xs font-bold ${rating
                                                        ? "text-indigo-600"
                                                        : "text-slate-400"
                                                    }`}
                                            >
                                                {rating
                                                    ? `${rating}/5`
                                                    : "Rate"}
                                            </span>

                                        </div>
                                    </div>
                                );
                            })}

                        </div>

                        {/* =========================
                            REVIEW BOX
                        ========================= */}

                        <div className="mt-5 rounded-[28px] border border-slate-100 bg-white p-5 shadow-sm sm:p-6">

                            <div className="flex items-start justify-between gap-4">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-50 text-pink-500">
                                        <MessageSquare size={20} />
                                    </div>

                                    <div>
                                        <h3 className="font-extrabold text-slate-900">
                                            Write something
                                        </h3>

                                        <p className="mt-0.5 text-xs text-slate-400">
                                            Share your honest experience
                                        </p>
                                    </div>

                                </div>

                                <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-400">
                                    {review.length}/300
                                </span>

                            </div>

                            <textarea
                                value={review}
                                onChange={(e) =>
                                    setReview(
                                        e.target.value.slice(0, 300)
                                    )
                                }
                                rows={5}
                                placeholder={`How was your experience with ${senior.name}?`}
                                className="mt-5 w-full resize-none rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                            />

                        </div>

                        {/* =========================
                            SUBMIT
                        ========================= */}

                        <button
                            type="button"
                            disabled={ratedCount !== categories.length}
                            className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-extrabold transition-all duration-300 ${ratedCount === categories.length
                                    ? "bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-xl shadow-indigo-200 hover:-translate-y-1 hover:shadow-2xl"
                                    : "cursor-not-allowed bg-slate-200 text-slate-400"
                                }`}
                        >

                            {ratedCount === categories.length ? (
                                <>
                                    <Send size={18} />
                                    Submit Rating
                                </>
                            ) : (
                                <>
                                    {categories.length - ratedCount} ratings
                                    remaining
                                </>
                            )}

                        </button>

                        {/* Bottom Note */}
                        <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                            Your review will be submitted anonymously and
                            cannot be linked publicly to your profile.
                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default RateSenior;
