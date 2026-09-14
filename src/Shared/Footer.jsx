
import { Link } from "react-router";
import {
  Star,
  ShieldCheck,
  Heart,
 
  Mail,
  ArrowUp,
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">

      {/* Decorative Gradient Blur */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl"></div>

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* ================= BRAND ================= */}
          <div className="lg:col-span-2">

            {/* Logo */}
            <Link
              to="/"
              className="inline-flex items-center gap-3 group"
            >
              <div
                className="w-12 h-12 rounded-2xl
                bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
                flex items-center justify-center
                shadow-lg shadow-indigo-500/20
                group-hover:scale-110 group-hover:rotate-6
                transition-all duration-300"
              >
                <Star
                  className="w-6 h-6 text-white fill-white
                  group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold">
                  Campus
                  <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                    Rate
                  </span>
                </h2>

                <p className="text-xs text-slate-400">
                  Anonymous Senior Rating
                </p>
              </div>
            </Link>

            {/* Description */}
            <p className="mt-6 max-w-md text-slate-400 leading-7">
              A safe and anonymous platform where juniors can
              share honest feedback and ratings about their seniors.
              Your identity stays private.
            </p>

            {/* Privacy Badge */}
            <div
              className="mt-6 inline-flex items-center gap-2
              px-4 py-2 rounded-full
              bg-emerald-500/10 border border-emerald-500/20
              text-emerald-400 text-sm"
            >
              <ShieldCheck size={17} />
              Anonymous & Privacy Focused
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-7">

              <a
                href="#"
                className="w-10 h-10 rounded-xl
                bg-white/5 border border-white/10
                flex items-center justify-center
                hover:bg-indigo-500 hover:border-indigo-500
                hover:-translate-y-1
                transition-all duration-300"
              >
                
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-xl
                bg-white/5 border border-white/10
                flex items-center justify-center
                hover:bg-blue-500 hover:border-blue-500
                hover:-translate-y-1
                transition-all duration-300"
              >
                
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-xl
                bg-white/5 border border-white/10
                flex items-center justify-center
                hover:bg-sky-500 hover:border-sky-500
                hover:-translate-y-1
                transition-all duration-300"
              >
                
              </a>

              <a
                href="mailto:support@campusrate.com"
                className="w-10 h-10 rounded-xl
                bg-white/5 border border-white/10
                flex items-center justify-center
                hover:bg-pink-500 hover:border-pink-500
                hover:-translate-y-1
                transition-all duration-300"
              >
                <Mail size={18} />
              </a>

            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>
            <h3 className="text-lg font-bold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-indigo-400
                  hover:translate-x-1 inline-block
                  transition-all duration-300"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/seniors"
                  className="text-slate-400 hover:text-purple-400
                  hover:translate-x-1 inline-block
                  transition-all duration-300"
                >
                  Senior Directory
                </Link>
              </li>

              <li>
                <Link
                  to="/my-ratings"
                  className="text-slate-400 hover:text-yellow-400
                  hover:translate-x-1 inline-block
                  transition-all duration-300"
                >
                  My Ratings
                </Link>
              </li>

              <li>
                <Link
                  to="/reviews"
                  className="text-slate-400 hover:text-pink-400
                  hover:translate-x-1 inline-block
                  transition-all duration-300"
                >
                  Reviews
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="text-slate-400 hover:text-emerald-400
                  hover:translate-x-1 inline-block
                  transition-all duration-300"
                >
                  My Profile
                </Link>
              </li>

            </ul>
          </div>

          {/* ================= SUPPORT ================= */}
          <div>
            <h3 className="text-lg font-bold mb-5">
              Support
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/about"
                  className="text-slate-400 hover:text-indigo-400
                  hover:translate-x-1 inline-block
                  transition-all duration-300"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy"
                  className="text-slate-400 hover:text-purple-400
                  hover:translate-x-1 inline-block
                  transition-all duration-300"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/guidelines"
                  className="text-slate-400 hover:text-pink-400
                  hover:translate-x-1 inline-block
                  transition-all duration-300"
                >
                  Rating Guidelines
                </Link>
              </li>

              <li>
                <Link
                  to="/report"
                  className="text-slate-400 hover:text-red-400
                  hover:translate-x-1 inline-block
                  transition-all duration-300"
                >
                  Report a Problem
                </Link>
              </li>

              <li>
                <a
                  href="mailto:support@campusrate.com"
                  className="text-slate-400 hover:text-emerald-400
                  hover:translate-x-1 inline-block
                  transition-all duration-300"
                >
                  Contact Support
                </a>
              </li>

            </ul>
          </div>

        </div>

        {/* ================= DIVIDER ================= */}
        <div className="mt-14 pt-7 border-t border-white/10">

          <div className="flex flex-col md:flex-row
            items-center justify-between gap-4">

            {/* Copyright */}
            <p className="text-sm text-slate-500 text-center md:text-left">
              © {new Date().getFullYear()} CampusRate.
              All rights reserved.
            </p>

            {/* Made With */}
            <p className="flex items-center gap-1 text-sm text-slate-500">
              Made with
              <Heart
                size={15}
                className="text-pink-500 fill-pink-500 animate-pulse"
              />
              for the campus community
            </p>

            {/* Back To Top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2
              px-4 py-2 rounded-xl
              bg-white/5 border border-white/10
              text-sm text-slate-400
              hover:bg-indigo-500 hover:text-white
              hover:border-indigo-500
              transition-all duration-300"
            >
              Back to top
              <ArrowUp
                size={16}
                className="group-hover:-translate-y-1
                transition-transform duration-300"
              />
            </button>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
