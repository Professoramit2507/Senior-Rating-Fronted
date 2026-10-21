import {
  Star,
  ShieldCheck,
  ArrowRight,
  Users,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router";
import { getSeniorPhoto } from "../utils/studentPhotos";

const Hero = () => {
  const samplePhoto = getSeniorPhoto({ name: "Arafat Rahman", _id: "hero-1" });

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white border-b border-slate-900 py-16 lg:py-24">
      {/* Main Content */}
      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* ================= LEFT SIDE ================= */}
        <div className="animate-fade-in">
          {/* Small Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold mb-6 shadow-xs animate-float">
            <Sparkles size={14} className="text-amber-400" />
            Verified Campus Platform
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
            Rate Seniors with Confidence.{" "}
            <span className="text-indigo-400">100% Anonymously.</span>
          </h1>

          {/* Description */}
          <p className="mt-5 text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
            CampusRate allows junior students to provide constructive, honest
            feedback to their seniors across academic, behavioral, and mentorship
            qualities—without ever revealing their personal identity.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mt-8">
            <Link
              to="/seniors"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-bold text-xs sm:text-sm shadow-xs transition hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Star size={16} className="fill-white" />
              <span>Browse & Rate Seniors</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs sm:text-sm shadow-xs transition hover:bg-slate-800 hover:text-white"
            >
              <Users size={16} />
              <span>Read Campus Reviews</span>
            </Link>
          </div>

          {/* Trust Info */}
          <div className="flex flex-wrap items-center gap-6 mt-10 pt-6 border-t border-slate-800/80">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400">
                <ShieldCheck size={17} />
              </div>
              Zero Identity Tracking
            </div>

            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400">
                <Star size={17} className="fill-amber-400" />
              </div>
              Verified 6-Pillar Criteria
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE PREVIEW CARD ================= */}
        <div className="relative flex justify-center lg:justify-end animate-slide-up">
          <div className="relative w-full max-w-md bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-6 transition-all duration-300 hover:border-slate-700">
            {/* Header with Photo */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-800">
              <div className="relative h-14 w-14 rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shrink-0">
                <img
                  src={samplePhoto}
                  alt="Arafat Rahman"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base leading-tight">
                    Arafat Rahman
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider">
                    Senior
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  2nd Batch • CSE Department
                </p>
              </div>
            </div>

            {/* Score Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 my-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Overall Mentorship Score
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-black text-white">4.9</span>
                  <div className="flex gap-0.5 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={14} className="fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                  Verified Reviews
                </span>
                <p className="text-base font-bold text-indigo-400">128</p>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-3">
              {[
                ["Helpfulness (সহযোগিতা)", "4.9"],
                ["Communication (কথাবার্তা)", "4.8"],
                ["Behavior (ব্যবহার)", "4.9"],
                ["Approachability (মিশুকি)", "4.7"],
              ].map(([title, rating]) => (
                <div key={title}>
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-slate-400">{title}</span>
                    <span className="font-bold text-white">{rating} / 5</span>
                  </div>

                  <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{
                        width: `${(Number(rating) / 5) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Anonymous quote */}
            <div className="mt-5 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center gap-1.5 mb-1 text-xs font-bold text-emerald-400">
                <ShieldCheck size={14} />
                Anonymous Junior Feedback
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                “Always approachable during project work and explains concepts with genuine patience.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
