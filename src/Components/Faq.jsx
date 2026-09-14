import { useState } from "react";
import {
  Plus,
  Minus,
  HelpCircle,
  Sparkles,
} from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Who can rate a senior?",
      answer:
        "Only eligible juniors can rate seniors. A student can rate students from a lower batch number than their own. For example, a 5th batch student can rate 4th, 3rd, 2nd, or 1st batch seniors.",
    },
    {
      question: "Can I rate someone from my own batch?",
      answer:
        "No. Batchmates cannot rate each other. CampusRate is designed specifically for junior-to-senior feedback.",
    },
    {
      question: "Will the senior know who rated them?",
      answer:
        "No. Reviewer identity is kept anonymous. Seniors can see the feedback and rating, but the review will not publicly reveal who submitted it.",
    },
    {
      question: "Can seniors rate juniors?",
      answer:
        "No. The platform only allows juniors to provide ratings for eligible seniors.",
    },
    {
      question: "What categories can I rate?",
      answer:
        "You can rate areas such as helpfulness, communication, behavior, academic guidance, leadership, and overall experience.",
    },
    {
      question: "Can I edit my rating later?",
      answer:
        "The platform can be configured to allow rating updates while maintaining the same eligibility and privacy rules.",
    },
  ];

  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-4xl px-6">

        {/* Header */}
        <div className="mb-14 text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-5 py-2 text-sm font-semibold text-indigo-600">
            <HelpCircle size={17} />
            Frequently Asked Questions
            <Sparkles size={15} />
          </div>

          <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl">
            Got Questions?
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              We've Got Answers.
            </span>
          </h2>

          <p className="mt-5 text-lg text-slate-500">
            Everything you need to know about CampusRate.
          </p>

        </div>

        {/* FAQ */}
        <div className="space-y-4">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-indigo-200 bg-indigo-50/50 shadow-md"
                    : "border-slate-200 bg-white"
                }`}
              >

                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? -1 : index)
                  }
                  className="flex w-full items-center justify-between gap-5 p-6 text-left"
                >

                  <span className="text-base font-bold text-slate-800 md:text-lg">
                    {faq.question}
                  </span>

                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all ${
                      isOpen
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {isOpen ? (
                      <Minus size={18} />
                    ) : (
                      <Plus size={18} />
                    )}
                  </div>

                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 leading-7 text-slate-500">
                      {faq.answer}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default FAQ;