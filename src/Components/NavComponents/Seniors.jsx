// import { useMemo, useState } from "react";
// import {
//   Search,
//   SlidersHorizontal,
//   Star,
//   GraduationCap,
//   ArrowRight,
//   X,
//   UserRound,
//   Sparkles,
// } from "lucide-react";

// const Seniors = () => {
//   const [search, setSearch] = useState("");
//   const [batch, setBatch] = useState("All");
//   const [department, setDepartment] = useState("All");
//   const [sortBy, setSortBy] = useState("rating");

//   const seniors = [
//     {
//       id: 1,
//       name: "Arafat Rahman",
//       batch: "7th Batch",
//       department: "CSE",
//       designation: "Senior Mentor",
//       rating: 4.9,
//       reviews: 128,
//       image: "AR",
//     },
//     {
//       id: 2,
//       name: "Nusrat Jahan",
//       batch: "6th Batch",
//       department: "CSE",
//       designation: "Academic Guide",
//       rating: 4.8,
//       reviews: 96,
//       image: "NJ",
//     },
//     {
//       id: 3,
//       name: "Tanvir Hasan",
//       batch: "5th Batch",
//       department: "CSE",
//       designation: "Student Leader",
//       rating: 4.7,
//       reviews: 84,
//       image: "TH",
//     },
//     {
//       id: 4,
//       name: "Sadia Afrin",
//       batch: "4th Batch",
//       department: "CSE",
//       designation: "Senior Mentor",
//       rating: 4.9,
//       reviews: 115,
//       image: "SA",
//     },
//     {
//       id: 5,
//       name: "Mahin Islam",
//       batch: "3rd Batch",
//       department: "CSE",
//       designation: "Student Representative",
//       rating: 4.6,
//       reviews: 73,
//       image: "MI",
//     },
//     {
//       id: 6,
//       name: "Rafi Ahmed",
//       batch: "2nd Batch",
//       department: "CSE",
//       designation: "Academic Mentor",
//       rating: 4.8,
//       reviews: 101,
//       image: "RA",
//     },
//     {
//       id: 7,
//       name: "Sakib Hasan",
//       batch: "1st Batch",
//       department: "CSE",
//       designation: "Academic Mentor",
//       rating: 4.7,
//       reviews: 88,
//       image: "SH",
//     },
//   ];


//   const filteredSeniors = useMemo(() => {
//     let result = seniors.filter((senior) => {
//       const matchesSearch =
//         senior.name.toLowerCase().includes(search.toLowerCase()) ||
//         senior.department.toLowerCase().includes(search.toLowerCase());

//       const matchesBatch =
//         batch === "All" || senior.batch === batch;

//       const matchesDepartment =
//         department === "All" ||
//         senior.department === department;

//       return matchesSearch && matchesBatch && matchesDepartment;
//     });

//     if (sortBy === "rating") {
//       result.sort((a, b) => b.rating - a.rating);
//     }

//     if (sortBy === "reviews") {
//       result.sort((a, b) => b.reviews - a.reviews);
//     }

//     if (sortBy === "name") {
//       result.sort((a, b) => a.name.localeCompare(b.name));
//     }

//     return result;
//   }, [search, batch, department, sortBy]);

//   const clearFilters = () => {
//     setSearch("");
//     setBatch("All");
//     setDepartment("All");
//     setSortBy("rating");
//   };

//   return (
//     <section className="min-h-screen bg-slate-50 pb-20">

//       {/* ================= HEADER ================= */}
//       <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-20">

//         {/* Decorative circles */}
//         <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
//         <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl" />

//         <div className="relative mx-auto max-w-7xl px-6 text-center">

//           <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-md">
//             <Sparkles size={17} />
//             Senior Directory
//           </div>

//           <h1 className="text-4xl font-extrabold text-white md:text-6xl">
//             Find & Rate Your
//             <span className="block text-pink-200">
//               Seniors
//             </span>
//           </h1>

//           <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-indigo-100">
//             Discover seniors, explore their ratings, and share your honest
//             experience while keeping your identity completely anonymous.
//           </p>

//           {/* Stats */}
//           <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-3">

//             <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
//               <p className="text-2xl font-bold text-white">250+</p>
//               <p className="mt-1 text-xs text-indigo-100">
//                 Seniors
//               </p>
//             </div>

//             <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
//               <p className="text-2xl font-bold text-white">4.7 ⭐</p>
//               <p className="mt-1 text-xs text-indigo-100">
//                 Avg Rating
//               </p>
//             </div>

//             <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
//               <p className="text-2xl font-bold text-white">2.5K+</p>
//               <p className="mt-1 text-xs text-indigo-100">
//                 Reviews
//               </p>
//             </div>

//           </div>

//         </div>
//       </div>

//       {/* ================= SEARCH & FILTER ================= */}
//       <div className="relative z-10 mx-auto -mt-8 max-w-6xl px-6">

//         <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">

//           {/* Search */}
//           <div className="relative">

//             <Search
//               size={21}
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//             />

//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search senior by name or department..."
//               className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
//             />

//           </div>

//           {/* Filters */}
//           <div className="mt-4 grid gap-3 md:grid-cols-4">

//             <div className="relative">
//               <GraduationCap
//                 size={18}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//               />

//               <select
//                 value={batch}
//                 onChange={(e) => setBatch(e.target.value)}
//                 className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
//               >
//                 <option value="All">All Batches</option>
//                 <option value="7th Batch">7th Batch</option>
//                 <option value="6th Batch">6th Batch</option>
//                 <option value="5th Batch">5th Batch</option>
//                 <option value="4th Batch">4th Batch</option>
//                 <option value="3rd Batch">3rd Batch</option>
//                 <option value="2nd Batch">2nd Batch</option>
//                 <option value="1st Batch">1st Batch</option>
//               </select>

//             </div>

//             <select
//               value={department}
//               onChange={(e) => setDepartment(e.target.value)}
//               className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
//             >
//               <option value="All">All Departments</option>
//               <option value="CSE">CSE</option>
//             </select>


//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
//             >
//               <option value="rating">Highest Rated</option>
//               <option value="reviews">Most Reviewed</option>
//               <option value="name">Name A-Z</option>
//             </select>

//             <button
//               onClick={clearFilters}
//               className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
//             >
//               <X size={17} />
//               Clear Filters
//             </button>

//           </div>

//         </div>
//       </div>

//       {/* ================= DIRECTORY ================= */}
//       <div className="mx-auto max-w-7xl px-6 pt-16">

//         <div className="mb-8 flex items-center justify-between">

//           <div>
//             <p className="text-sm font-semibold text-indigo-600">
//               Senior Directory
//             </p>

//             <h2 className="mt-1 text-2xl font-bold text-slate-900">
//               Discover Seniors
//             </h2>
//           </div>

//           <div className="hidden items-center gap-2 text-sm text-slate-500 md:flex">
//             <SlidersHorizontal size={17} />
//             {filteredSeniors.length} seniors found
//           </div>

//         </div>

//         {/* Cards */}
//         {filteredSeniors.length > 0 ? (
//           <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

//             {filteredSeniors.map((senior) => (
//               <div
//                 key={senior.id}
//                 className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
//               >

//                 {/* Top gradient */}
//                 <div className="h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

//                 <div className="px-6 pb-6">

//                   {/* Avatar */}
//                   <div className="-mt-12 flex items-end justify-between">

//                     <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl font-extrabold text-white shadow-lg transition-transform duration-300 group-hover:scale-105">
//                       {senior.image}
//                     </div>

//                     <div className="mb-2 flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1.5 text-sm font-bold text-yellow-600">
//                       <Star size={16} fill="currentColor" />
//                       {senior.rating}
//                     </div>

//                   </div>

//                   {/* Info */}
//                   <div className="mt-5">

//                     <h3 className="text-xl font-bold text-slate-900">
//                       {senior.name}
//                     </h3>

//                     <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
//                       <GraduationCap size={16} />
//                       {senior.batch} • {senior.department}
//                     </div>

//                     <span className="mt-3 inline-block rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600">
//                       {senior.designation}
//                     </span>

//                   </div>

//                   {/* Rating */}
//                   <div className="mt-6 grid grid-cols-2 gap-3">

//                     <div className="rounded-xl bg-slate-50 p-3">
//                       <p className="text-lg font-bold text-slate-900">
//                         {senior.rating}
//                       </p>
//                       <p className="text-xs text-slate-500">
//                         Overall Rating
//                       </p>
//                     </div>

//                     <div className="rounded-xl bg-slate-50 p-3">
//                       <p className="text-lg font-bold text-slate-900">
//                         {senior.reviews}
//                       </p>
//                       <p className="text-xs text-slate-500">
//                         Reviews
//                       </p>
//                     </div>

//                   </div>

//                   {/* Buttons */}
//                   <div className="mt-5 grid grid-cols-2 gap-3">

//                     <button className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600">
//                       View Profile
//                       <ArrowRight size={15} />
//                     </button>

//                     <button className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-[1.02] hover:shadow-lg">
//                       <Star size={16} />
//                       Rate Senior
//                     </button>

//                   </div>

//                 </div>
//               </div>
//             ))}

//           </div>
//         ) : (
//           /* Empty State */
//           <div className="rounded-3xl border border-slate-200 bg-white py-20 text-center">

//             <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
//               <Search size={28} />
//             </div>

//             <h3 className="mt-5 text-xl font-bold text-slate-900">
//               No Seniors Found
//             </h3>

//             <p className="mt-2 text-slate-500">
//               Try another name, batch, or department.
//             </p>

//             <button
//               onClick={clearFilters}
//               className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
//             >
//               Clear Filters
//             </button>

//           </div>
//         )}

//         {/* Bottom info */}
//         <div className="mt-14 rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-7 text-center">

//           <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm">
//             <UserRound size={23} />
//           </div>

//           <h3 className="mt-4 text-xl font-bold text-slate-900">
//             Your identity stays anonymous
//           </h3>

//           <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
//             Share honest feedback with confidence. Your name and personal
//             information will never be displayed with your review.
//           </p>

//         </div>

//       </div>
//     </section>
//   );
// };

// export default Seniors;























import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  Search,
  SlidersHorizontal,
  Star,
  GraduationCap,
  ArrowRight,
  X,
  UserRound,
  Sparkles,
} from "lucide-react";

const API_URL = "http://localhost:3000";

const Seniors = () => {
  const [seniors, setSeniors] = useState([]);

  const [search, setSearch] = useState("");
  const [batch, setBatch] = useState("All");
  const [department, setDepartment] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  // =========================
  // GET SENIORS FROM BACKEND
  // =========================

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

  // =========================
  // FILTER + SORT
  // =========================

  const filteredSeniors = useMemo(() => {
    let result = seniors.filter((senior) => {
      const name = senior.name?.toLowerCase() || "";
      const dept = senior.department?.toLowerCase() || "";
      const searchValue = search.toLowerCase();

      const matchesSearch =
        name.includes(searchValue) ||
        dept.includes(searchValue);

      const matchesBatch =
        batch === "All" || senior.batch === batch;

      const matchesDepartment =
        department === "All" ||
        senior.department === department;

      return (
        matchesSearch &&
        matchesBatch &&
        matchesDepartment
      );
    });

    if (sortBy === "rating") {
      result.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      );
    }

    if (sortBy === "reviews") {
      result.sort(
        (a, b) =>
          Number(b.reviews || 0) -
          Number(a.reviews || 0)
      );
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    }

    return result;
  }, [
    seniors,
    search,
    batch,
    department,
    sortBy,
  ]);

  // =========================
  // CLEAR FILTERS
  // =========================

  const clearFilters = () => {
    setSearch("");
    setBatch("All");
    setDepartment("All");
    setSortBy("rating");
  };

  // =========================
  // DYNAMIC STATS
  // =========================

  const totalSeniors = seniors.length;

  const averageRating =
    seniors.length > 0
      ? (
        seniors.reduce(
          (total, senior) =>
            total + Number(senior.rating || 0),
          0
        ) / seniors.length
      ).toFixed(1)
      : "0.0";

  const totalReviews = seniors.reduce(
    (total, senior) =>
      total + Number(senior.reviews || 0),
    0
  );

  return (
    <section className="min-h-screen bg-slate-50 pb-20">

      {/* =========================
          HEADER
      ========================= */}

      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-20">

        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 text-center">

          {/* Badge */}

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-md">

            <Sparkles size={17} />

            Senior Directory

          </div>

          {/* Title */}

          <h1 className="text-4xl font-extrabold text-white md:text-6xl">

            Find & Rate Your

            <span className="block text-pink-200">
              Seniors
            </span>

          </h1>

          {/* Description */}

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-indigo-100">

            Discover seniors, explore their ratings, and share your honest
            experience while keeping your identity completely anonymous.

          </p>

          {/* Stats */}

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-3">

            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">

              <p className="text-2xl font-bold text-white">
                {totalSeniors}
              </p>

              <p className="mt-1 text-xs text-indigo-100">
                Seniors
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">

              <p className="text-2xl font-bold text-white">
                {averageRating} ⭐
              </p>

              <p className="mt-1 text-xs text-indigo-100">
                Avg Rating
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">

              <p className="text-2xl font-bold text-white">
                {totalReviews}
              </p>

              <p className="mt-1 text-xs text-indigo-100">
                Reviews
              </p>

            </div>

          </div>

        </div>
      </div>

      {/* =========================
          SEARCH & FILTER
      ========================= */}

      <div className="relative z-10 mx-auto -mt-8 max-w-6xl px-6">

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">

          {/* Search */}

          <div className="relative">

            <Search
              size={21}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search senior by name or department..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />

          </div>

          {/* Filters */}

          <div className="mt-4 grid gap-3 md:grid-cols-4">

            {/* Batch */}

            <div className="relative">

              <GraduationCap
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={batch}
                onChange={(e) =>
                  setBatch(e.target.value)
                }
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
              >

                <option value="All">
                  All Batches
                </option>

                <option value="7th Batch">
                  7th Batch
                </option>

                <option value="6th Batch">
                  6th Batch
                </option>

                <option value="5th Batch">
                  5th Batch
                </option>

                <option value="4th Batch">
                  4th Batch
                </option>

                <option value="3rd Batch">
                  3rd Batch
                </option>

                <option value="2nd Batch">
                  2nd Batch
                </option>

                <option value="1st Batch">
                  1st Batch
                </option>

              </select>

            </div>

            {/* Department */}

            <select
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
            >

              <option value="All">
                All Departments
              </option>

              <option value="CSE">
                CSE
              </option>

            </select>

            {/* Sort */}

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
            >

              <option value="rating">
                Highest Rated
              </option>

              <option value="reviews">
                Most Reviewed
              </option>

              <option value="name">
                Name A-Z
              </option>

            </select>

            {/* Clear */}

            <button
              onClick={clearFilters}
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
            >

              <X size={17} />

              Clear Filters

            </button>

          </div>

        </div>

      </div>

      {/* =========================
          DIRECTORY
      ========================= */}

      <div className="mx-auto max-w-7xl px-6 pt-16">

        {/* Directory Header */}

        <div className="mb-8 flex items-center justify-between">

          <div>

            <p className="text-sm font-semibold text-indigo-600">
              Senior Directory
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Discover Seniors
            </h2>

          </div>

          <div className="hidden items-center gap-2 text-sm text-slate-500 md:flex">

            <SlidersHorizontal size={17} />

            {filteredSeniors.length} seniors found

          </div>

        </div>

        {/* =========================
            CARDS
        ========================= */}

        {filteredSeniors.length > 0 ? (

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

            {filteredSeniors.map((senior) => (

              <div
                key={senior._id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >

                {/* Top Gradient */}

                <div className="h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                <div className="px-6 pb-6">

                  {/* Avatar */}

                  <div className="-mt-12 flex items-end justify-between">

                    <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl font-extrabold text-white shadow-lg transition-transform duration-300 group-hover:scale-105">

                      {senior.image ||
                        senior.name
                          ?.split(" ")
                          .map((word) => word[0])
                          .join("")
                          .toUpperCase()}

                    </div>

                    {/* Rating */}

                    <div className="mb-2 flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1.5 text-sm font-bold text-yellow-600">

                      <Star
                        size={16}
                        fill="currentColor"
                      />

                      {senior.rating || 0}

                    </div>

                  </div>

                  {/* Info */}

                  <div className="mt-5">

                    <h3 className="text-xl font-bold text-slate-900">
                      {senior.name}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

                      <GraduationCap size={16} />

                      {senior.batch} • {senior.department}

                    </div>

                  </div>

                  {/* Rating */}

                  <div className="mt-6 grid grid-cols-2 gap-3">

                    <div className="rounded-xl bg-slate-50 p-3">

                      <p className="text-lg font-bold text-slate-900">
                        {senior.rating || 0}
                      </p>

                      <p className="text-xs text-slate-500">
                        Overall Rating
                      </p>

                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">

                      <p className="text-lg font-bold text-slate-900">
                        {senior.reviews || 0}
                      </p>

                      <p className="text-xs text-slate-500">
                        Reviews
                      </p>

                    </div>

                  </div>

                  {/* Buttons */}

                  <div className="mt-5 grid grid-cols-2 gap-3">

                    {/* View Profile */}

                    <button
                      onClick={() =>
                        console.log(
                          "View profile:",
                          senior
                        )
                      }
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
                    >

                      View Profile

                      <ArrowRight size={15} />

                    </button>

                    {/* Rate Senior */}

                    <Link
                      to={"/rate"}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-[1.02] hover:shadow-lg"
                    >

                      <Star size={16} />

                      Rate Senior

                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* =========================
              EMPTY STATE
          ========================= */

          <div className="rounded-3xl border border-slate-200 bg-white py-20 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">

              <Search size={28} />

            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              No Seniors Found
            </h3>

            <p className="mt-2 text-slate-500">
              Try another name, batch, or department.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Clear Filters
            </button>

          </div>

        )}

        {/* =========================
            BOTTOM INFO
        ========================= */}

        <div className="mt-14 rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-7 text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm">

            <UserRound size={23} />

          </div>

          <h3 className="mt-4 text-xl font-bold text-slate-900">
            Your identity stays anonymous
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">

            Share honest feedback with confidence. Your name and personal
            information will never be displayed with your review.

          </p>

        </div>

      </div>

    </section>
  );
};

export default Seniors;
