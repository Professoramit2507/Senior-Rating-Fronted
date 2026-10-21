import {
  ShieldCheck,
  MessageCircleHeart,
  Users,
  TrendingUp,
  Sparkles,
  HeartHandshake,
} from "lucide-react";

const WhyCampusRate = () => {
  const reasons = [
    {
      icon: ShieldCheck,
      title: "100% Anonymous",
      description:
        "Share candid feedback without worrying about your identity being revealed or logged.",
      badge: "Zero Trace",
    },
    {
      icon: MessageCircleHeart,
      title: "Constructive Feedback",
      description:
        "Equip seniors with structured insights to help them understand their strengths and mentor better.",
      badge: "Actionable",
    },
    {
      icon: Users,
      title: "Better Leadership",
      description:
        "Fosters a supportive community culture where experienced students actively uplift juniors.",
      badge: "Culture",
    },
    {
      icon: TrendingUp,
      title: "Accountable Growth",
      description:
        "Data-backed senior performance metrics encourage continuous personal and professional development.",
      badge: "Growth",
    },
  ];

  return (
    <section className="relative bg-slate-900/40 text-white py-24 border-t border-slate-900">
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center animate-fade-in">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <Sparkles size={14} className="text-indigo-400" />
            Why CampusRate
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            More Than Just <span className="text-indigo-400">Ratings</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-400">
            CampusRate creates an authentic environment where junior students can speak with confidence and seniors can evolve through real feedback.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <div
                key={index}
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition-all duration-300 hover:border-slate-700 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-white shadow-xs group-hover:bg-indigo-600 transition-colors">
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-950 text-slate-300 border border-slate-800">
                      {reason.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {reason.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-400">
                    {reason.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-indigo-400 transition-colors" />
                  Verified standard
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div className="mt-14 flex items-center justify-center gap-3 text-center border-t border-slate-800/80 pt-8">
          <HeartHandshake size={20} className="text-indigo-400" />
          <p className="text-xs sm:text-sm font-semibold text-slate-400">
            Better feedback. <span className="text-white">Better seniors.</span> <span className="text-indigo-400">Better campus.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyCampusRate;
