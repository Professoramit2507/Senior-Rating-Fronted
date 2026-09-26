import {
    Users,
    Star,
    MessageSquare,
    GraduationCap,
    ArrowUpRight,
    UserPlus,
    ShieldCheck,
    Activity,
    ChevronRight,
} from "lucide-react";
import { Link } from "react-router";

const Dashboard = () => {
    const stats = [
        {
            title: "Total Seniors",
            value: "27",
            change: "+12%",
            description: "Senior profiles",
            icon: Users,
            gradient: "from-indigo-500 to-purple-600",
            bg: "bg-indigo-50",
            text: "text-indigo-600",
        },
        {
            title: "Total Users",
            value: "0",
            change: "0%",
            description: "Registered users",
            icon: GraduationCap,
            gradient: "from-blue-500 to-cyan-500",
            bg: "bg-blue-50",
            text: "text-blue-600",
        },
        {
            title: "Total Reviews",
            value: "0",
            change: "0%",
            description: "Submitted reviews",
            icon: MessageSquare,
            gradient: "from-pink-500 to-rose-500",
            bg: "bg-pink-50",
            text: "text-pink-600",
        },
        {
            title: "Average Rating",
            value: "0.0",
            change: "0%",
            description: "Platform rating",
            icon: Star,
            gradient: "from-yellow-400 to-orange-500",
            bg: "bg-yellow-50",
            text: "text-yellow-600",
        },
    ];

    const quickActions = [
        {
            title: "Manage Seniors",
            description: "View and manage senior profiles",
            icon: Users,
            link: "/admin/manage-users",
            gradient: "from-indigo-500 to-purple-600",
        },
        {
            title: "Manage Reviews",
            description: "Review and moderate reviews",
            icon: MessageSquare,
            link: "/admin/manage-reviews",
            gradient: "from-pink-500 to-rose-500",
        },
        {
            title: "Add Senior",
            description: "Create a new senior profile",
            icon: UserPlus,
            link: "/admin/add-senior",
            gradient: "from-emerald-500 to-teal-500",
        },
    ];

    return (
        <div className="space-y-8">

            {/* ================= HEADER ================= */}
            <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-7 text-white shadow-xl shadow-indigo-200/50 sm:p-9">

                {/* Background Decorations */}
                <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-28 left-20 h-64 w-64 rounded-full bg-pink-300/20 blur-3xl" />

                <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">

                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur-md">
                            <Activity size={14} />
                            Admin Dashboard
                        </div>

                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Welcome back 👋
                        </h1>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-indigo-100">
                            Manage your CampusRate platform, seniors,
                            users and reviews from one place.
                        </p>
                    </div>

                    {/* Admin Badge */}
                    <div className="hidden items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-md md:flex">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                            <ShieldCheck size={23} />
                        </div>

                        <div>
                            <p className="text-xs text-indigo-100">
                                Account Type
                            </p>

                            <p className="font-bold">
                                Administrator
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* ================= STATS ================= */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="group relative overflow-hidden rounded-[26px] border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                        >

                            {/* Top Gradient */}
                            <div
                                className={`absolute left-0 right-0 top-0 h-1 bg-gradient-to-r ${stat.gradient}`}
                            />

                            <div className="flex items-start justify-between">

                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        {stat.title}
                                    </p>

                                    <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                                        {stat.value}
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-400">
                                        {stat.description}
                                    </p>
                                </div>

                                <div
                                    className={`flex h-13 w-13 items-center justify-center rounded-2xl ${stat.bg} ${stat.text} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                                >
                                    <Icon size={24} />
                                </div>

                            </div>

                            <div className="mt-5 flex items-center gap-2">

                                <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-600">
                                    {stat.change}
                                </span>

                                <span className="text-xs text-slate-400">
                                    from last month
                                </span>

                            </div>

                        </div>
                    );
                })}

            </div>

            {/* ================= QUICK ACTIONS ================= */}
            <div>

                <div className="mb-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                        Quick Actions
                    </p>

                    <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                        Manage Platform
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Quickly access your most important admin tools.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-3">

                    {quickActions.map((action) => {
                        const Icon = action.icon;

                        return (
                            <Link
                                key={action.title}
                                to={action.link}
                                className="group relative overflow-hidden rounded-[26px] border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >

                                <div
                                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${action.gradient} text-white shadow-lg`}
                                >
                                    <Icon size={22} />
                                </div>

                                <h3 className="text-lg font-bold text-slate-900">
                                    {action.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {action.description}
                                </p>

                                <div className="mt-5 flex items-center gap-1 text-sm font-bold text-indigo-600">
                                    Open
                                    <ChevronRight
                                        size={16}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                </div>

                                {/* Decoration */}
                                <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-slate-50 transition-transform duration-500 group-hover:scale-150" />

                            </Link>
                        );
                    })}

                </div>
            </div>

            {/* ================= BOTTOM SECTION ================= */}
            <div className="grid gap-6 lg:grid-cols-3">

                {/* Overview */}
                <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-purple-600">
                                Platform Overview
                            </p>

                            <h2 className="mt-1 text-xl font-extrabold text-slate-900">
                                CampusRate Activity
                            </h2>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                            <Activity size={19} />
                        </div>

                    </div>

                    {/* Empty State */}
                    <div className="mt-6 rounded-2xl bg-slate-50 p-6 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
                            <MessageSquare size={24} />
                        </div>

                        <h3 className="mt-4 font-bold text-slate-800">
                            No recent activity
                        </h3>

                        <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-400">
                            When users start rating seniors and submitting
                            reviews, recent activity will appear here.
                        </p>

                    </div>

                </div>

                {/* System Status */}
                <div className="rounded-[28px] bg-slate-900 p-6 text-white shadow-xl">

                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                            <ShieldCheck size={22} />
                        </div>

                        <div>
                            <p className="text-xs text-slate-400">
                                System Status
                            </p>

                            <h3 className="font-bold">
                                All Systems Active
                            </h3>
                        </div>

                    </div>

                    <div className="mt-7 space-y-4">

                        <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                            <span className="text-sm text-slate-300">
                                Authentication
                            </span>

                            <span className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                Active
                            </span>
                        </div>

                        <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                            <span className="text-sm text-slate-300">
                                Database
                            </span>

                            <span className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                Connected
                            </span>
                        </div>

                        <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                            <span className="text-sm text-slate-300">
                                API Server
                            </span>

                            <span className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                Online
                            </span>
                        </div>

                    </div>

                    <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
                        <ArrowUpRight size={14} />
                        CampusRate Admin Panel
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Dashboard;
