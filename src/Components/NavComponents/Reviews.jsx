import  { useState } from "react";
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

const Reviews = () => {
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");

  const reviews = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.senior.toLowerCase().includes(search.toLowerCase()) ||
      review.department.toLowerCase().includes(search.toLowerCase());

    const matchesRating =
      ratingFilter === "All" ||
      review.rating === Number(ratingFilter);

    return matchesSearch && matchesRating;
  });

  return (
    <section className="min-h-screen bg-slate-50 px-6 py-10">

      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="mb-10">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
                <MessageCircle size={17} />
                Anonymous Reviews
              </div>

              <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
                Reviews
              </h1>

              <p className="mt-2 max-w-2xl text-slate-500">
                Explore honest experiences and feedback shared anonymously
                by students across the campus.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600">
              <ShieldCheck size={18} />
              Anonymous & Secure
            </div>

          </div>

        </div>

        {/* ================= STATS ================= */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Reviews
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
              2,548
            </h2>

            <p className="mt-2 text-xs font-medium text-emerald-600">
              +18% this month
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Average Rating
            </p>

            <div className="mt-2 flex items-center gap-2">
              <h2 className="text-3xl font-extrabold text-slate-900">
                4.7
              </h2>

              <Star
                size={22}
                fill="currentColor"
                className="text-yellow-400"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Anonymous Students
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
              1,240+
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Seniors Reviewed
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
              250+
            </h2>
          </div>

        </div>

        {/* ================= SEARCH & FILTER ================= */}
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="grid gap-4 md:grid-cols-3">

            {/* Search */}
            <div className="relative md:col-span-2">

              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search reviews by senior or department..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />

            </div>

            {/* Rating Filter */}
            <div className="relative">

              <Filter
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
              >
                <option value="All">All Ratings</option>
                <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                <option value="3">⭐⭐⭐ 3 Stars</option>
                <option value="2">⭐⭐ 2 Stars</option>
                <option value="1">⭐ 1 Star</option>
              </select>

            </div>

          </div>

        </div>

        {/* ================= REVIEW LIST ================= */}
        <div className="mt-10">

          <div className="mb-6 flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Latest Reviews
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Honest feedback from anonymous students
              </p>
            </div>

            <p className="hidden text-sm text-slate-500 md:block">
              {filteredReviews.length} reviews found
            </p>

          </div>

          <div className="space-y-5">

            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                {/* Top */}
                <div className="flex flex-col justify-between gap-5 md:flex-row">

                  <div className="flex items-center gap-4">

                    {/* Anonymous Avatar */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-md">
                      <UserRound size={24} />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">

                        <h3 className="font-bold text-slate-900">
                          Anonymous Student
                        </h3>

                        <ShieldCheck
                          size={15}
                          className="text-emerald-500"
                        />

                      </div>

                      <p className="mt-1 text-sm text-slate-500">
                        Reviewed{" "}
                        <span className="font-semibold text-indigo-600">
                          {review.senior}
                        </span>
                      </p>

                    </div>

                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">

                    <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-4 py-2 text-sm font-bold text-yellow-600">

                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={15}
                          fill={
                            star <= review.rating
                              ? "currentColor"
                              : "none"
                          }
                        />
                      ))}

                      <span className="ml-1">
                        {review.rating}.0
                      </span>

                    </div>

                  </div>

                </div>

                {/* Senior Info */}
                <div className="mt-5 flex flex-wrap gap-2">

                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                    {review.batch}
                  </span>

                  <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
                    {review.department}
                  </span>

                </div>

                {/* Review */}
                <div className="mt-5 rounded-2xl bg-slate-50 p-5">

                  <p className="text-sm leading-7 text-slate-600">
                    "{review.review}"
                  </p>

                </div>

                {/* Bottom */}
                <div className="mt-5 flex flex-col justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <CalendarDays size={15} />
                    {review.date}
                  </div>

                  <div className="flex items-center gap-3">

                    <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-indigo-500 hover:text-indigo-600">
                      <Eye size={15} />
                      View Senior
                    </button>

                    <button className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600">
                      <ThumbsUp size={15} />
                      Helpful {review.helpful}
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

          {/* Empty State */}
          {filteredReviews.length === 0 && (
            <div className="rounded-3xl border border-slate-200 bg-white py-20 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
                <MessageCircle size={28} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                No Reviews Found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or rating filter.
              </p>

            </div>
          )}

        </div>

        {/* ================= PRIVACY BANNER ================= */}
        <div className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-center text-white">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
            <ShieldCheck size={28} />
          </div>

          <h3 className="mt-5 text-2xl font-bold">
            Every Voice Is Anonymous
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-indigo-100">
            Reviews help seniors understand how they are perceived by
            juniors. Reviewer identities remain protected so students can
            share genuine experiences without fear.
          </p>

        </div>

      </div>
    </section>
  );
};

export default Reviews;