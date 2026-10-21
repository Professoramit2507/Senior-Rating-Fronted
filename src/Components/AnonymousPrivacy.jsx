import {
  ShieldCheck,
  LockKeyhole,
  EyeOff,
  UserRoundX,
  Database,
  CheckCircle2,
} from "lucide-react";

const AnonymousPrivacy = () => {
  const features = [
    {
      icon: EyeOff,
      title: "Zero Identity Tracing",
      description:
        "Your student ID, name, IP address, and account details are strictly omitted from submitted ratings.",
    },
    {
      icon: LockKeyhole,
      title: "Cryptographic Isolation",
      description:
        "Feedback entries are dissociated from user accounts in the database layer.",
    },
    {
      icon: UserRoundX,
      title: "No Public Reviewer Profiling",
      description:
        "Seniors and staff can only read aggregated ratings and review texts without authorship clues.",
    },
    {
      icon: Database,
      title: "Batch Verification Only",
      description:
        "We only verify that you belong to an eligible junior batch before granting submission permissions.",
    },
  ];

  return (
    <section className="relative bg-slate-950 py-24 border-t border-slate-900">
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <ShieldCheck size={14} className="text-emerald-400" />
            Institutional Privacy Standard
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-white tracking-tight">
            Speak Honestly. <span className="text-indigo-400">Stay Anonymous.</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-400">
            CampusRate gives juniors a safe and confidential platform to share candid evaluations without fear of retaliation or social pressure.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left Privacy Card */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
            {/* Icon & Status */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
                <ShieldCheck size={26} />
              </div>

              <div className="flex items-center gap-1.5 rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-xs font-medium text-emerald-400">
                <CheckCircle2 size={14} />
                Strict Confidentiality
              </div>
            </div>

            <h3 className="text-xl font-bold text-white">
              100% Anonymous Feedback Delivery
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Your feedback is crucial for student leadership development, but your identity never needs to be exposed. The platform decouples author data to maintain complete objectivity.
            </p>

            {/* Anonymous Review Mock */}
            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-300">
                    <UserRoundX size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">
                      Verified Junior Batch Member
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Identity Omitted
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 rounded-md bg-slate-900 border border-slate-800 px-2 py-0.5 text-xs font-bold text-amber-400">
                  ★ 5.0
                </div>
              </div>

              <p className="text-xs leading-relaxed text-slate-300 italic">
                "Consistently offers clear project guidance and maintains an approachable, respectful attitude with junior lab teams."
              </p>
            </div>

            {/* Privacy Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-md border border-slate-800 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300">
                No IP Logging
              </span>
              <span className="rounded-md border border-slate-800 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300">
                Role Obfuscation
              </span>
              <span className="rounded-md border border-slate-800 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300">
                Audit Safe
              </span>
            </div>
          </div>

          {/* Right Features */}
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-200 hover:border-slate-700 hover:bg-slate-900 flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-200 border border-slate-700">
                      <Icon size={20} />
                    </div>

                    <h3 className="text-base font-bold text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-12 rounded-xl border border-slate-800 bg-slate-900 px-6 py-4 text-center">
          <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
            <ShieldCheck className="text-indigo-400" size={18} />
            <p className="text-xs sm:text-sm font-medium text-slate-300">
              Every review directly fosters academic leadership without exposing the author.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnonymousPrivacy;
