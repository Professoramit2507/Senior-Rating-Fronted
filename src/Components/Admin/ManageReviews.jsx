import { useEffect, useState } from "react";
import {
    Search,
    Trash2,
    Star,
    MessageSquare,
} from "lucide-react";
import Swal from "sweetalert2";

const API_URL = "http://localhost:3000";

const ManageReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchReviews = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/reviews`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch reviews");
            }

            const data = await response.json();

            setReviews(data);
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Failed!",
                text: "Reviews load করা যায়নি।",
                confirmButtonColor: "#4f46e5",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Delete Review?",
            text: "এই review permanently delete হয়ে যাবে!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {
            const response = await fetch(
                `${API_URL}/reviews/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Delete failed");
            }

            setReviews((prev) =>
                prev.filter((review) => review._id !== id)
            );

            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Review successfully deleted.",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Delete Failed!",
                text: "Review delete করা যায়নি।",
                confirmButtonColor: "#4f46e5",
            });
        }
    };

    const filteredReviews = reviews.filter((review) => {
        const value = search.toLowerCase();

        return (
            review.review?.toLowerCase().includes(value) ||
            review.comment?.toLowerCase().includes(value) ||
            review.seniorName
                ?.toLowerCase()
                .includes(value) ||
            review.userName
                ?.toLowerCase()
                .includes(value)
        );
    });

    const getRating = (review) => {
        if (review.rating) return review.rating;

        if (review.ratings) {
            const values = Object.values(review.ratings);

            if (values.length) {
                return (
                    values.reduce(
                        (total, value) =>
                            total + Number(value),
                        0
                    ) / values.length
                ).toFixed(1);
            }
        }

        return 0;
    };

    return (
        <div>

            {/* Header */}
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div>
                    <p className="text-sm font-semibold text-pink-600">
                        Management
                    </p>

                    <h1 className="mt-1 text-3xl font-extrabold text-slate-900">
                        Manage Reviews
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Monitor and manage submitted reviews.
                    </p>
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-pink-50 px-4 py-3">

                    <MessageSquare
                        size={18}
                        className="text-pink-600"
                    />

                    <span className="text-sm font-bold text-pink-700">
                        {reviews.length} Reviews
                    </span>

                </div>

            </div>

            {/* Search */}
            <div className="mb-5 rounded-2xl bg-white p-4 shadow-sm">

                <div className="relative max-w-md">

                    <Search
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search reviews..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-50"
                    />

                </div>

            </div>

            {/* Reviews */}
            <div className="space-y-4">

                {loading ? (
                    <div className="flex min-h-[300px] items-center justify-center rounded-3xl bg-white">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-100 border-t-pink-600" />
                    </div>
                ) : filteredReviews.length === 0 ? (
                    <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                            <MessageSquare size={28} />
                        </div>

                        <h3 className="mt-4 font-bold text-slate-800">
                            No Reviews Found
                        </h3>

                        <p className="mt-1 text-sm text-slate-400">
                            No reviews match your search.
                        </p>

                    </div>
                ) : (
                    filteredReviews.map((review) => {

                        const rating = getRating(review);

                        return (
                            <div
                                key={review._id}
                                className="rounded-3xl bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                            >

                                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                                    {/* Content */}
                                    <div className="flex-1">

                                        {/* User + Senior */}
                                        <div className="flex flex-wrap items-center gap-2">

                                            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                                                {review.userName ||
                                                    review.email ||
                                                    "Anonymous"}
                                            </span>

                                            <span className="text-slate-300">
                                                →
                                            </span>

                                            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-600">
                                                {review.seniorName ||
                                                    review.senior ||
                                                    "Senior"}
                                            </span>

                                        </div>

                                        {/* Rating */}
                                        <div className="mt-3 flex items-center gap-1">

                                            {[1, 2, 3, 4, 5].map(
                                                (star) => (
                                                    <Star
                                                        key={star}
                                                        size={17}
                                                        className={
                                                            star <=
                                                            Number(
                                                                rating
                                                            )
                                                                ? "fill-yellow-400 text-yellow-400"
                                                                : "text-slate-200"
                                                        }
                                                    />
                                                )
                                            )}

                                            <span className="ml-2 text-xs font-bold text-slate-500">
                                                {rating}/5
                                            </span>

                                        </div>

                                        {/* Review */}
                                        <div className="mt-4 rounded-2xl bg-slate-50 p-4">

                                            <p className="text-sm leading-6 text-slate-600">
                                                “
                                                {review.review ||
                                                    review.comment ||
                                                    "No review text"}
                                                ”
                                            </p>

                                        </div>

                                        {/* Date */}
                                        {review.createdAt && (
                                            <p className="mt-3 text-xs text-slate-400">
                                                {new Date(
                                                    review.createdAt
                                                ).toLocaleDateString()}
                                            </p>
                                        )}

                                    </div>

                                    {/* Delete */}
                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                review._id
                                            )
                                        }
                                        className="flex h-10 items-center justify-center gap-2 rounded-xl bg-red-50 px-4 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                                    >
                                        <Trash2 size={17} />

                                        <span className="sm:hidden">
                                            Delete
                                        </span>
                                    </button>

                                </div>

                            </div>
                        );
                    })
                )}

            </div>

        </div>
    );
};

export default ManageReviews;
