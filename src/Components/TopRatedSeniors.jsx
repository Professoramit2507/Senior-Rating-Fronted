import {
  Star,
  GraduationCap,
  MessageCircle,
  ArrowRight,
  Trophy,
} from "lucide-react";
import { Link } from "react-router";
import { getSeniorPhoto } from "../utils/studentPhotos";

const TopRatedSeniors = () => {
  const seniors = [
    {
      id: "top-1",
      name: "Arafat Rahman",
      batch: "4th Batch",
      department: "CSE",
      rating: "4.9",
      reviews: 128,
      role: "Senior Mentor",
    },
    {
      id: "top-2",
      name: "Nusrat Jahan",
      batch: "3rd Batch",
      department: "CSE",
      rating: "4.8",
      reviews: 96,
      role: "Academic Guide",
    },
    {
      id: "top-3",
      name: "Tanvir Hasan",
      batch: "2nd Batch",
      department: "CSE",
      rating: "4.8",
      reviews: 84,
      role: "Student Leader",
    },
  ];

  return (
    <section className="relative bg-slate-950 text-white py-24 border-t border-slate-900">
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <Trophy size={14} className="text-amber-400" />
            Top Rated Mentors
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Seniors Who Make a <span className="text-indigo-400">Difference</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-400">
            Discover peer mentors acknowledged by their junior batches for exceptional guidance, collaboration, and supportive campus leadership.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {seniors.map((senior, index) => {
            const photoUrl = getSeniorPhoto(senior);

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-slate-700 hover:shadow-2xl hover:shadow-indigo-950/40 flex flex-col justify-between"
              >
                <div>
                  {/* Photo with Overlay */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                    <img
                      src={photoUrl}
                      alt={senior.name}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />

                    <div className="absolute top-3 left-3 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/80 border border-slate-800 font-bold text-amber-400 text-xs shadow-md">
                      #{index + 1}
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 px-2.5 py-1 text-xs font-bold text-amber-400">
                      <Star size={13} className="fill-amber-400" />
                      <span>{senior.rating}</span>
                    </div>

                    <div className="absolute bottom-3 left-4">
                      <span className="rounded-md bg-indigo-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                        {senior.department}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 pt-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {senior.name}
                    </h3>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                      <GraduationCap size={14} className="text-slate-500" />
                      <span>{senior.batch}</span>
                      <span>•</span>
                      <span>{senior.role}</span>
                    </div>

                    {/* Stats */}
                    <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-950/80 border border-slate-800 p-3 text-xs">
                      <div>
                        <div className="flex items-center gap-1 font-bold text-white">
                          <Star size={14} className="fill-amber-400 text-amber-400" />
                          <span>{senior.rating} / 5.0</span>
                        </div>
                        <span className="text-[10px] text-slate-500">Average Rating</span>
                      </div>

                      <div className="flex items-center gap-1 text-slate-400 font-medium">
                        <MessageCircle size={14} />
                        <span>{senior.reviews} reviews</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to="/seniors"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-500 active:scale-[0.98]"
                  >
                    View & Rate Senior
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom */}
        <div className="mt-12 text-center">
          <Link
            to="/seniors"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:bg-slate-800 hover:border-slate-700"
          >
            Explore All Seniors Directory
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopRatedSeniors;
