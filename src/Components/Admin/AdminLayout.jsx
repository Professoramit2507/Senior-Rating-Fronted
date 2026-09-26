import { Link, Outlet } from "react-router";
import {
    LayoutDashboard,
    Users,
    MessageSquare,
    Home,
} from "lucide-react";

import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-slate-100">

            {/* Sidebar */}
            <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 bg-slate-950 text-white lg:block">

                <div className="flex h-[72px] items-center border-b border-white/10 px-6">
                    <div>
                        <h1 className="text-xl font-extrabold">
                            CampusRate
                        </h1>

                        <p className="text-xs text-slate-400">
                            Administration
                        </p>
                    </div>
                </div>

                <nav className="space-y-2 p-4">

                    <Link
                        to="/admin"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-indigo-600 hover:text-white"
                    >
                        <LayoutDashboard size={19} />
                        Dashboard
                    </Link>

                    <Link
                        to="/admin/seniors"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-indigo-600 hover:text-white"
                    >
                        <Users size={19} />
                        Manage Seniors
                    </Link>

                    <Link
                        to="/admin/users"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-indigo-600 hover:text-white"
                    >
                        <Users size={19} />
                        Manage Users
                    </Link>

                    <Link
                        to="/admin/reviews"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-indigo-600 hover:text-white"
                    >
                        <MessageSquare size={19} />
                        Manage Reviews
                    </Link>

                    <Link
                        to="/"
                        className="mt-5 flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-white/10"
                    >
                        <Home size={19} />
                        Back to Home
                    </Link>

                </nav>

            </aside>

            {/* Right */}
            <div className="lg:ml-64">

                <AdminNavbar />

                <main className="p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default AdminLayout;
