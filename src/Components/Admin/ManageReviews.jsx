import { useEffect, useState } from "react";
import { Star, Trash2, CalendarDays, MessageSquare } from "lucide-react";
import Swal from "sweetalert2";
import { getSeniorPhoto } from "../../utils/studentPhotos";

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
            cancelButtonColor: "#334155",
            confirmButtonText: "Yes, delete",
            background: "#0f172a",
            color: "#ffffff",
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
                    background: "#0f172a",
                    color: "#ffffff",
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
                background: "#0f172a",
                color: "#ffffff",
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />
            </div>
        );
    }

    return (
        <div className="space-y-8 text-white animate-fade-in">
            <div>
                <p className="text-sm font-semibold text-indigo-400">
                    Review Management
                </p>
                <h1 className="mt-1 text-3xl font-extrabold text-white">
                    Manage Reviews
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                    View and moderate all anonymous reviews submitted across CampusRate.
                </p>
            </div>

            {reviews.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/60 p-12 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-indigo-400">
                        <MessageSquare size={26} />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-white">
                        No reviews found
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                        When students submit reviews, they will appear here.
                    </p>
                </div>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {reviews.map((r) => {
                        const seniorPhoto = getSeniorPhoto({
                            _id: r.seniorId,
                            name: r.seniorName,
                            image: r.seniorImage,
                        });

                        return (
                            <div
                                key={r._id}
                                className="group flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition-all duration-300 hover:border-slate-700 hover:-translate-y-1"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
                                                <img
                                                    src={seniorPhoto}
                                                    alt={r.seniorName || "Senior"}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white">
                                                    {r.seniorName || "Senior"}
                                                </h3>
                                                <p className="text-xs text-slate-400">
                                                    {r.seniorBatch || "N/A"} • {r.seniorDepartment || "N/A"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-300">
                                            <Star size={13} className="fill-amber-400 text-amber-400" />
                                            <span>{r.rating || 0}</span>
                                        </div>
                                    </div>

                                    <p className="mt-4 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 text-xs leading-6 text-slate-300">
                                        "{r.review}"
                                    </p>
                                </div>

                                <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-400">
                                    <div className="flex items-center gap-1.5">
                                        <CalendarDays size={14} className="text-slate-500" />
                                        <span>{r.date || "Recent"}</span>
                                    </div>

                                    <button
                                        onClick={() => handleDelete(r)}
                                        className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-2.5 py-1.5 font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                                    >
                                        <Trash2 size={14} />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ManageReviews;
