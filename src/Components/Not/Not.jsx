import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">
      <div className="text-center max-w-md animate-fade-in">
        <h1 className="text-8xl sm:text-9xl font-black tracking-tight text-white">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-white">
          Page Not Found
        </h2>

        <p className="mt-2 text-sm text-slate-400 leading-relaxed">
          The page you requested could not be located or may have been relocated.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-xs hover:bg-indigo-500 transition"
        >
          <ArrowLeft size={14} />
          Back to CampusRate Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
