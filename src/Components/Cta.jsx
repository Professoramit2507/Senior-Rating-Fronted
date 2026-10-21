import {
  Star,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "react-router";

const FinalCTA = () => {
  return (
    <section className="relative bg-slate-900 py-20 text-white border-t border-slate-800">
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xs">
          <Star size={26} className="fill-white" />
        </div>

        {/* Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-300">
          <Sparkles size={13} className="text-amber-400" />
          Make an Impact
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Ready to Make Your <span className="text-indigo-400">Voice Count?</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300">
          Rate your seniors with verified anonymity, encourage excellence across batches, and foster a transparent campus environment.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/seniors"
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-xs transition-colors hover:bg-slate-100"
          >
            Rate a Senior Now
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          <Link
            to="/seniors"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-700"
          >
            <Users size={16} />
            Explore Seniors Directory
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 border-t border-slate-800/80 pt-8">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-400" />
            100% Anonymous Delivery
          </div>

          <div className="h-1 w-1 rounded-full bg-slate-700 hidden sm:block" />

          <div className="flex items-center gap-2">
            <Star size={16} className="text-amber-400 fill-amber-400" />
            Objective Peer Evaluation
          </div>

          <div className="h-1 w-1 rounded-full bg-slate-700 hidden sm:block" />

          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-indigo-400" />
            Verified Batch Architecture
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
