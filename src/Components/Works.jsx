import {
  LogIn,
  Search,
  Star,
  ShieldCheck,
  ArrowRight,
  LockKeyhole,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: LogIn,
      title: "Create Account & Sign In",
      description:
        "Authenticate using your verified campus student account to unlock the evaluation roster.",
    },
    {
      number: "02",
      icon: Search,
      title: "Find Your Senior",
      description:
        "Browse senior profiles filtered to preceding batches. You can only evaluate true seniors.",
    },
    {
      number: "03",
      icon: Star,
      title: "Submit 6-Category Rating",
      description:
        "Score across behavior, communication, helpfulness, and leave qualitative commentary.",
    },
    {
      number: "04",
      icon: ShieldCheck,
      title: "100% Anonymous Delivery",
      description:
        "Your feedback is cryptographically decoupled from your profile upon submission.",
    },
  ];

  return (
    <section className="relative bg-slate-900/40 text-white py-24 border-t border-slate-900">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center max-w-2xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <LockKeyhole size={14} className="text-indigo-400" />
            Simple & Secure Process
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How <span className="text-indigo-400">CampusRate</span> Works
          </h2>

          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Giving authentic feedback is designed to be streamlined, safe, and completely anonymous from start to finish.
          </p>
        </div>

        {/* ================= STEPS ================= */}
        <div className="relative mt-16">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-slate-800" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="group relative">
                  <div className="relative h-full bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl hover:border-slate-700 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      {/* Top Header of Card */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 text-white flex items-center justify-center shadow-xs group-hover:bg-indigo-600 transition-colors">
                          <Icon size={20} />
                        </div>
                        <span className="text-2xl font-black text-slate-700 group-hover:text-slate-400 transition-colors">
                          {step.number}
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-slate-400 text-xs sm:text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Step tag */}
                    <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-medium text-slate-500">
                      <span>Step {index + 1} of 4</span>
                      <ArrowRight size={13} className="text-slate-500 group-hover:translate-x-1 group-hover:text-indigo-400 transition-all" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= BOTTOM PRIVACY BANNER ================= */}
        <div className="mt-14 rounded-2xl bg-slate-900 text-white p-6 sm:p-7 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
              <ShieldCheck size={24} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Guaranteed Student Confidentiality
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Batch isolation and zero identity logging ensure honest reviews without peer pressure.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 text-emerald-400 border border-emerald-500/30 text-xs font-semibold shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Encrypted & Anonymous
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
