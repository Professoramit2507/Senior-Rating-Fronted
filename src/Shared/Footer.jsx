import { Link } from "react-router";
import {
  Star,
  ShieldCheck,
  Mail,
  ArrowUp,
  Globe,
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      {/* Main Footer */}
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* ================= BRAND ================= */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link
              to="/"
              className="inline-flex items-center gap-3 group"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-white shadow-xs transition-transform duration-200 group-hover:scale-105">
                <Star className="h-5 w-5 fill-white text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold tracking-tight">
                  Campus<span className="text-indigo-400">Rate</span>
                </h2>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Anonymous Senior Rating Platform
                </p>
              </div>
            </Link>

            {/* Description */}
            <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">
              A private, anonymous student feedback network where juniors can
              share genuine experience and rate seniors to build a stronger,
              more supportive campus culture.
            </p>

            {/* Privacy Badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-slate-300">
              <ShieldCheck size={15} className="text-emerald-400" />
              100% Anonymous & Privacy Protected
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-2.5">
              <a
                href="mailto:support@campusrate.com"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-slate-700 hover:bg-slate-800 hover:text-white"
                title="Email Support"
              >
                <Mail size={16} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-slate-700 hover:bg-slate-800 hover:text-white"
                title="Website"
              >
                <Globe size={16} />
              </a>
            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              Platform Navigation
            </h3>

            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-slate-300 transition hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/seniors"
                  className="text-slate-300 transition hover:text-white"
                >
                  Seniors Directory
                </Link>
              </li>
              <li>
                <Link
                  to="/my-ratings"
                  className="text-slate-300 transition hover:text-white"
                >
                  My Ratings
                </Link>
              </li>
              <li>
                <Link
                  to="/reviews"
                  className="text-slate-300 transition hover:text-white"
                >
                  Campus Reviews
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-slate-300 transition hover:text-white"
                >
                  Student Login
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= TRUST & GUIDELINES ================= */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              Community & Safety
            </h3>

            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="text-slate-400">Anonymous Reviews</span>
              </li>
              <li>
                <span className="text-slate-400">Verified Department Batches</span>
              </li>
              <li>
                <span className="text-slate-400">Moderated Feedback</span>
              </li>
              <li>
                <span className="text-slate-400">Admin Permission System</span>
              </li>
              <li>
                <a
                  href="mailto:support@campusrate.com"
                  className="text-indigo-400 transition hover:underline"
                >
                  Contact Administration
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="mt-12 border-t border-slate-900 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} CampusRate Platform. All rights reserved.
            </p>

            <p className="flex items-center gap-1.5 text-xs text-slate-500">
              Built with purpose for university students
            </p>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              Back to top
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
