import {
  Star,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950" />

      {/* Glow */}
      <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-indigo-500/30 blur-3xl" />

      <div className="absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">

        {/* Icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-pink-500 text-white shadow-2xl shadow-purple-500/30">
          <Star size={38} fill="currentColor" />
        </div>

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm font-semibold text-indigo-200 backdrop-blur-md">
          <Sparkles size={16} />
          Your Voice Matters
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
          Ready to Make Your
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Voice Heard?
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Rate your seniors honestly, help them grow, and contribute to a
          better campus community — all while keeping your identity private.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <button className="group flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-indigo-700 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            Rate a Senior
            <ArrowRight
              size={19}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20">
            <Users size={19} />
            Explore Seniors
          </button>

        </div>

        {/* Trust */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">

          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-400" />
            100% Anonymous
          </div>

          <div className="h-1 w-1 rounded-full bg-slate-600" />

          <div className="flex items-center gap-2">
            <Star size={18} className="text-yellow-400" />
            Honest Feedback
          </div>

          <div className="h-1 w-1 rounded-full bg-slate-600" />

          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-purple-400" />
            Built for Students
          </div>

        </div>

      </div>
    </section>
  );
};

export default FinalCTA;