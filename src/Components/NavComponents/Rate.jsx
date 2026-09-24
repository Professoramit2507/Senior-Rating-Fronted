import { useState } from "react";

const Rate = () => {
    const categories = [
        {
            id: "behavior",
            title: "ব্যবহার",
            subtitle: "আপনার সাথে কেমন আচরণ করে?",
            icon: "😊",
        },
        {
            id: "movement",
            title: "চলা-ফেরা",
            subtitle: "আচার-আচরণ ও personality কেমন?",
            icon: "✨",
        },
        {
            id: "friendly",
            title: "মিশুকি",
            subtitle: "অন্যদের সাথে কতটা সহজে মিশে?",
            icon: "🤝",
        },
        {
            id: "helpful",
            title: "সহযোগিতা",
            subtitle: "প্রয়োজনে কতটা পাশে থাকে?",
            icon: "💙",
        },
        {
            id: "respect",
            title: "সম্মানবোধ",
            subtitle: "সবার প্রতি কেমন respect দেখায়?",
            icon: "❤️",
        },
        {
            id: "communication",
            title: "কথাবার্তা",
            subtitle: "কথা বলার ধরন কেমন?",
            icon: "💬",
        },
    ];

    const [ratings, setRatings] = useState({});
    const [review, setReview] = useState("");

    const ratedCount = Object.keys(ratings).length;

    const average =
        ratedCount > 0
            ? (
                  Object.values(ratings).reduce((a, b) => a + b, 0) /
                  ratedCount
              ).toFixed(1)
            : "—";

    const handleRating = (id, value) => {
        setRatings((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const getRatingText = (rating) => {
        if (!rating) return "Tap a star";
        if (rating === 1) return "Needs improvement";
        if (rating === 2) return "Could be better";
        if (rating === 3) return "Good";
        if (rating === 4) return "Very good";
        return "Excellent ✨";
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] px-4 py-6 sm:py-10">

            {/* Background */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
                <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-xl">

                {/* Header Card */}
                <div className="relative overflow-hidden rounded-[32px] bg-[#111827] px-6 pb-7 pt-6 text-white shadow-2xl shadow-gray-300/50">

                    {/* Glow */}
                    <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-500/30 blur-3xl" />
                    <div className="absolute -bottom-24 left-10 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />

                    <div className="relative">

                        {/* Top */}
                        <div className="flex items-center justify-between">
                            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-gray-300">
                                SENIOR REVIEW
                            </span>

                            <span className="text-sm text-gray-400">
                                {ratedCount}/{categories.length}
                            </span>
                        </div>

                        {/* Profile */}
                        <div className="mt-7 flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 text-3xl shadow-lg shadow-blue-900/40">
                                👨‍🎓
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">
                                    Rate Your Senior
                                </h1>

                                <p className="mt-1 text-sm text-gray-400">
                                    Share your experience honestly
                                </p>
                            </div>
                        </div>

                        {/* Score */}
                        <div className="mt-7 flex items-end justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-500">
                                    Overall rating
                                </p>

                                <div className="mt-1 flex items-center gap-2">
                                    <span className="text-4xl font-bold">
                                        {average}
                                    </span>

                                    <span className="text-xl text-yellow-400">
                                        ★
                                    </span>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-xs text-gray-500">
                                    Progress
                                </p>

                                <p className="mt-1 text-sm font-semibold text-gray-300">
                                    {Math.round(
                                        (ratedCount / categories.length) * 100
                                    )}
                                    %
                                </p>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-blue-400 to-violet-400 transition-all duration-500"
                                style={{
                                    width: `${
                                        (ratedCount / categories.length) * 100
                                    }%`,
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Intro */}
                <div className="px-2 pb-3 pt-7">
                    <h2 className="text-xl font-bold text-gray-900">
                        Tell us about them
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        প্রতিটি বিষয়ে আপনার অভিজ্ঞতা অনুযায়ী rating দিন।
                    </p>
                </div>

                {/* Rating Cards */}
                <div className="space-y-3">

                    {categories.map((category, index) => {
                        const rating = ratings[category.id] || 0;

                        return (
                            <div
                                key={category.id}
                                className={`rounded-[24px] border bg-white p-4 transition-all duration-300 sm:p-5 ${
                                    rating
                                        ? "border-blue-100 shadow-md shadow-blue-100/50"
                                        : "border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md"
                                }`}
                            >
                                <div className="flex items-center gap-3">

                                    {/* Icon */}
                                    <div
                                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl transition ${
                                            rating
                                                ? "bg-blue-50"
                                                : "bg-gray-50"
                                        }`}
                                    >
                                        {category.icon}
                                    </div>

                                    {/* Info */}
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-bold text-gray-900">
                                                {category.title}
                                            </h3>

                                            <span className="text-[10px] font-medium text-gray-300">
                                                0{index + 1}
                                            </span>
                                        </div>

                                        <p className="mt-0.5 truncate text-xs text-gray-400">
                                            {category.subtitle}
                                        </p>
                                    </div>
                                </div>

                                {/* Stars */}
                                <div className="mt-4 flex items-center justify-between rounded-2xl bg-gray-50 px-3 py-2.5">

                                    <div className="flex items-center gap-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
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
                                                className={`flex h-9 w-9 items-center justify-center text-2xl transition-all duration-200 ${
                                                    star <= rating
                                                        ? "scale-110 text-yellow-400"
                                                        : "text-gray-300 hover:text-yellow-300"
                                                } hover:scale-125`}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>

                                    <span
                                        className={`text-xs font-semibold ${
                                            rating
                                                ? "text-blue-600"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        {getRatingText(rating)}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Review Card */}
                <div className="mt-5 rounded-[24px] border border-gray-100 bg-white p-5 shadow-sm">

                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-xl">
                            💭
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900">
                                Anything else?
                            </h3>

                            <p className="text-xs text-gray-400">
                                আপনার মতামত লিখুন
                            </p>
                        </div>
                    </div>

                    <div className="relative mt-4">
                        <textarea
                            value={review}
                            onChange={(e) =>
                                setReview(e.target.value.slice(0, 300))
                            }
                            rows={4}
                            placeholder="Write your experience..."
                            className="w-full resize-none rounded-2xl border border-gray-100 bg-gray-50 p-4 pb-8 text-sm text-gray-700 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
                        />

                        <span className="absolute bottom-3 right-4 text-[10px] text-gray-400">
                            {review.length}/300
                        </span>
                    </div>
                </div>

                {/* Submit */}
                <div className="mt-5">
                    <button
                        type="button"
                        disabled={ratedCount !== categories.length}
                        className={`group relative w-full overflow-hidden rounded-2xl py-4 text-sm font-bold text-white transition-all duration-300 ${
                            ratedCount === categories.length
                                ? "bg-gray-900 shadow-xl shadow-gray-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-2xl"
                                : "cursor-not-allowed bg-gray-200 text-gray-400"
                        }`}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {ratedCount === categories.length
                                ? "Submit Review"
                                : `${categories.length - ratedCount} ratings remaining`}

                            {ratedCount === categories.length && (
                                <span className="transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            )}
                        </span>
                    </button>

                    <p className="mt-4 text-center text-[11px] text-gray-400">
                        🔒 Your feedback will be kept respectful and private.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Rate;
