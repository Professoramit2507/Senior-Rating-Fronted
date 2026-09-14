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
      title: "Helpfulness",
      description:
        "How supportive and helpful is the senior when juniors need guidance?",
      rating: "4.9",
      reviews: "1.2K ratings",
      gradient: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      icon: MessageCircle,
      title: "Communication",
      description:
        "Rate how clearly and respectfully the senior communicates with juniors.",
      rating: "4.7",
      reviews: "980 ratings",
      gradient: "from-purple-500 to-violet-500",
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
    {
      icon: Heart,
      title: "Behavior",
      description:
        "How friendly, respectful and positive is the senior towards juniors?",
      rating: "4.8",
      reviews: "1.1K ratings",
      gradient: "from-pink-500 to-rose-500",
      bg: "bg-pink-50",
      text: "text-pink-600",
    },
    {
      icon: GraduationCap,
      title: "Academic Guidance",
      description:
        "How effectively does the senior help juniors with academic matters?",
      rating: "4.9",
      reviews: "850 ratings",
      gradient: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
    {
      icon: Crown,
      title: "Leadership",
      description:
        "Rate the senior's ability to guide, motivate and lead juniors.",
      rating: "4.6",
      reviews: "760 ratings",
      gradient: "from-orange-500 to-amber-500",
      bg: "bg-orange-50",
      text: "text-orange-600",
    },
    {
      icon: Star,
      title: "Overall Experience",
      description:
        "Give an overall rating based on your experience with the senior.",
      rating: "4.8",
      reviews: "1.5K ratings",
      gradient: "from-indigo-500 to-purple-500",
      bg: "bg-indigo-50",
      text: "text-indigo-600",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">

      {/* ================= BACKGROUND ================= */}
      <div className="absolute top-20 -left-40 w-96 h-96
        bg-indigo-200/30 rounded-full blur-3xl">
      </div>

      <div className="absolute bottom-10 -right-40 w-96 h-96
        bg-pink-200/30 rounded-full blur-3xl">
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto">

          <div
            className="inline-flex items-center gap-2
            px-4 py-2 rounded-full
            bg-white border border-slate-200
            shadow-sm text-indigo-600
            text-sm font-semibold mb-5"
          >
            <Sparkles size={16} />
            Meaningful Feedback
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl
            font-extrabold text-slate-900"
          >
            Rate Your Senior
            <br />

            <span
              className="bg-gradient-to-r from-indigo-600
              via-purple-600 to-pink-500
              bg-clip-text text-transparent"
            >
              From Every Angle
            </span>
          </h2>

          <p
            className="mt-5 text-lg text-slate-500
            leading-8"
          >
            Give meaningful feedback across different aspects
            of your senior's behavior, guidance and overall experience.
          </p>

        </div>

        {/* ================= CATEGORY GRID ================= */}
        <div
          className="mt-16 grid grid-cols-1 sm:grid-cols-2
          lg:grid-cols-3 gap-6"
        >

          {categories.map((category, index) => {

            const Icon = category.icon;

            return (
              <div
                key={category.title}
                className="group relative bg-white
                rounded-3xl border border-slate-200
                p-7 shadow-sm
                hover:shadow-2xl
                hover:-translate-y-3
                transition-all duration-500"
              >

                {/* Number */}
                <span
                  className="absolute top-6 right-7
                  text-4xl font-black
                  text-slate-100
                  group-hover:text-slate-200
                  transition-colors"
                >
                  0{index + 1}
                </span>

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl
                  bg-gradient-to-br ${category.gradient}
                  flex items-center justify-center
                  shadow-lg
                  group-hover:scale-110
                  group-hover:rotate-6
                  transition-all duration-500`}
                >
                  <Icon
                    size={25}
                    className="text-white"
                  />
                </div>

                {/* Content */}
                <div className="mt-6">

                  <h3
                    className={`text-xl font-bold
                    text-slate-800
                    group-hover:${category.text}
                    transition-colors`}
                  >
                    {category.title}
                  </h3>

                  <p
                    className="mt-3 text-sm text-slate-500
                    leading-7"
                  >
                    {category.description}
                  </p>

                </div>

                {/* Rating */}
                <div
                  className="mt-6 pt-5
                  border-t border-slate-100
                  flex items-center justify-between"
                >

                  <div>

                    <div className="flex items-center gap-1">

                      <Star
                        size={17}
                        className="text-yellow-400
                        fill-yellow-400"
                      />

                      <span className="text-lg font-bold text-slate-800">
                        {category.rating}
                      </span>

                      <span className="text-xs text-slate-400">
                        / 5
                      </span>

                    </div>

                    <p className="text-xs text-slate-400 mt-1">
                      {category.reviews}
                    </p>

                  </div>

                  {/* Arrow */}
                  <div
                    className="w-9 h-9 rounded-xl
                    bg-slate-50
                    flex items-center justify-center
                    text-slate-400
                    group-hover:bg-indigo-50
                    group-hover:text-indigo-600
                    group-hover:translate-x-1
                    transition-all duration-300"
                  >
                    <ArrowRight size={17} />
                  </div>

                </div>

              </div>
            );
          })}

        </div>

        {/* ================= BOTTOM INFO ================= */}
        <div
          className="mt-14 flex flex-col sm:flex-row
          items-center justify-center gap-3
          text-center"
        >

          <div
            className="flex items-center gap-2
            text-sm text-slate-500"
          >
            <div
              className="w-8 h-8 rounded-lg
              bg-indigo-100
              flex items-center justify-center"
            >
              <Star
                size={16}
                className="text-indigo-600"
              />
            </div>

            Rate each category from 1 to 5
          </div>

          <span className="hidden sm:block text-slate-300">
            •
          </span>

          <div
            className="flex items-center gap-2
            text-sm text-slate-500"
          >
            <div
              className="w-8 h-8 rounded-lg
              bg-emerald-100
              flex items-center justify-center"
            >
              <Heart
                size={16}
                className="text-emerald-600"
              />
            </div>

            Honest feedback helps everyone grow
          </div>

        </div>

      </div>
    </section>
  );
};

export default RatingCategories;


