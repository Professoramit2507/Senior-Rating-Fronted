import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router";
import {
  Star,
  MessageCircle,
  CalendarDays,
  Eye,
  Trash2,
  ShieldCheck,
  TrendingUp,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";

const API_URL = "http://localhost:3000";

const categoryNames = {
  behavior: "ব্যবহার (Behavior)",
  movement: "চলা-ফেরা (Personality)",
  friendly: "মিশুকি (Friendliness)",
  helpful: "সহযোগিতা (Helpfulness)",
  respect: "সম্মানবোধ (Respect)",
  communication: "কথাবার্তা (Communication)",
  helpfulness: "Helpfulness",
  guidance: "Guidance",
};

const MyRating = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH USER RATINGS
  // =========================
  const fetchMyRatings = async () => {
    try {
      setLoading(true);

      // 1. Fetch from Backend
      let backendRatings = [];
      try {
        const queryUrl = user?.email
          ? `${API_URL}/reviews?email=${encodeURIComponent(user.email)}`
          : `${API_URL}/reviews`;

        const res = await fetch(queryUrl);
        if (res.ok) {
          backendRatings = await res.json();
        }
      } catch (backendErr) {
        console.error("Backend fetch error:", backendErr);
      }

      // 2. Fetch from LocalStorage (for instant offline / guest support)
      let localRatings = [];
      try {
        localRatings = JSON.parse(localStorage.getItem("my_ratings") || "[]");
      } catch (localErr) {
        console.error("LocalStorage read error:", localErr);
      }

      // 3. Merge & Deduplicate
      const map = new Map();

      // Put backend ratings
      backendRatings.forEach((item) => {
        const key = item._id || `${item.seniorId}-${item.date}`;
        map.set(String(key), item);
      });

      // Put local ratings
      localRatings.forEach((item) => {
        const key = item._id || `${item.seniorId}-${item.date}`;
        if (!map.has(String(key))) {
          // If logged in, filter local items to match or anonymous
          if (!user?.email || !item.userEmail || item.userEmail === user.email || item.userEmail === "anonymous@student.edu") {
            map.set(String(key), item);
          }
        }
      });

      const merged = Array.from(map.values()).sort(
        (a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
      );

      setRatings(merged);
    } catch (err) {
      console.error("Failed to load ratings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRatings();
  }, [user]);

  // =========================
  // DELETE RATING
  // =========================
  const handleDeleteRating = async (ratingItem) => {
    try {
      const confirmResult = await Swal.fire({
        title: "Delete Rating?",
        text: `Are you sure you want to remove your rating for ${ratingItem.seniorName || ratingItem.senior}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Yes, delete",
      });

      if (!confirmResult.isConfirmed) return;

      // Delete from backend if _id exists
      if (ratingItem._id) {
        try {
          await fetch(`${API_URL}/reviews/${ratingItem._id}`, {
            method: "DELETE",
          });
        } catch (delErr) {
          console.error("Backend delete error:", delErr);
        }
      }

      // Delete from localStorage
      try {
        const local = JSON.parse(localStorage.getItem("my_ratings") || "[]");
        const filteredLocal = local.filter(
          (item) => String(item._id) !== String(ratingItem._id)
        );
        localStorage.setItem("my_ratings", JSON.stringify(filteredLocal));
      } catch (storageErr) {
        console.error("Local storage delete error:", storageErr);
      }

      setRatings((prev) =>
        prev.filter((item) => String(item._id) !== String(ratingItem._id))
      );

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your rating has been removed.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Delete error:", err);
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: err.message || "Could not delete rating.",
      });
    }
  };

  // =========================
  // FILTER & STATS
  // =========================
  const filteredRatings = useMemo(() => {
    if (activeTab === "all") return ratings;
    return ratings.filter(
      (r) => (r.status || "Published").toLowerCase() === activeTab
    );
  }, [ratings, activeTab]);

  const totalRatings = ratings.length;

  const averageGiven = useMemo(() => {
    if (ratings.length === 0) return "0.0";
    const sum = ratings.reduce(
      (acc, curr) => acc + Number(curr.rating || 0),
      0
    );
    return (sum / ratings.length).toFixed(1);
  }, [ratings]);

  const reviewsWritten = useMemo(() => {
    return ratings.filter(
      (r) => r.review && r.review !== "No written review provided."
    ).length;
  }, [ratings]);

  const seniorsRatedCount = useMemo(() => {
    const unique = new Set(
      ratings.map((r) => r.seniorId || r.seniorName || r.senior)
    );
    return unique.size;
  }, [ratings]);

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold text-indigo-600">
                CampusRate
              </p>
              <h1 className="mt-1 text-3xl font-extrabold text-slate-900">
                My Ratings
              </h1>
              <p className="mt-2 text-slate-500">
                Manage and view all the anonymous ratings you have submitted.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600">
              <ShieldCheck size={18} />
              Your ratings are anonymous
            </div>
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Ratings</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {totalRatings}
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Star size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Average Given</p>
                <h2 className="mt-2 flex items-center gap-2 text-3xl font-bold text-slate-900">
                  {averageGiven}
                  <Star
                    size={20}
                    fill="currentColor"
                    className="text-yellow-400"
                  />
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-500">
                <TrendingUp size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Reviews Written</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {reviewsWritten}
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <MessageCircle size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Seniors Rated</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {seniorsRatedCount}
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-pink-500">
                <Award size={23} />
              </div>
            </div>
          </div>
        </div>

        {/* ================= TABS ================= */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {[
              { id: "all", label: "All Ratings" },
              { id: "published", label: "Published" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Link
            to="/seniors"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:shadow-md hover:scale-[1.02]"
          >
            <Sparkles size={16} />
            Rate Another Senior
          </Link>
        </div>

        {/* ================= LOADING STATE ================= */}
        {loading ? (
          <div className="mt-12 flex flex-col items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading your ratings...
            </p>
          </div>
        ) : filteredRatings.length > 0 ? (
          /* ================= RATING LIST ================= */
          <div className="mt-6 space-y-6">
            {filteredRatings.map((rating) => {
              const seniorDisplayName =
                rating.seniorName || rating.senior || "Senior Profile";
              const seniorBatch = rating.seniorBatch || rating.batch || "Batch";
              const seniorDept =
                rating.seniorDepartment || rating.department || "Dept";
              const initials = seniorDisplayName
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <div
                  key={rating._id || `${rating.seniorId}-${rating.date}`}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs transition hover:shadow-md"
                >
                  {/* Card Header */}
                  <div className="flex flex-col justify-between gap-5 border-b border-slate-100 p-6 md:flex-row md:items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 font-bold text-white shadow-sm">
                        {rating.seniorImage ? (
                          <img
                            src={rating.seniorImage}
                            alt={seniorDisplayName}
                            className="h-full w-full rounded-2xl object-cover"
                          />
                        ) : (
                          initials
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {seniorDisplayName}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {seniorBatch} • {seniorDept}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5 rounded-full bg-yellow-50 px-4 py-2 text-sm font-bold text-yellow-600">
                        <Star size={17} fill="currentColor" />
                        <span>{rating.rating}</span>
                      </div>

                      <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-600">
                        {rating.status || "Published"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="grid gap-6 lg:grid-cols-3">
                      {/* Review Text */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                          <MessageCircle size={17} />
                          Your Anonymous Review
                        </div>

                        <p className="mt-3 rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
                          "{rating.review || "No written review provided."}"
                        </p>

                        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                          <CalendarDays size={15} />
                          Submitted on {rating.date}
                        </div>
                      </div>

                      {/* Categories Breakdown */}
                      {rating.categories && Object.keys(rating.categories).length > 0 && (
                        <div>
                          <p className="mb-4 text-sm font-semibold text-slate-700">
                            Category Breakdown
                          </p>

                          <div className="space-y-3">
                            {Object.entries(rating.categories).map(
                              ([catKey, score]) => (
                                <div key={catKey}>
                                  <div className="mb-1 flex justify-between text-xs">
                                    <span className="text-slate-500 font-medium">
                                      {categoryNames[catKey] || catKey}
                                    </span>
                                    <span className="font-bold text-slate-700">
                                      {score}/5
                                    </span>
                                  </div>

                                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                      style={{
                                        width: `${(Number(score) / 5) * 100}%`,
                                      }}
                                    />
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
                      <Link
                        to={rating.seniorId ? `/rate/${rating.seniorId}` : "/seniors"}
                        className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-indigo-500 hover:text-indigo-600"
                      >
                        <Eye size={16} />
                        View / Rate Again
                      </Link>

                      <button
                        onClick={() => handleDeleteRating(rating)}
                        className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                        Delete Rating
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ================= EMPTY STATE ================= */
          <div className="mt-8 rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-xs">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Star size={30} />
            </div>

            <h3 className="mt-4 text-xl font-bold text-slate-800">
              No ratings submitted yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Explore seniors from your department and campus, share your honest
              and anonymous feedback, and help juniors make informed choices!
            </p>

            <Link
              to="/seniors"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:scale-105"
            >
              Browse Seniors Now
              <ArrowRight size={17} />
            </Link>
          </div>
        )}

        {/* ================= PRIVACY MESSAGE ================= */}
        <div className="mt-10 flex items-start gap-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-xs">
            <ShieldCheck size={22} />
          </div>

          <div>
            <h3 className="font-bold text-slate-900">
              Your identity is protected
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Your ratings and reviews are shown anonymously across the platform.
              Neither seniors nor other students can view who submitted each rating.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyRating;
