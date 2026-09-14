import {
  Star,
  GraduationCap,
  MessageCircle,
  ArrowRight,
  Trophy,
  Sparkles,
} from "lucide-react";

const TopRatedSeniors = () => {
  const seniors = [
    {
      name: "Arafat Rahman",
      batch: "4th Batch",
      department: "CSE",
      rating: "4.9",
      reviews: 128,
      role: "Senior Mentor",
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      name: "Nusrat Jahan",
      batch: "3rd Batch",
      department: "CSE",
      rating: "4.8",
      reviews: 96,
      role: "Academic Guide",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      name: "Tanvir Hasan",
      batch: "2nd Batch",
      department: "CSE",
      rating: "4.8",
      reviews: 84,
      role: "Student Leader",
      gradient: "from-cyan-500 to-blue-600",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24">

      {/* Background */}
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-indigo-100 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-100 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-14 text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-yellow-50 px-5 py-2 text-sm font-semibold text-yellow-600">
            <Trophy size={17} />
            Top Rated Seniors
            <Sparkles size={15} />
          </div>

          <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl">
            Seniors Who Make a{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Difference
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-500">
            Discover seniors who are highly appreciated by their juniors for
            their helpfulness, communication, guidance, and behavior.
          </p>

        </div>

        {/* Cards */}
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

          {seniors.map((senior, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
            >

              {/* Rank */}
              <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-50 font-bold text-yellow-500">
                #{index + 1}
              </div>

              {/* Avatar */}
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${senior.gradient} text-2xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
              >
                {senior.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </div>

              <div className="mt-6">

                <h3 className="text-xl font-bold text-slate-900">
                  {senior.name}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <GraduationCap size={16} />
                  {senior.batch} • {senior.department}
                </div>

                <span className="mt-3 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                  {senior.role}
                </span>

              </div>

              {/* Rating */}
              <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-50 p-4">

                <div>
                  <div className="flex items-center gap-2">
                    <Star
                      size={20}
                      fill="currentColor"
                      className="text-yellow-400"
                    />
                    <span className="text-xl font-extrabold text-slate-900">
                      {senior.rating}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    Overall Rating
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MessageCircle size={16} />
                  {senior.reviews} reviews
                </div>

              </div>

              {/* Button */}
              <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 font-semibold text-slate-700 transition-all duration-300 group-hover:border-indigo-500 group-hover:bg-indigo-600 group-hover:text-white">
                View Profile
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

            </div>
          ))}

        </div>

        {/* Bottom */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-105">
            Explore All Seniors
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default TopRatedSeniors;