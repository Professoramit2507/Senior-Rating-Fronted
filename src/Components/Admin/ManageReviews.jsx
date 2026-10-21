import { useEffect, useState } from "react";
import { Star, Trash2, CalendarDays, MessageSquare, UserRound } from "lucide-react";
import Swal from "sweetalert2";

const API_URL = "http://localhost:3000";

const ManageReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/reviews`);
            const data = await res.json();
            setReviews(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Fetch reviews error:", error);
            setReviews([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleDelete = async (review) => {
        const confirmResult = await Swal.fire({
            title: "Delete Review?",
            text: `Are you sure you want to remove the review for ${review.seniorName || "this senior"}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, delete",
        });

        if (!confirmResult.isConfirmed) return;

        try {
            const res = await fetch(`${API_URL}/reviews/${review._id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setReviews((prev) => prev.filter((r) => r._id !== review._id));
                Swal.fire({
                    icon: "success",
                    title: "Deleted!",
                    text: "Review deleted successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });
            } else {
                throw new Error("Failed to delete review");
            }
        } catch (error) {
            console.error("Delete error:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message || "Failed to delete review",
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <p className="text-sm font-semibold text-indigo-600">
                    Review Management
                </p>
                <h1 className="mt-1 text-3xl font-extrabold text-slate-900">
                    Manage Reviews
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    View and moderate all anonymous reviews submitted across CampusRate.
                </p>
            </div>

            {reviews.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                        <MessageSquare size={26} />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-800">
                        No reviews found
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                        When students submit reviews, they will appear here.
                    </p>
                </div>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {reviews.map((r) => (
                        <div
                            key={r._id}
                            className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-xs transition hover:shadow-md"
                        >
                            <div>
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-xs">
                                            {(r.seniorName || "S").charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900">
                                                {r.seniorName || "Senior"}
                                            </h3>
                                            <p className="text-xs text-slate-400">
                                                {r.seniorBatch || "N/A"} • {r.seniorDepartment || "N/A"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-bold text-yellow-600">
                                        <Star size={13} fill="currentColor" />
                                        <span>{r.rating || 0}</span>
                                    </div>
                                </div>

                                <p className="mt-4 rounded-xl bg-slate-50 p-4 text-xs leading-6 text-slate-600">
                                    "{r.review}"
                                </p>
                            </div>

                            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400">
                                <div className="flex items-center gap-1.5">
                                    <CalendarDays size={14} />
                                    <span>{r.date || "Recent"}</span>
                                </div>

                                <button
                                    onClick={() => handleDelete(r)}
                                    className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-semibold text-red-500 hover:bg-red-50"
                                >
                                    <Trash2 size={14} />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageReviews;
