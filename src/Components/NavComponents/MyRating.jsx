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
import { getSeniorPhoto } from "../../utils/studentPhotos";

const API_URL = "http://localhost:3000";

const categoryNames = {
  behavior: "Behavior & Attitude",
  movement: "Leadership Presence",
  friendly: "Approachability",
  helpful: "Helpfulness",
  respect: "Mutual Respect",
  communication: "Communication",
  helpfulness: "Helpfulness",
  guidance: "Guidance",
};

const MyRating = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyRatings = async () => {
    try {
      setLoading(true);

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

      let localRatings = [];
      try {
        localRatings = JSON.parse(localStorage.getItem("my_ratings") || "[]");
      } catch (localErr) {
        console.error("LocalStorage read error:", localErr);
      }

      const map = new Map();
      backendRatings.forEach((item) => {
        const key = item._id || `${item.seniorId}-${item.date}`;
        map.set(String(key), item);
      });

      localRatings.forEach((item) => {
        const key = item._id || `${item.seniorId}-${item.date}`;
        if (!map.has(String(key))) {
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

  const handleDeleteRating = async (ratingItem) => {
    try {
      const confirmResult = await Swal.fire({
        title: "Delete Rating?",
        text: `Are you sure you want to remove your rating for ${ratingItem.seniorName || ratingItem.senior}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#334155",
        confirmButtonText: "Yes, delete",
      });

      if (!confirmResult.isConfirmed) return;

      if (ratingItem._id) {
        try {
          await fetch(`${API_URL}/reviews/${ratingItem._id}`, {
            method: "DELETE",
          });
        } catch (delErr) {
          console.error("Backend delete error:", delErr);
        }
      }

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
    <section className="min-h-screen bg-slate-950 text-white px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold mb-2">
                Personal Activity
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                My Submitted Ratings
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-400">
                Manage all anonymous mentorship feedback you have contributed to the platform.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-300 shadow-xs">
              <ShieldCheck size={16} className="text-emerald-400" />
              Published Anonymously
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Ratings</p>
                <h2 className="mt-1 text-2xl font-black text-white">{totalRatings}</h2>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-300">
                <Star size={20} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average Given</p>
                <h2 className="mt-1 flex items-center gap-1.5 text-2xl font-black text-white">
                  {averageGiven}
                  <Star size={18} className="fill-amber-400 text-amber-400" />
                </h2>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-300">
                <TrendingUp size={20} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Reviews Written</p>
                <h2 className="mt-1 text-2xl font-black text-white">{reviewsWritten}</h2>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-300">
                <MessageCircle size={20} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Seniors Evaluated</p>
                <h2 className="mt-1 text-2xl font-black text-white">{seniorsRatedCount}</h2>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-300">
                <Award size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {[
              { id: "all", label: "All Ratings" },
              { id: "published", label: "Published" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Link
            to="/seniors"
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-indigo-500 hover:scale-[1.02]"
          >
            <Sparkles size={14} className="text-amber-400" />
            Rate Another Senior
          </Link>
        </div>

        {/* List Content */}
        {loading ? (
          <div className="mt-12 flex flex-col items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-3 border-slate-700 border-t-indigo-500" />
            <p className="mt-3 text-xs font-semibold text-slate-400">
              Loading your submitted evaluations...
            </p>
          </div>
        ) : filteredRatings.length > 0 ? (
          <div className="mt-6 space-y-4">
            {filteredRatings.map((rating) => {
              const seniorDisplayName =
                rating.seniorName || rating.senior || "Senior Profile";
              const seniorBatch = rating.seniorBatch || rating.batch || "Batch";
              const seniorDept =
                rating.seniorDepartment || rating.department || "Dept";
              const photoUrl = getSeniorPhoto({ name: seniorDisplayName, _id: rating.seniorId, image: rating.seniorImage });

              return (
                <div
                  key={rating._id || `${rating.seniorId}-${rating.date}`}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition hover:border-slate-700"
                >
                  {/* Card Header with Photo */}
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center pb-5 border-b border-slate-800">
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-12 w-12 shrink-0 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                        <img
                          src={photoUrl}
                          alt={seniorDisplayName}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-white">
                          {seniorDisplayName}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {seniorBatch} • {seniorDept}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center gap-1 rounded-md bg-slate-950 border border-slate-800 px-2.5 py-1 text-xs font-bold text-amber-400">
                        <Star size={14} className="fill-amber-400" />
                        <span>{rating.rating}</span>
                      </div>

                      <span className="rounded-md bg-slate-950 border border-emerald-500/30 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                        {rating.status || "Published"}
                      </span>
                    </div>
                  </div>

                  {/* Review Text & Scores */}
                  <div className="pt-5 grid gap-5 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                        <MessageCircle size={14} />
                        Your Anonymous Review
                      </div>

                      <p className="mt-2.5 rounded-xl bg-slate-950 border border-slate-800 p-4 text-xs sm:text-sm leading-relaxed text-slate-300 italic">
                        "{rating.review || "No written review provided."}"
                      </p>

                      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
                        <CalendarDays size={13} />
                        Submitted on {rating.date}
                      </div>
                    </div>

                    {rating.categories && Object.keys(rating.categories).length > 0 && (
                      <div className="border-t lg:border-t-0 lg:border-l border-slate-800 lg:pl-5">
                        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                          Category Breakdown
                        </p>

                        <div className="space-y-2.5">
                          {Object.entries(rating.categories).map(([catKey, score]) => (
                            <div key={catKey}>
                              <div className="mb-1 flex justify-between text-[11px]">
                                <span className="text-slate-400 font-medium">
                                  {categoryNames[catKey] || catKey}
                                </span>
                                <span className="font-bold text-white">
                                  {score}/5
                                </span>
                              </div>
                              <div className="h-1.5 overflow-hidden rounded-full bg-slate-950">
                                <div
                                  className="h-full bg-indigo-500"
                                  style={{
                                    width: `${(Number(score) / 5) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-800">
                    <Link
                      to={rating.seniorId ? `/rate/${rating.seniorId}` : "/seniors"}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-indigo-400"
                    >
                      <Eye size={14} />
                      View Profile
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDeleteRating(rating)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 cursor-pointer"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center shadow-xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-400">
              <Star size={24} />
            </div>

            <h3 className="mt-4 text-base font-bold text-white">
              No ratings submitted yet
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-xs text-slate-400 leading-relaxed">
              Explore eligible senior mentors from preceding batches and leave anonymous guidance ratings.
            </p>

            <Link
              to="/seniors"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-indigo-500"
            >
              Browse Senior Batches
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyRating;
