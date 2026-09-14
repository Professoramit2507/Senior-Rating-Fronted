import {
  ShieldCheck,
  LockKeyhole,
  EyeOff,
  UserRoundX,
  Database,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const AnonymousPrivacy = () => {
  const features = [
    {
      icon: EyeOff,
      title: "Your Identity Stays Hidden",
      description:
        "Your name, student ID, and profile information will never be shown with your rating.",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: LockKeyhole,
      title: "Secure Rating System",
      description:
        "Every rating is securely processed so your feedback remains private and protected.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: UserRoundX,
      title: "No Public Reviewer Profile",
      description:
        "Seniors can see feedback, but they cannot see who submitted the rating.",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: Database,
      title: "Privacy First",
      description:
        "We designed CampusRate with privacy as a core principle from the beginning.",
      gradient: "from-cyan-500 to-indigo-500",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">
      {/* Background Decorations */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"></div>

      <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-5 py-2 text-sm font-semibold text-indigo-300">
            <ShieldCheck size={17} />
            Privacy Comes First
            <Sparkles size={15} />
          </div>

          <h2 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Speak Honestly.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Stay Anonymous.
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            CampusRate gives juniors a safe space to share honest feedback
            about their seniors without revealing their identity.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* Left Privacy Card */}
          <div className="relative">

            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-2xl"></div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-xl md:p-10">

              {/* Icon */}
              <div className="mb-8 flex items-center justify-between">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
                  <ShieldCheck size={34} />
                </div>

                <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">
                  <CheckCircle2 size={17} />
                  Protected
                </div>

              </div>

              <h3 className="text-2xl font-bold text-white">
                100% Anonymous Feedback
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                Your feedback matters, but your identity doesn't need to be
                revealed. CampusRate keeps the reviewer hidden while allowing
                seniors to understand how juniors experience their behavior,
                communication, and guidance.
              </p>

              {/* Anonymous Review Mock */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/70 p-5">

                <div className="mb-4 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                      <UserRoundX size={21} />
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        Anonymous Student
                      </p>

                      <p className="text-xs text-slate-500">
                        Identity Hidden
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-1 rounded-full bg-yellow-400/10 px-3 py-1 text-sm font-bold text-yellow-400">
                    ⭐ 4.8
                  </div>

                </div>

                <p className="text-sm leading-6 text-slate-400">
                  "Very helpful and supportive. Always gives useful guidance
                  when juniors need help."
                </p>

              </div>

              {/* Privacy Tags */}
              <div className="mt-6 flex flex-wrap gap-3">

                <span className="rounded-full bg-indigo-500/10 px-4 py-2 text-xs font-semibold text-indigo-300">
                  🔒 Identity Protected
                </span>

                <span className="rounded-full bg-purple-500/10 px-4 py-2 text-xs font-semibold text-purple-300">
                  👤 Reviewer Hidden
                </span>

                <span className="rounded-full bg-pink-500/10 px-4 py-2 text-xs font-semibold text-pink-300">
                  🛡️ Privacy First
                </span>

              </div>

            </div>
          </div>

          {/* Right Features */}
          <div className="grid gap-5 sm:grid-cols-2">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="group rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.08]"
                >

                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <Icon size={24} />
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {feature.description}
                  </p>

                </div>
              );
            })}

          </div>
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-16 rounded-2xl border border-indigo-400/20 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-6 text-center">

          <div className="flex flex-col items-center justify-center gap-3 md:flex-row">

            <ShieldCheck className="text-indigo-400" size={24} />

            <p className="text-sm font-medium text-slate-300 md:text-base">
              Your voice can help someone grow —
              <span className="font-bold text-white">
                {" "}without revealing who you are.
              </span>
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AnonymousPrivacy;