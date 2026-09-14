
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
      title: "Create Your Account",
      description:
        "Sign up using your student information and securely access the CampusRate platform.",
      color: "indigo",
    },
    {
      number: "02",
      icon: Search,
      title: "Find Your Senior",
      description:
        "Browse seniors from batches above you and find the senior you want to rate.",
      color: "purple",
    },
    {
      number: "03",
      icon: Star,
      title: "Give Your Rating",
      description:
        "Rate your senior based on helpfulness, behavior, communication, guidance and more.",
      color: "yellow",
    },
    {
      number: "04",
      icon: ShieldCheck,
      title: "Stay Anonymous",
      description:
        "Your feedback is shared anonymously. Your identity will never be displayed publicly.",
      color: "emerald",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24">

      {/* ================= Background Decoration ================= */}
      <div className="absolute top-0 left-0 w-72 h-72
        bg-indigo-100/50 rounded-full blur-3xl">
      </div>

      <div className="absolute bottom-0 right-0 w-80 h-80
        bg-purple-100/50 rounded-full blur-3xl">
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ================= SECTION HEADER ================= */}
        <div className="text-center max-w-2xl mx-auto">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2
            px-4 py-2 rounded-full
            bg-indigo-50 border border-indigo-100
            text-indigo-600 text-sm font-semibold
            mb-5"
          >
            <LockKeyhole size={16} />
            Simple & Secure
          </div>

          {/* Heading */}
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl
            font-extrabold text-slate-900"
          >
            How{" "}
            <span
              className="bg-gradient-to-r from-indigo-600
              via-purple-600 to-pink-500
              bg-clip-text text-transparent"
            >
              CampusRate
            </span>{" "}
            Works
          </h2>

          {/* Description */}
          <p className="mt-5 text-slate-500 text-lg leading-7">
            Giving honest feedback about your seniors is simple,
            secure and completely anonymous.
          </p>

        </div>

        {/* ================= STEPS ================= */}
        <div className="relative mt-16">

          {/* Connecting Line */}
          <div
            className="hidden lg:block absolute
            top-[52px] left-[12%] right-[12%]
            h-[2px]
            bg-gradient-to-r from-indigo-200
            via-purple-200 to-emerald-200"
          ></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">

            {steps.map((step, index) => {

              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative"
                >

                  {/* ================= CARD ================= */}
                  <div
                    className="relative h-full bg-white
                    rounded-3xl p-7
                    border border-slate-200
                    shadow-sm
                    hover:shadow-2xl
                    hover:-translate-y-3
                    transition-all duration-500"
                  >

                    {/* Number */}
                    <div
                      className="absolute top-5 right-5
                      text-5xl font-black
                      text-slate-100
                      group-hover:text-indigo-100
                      transition-colors duration-500"
                    >
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div
                      className="relative w-16 h-16
                      rounded-2xl
                      bg-gradient-to-br
                      from-indigo-500 to-purple-500
                      flex items-center justify-center
                      shadow-lg shadow-indigo-200
                      group-hover:scale-110
                      group-hover:rotate-6
                      transition-all duration-500"
                    >
                      <Icon
                        size={28}
                        className="text-white"
                      />

                      {/* Small Dot */}
                      <span
                        className="absolute -top-1 -right-1
                        w-4 h-4 rounded-full
                        bg-yellow-400
                        border-2 border-white
                        group-hover:animate-ping"
                      ></span>
                    </div>

                    {/* Content */}
                    <div className="mt-7">

                      <h3
                        className="text-xl font-bold
                        text-slate-800
                        group-hover:text-indigo-600
                        transition-colors duration-300"
                      >
                        {step.title}
                      </h3>

                      <p
                        className="mt-3 text-slate-500
                        leading-7 text-sm"
                      >
                        {step.description}
                      </p>

                    </div>

                    {/* Bottom Arrow */}
                    <div
                      className="mt-6 flex items-center
                      gap-2 text-sm font-semibold
                      text-indigo-500
                      opacity-0
                      group-hover:opacity-100
                      translate-y-2
                      group-hover:translate-y-0
                      transition-all duration-300"
                    >
                      Step {index + 1}

                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1
                        transition-transform"
                      />
                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        </div>

        {/* ================= BOTTOM PRIVACY CARD ================= */}
        <div
          className="mt-16 relative overflow-hidden
          rounded-3xl
          bg-gradient-to-r from-indigo-600
          via-purple-600 to-pink-500
          p-[1px]"
        >

          <div
            className="relative rounded-[23px]
            bg-slate-950 px-7 py-8
            flex flex-col md:flex-row
            items-center justify-between gap-6"
          >

            {/* Left */}
            <div className="flex items-center gap-4">

              <div
                className="w-14 h-14 rounded-2xl
                bg-white/10
                flex items-center justify-center
                shrink-0"
              >
                <ShieldCheck
                  size={27}
                  className="text-emerald-400"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Your identity stays private
                </h3>

                <p className="text-sm text-slate-400 mt-1">
                  Every rating is submitted anonymously.
                </p>
              </div>

            </div>

            {/* Right */}
            <div
              className="flex items-center gap-2
              text-sm font-semibold
              text-emerald-400"
            >
              <ShieldCheck size={18} />
              Privacy Protected
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
