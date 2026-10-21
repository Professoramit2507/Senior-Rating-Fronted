import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Search,
  SlidersHorizontal,
  Star,
  GraduationCap,
  ArrowRight,
  X,
  ShieldCheck,
  Sparkles,
  Lock,
  MessageCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import { getSeniorPhoto } from "../../utils/studentPhotos";

const API_URL = "http://localhost:3000";

const parseBatchNumber = (batchStr) => {
  if (!batchStr) return null;
  const match = String(batchStr).match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
};

const getOrdinal = (n) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const Seniors = () => {
  const { user, dbUser } = useAuth();
  const navigate = useNavigate();

  const [seniors, setSeniors] = useState([]);
  const [search, setSearch] = useState("");
  const [batch, setBatch] = useState("All");
  const [department, setDepartment] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  // User batch number (e.g., 3 for "3rd Batch").
  // Admins are not restricted by batch.
  const userBatchNumber = useMemo(() => {
    if (!user || !dbUser?.batch || dbUser?.role === "admin") return null;
    return parseBatchNumber(dbUser.batch);
  }, [user, dbUser]);

  // Available senior batches for this student.
  const availableBatches = useMemo(() => {
    if (userBatchNumber === null) {
      return [
        "1st Batch",
        "2nd Batch",
        "3rd Batch",
        "4th Batch",
        "5th Batch",
        "6th Batch",
        "7th Batch",
      ];
    }
    const list = [];
    for (let i = 1; i < userBatchNumber; i++) {
      list.push(`${getOrdinal(i)} Batch`);
    }
    return list;
  }, [userBatchNumber]);

  useEffect(() => {
    const fetchSeniors = async () => {
      try {
        const response = await fetch(`${API_URL}/senior`);
        if (!response.ok) {
          throw new Error("Failed to fetch seniors");
        }
        const data = await response.json();
        setSeniors(data);
      } catch (error) {
        console.error("Error fetching seniors:", error);
        setSeniors([]);
      }
    };

    fetchSeniors();
  }, []);

  const filteredSeniors = useMemo(() => {
    let result = seniors.filter((senior) => {
      if (userBatchNumber !== null) {
        const sNum = parseBatchNumber(senior.batch);
        if (sNum === null || sNum >= userBatchNumber) {
          return false;
        }
      }

      const name = senior.name?.toLowerCase() || "";
      const dept = senior.department?.toLowerCase() || "";
      const searchValue = search.toLowerCase();

      const matchesSearch =
        name.includes(searchValue) || dept.includes(searchValue);

      const matchesBatch = batch === "All" || senior.batch === batch;
      const matchesDepartment =
        department === "All" || senior.department === department;

      return matchesSearch && matchesBatch && matchesDepartment;
    });

    if (sortBy === "rating") {
      result.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    }
    if (sortBy === "reviews") {
      result.sort((a, b) => Number(b.reviews || 0) - Number(a.reviews || 0));
    }
    if (sortBy === "name") {
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }

    return result;
  }, [seniors, search, batch, department, sortBy, userBatchNumber]);

  const clearFilters = () => {
    setSearch("");
    setBatch("All");
    setDepartment("All");
    setSortBy("rating");
  };

  const eligibleSeniors = useMemo(() => {
    if (userBatchNumber === null) return seniors;
    return seniors.filter((s) => {
      const sNum = parseBatchNumber(s.batch);
      return sNum !== null && sNum < userBatchNumber;
    });
  }, [seniors, userBatchNumber]);

  const totalSeniors = eligibleSeniors.length;
  const averageRating =
    eligibleSeniors.length > 0
      ? (
          eligibleSeniors.reduce(
            (total, senior) => total + Number(senior.rating || 0),
            0
          ) / eligibleSeniors.length
        ).toFixed(1)
      : "0.0";

  const totalReviews = eligibleSeniors.reduce(
    (total, senior) => total + Number(senior.reviews || 0),
    0
  );

  // Authentication gate for rating
  const handleRateClick = (e, seniorId) => {
    if (!user) {
      e.preventDefault();
      Swal.fire({
        icon: "warning",
        title: "Login Required! 🔒",
        text: "You must be signed in with your verified student account to rate seniors.",
        confirmButtonColor: "#4f46e5",
        confirmButtonText: "Sign In Now",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "#334155",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 text-white pb-24">
      {/* =========================
          HERO BANNER
      ========================= */}
      <div className="relative bg-slate-900/60 py-16 sm:py-20 border-b border-slate-800">
        <div className="relative mx-auto max-w-7xl px-6 text-center animate-fade-in">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <Sparkles size={14} className="text-amber-400" />
            Verified Student Mentorship Directory
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            Find & Rate Your <span className="text-indigo-400">Seniors</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-slate-400 leading-relaxed">
            Browse senior profiles with genuine student portraits, explore honest feedback scores, and submit your anonymous evaluations.
          </p>

          {/* Stats Bar */}
          <div className="mx-auto mt-8 grid max-w-xl grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 transition-all duration-300 hover:border-slate-700">
              <p className="text-2xl sm:text-3xl font-black text-white">{totalSeniors}</p>
              <p className="mt-1 text-xs text-slate-400 font-medium">
                {userBatchNumber !== null ? "Eligible Mentors" : "Seniors"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 transition-all duration-300 hover:border-slate-700">
              <p className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center gap-1">
                {averageRating} <Star size={18} className="fill-amber-400 text-amber-400" />
              </p>
              <p className="mt-1 text-xs text-slate-400 font-medium">Avg Rating</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 transition-all duration-300 hover:border-slate-700">
              <p className="text-2xl sm:text-3xl font-black text-white">{totalReviews}</p>
              <p className="mt-1 text-xs text-slate-400 font-medium">Reviews</p>
            </div>
          </div>

          {/* Student Batch Scope Banner */}
          {userBatchNumber !== null && (
            <div className="mx-auto mt-6 max-w-lg rounded-xl border border-slate-800 bg-slate-900/90 p-3 text-xs text-slate-300 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-left">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>
                  Logged in as <strong className="text-white">{dbUser?.batch}</strong> student
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium shrink-0">
                {userBatchNumber === 1
                  ? "Most Senior Batch"
                  : `Eligible: ${availableBatches.join(", ")}`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* =========================
          SEARCH & FILTER TOOLBAR
      ========================= */}
      <div className="relative z-10 mx-auto -mt-6 max-w-6xl px-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5 shadow-xl animate-slide-up">
          {/* Search Input */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search senior by name, department, or keyword..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
            />
          </div>

          {/* Filter Row */}
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2 md:grid-cols-4">
            <div className="relative">
              <GraduationCap
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-9 pr-3 text-xs sm:text-sm font-medium text-slate-300 outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="All">
                  {userBatchNumber !== null
                    ? `All My Seniors (${availableBatches.join(", ") || "None"})`
                    : "All Batches"}
                </option>
                {availableBatches.map((b) => (
                  <option key={b} value={b} className="bg-slate-950 text-white">
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-300 outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="All" className="bg-slate-950 text-white">All Departments</option>
              <option value="CSE" className="bg-slate-950 text-white">CSE</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-300 outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="rating" className="bg-slate-950 text-white">Highest Rated</option>
              <option value="reviews" className="bg-slate-950 text-white">Most Reviewed</option>
              <option value="name" className="bg-slate-950 text-white">Name A-Z</option>
            </select>

            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white cursor-pointer"
            >
              <X size={15} />
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* =========================
          NEW SENIOR CARDS WITH PHOTOS
      ========================= */}
      <div className="mx-auto max-w-7xl px-6 pt-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Eligible Seniors
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select any senior mentor to view performance or submit an anonymous evaluation.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
            <SlidersHorizontal size={14} />
            <span>{filteredSeniors.length} found</span>
          </div>
        </div>

        {filteredSeniors.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {filteredSeniors.map((senior) => {
              const photoUrl = getSeniorPhoto(senior);

              return (
                <div
                  key={senior._id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/90 transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-700 hover:shadow-2xl hover:shadow-indigo-950/40 flex flex-col justify-between"
                >
                  {/* Photo Section with Aspect Ratio */}
                  <div>
                    <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                      <img
                        src={photoUrl}
                        alt={senior.name}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Dark overlay at bottom of image for contrast */}
                      <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />

                      {/* Batch Badge Overlay */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-200">
                        <GraduationCap size={13} className="text-indigo-400" />
                        <span>{senior.batch}</span>
                      </div>

                      {/* Rating Badge Overlay */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 px-2.5 py-1 text-xs font-bold text-amber-400">
                        <Star size={13} className="fill-amber-400" />
                        <span>{senior.rating || "0.0"}</span>
                      </div>

                      {/* Dept pill over image */}
                      <div className="absolute bottom-3 left-4">
                        <span className="rounded-md bg-indigo-600 px-2.5 py-0.5 text-[11px] font-bold text-white uppercase tracking-wider">
                          {senior.department}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 pt-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {senior.name}
                      </h3>

                      <p className="text-xs text-slate-400 mt-1 font-medium">
                        {senior.designation || "Senior Peer Mentor"}
                      </p>

                      {/* Stats Grid inside card */}
                      <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-950/80 border border-slate-800/80 p-2.5 text-center">
                        <div>
                          <p className="text-sm font-black text-white">
                            {senior.rating || "0.0"}
                          </p>
                          <p className="text-[10px] text-slate-500 font-medium">
                            Rating (/ 5.0)
                          </p>
                        </div>

                        <div className="border-l border-slate-800">
                          <p className="text-sm font-black text-white flex items-center justify-center gap-1">
                            <MessageCircle size={12} className="text-slate-400" />
                            {senior.reviews || 0}
                          </p>
                          <p className="text-[10px] text-slate-500 font-medium">
                            Reviews
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button: Rate Senior */}
                  <div className="p-5 pt-0">
                    <Link
                      to={`/rate/${senior._id}`}
                      onClick={(e) => handleRateClick(e, senior._id)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-500 active:scale-[0.98]"
                    >
                      <Star size={14} className="fill-white" />
                      Rate this Senior
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 py-16 px-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-slate-300">
              {userBatchNumber === 1 ? (
                <GraduationCap size={28} />
              ) : (
                <Search size={24} />
              )}
            </div>

            <h3 className="mt-4 text-base font-bold text-white">
              {userBatchNumber === 1
                ? "You are from 1st Batch! 🎓"
                : "No matching seniors found"}
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-xs text-slate-400 leading-relaxed">
              {userBatchNumber === 1
                ? "1st Batch is the founding batch on campus. As a pioneer student, there are no senior batches above you to rate."
                : "Try adjusting your batch filter, department, or keyword."}
            </p>

            {userBatchNumber !== 1 && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500 cursor-pointer"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Bottom privacy info */}
        <div className="mt-12 rounded-xl border border-slate-800 bg-slate-900 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="font-bold text-white">Guaranteed Review Anonymity</p>
              <p className="text-[11px] text-slate-400">Your profile is never exposed to seniors or peers.</p>
            </div>
          </div>

          <span className="text-[11px] font-semibold text-indigo-400 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-md">
            Encrypted Feedback Standard
          </span>
        </div>
      </div>
    </section>
  );
};

export default Seniors;
