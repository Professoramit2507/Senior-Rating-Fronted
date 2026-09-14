import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      <div className="text-center">
        {/* 404 */}
        <h1 className="text-[120px] md:text-[180px] font-extrabold leading-none bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          404
        </h1>

        {/* Content */}
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-800">
          Page Not Found
        </h2>

        <p className="mt-3 max-w-md mx-auto text-gray-500 text-base md:text-lg">
          Sorry, the page you are looking for doesn't exist or may have been
          moved.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl transition-all duration-300"
        >
          <span>←</span>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
