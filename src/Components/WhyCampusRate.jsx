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
        "Share genuine feedback without worrying about your identity being revealed.",
      gradient: "from-indigo-500 to-blue-600",
    },
    {
      icon: MessageCircleHeart,
      title: "Honest Feedback",
      description:
        "Give seniors meaningful feedback that helps them understand their strengths and improve.",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: Users,
      title: "Build Better Seniors",
      description:
        "Positive and constructive feedback can create a stronger and more supportive campus.",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      icon: TrendingUp,
      title: "Grow Together",
      description:
        "CampusRate encourages seniors and juniors to learn from each other and grow together.",
      gradient: "from-cyan-500 to-indigo-600",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">

      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-purple-50 px-5 py-2 text-sm font-semibold text-purple-600">
            <Sparkles size={17} />
            Why CampusRate?
          </div>

          <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl">
            More Than Just{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Ratings
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-500">
            CampusRate is built to create a culture where juniors can speak
            honestly and seniors can use feedback to become better.
          </p>

        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-3 hover:shadow-xl"
              >

                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${reason.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <Icon size={27} />
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {reason.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {reason.description}
                </p>

              </div>
            );
          })}

        </div>

        {/* Bottom Message */}
        <div className="mt-14 flex flex-col items-center justify-center gap-3 text-center">

          <HeartHandshake
            size={30}
            className="text-pink-500"
          />

          <p className="text-lg font-semibold text-slate-700">
            Better feedback.
            <span className="text-indigo-600"> Better seniors.</span>
            <span className="text-purple-600"> Better campus.</span>
          </p>

        </div>

      </div>
    </section>
  );
};

export default WhyCampusRate;