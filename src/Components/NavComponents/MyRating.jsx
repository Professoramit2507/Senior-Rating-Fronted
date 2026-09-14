import  { useState } from "react";
import {
  Star,
  MessageCircle,
  CalendarDays,
  Eye,
  Edit3,
  ShieldCheck,
  TrendingUp,
  Award,
} from "lucide-react";

const MyRating = () => {
  const [activeTab, setActiveTab] = useState("all");

  const ratings = [
    {
      id: 1,
      senior: "Arafat Rahman",
      batch: "4th Batch",
      department: "CSE",
      rating: 4.8,
      date: "Sep 10, 2026",
      status: "Published",
      review:
        "Very helpful and supportive. Always gives useful guidance when juniors need help.",
      categories: {
        helpfulness: 5,
        communication: 4.5,
        behavior: 5,
        guidance: 4.5,
      },
    },
    {
      id: 2,
      senior: "Nusrat Jahan",
      batch: "3rd Batch",
      department: "CSE",
      rating: 4.5,
      date: "Sep 05, 2026",
      status: "Published",
      review:
        "She is very friendly and always tries to help juniors with academic problems.",
      categories: {
        helpfulness: 5,
        communication: 4,
        behavior: 4.5,
        guidance: 4.5,
      },
    },
    {
      id: 3,
      senior: "Tanvir Hasan",
      batch: "4th Batch",
      department: "EEE",
      rating: 4.0,
      date: "Aug 28, 2026",
      status: "Published",
      review:
        "Good senior with helpful advice and a positive attitude.",
      categories: {
        helpfulness: 4,
        communication: 4,
        behavior: 4,
        guidance: 4,
      },
    },
  ];

  const filteredRatings =
    activeTab === "all"
      ? ratings
      : ratings.filter((rating) => rating.status.toLowerCase() === activeTab);

  return (
    <section className="min-h-screen bg-slate-50 px-6 py-10">

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
                Manage and view all the ratings you have submitted.
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

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Total Ratings
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  12
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Star size={23} />
              </div>

            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Average Given
                </p>

                <h2 className="mt-2 flex items-center gap-2 text-3xl font-bold text-slate-900">
                  4.6
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

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Reviews Written
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  10
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <MessageCircle size={23} />
              </div>

            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Seniors Rated
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  12
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-pink-500">
                <Award size={23} />
              </div>

            </div>
          </div>

        </div>

        {/* ================= TABS ================= */}
        <div className="mt-10 flex flex-wrap gap-3">

          {[
            { id: "all", label: "All Ratings" },
            { id: "published", label: "Published" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}

        </div>

        {/* ================= RATING LIST ================= */}
        <div className="mt-6 space-y-6">

          {filteredRatings.map((rating) => (
            <div
              key={rating.id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
            >

              {/* Card Header */}
              <div className="flex flex-col justify-between gap-5 border-b border-slate-100 p-6 md:flex-row md:items-center">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 font-bold text-white shadow-md">
                    {rating.senior
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {rating.senior}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {rating.batch} • {rating.department}
                    </p>
                  </div>

                </div>

                <div className="flex flex-wrap items-center gap-3">

                  <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-4 py-2 text-sm font-bold text-yellow-600">
                    <Star
                      size={17}
                      fill="currentColor"
                    />
                    {rating.rating}
                  </div>

                  <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-600">
                    {rating.status}
                  </span>

                </div>

              </div>

              {/* Content */}
              <div className="p-6">

                <div className="grid gap-6 lg:grid-cols-3">

                  {/* Review */}
                  <div className="lg:col-span-2">

                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <MessageCircle size={17} />
                      Your Anonymous Review
                    </div>

                    <p className="mt-3 rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
                      "{rating.review}"
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                      <CalendarDays size={15} />
                      Submitted on {rating.date}
                    </div>

                  </div>

                  {/* Categories */}
                  <div>

                    <p className="mb-4 text-sm font-semibold text-slate-700">
                      Category Ratings
                    </p>

                    <div className="space-y-3">

                      {Object.entries(rating.categories).map(
                        ([category, score]) => (
                          <div key={category}>

                            <div className="mb-1 flex justify-between text-xs">
                              <span className="capitalize text-slate-500">
                                {category}
                              </span>

                              <span className="font-semibold text-slate-700">
                                {score}
                              </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                style={{
                                  width: `${(score / 5) * 100}%`,
                                }}
                              />
                            </div>

                          </div>
                        )
                      )}

                    </div>

                  </div>

                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">

                  <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-indigo-500 hover:text-indigo-600">
                    <Eye size={16} />
                    View Senior
                  </button>

                  <button className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-5 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100">
                    <Edit3 size={16} />
                    Edit Rating
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

        {/* ================= PRIVACY MESSAGE ================= */}
        <div className="mt-10 flex items-start gap-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
            <ShieldCheck size={22} />
          </div>

          <div>
            <h3 className="font-bold text-slate-900">
              Your identity is protected
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Your ratings and reviews are shown anonymously. Other students
              and seniors cannot see that you submitted a particular rating.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default MyRating;