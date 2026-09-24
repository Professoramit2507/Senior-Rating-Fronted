// import { Link } from "react-router";
// import {
//   Home,
//   Users,
//   Star,
//   MessageSquare,
//   Bell,
//   User,
//   Sparkles,
// } from "lucide-react";

// const Navber = () => {
//   return (
//     <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">

//       {/* Animated Gradient Line */}
//       <div className="h-0.75 w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse"></div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="h-18 flex items-center justify-between">

//           {/* ================= LOGO ================= */}
//           <Link
//             to="/"
//             className="group flex items-center gap-3"
//           >
//             {/* Logo Icon */}
//             <div
//               className="relative w-11 h-11 rounded-2xl 
//               bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500
//               flex items-center justify-center
//               shadow-lg shadow-indigo-200
//               group-hover:scale-110 group-hover:rotate-6
//               transition-all duration-300"
//             >
//               <Star
//                 className="w-6 h-6 text-white fill-white 
//                 group-hover:scale-110 transition-transform duration-300"
//               />

//               {/* Sparkle */}
//               <Sparkles
//                 size={13}
//                 className="absolute -top-1 -right-1 text-yellow-400 
//                 animate-ping"
//               />
//             </div>

//             {/* Logo Text */}
//             <div>
//               <h1 className="text-xl font-extrabold tracking-tight text-slate-800">
//                 Campus
//                 <span className="bg-linear-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
//                   Rate
//                 </span>
//               </h1>

//               <p className="text-[10px] font-medium text-slate-400 tracking-wide">
//                 Anonymous Senior Rating
//               </p>
//             </div>
//           </Link>

//           {/* ================= NAVIGATION ================= */}
//           <div className="hidden md:flex items-center gap-1">

//             {/* Home */}
//             <Link
//               to="/"
//               className="group relative flex items-center gap-2 px-4 py-2.5
//               rounded-xl text-slate-600 font-medium
//               hover:text-indigo-600 hover:bg-indigo-50
//               transition-all duration-300"
//             >
//               <Home
//                 size={18}
//                 className="group-hover:-translate-y-0.5 transition-transform"
//               />
//               Home

//               {/* Hover Line */}
//               <span className="absolute bottom-1 left-4 right-4 h-0.5
//                 bg-indigo-500 scale-x-0 group-hover:scale-x-100
//                 transition-transform duration-300 origin-left rounded-full">
//               </span>
//             </Link>

//             {/* Seniors */}
//             <Link
//               to="/seniors"
//               className="group relative flex items-center gap-2 px-4 py-2.5
//               rounded-xl text-slate-600 font-medium
//               hover:text-purple-600 hover:bg-purple-50
//               transition-all duration-300"
//             >
//               <Users
//                 size={18}
//                 className="group-hover:scale-110 transition-transform"
//               />
//               Seniors

//               <span className="absolute bottom-1 left-4 right-4 h-0.5
//                 bg-purple-500 scale-x-0 group-hover:scale-x-100
//                 transition-transform duration-300 origin-left rounded-full">
//               </span>
//             </Link>

//             {/* My Ratings */}
//             <Link
//               to="/my-ratings"
//               className="group relative flex items-center gap-2 px-4 py-2.5
//               rounded-xl text-slate-600 font-medium
//               hover:text-yellow-600 hover:bg-yellow-50
//               transition-all duration-300"
//             >
//               <Star
//                 size={18}
//                 className="group-hover:rotate-12 group-hover:scale-110
//                 transition-all duration-300"
//               />
//               My Ratings

//               <span className="absolute bottom-1 left-4 right-4 h-0.5
//                 bg-yellow-500 scale-x-0 group-hover:scale-x-100
//                 transition-transform duration-300 origin-left rounded-full">
//               </span>
//             </Link>

//             {/* Reviews */}
//             <Link
//               to="/reviews"
//               className="group relative flex items-center gap-2 px-4 py-2.5
//               rounded-xl text-slate-600 font-medium
//               hover:text-pink-600 hover:bg-pink-50
//               transition-all duration-300"
//             >
//               <MessageSquare
//                 size={18}
//                 className="group-hover:-translate-y-0.5 transition-transform"
//               />
//               Reviews

//               <span className="absolute bottom-1 left-4 right-4 h-0.5
//                 bg-pink-500 scale-x-0 group-hover:scale-x-100
//                 transition-transform duration-300 origin-left rounded-full">
//               </span>
//             </Link>

//           </div>

//           {/* ================= RIGHT SIDE ================= */}
//           <div className="flex items-center gap-3">

              

//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navber;







import { Link } from "react-router";
import {
    Home,
    Users,
    Star,
    MessageSquare,
    LogIn,
    UserPlus,
    Sparkles,
} from "lucide-react";

const Navber = () => {
    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl">

            {/* Animated Gradient Line */}
            <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-[72px] items-center justify-between">

                    {/* ================= LOGO ================= */}
                    <Link
                        to="/"
                        className="group flex items-center gap-3"
                    >
                        {/* Logo Icon */}
                        <div
                            className="relative flex h-11 w-11 items-center justify-center rounded-2xl
                            bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
                            shadow-lg shadow-indigo-200
                            transition-all duration-300
                            group-hover:rotate-6 group-hover:scale-110"
                        >
                            <Star
                                className="h-6 w-6 fill-white text-white transition-transform duration-300 group-hover:scale-110"
                            />

                            <Sparkles
                                size={13}
                                className="absolute -right-1 -top-1 animate-ping text-yellow-400"
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

                            <p className="text-[10px] font-medium tracking-wide text-slate-400">
                                Anonymous Senior Rating
                            </p>
                        </div>
                    </Link>

                    {/* ================= NAVIGATION ================= */}
                    <div className="hidden items-center gap-1 md:flex">

                        {/* Home */}
                        <Link
                            to="/"
                            className="group relative flex items-center gap-2 rounded-xl px-4 py-2.5 font-medium text-slate-600 transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                            <Home
                                size={18}
                                className="transition-transform group-hover:-translate-y-0.5"
                            />
                            Home

                            <span className="absolute bottom-1 left-4 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-indigo-500 transition-transform duration-300 group-hover:scale-x-100" />
                        </Link>

                        {/* Seniors */}
                        <Link
                            to="/seniors"
                            className="group relative flex items-center gap-2 rounded-xl px-4 py-2.5 font-medium text-slate-600 transition-all duration-300 hover:bg-purple-50 hover:text-purple-600"
                        >
                            <Users
                                size={18}
                                className="transition-transform group-hover:scale-110"
                            />
                            Seniors

                            <span className="absolute bottom-1 left-4 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-purple-500 transition-transform duration-300 group-hover:scale-x-100" />
                        </Link>

                        {/* My Ratings */}
                        <Link
                            to="/my-ratings"
                            className="group relative flex items-center gap-2 rounded-xl px-4 py-2.5 font-medium text-slate-600 transition-all duration-300 hover:bg-yellow-50 hover:text-yellow-600"
                        >
                            <Star
                                size={18}
                                className="transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
                            />
                            My Ratings

                            <span className="absolute bottom-1 left-4 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-yellow-500 transition-transform duration-300 group-hover:scale-x-100" />
                        </Link>

                        {/* Reviews */}
                        <Link
                            to="/reviews"
                            className="group relative flex items-center gap-2 rounded-xl px-4 py-2.5 font-medium text-slate-600 transition-all duration-300 hover:bg-pink-50 hover:text-pink-600"
                        >
                            <MessageSquare
                                size={18}
                                className="transition-transform group-hover:-translate-y-0.5"
                            />
                            Reviews

                            <span className="absolute bottom-1 left-4 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-pink-500 transition-transform duration-300 group-hover:scale-x-100" />
                        </Link>
                    </div>

                    {/* ================= RIGHT SIDE ================= */}
                    <div className="flex items-center gap-2 sm:gap-3">

                        {/* Login */}
                        <Link
                            to="/login"
                            className="group flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-600 sm:px-4"
                        >
                            <LogIn
                                size={18}
                                className="transition-transform group-hover:-translate-x-0.5"
                            />

                            <span className="hidden sm:inline">
                                Login
                            </span>
                        </Link>

                        {/* Register */}
                        <Link
                            to="/register"
                            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-200 sm:px-5"
                        >
                            <UserPlus
                                size={18}
                                className="transition-transform group-hover:scale-110"
                            />

                            <span className="hidden sm:inline">
                                Register
                            </span>
                        </Link>

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navber;
