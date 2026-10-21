import {
  HandHelping,
  MessageCircle,
  Heart,
  GraduationCap,
  Crown,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const RatingCategories = () => {
  const categories = [
    {
      icon: HandHelping,
      title: "Helpfulness (সহযোগিতা)",
      description:
        "How supportive and approachable is the senior when juniors need advice or assistance?",
      rating: "4.9",
      reviews: "1.2K ratings",
    },
    {
      icon: MessageCircle,
      title: "Communication (কথাবার্তা)",
      description:
        "How respectfully, clearly, and constructively does the senior talk to juniors?",
      rating: "4.7",
      reviews: "980 ratings",
    },
    {
      icon: Heart,
      title: "Behavior (ব্যবহার)",
      description:
        "General attitude, humility, friendliness, and respect shown towards the campus community.",
      rating: "4.8",
      reviews: "1.1K ratings",
    },
    {
      icon: GraduationCap,
      title: "Academic Guidance (শিক্ষা)",
      description:
        "Effectiveness in helping juniors navigate coursework, lab tasks, projects, and study materials.",
      rating: "4.9",
      reviews: "850 ratings",
    },
    {
      icon: Crown,
      title: "Personality & Influence (ব্যক্তিত্ব)",
      description:
        "Inspiring presence, campus leadership, and positive influence on younger peers.",
      rating: "4.6",
      reviews: "760 ratings",
    },
    {
      icon: Star,
      title: "Overall Mentorship (সার্বিক)",
      description:
        "Comprehensive student evaluation reflecting the senior's total impact and mentorship quality.",
      rating: "4.8",
      reviews: "1.5K ratings",
    },
  ];

  return (
    <section className="relative bg-slate-950 text-white py-24 border-t border-slate-900">
      <div className="relative mx-auto max-w-7xl px-6">
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold mb-4">
            <Sparkles size={14} className="text-indigo-400" />
            Structured Evaluation
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Rate Your Senior Across{" "}
            <span className="text-indigo-400">6 Key Pillars</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
            Every review follows a structured methodology to ensure ratings are
            fair, constructive, and helpful for the student body.
          </p>
        </div>

        {/* ================= CATEGORY GRID ================= */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <div
                key={category.title}
                className="group relative bg-slate-900 rounded-2xl border border-slate-800 p-7 shadow-xl hover:border-slate-700 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Number */}
                  <span className="absolute top-6 right-7 text-3xl font-extrabold text-slate-800 select-none group-hover:text-slate-700 transition-colors">
                    0{index + 1}
                  </span>

                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 text-white flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-105 group-hover:bg-indigo-600">
                    <Icon size={22} />
                  </div>

                  {/* Content */}
                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {category.title}
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Star
                        size={16}
                        className="text-amber-400 fill-amber-400"
                      />
                      <span className="text-base font-bold text-white">
                        {category.rating}
                      </span>
                      <span className="text-xs text-slate-500">/ 5.0</span>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                      {category.reviews}
                    </p>
                  </div>

                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                    <ArrowRight size={15} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= BOTTOM INFO ================= */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            Standardized 1 to 5 star scale
          </div>
          <span className="hidden sm:inline text-slate-700">•</span>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Anonymous submissions protected
          </div>
        </div>
      </div>
    </section>
  );
};

export default RatingCategories;
