import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import {
    ArrowLeft,
    GraduationCap,
    Star,
    Sparkles,
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
    // GET SENIOR BY ID
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

            console.log("URL ID:", id);
            console.log("Seniors:", data);

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
    // RATING
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
            : "—";

    // =========================
    // LOADING
    // =========================

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />

                    <p className="mt-4 text-sm text-slate-500">
                        Loading profile...
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
                        className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white"
                    >
                        Back to Seniors
                    </Link>
                </div>
            </div>
        );
    }

    // =========================
    // PROFILE
    // =========================

    const initials =
        senior.name
            ?.split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "SR";

    return (
        <section className="min-h-screen bg-[#f6f8fc] px-4 py-6 sm:py-10">

            <div className="mx-auto max-w-2xl">

                {/* Back */}
                <Link
                    to="/seniors"
                    className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
                >
                    <ArrowLeft size={17} />
                    Back to Seniors
                </Link>

                {/* =========================
                    PROFILE CARD
                ========================= */}

                <div className="relative overflow-hidden rounded-[30px] bg-white shadow-xl shadow-slate-200/70">

                    {/* Gradient Header */}
                    <div className="relative h-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">

                        <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

                        <div className="absolute -bottom-20 left-20 h-40 w-40 rounded-full bg-pink-300/20 blur-3xl" />
                    </div>

                    {/* Profile Content */}
                    <div className="relative px-5 pb-6 sm:px-7">

                        {/* Avatar */}
                        <div className="-mt-14 flex items-end justify-between">

                            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[28px] border-4 border-white bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl font-bold text-white shadow-xl">

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

                            {/* Existing Rating */}
                            <div className="mb-2 flex items-center gap-1.5 rounded-full bg-yellow-50 px-4 py-2 text-sm font-bold text-yellow-600">
                                <Star
                                    size={17}
                                    fill="currentColor"
                                />

                                {senior.rating || "0.0"}
                            </div>
                        </div>

                        {/* Name */}
                        <div className="mt-5">

                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold text-slate-900">
                                    {senior.name}
                                </h1>

                                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold text-indigo-600">
                                    SENIOR
                                </span>
                            </div>

                            {/* Department */}
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">

                                <span className="flex items-center gap-1.5">
                                    <GraduationCap size={16} />
                                    {senior.department}
                                </span>

                                <span>
                                    •
                                </span>

                                <span>
                                    {senior.batch}
                                </span>

                            </div>

                            {/* Reviews */}
                            <p className="mt-3 text-xs text-slate-400">
                                ⭐ {senior.rating || 0} average rating
                                <span className="mx-2">•</span>
                                {senior.reviews || 0} reviews
                            </p>

                        </div>
                    </div>
                </div>

                {/* =========================
                    RATING HEADER
                ========================= */}

                <div className="mt-6 rounded-[28px] bg-slate-900 p-6 text-white shadow-xl">

                    <div className="flex items-center justify-between">

                        <div>
                            <div className="flex items-center gap-2">
                                <Sparkles
                                    size={18}
                                    className="text-yellow-400"
                                />

                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Your Review
                                </p>
                            </div>

                            <h2 className="mt-2 text-xl font-bold">
                                How would you rate {senior.name?.split(" ")[0]}?
                            </h2>
                        </div>

                        <div className="text-right">
                            <p className="text-3xl font-bold">
                                {average}
                            </p>

                            <p className="text-xs text-slate-400">
                                Your average
                            </p>
                        </div>

                    </div>

                    {/* Progress */}
                    <div className="mt-5">

                        <div className="mb-2 flex justify-between text-xs text-slate-400">
                            <span>
                                Rating progress
                            </span>

                            <span>
                                {ratedCount}/{categories.length}
                            </span>
                        </div>

                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500"
                                style={{
                                    width: `${
                                        (ratedCount /
                                            categories.length) *
                                        100
                                    }%`,
                                }}
                            />
                        </div>

                    </div>
                </div>

                {/* =========================
                    CATEGORIES
                ========================= */}

                <div className="mt-5 space-y-3">

                    {categories.map((category, index) => {
                        const rating =
                            ratings[category.id] || 0;

                        return (
                            <div
                                key={category.id}
                                className={`rounded-[25px] border bg-white p-5 transition-all ${
                                    rating
                                        ? "border-indigo-100 shadow-md shadow-indigo-100/50"
                                        : "border-slate-100 shadow-sm"
                                }`}
                            >

                                <div className="flex items-center gap-4">

                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-2xl">
                                        {category.emoji}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-bold text-slate-900">
                                                {category.title}
                                            </h3>

                                            <span className="text-[10px] font-bold text-slate-300">
                                                0{index + 1}
                                            </span>
                                        </div>

                                        <p className="mt-1 text-xs text-slate-400">
                                            {category.subtitle}
                                        </p>
                                    </div>

                                </div>

                                {/* Stars */}
                                <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2">

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
                                                    className={`flex h-9 w-9 items-center justify-center text-2xl transition-all hover:scale-125 ${
                                                        star <= rating
                                                            ? "text-yellow-400"
                                                            : "text-slate-300"
                                                    }`}
                                                >
                                                    ★
                                                </button>
                                            )
                                        )}
                                    </div>

                                    <span className="text-xs font-semibold text-slate-400">
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
                    REVIEW
                ========================= */}

                <div className="mt-5 rounded-[25px] border border-slate-100 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-slate-900">
                                Write something
                            </h3>

                            <p className="mt-1 text-xs text-slate-400">
                                Share your experience
                            </p>
                        </div>

                        <span className="text-xs text-slate-400">
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
                        rows={4}
                        placeholder={`How was your experience with ${senior.name}?`}
                        className="mt-4 w-full resize-none rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                    />
                </div>

                {/* =========================
                    SUBMIT
                ========================= */}

                <button
                    type="button"
                    disabled={ratedCount !== categories.length}
                    className={`mt-5 w-full rounded-2xl py-4 font-bold text-white transition-all ${
                        ratedCount === categories.length
                            ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-xl shadow-indigo-200 hover:-translate-y-1"
                            : "cursor-not-allowed bg-slate-200 text-slate-400"
                    }`}
                >
                    {ratedCount === categories.length
                        ? "Submit Rating  →"
                        : `${categories.length - ratedCount} ratings remaining`}
                </button>

            </div>
        </section>
    );
};

export default RateSenior;
