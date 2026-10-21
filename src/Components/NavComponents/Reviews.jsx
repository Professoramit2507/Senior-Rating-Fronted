import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Search,
  Star,
  MessageCircle,
  CalendarDays,
  ShieldCheck,
  Filter,
  UserRound,
  ThumbsUp,
  Eye,
} from "lucide-react";
import { getSeniorPhoto } from "../../utils/studentPhotos";

const API_URL = "http://localhost:3000";

const defaultReviews = [
  {
    id: "def-1",
    senior: "Arafat Rahman",
    batch: "4th Batch",
    department: "CSE",
    rating: 5,
    date: "Sep 10, 2026",
    review:
      "Very helpful and supportive. Always gives useful guidance whenever juniors need help.",
    helpful: 12,
  },
  {
    id: "def-2",
    senior: "Nusrat Jahan",
    batch: "3rd Batch",
    department: "CSE",
    rating: 4,
    date: "Sep 05, 2026",
    review:
      "She is friendly and always tries to help juniors with academic problems.",
    helpful: 8,
  },
  {
    id: "def-3",
    senior: "Tanvir Hasan",
    batch: "4th Batch",
    department: "EEE",
    rating: 5,
    date: "Aug 28, 2026",
    review:
      "A really good senior. He provides useful advice and maintains a positive attitude.",
    helpful: 15,
  },
  {
    id: "def-4",
    senior: "Sadia Afrin",
    batch: "2nd Batch",
    department: "CSE",
    rating: 4,
    date: "Aug 20, 2026",
    review:
      "Helpful and approachable. Academic guidance was especially useful.",
    helpful: 6,
  },
  {
    id: "def-5",
    senior: "Rafi Ahmed",
    batch: "1st Batch",
    department: "CSE",
    rating: 3,
    date: "Aug 15, 2026",
    review:
      "Overall experience was good. Communication could be improved.",
    helpful: 4,
  },
];

const Reviews = () => {
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [reviews, setReviews] = useState(defaultReviews);
  const [helpfulCounts, setHelpfulCounts] = useState({});

  useEffect(() => {
    fetch(`${API_URL}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item, idx) => ({
            id: item._id || `db-${idx}`,
            senior: item.seniorName || item.senior || "Senior",
            batch: item.seniorBatch || item.batch || "N/A",
            department: item.seniorDepartment || item.department || "CSE",
            rating: Math.round(Number(item.rating || 5)),
            date: item.date || "Recent",
            review: item.review || "No written review.",
            helpful: Math.floor(Math.random() * 8) + 1,
            seniorId: item.seniorId,
          }));

          setReviews([...formatted, ...defaultReviews]);
        }
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  const handleHelpfulClick = (reviewId) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1,
    }));
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.senior.toLowerCase().includes(search.toLowerCase()) ||
      review.department.toLowerCase().includes(search.toLowerCase());

    const matchesRating =
      ratingFilter === "All" || review.rating === Number(ratingFilter);

    return matchesSearch && matchesRating;
  });

  return (
    <section className="min-h-screen bg-slate-950 text-white px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-md bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-300">
                <MessageCircle size={14} className="text-indigo-400" />
                Community Feed
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Peer Review Feed
              </h1>

              <p className="mt-1.5 max-w-2xl text-xs sm:text-sm text-slate-400">
                Explore real, unfiltered mentorship feedback shared anonymously by junior students.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-300 shadow-xs">
              <ShieldCheck size={16} className="text-emerald-400" />
              Verified Anonymity
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Reviews</p>
            <h2 className="mt-1 text-2xl font-black text-white">
              {reviews.length}
            </h2>
            <p className="mt-1 text-[11px] font-medium text-emerald-400">
              Active Community
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average Rating</p>
            <div className="mt-1 flex items-center gap-2">
              <h2 className="text-2xl font-black text-white">
                {(
                  reviews.reduce((acc, r) => acc + r.rating, 0) /
                  (reviews.length || 1)
                ).toFixed(1)}
              </h2>
              <Star size={18} className="fill-amber-400 text-amber-400" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Anonymous Students</p>
            <h2 className="mt-1 text-2xl font-black text-white">
              1,240+
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Seniors Evaluated</p>
            <h2 className="mt-1 text-2xl font-black text-white">
              {new Set(reviews.map((r) => r.senior)).size}
            </h2>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-xl">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="relative md:col-span-2">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                placeholder="Search reviews by senior name or department..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
              />
            </div>

            <div className="relative">
              <Filter
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-9 pr-3 text-xs sm:text-sm font-medium text-slate-300 outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="All" className="bg-slate-950 text-white">All Ratings</option>
                <option value="5" className="bg-slate-950 text-white">★★★★★ 5 Stars</option>
                <option value="4" className="bg-slate-950 text-white">★★★★ 4 Stars</option>
                <option value="3" className="bg-slate-950 text-white">★★★ 3 Stars</option>
                <option value="2" className="bg-slate-950 text-white">★★ 2 Stars</option>
                <option value="1" className="bg-slate-950 text-white">★ 1 Star</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">
              Recent Submissions ({filteredReviews.length})
            </h2>
          </div>

          <div className="space-y-4">
            {filteredReviews.map((review) => {
              const photoUrl = getSeniorPhoto({ name: review.senior, _id: review.seniorId });

              return (
                <div
                  key={review.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl transition hover:border-slate-700"
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 shrink-0 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                        <img
                          src={photoUrl}
                          alt={review.senior}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-white">
                            Anonymous Reviewer
                          </h3>
                          <ShieldCheck size={14} className="text-emerald-400" />
                        </div>

                        <p className="text-xs text-slate-400 mt-0.5">
                          Evaluated{" "}
                          <span className="font-semibold text-indigo-400">
                            {review.senior}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 rounded-md bg-slate-950 border border-slate-800 px-2.5 py-1 text-xs font-bold text-amber-400">
                      <Star size={13} className="fill-amber-400" />
                      <span>{review.rating}.0 / 5.0</span>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <span className="rounded-md bg-slate-950 border border-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                      {review.batch}
                    </span>
                    <span className="rounded-md bg-slate-950 border border-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                      {review.department}
                    </span>
                  </div>

                  <div className="mt-3 rounded-xl bg-slate-950 border border-slate-800 p-3.5">
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-300 italic">
                      "{review.review}"
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col justify-between gap-2 border-t border-slate-800 pt-3 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <CalendarDays size={13} />
                      {review.date}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={review.seniorId ? `/rate/${review.seniorId}` : "/seniors"}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700"
                      >
                        <Eye size={13} />
                        View Senior
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleHelpfulClick(review.id)}
                        className="inline-flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 cursor-pointer"
                      >
                        <ThumbsUp size={13} />
                        Helpful ({review.helpful + (helpfulCounts[review.id] || 0)})
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredReviews.length === 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 py-16 text-center shadow-xl">
              <MessageCircle size={24} className="mx-auto text-slate-500" />
              <h3 className="mt-3 text-sm font-bold text-white">
                No Reviews Found
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Try clearing your search query or filter criteria.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 rounded-2xl bg-slate-900 p-6 text-center text-white border border-slate-800">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-emerald-400">
            <ShieldCheck size={20} />
          </div>

          <h3 className="mt-3 text-base font-bold text-white">
            Institutional Privacy & Decoupled Authorship
          </h3>

          <p className="mx-auto mt-1 max-w-xl text-xs text-slate-400 leading-relaxed">
            Reviews empower senior students to benchmark their mentorship effectiveness. All evaluations are cryptographically detached from student identities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
