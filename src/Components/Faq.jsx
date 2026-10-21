import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Who can rate a senior?",
      answer:
        "Only eligible junior students who are logged in can submit ratings. A student can only rate students belonging to a batch strictly senior to them (e.g. 3rd batch can rate 1st or 2nd batch, but never juniors or batchmates).",
    },
    {
      question: "Can I rate without signing in?",
      answer:
        "No. You must be signed in with your student account so our system can check batch eligibility and prevent duplicate ratings. Your review is still submitted 100% anonymously.",
    },
    {
      question: "Can I rate someone from my own batch?",
      answer:
        "No. To maintain fairness and avoid peer bias, ratings are strictly restricted to seniors who entered the campus in prior batches.",
    },
    {
      question: "Will the senior know who rated them?",
      answer:
        "No. Reviewer accounts are completely decoupled from review cards. Seniors can read reviews and star breakdowns, but author identities are completely withheld.",
    },
    {
      question: "What evaluation criteria are included?",
      answer:
        "Ratings cover core mentorship areas: technical guidance, communication clarity, behavior, approachability, and overall contribution to junior development.",
    },
    {
      question: "Why does my account need admin approval?",
      answer:
        "To prevent fake profiles and spam ratings, an administrator verifies student batch credentials before granting full rating and directory access.",
    },
  ];

  return (
    <section className="bg-slate-950 text-white py-24 border-t border-slate-900">
      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="mb-14 text-center animate-fade-in">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <HelpCircle size={14} className="text-indigo-400" />
            Clear Answers
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="text-indigo-400">Questions</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Everything you need to know about batch rules, rating confidentiality, and system permissions.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`overflow-hidden rounded-xl border transition-all duration-200 ${
                  isOpen
                    ? "border-slate-700 bg-slate-900 shadow-xl"
                    : "border-slate-800/80 bg-slate-900/60 hover:border-slate-700"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.question}
                  </span>

                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      isOpen
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed text-slate-300 border-t border-slate-800">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
