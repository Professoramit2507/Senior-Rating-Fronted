import { Link } from "react-router";
import {
  Home,
  Users,
  Star,
  MessageSquare,
  Bell,
  User,
  Sparkles,
} from "lucide-react";

const Navber = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">

      {/* Animated Gradient Line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[72px] flex items-center justify-between">

          {/* ================= LOGO ================= */}
          <Link
            to="/"
            className="group flex items-center gap-3"
          >
            {/* Logo Icon */}
            <div
              className="relative w-11 h-11 rounded-2xl 
              bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
              flex items-center justify-center
              shadow-lg shadow-indigo-200
              group-hover:scale-110 group-hover:rotate-6
              transition-all duration-300"
            >
              <Star
                className="w-6 h-6 text-white fill-white 
                group-hover:scale-110 transition-transform duration-300"
              />

              {/* Sparkle */}
              <Sparkles
                size={13}
                className="absolute -top-1 -right-1 text-yellow-400 
                animate-ping"
              />
            </div>

            {/* Logo Text */}
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-800">
                Campus
                <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                  Rate
                </span>
              </h1>

              <p className="text-[10px] font-medium text-slate-400 tracking-wide">
                Anonymous Senior Rating
              </p>
            </div>
          </Link>

          {/* ================= NAVIGATION ================= */}
          <div className="hidden md:flex items-center gap-1">

            {/* Home */}
            <Link
              to="/"
              className="group relative flex items-center gap-2 px-4 py-2.5
              rounded-xl text-slate-600 font-medium
              hover:text-indigo-600 hover:bg-indigo-50
              transition-all duration-300"
            >
              <Home
                size={18}
                className="group-hover:-translate-y-0.5 transition-transform"
              />
              Home

              {/* Hover Line */}
              <span className="absolute bottom-1 left-4 right-4 h-[2px]
                bg-indigo-500 scale-x-0 group-hover:scale-x-100
                transition-transform duration-300 origin-left rounded-full">
              </span>
            </Link>

            {/* Seniors */}
            <Link
              to="/seniors"
              className="group relative flex items-center gap-2 px-4 py-2.5
              rounded-xl text-slate-600 font-medium
              hover:text-purple-600 hover:bg-purple-50
              transition-all duration-300"
            >
              <Users
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              Seniors

              <span className="absolute bottom-1 left-4 right-4 h-[2px]
                bg-purple-500 scale-x-0 group-hover:scale-x-100
                transition-transform duration-300 origin-left rounded-full">
              </span>
            </Link>

            {/* My Ratings */}
            <Link
              to="/my-ratings"
              className="group relative flex items-center gap-2 px-4 py-2.5
              rounded-xl text-slate-600 font-medium
              hover:text-yellow-600 hover:bg-yellow-50
              transition-all duration-300"
            >
              <Star
                size={18}
                className="group-hover:rotate-12 group-hover:scale-110
                transition-all duration-300"
              />
              My Ratings

              <span className="absolute bottom-1 left-4 right-4 h-[2px]
                bg-yellow-500 scale-x-0 group-hover:scale-x-100
                transition-transform duration-300 origin-left rounded-full">
              </span>
            </Link>

            {/* Reviews */}
            <Link
              to="/reviews"
              className="group relative flex items-center gap-2 px-4 py-2.5
              rounded-xl text-slate-600 font-medium
              hover:text-pink-600 hover:bg-pink-50
              transition-all duration-300"
            >
              <MessageSquare
                size={18}
                className="group-hover:-translate-y-0.5 transition-transform"
              />
              Reviews

              <span className="absolute bottom-1 left-4 right-4 h-[2px]
                bg-pink-500 scale-x-0 group-hover:scale-x-100
                transition-transform duration-300 origin-left rounded-full">
              </span>
            </Link>

          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex items-center gap-3">

            {/* Notification */}
            <button
              className="relative w-11 h-11 rounded-xl
              bg-slate-50 hover:bg-indigo-50
              text-slate-600 hover:text-indigo-600
              flex items-center justify-center
              transition-all duration-300
              hover:scale-105"
            >
              <Bell
                size={20}
                className="hover:rotate-12 transition-transform duration-300"
              />

              {/* Notification Dot */}
              <span className="absolute top-2 right-2">
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75 animate-ping"></span>

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pink-500 border-2 border-white"></span>
              </span>
            </button>

            {/* Profile */}
            <Link
              to="/profile"
              className="group flex items-center gap-2.5
              pl-2 pr-1 py-1 rounded-xl
              hover:bg-indigo-50 transition-all duration-300"
            >
              {/* Avatar */}
              <div
                className="relative w-10 h-10 rounded-xl
                bg-gradient-to-br from-indigo-100 to-purple-100
                flex items-center justify-center
                group-hover:scale-105 transition-transform duration-300"
              >
                <User
                  size={20}
                  className="text-indigo-600
                  group-hover:scale-110 transition-transform"
                />

                {/* Online */}
                <span className="absolute bottom-0 right-0
                  w-3 h-3 bg-emerald-500 rounded-full
                  border-2 border-white">
                </span>
              </div>

              {/* User Info */}
              <div className="hidden lg:block">
                <p className="text-sm font-bold text-slate-700">
                  John Doe
                </p>

                <p className="text-xs text-indigo-500 font-medium">
                  5th Batch
                </p>
              </div>
            </Link>

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navber;

