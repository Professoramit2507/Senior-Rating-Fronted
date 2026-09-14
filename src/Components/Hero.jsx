
import {
  Star,
  ShieldCheck,
  ArrowRight,
  Users,
  Sparkles,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-75px)] overflow-hidden bg-slate-50">

      {/* ================= Background Decoration ================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute -top-32 -left-32 w-96 h-96
          bg-indigo-400/20 rounded-full blur-3xl">
        </div>

        <div className="absolute top-20 right-0 w-80 h-80
          bg-purple-400/20 rounded-full blur-3xl">
        </div>

        <div className="absolute bottom-0 left-1/3 w-96 h-72
          bg-pink-400/10 rounded-full blur-3xl">
        </div>

      </div>

      {/* ================= Main Content ================= */}
      <div className="relative max-w-7xl mx-auto px-6 py-20
        lg:py-28 grid lg:grid-cols-2 gap-14 items-center">

        {/* ================= LEFT SIDE ================= */}
        <div>

          {/* Small Badge */}
          <div
            className="inline-flex items-center gap-2
            px-4 py-2 rounded-full
            bg-indigo-50 border border-indigo-100
            text-indigo-600 text-sm font-semibold
            mb-6 hover:scale-105 transition-transform duration-300"
          >
            <Sparkles size={16} />
            Anonymous Senior Rating Platform
          </div>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl
            font-extrabold leading-tight text-slate-900"
          >
            Your Voice.
            <br />

            <span className="bg-gradient-to-r from-indigo-600
              via-purple-600 to-pink-500
              bg-clip-text text-transparent">
              Their Growth.
            </span>

            <br />

            <span className="text-slate-800">
              Completely Anonymous.
            </span>
          </h1>

          {/* Description */}
          <p
            className="mt-6 text-lg text-slate-500
            max-w-xl leading-8"
          >
            Share your honest experience about your seniors
            through a safe and anonymous platform. Your identity
            stays private while your feedback helps create a
            better campus community.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-8">

            <button
              className="group flex items-center gap-2
              px-6 py-3.5 rounded-xl
              bg-gradient-to-r from-indigo-600
              to-purple-600 text-white font-semibold
              shadow-lg shadow-indigo-200
              hover:shadow-xl hover:shadow-indigo-300
              hover:-translate-y-1
              transition-all duration-300"
            >
              <Star
                size={19}
                className="fill-white
                group-hover:rotate-12 transition-transform"
              />

              Rate a Senior

              <ArrowRight
                size={18}
                className="group-hover:translate-x-1
                transition-transform"
              />
            </button>

            <button
              className="flex items-center gap-2
              px-6 py-3.5 rounded-xl
              bg-white border border-slate-200
              text-slate-700 font-semibold
              hover:border-indigo-300
              hover:text-indigo-600
              hover:-translate-y-1
              transition-all duration-300"
            >
              <Users size={19} />
              Explore Seniors
            </button>

          </div>

          {/* Trust Info */}
          <div className="flex flex-wrap items-center gap-6 mt-9">

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-8 h-8 rounded-lg bg-emerald-50
                flex items-center justify-center">
                <ShieldCheck size={17} className="text-emerald-500" />
              </div>

              100% Anonymous
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-8 h-8 rounded-lg bg-yellow-50
                flex items-center justify-center">
                <Star
                  size={17}
                  className="text-yellow-500 fill-yellow-500"
                />
              </div>

              Honest Feedback
            </div>

          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="relative flex justify-center lg:justify-end">

          {/* Main Card */}
          <div
            className="relative w-full max-w-md
            bg-white rounded-3xl
            border border-slate-200
            shadow-2xl shadow-indigo-100
            p-7
            hover:-translate-y-2
            transition-transform duration-500"
          >

            {/* Card Header */}
            <div className="flex items-center justify-between mb-7">

              <div className="flex items-center gap-3">

                <div
                  className="w-12 h-12 rounded-2xl
                  bg-gradient-to-br from-indigo-500
                  to-purple-500
                  flex items-center justify-center"
                >
                  <Users className="text-white" size={23} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    Senior Profile
                  </h3>

                  <p className="text-xs text-slate-400">
                    4th Batch • CSE
                  </p>
                </div>

              </div>

              <div
                className="px-3 py-1.5 rounded-full
                bg-emerald-50 text-emerald-600
                text-xs font-semibold"
              >
                Senior
              </div>

            </div>

            {/* Rating */}
            <div
              className="p-5 rounded-2xl
              bg-gradient-to-br from-indigo-50
              via-purple-50 to-pink-50"
            >

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Overall Rating
                  </p>

                  <div className="flex items-center gap-2 mt-1">

                    <span className="text-4xl font-extrabold
                      text-slate-800">
                      4.8
                    </span>

                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={17}
                          className="text-yellow-400
                          fill-yellow-400"
                        />
                      ))}
                    </div>

                  </div>
                </div>

                <div
                  className="w-12 h-12 rounded-full
                  bg-white flex items-center justify-center
                  shadow-sm"
                >
                  <Star
                    size={23}
                    className="text-yellow-500 fill-yellow-500"
                  />
                </div>

              </div>

            </div>

            {/* Rating Categories */}
            <div className="mt-6 space-y-4">

              {[
                ["Helpfulness", "4.9"],
                ["Communication", "4.7"],
                ["Behavior", "4.8"],
                ["Academic Guidance", "4.9"],
              ].map(([title, rating]) => (

                <div key={title}>

                  <div className="flex justify-between
                    text-sm mb-1.5">

                    <span className="text-slate-600">
                      {title}
                    </span>

                    <span className="font-semibold text-indigo-600">
                      {rating}
                    </span>

                  </div>

                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

                    <div
                      className="h-full rounded-full
                      bg-gradient-to-r from-indigo-500
                      to-purple-500"
                      style={{
                        width: `${(Number(rating) / 5) * 100}%`,
                      }}
                    ></div>

                  </div>

                </div>

              ))}

            </div>

            {/* Anonymous Review */}
            <div
              className="mt-6 p-4 rounded-2xl
              bg-slate-50 border border-slate-100"
            >

              <div className="flex items-center gap-2 mb-2">

                <ShieldCheck
                  size={16}
                  className="text-emerald-500"
                />

                <span className="text-xs font-semibold
                  text-emerald-600">
                  Anonymous Review
                </span>

              </div>

              <p className="text-sm text-slate-500 leading-6">
                “Very helpful and supportive senior.
                Always guides juniors when they need help.”
              </p>

            </div>

          </div>

          {/* ================= FLOATING CARD 1 ================= */}
          <div
            className="absolute -top-8 -left-3 sm:left-0
            lg:-left-12
            bg-white rounded-2xl shadow-xl
            border border-slate-100
            px-4 py-3
            flex items-center gap-3
            animate-bounce"
          >

            <div className="w-9 h-9 rounded-xl bg-yellow-50
              flex items-center justify-center">

              <Star
                size={18}
                className="text-yellow-500 fill-yellow-500"
              />

            </div>

            <div>
              <p className="text-xs text-slate-400">
                New Rating
              </p>

              <p className="font-bold text-slate-700">
                ⭐ 5.0
              </p>
            </div>

          </div>

          {/* ================= FLOATING CARD 2 ================= */}
          <div
            className="absolute -bottom-7 right-0
            lg:-right-8
            bg-white rounded-2xl shadow-xl
            border border-slate-100
            px-4 py-3
            flex items-center gap-3"
          >

            <div className="w-9 h-9 rounded-xl bg-emerald-50
              flex items-center justify-center">

              <ShieldCheck
                size={18}
                className="text-emerald-500"
              />

            </div>

            <div>
              <p className="text-xs text-slate-400">
                Your Identity
              </p>

              <p className="font-bold text-emerald-600">
                Protected
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;
