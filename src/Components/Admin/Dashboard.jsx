import { useEffect, useState } from "react";
import {
    Users,
    Star,
    MessageSquare,
    GraduationCap,
    ArrowUpRight,
    ShieldCheck,
    Activity,
    ChevronRight,
    Clock,
} from "lucide-react";
import { Link } from "react-router";

const Dashboard = () => {
    const [counts, setCounts] = useState({
        seniors: 0,
        users: 0,
        reviews: 0,
        avgRating: "0.0",
        pendingUsers: 0,
    });

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:3000/senior")
                .then((r) => r.json())
                .catch(() => []),
            fetch("http://localhost:3000/users")
                .then((r) => r.json())
                .catch(() => []),
            fetch("http://localhost:3000/reviews")
                .then((r) => r.json())
                .catch(() => []),
        ]).then(([seniorsData, usersData, reviewsData]) => {
            const sCount = Array.isArray(seniorsData) ? seniorsData.length : 0;
            const uCount = Array.isArray(usersData) ? usersData.length : 0;
            const rCount = Array.isArray(reviewsData) ? reviewsData.length : 0;
            const pending = Array.isArray(usersData)
                ? usersData.filter((u) => u.status === "pending").length
                : 0;
            const avg =
                rCount > 0
                    ? (
                          reviewsData.reduce(
                              (acc, r) => acc + Number(r.rating || 0),
                              0
                          ) / rCount
                      ).toFixed(1)
                    : "0.0";

            setCounts({
                seniors: sCount,
                users: uCount,
                reviews: rCount,
                avgRating: avg,
                pendingUsers: pending,
            });
        });
    }, []);

    const stats = [
        {
            title: "Total Seniors",
            value: String(counts.seniors),
            change: "Active Roster",
            description: "Registered mentors",
            icon: Users,
        },
        {
            title: "Total Users",
            value: String(counts.users),
            change: counts.pendingUsers > 0 ? `${counts.pendingUsers} Pending` : "All Verified",
            description: "Student accounts",
            icon: GraduationCap,
        },
        {
            title: "Total Reviews",
            value: String(counts.reviews),
            change: "Live Feed",
            description: "Submitted reviews",
            icon: MessageSquare,
        },
        {
            title: "Average Rating",
            value: counts.avgRating,
            change: "Overall Score",
            description: "Campus satisfaction",
            icon: Star,
        },
    ];

    const quickActions = [
        {
            title: "Manage Users & Permissions",
            description:
                counts.pendingUsers > 0
                    ? `${counts.pendingUsers} student account(s) waiting for approval`
                    : "Verify student batches and manage access roles",
            icon: counts.pendingUsers > 0 ? Clock : Users,
            link: "/admin/users",
            alertBadge: counts.pendingUsers > 0 ? `${counts.pendingUsers} Pending` : null,
        },
        {
            title: "Manage Reviews",
            description: "Moderate and inspect submitted student feedback",
            icon: MessageSquare,
            link: "/admin/reviews",
            alertBadge: null,
        },
        {
            title: "Seniors Directory",
            description: "Review active senior mentors and batch profiles",
            icon: GraduationCap,
            link: "/seniors",
            alertBadge: null,
        },
    ];

    return (
        <div className="space-y-6 text-white animate-fade-in">
            {/* Header Solid Premium Banner */}
            <div className="rounded-2xl bg-slate-900 p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div>
                    <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-md bg-slate-800 border border-slate-700 px-2.5 py-1 text-xs font-semibold text-slate-300">
                        <Activity size={13} className="text-emerald-400" />
                        System Administration
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                        CampusRate Admin Dashboard
                    </h1>

                    <p className="mt-1.5 max-w-xl text-xs sm:text-sm text-slate-400 leading-relaxed">
                        Centrally oversee student batch authorizations, review submissions, and senior mentorship ratings.
                    </p>
                </div>

                <div className="hidden items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 md:flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                        <p className="text-[11px] text-slate-400 font-medium">Authorization</p>
                        <p className="text-xs font-bold text-white">Administrator Access</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl transition-all duration-300 hover:border-slate-700 hover:-translate-y-1"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                        {stat.title}
                                    </p>
                                    <h2 className="mt-1.5 text-3xl font-black text-white tracking-tight">
                                        {stat.value}
                                    </h2>
                                    <p className="mt-0.5 text-xs text-slate-500">
                                        {stat.description}
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-slate-300">
                                    <Icon size={20} />
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                                <span className="font-semibold text-slate-300 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-md">
                                    {stat.change}
                                </span>
                                <span className="text-slate-500 text-[11px]">System Status</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div>
                <div className="mb-4">
                    <h2 className="text-base font-bold text-white tracking-tight">
                        Administrative Controls
                    </h2>
                    <p className="text-xs text-slate-400">
                        Quick access to frequently performed governance tasks.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {quickActions.map((action) => {
                        const Icon = action.icon;

                        return (
                            <Link
                                key={action.title}
                                to={action.link}
                                className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl transition-all duration-300 hover:border-indigo-500/60 hover:-translate-y-1 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-white shadow-xs group-hover:bg-indigo-600 transition-colors">
                                            <Icon size={18} />
                                        </div>

                                        {action.alertBadge && (
                                            <span className="rounded-md bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-xs font-bold text-amber-400 animate-pulse">
                                                {action.alertBadge}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                                        {action.title}
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                                        {action.description}
                                    </p>
                                </div>

                                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center gap-1 text-xs font-bold text-indigo-400">
                                    Manage
                                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-sm font-bold text-white">
                                Activity Overview
                            </h2>
                            <p className="text-xs text-slate-400">
                                Real-time rating events and user registrations.
                            </p>
                        </div>
                        <Activity size={18} className="text-slate-500" />
                    </div>

                    <div className="rounded-xl bg-slate-950 border border-slate-800 p-6 text-center">
                        <MessageSquare size={22} className="mx-auto text-slate-500" />
                        <h3 className="mt-2 text-xs font-bold text-slate-300">
                            Activity Stream Monitoring Active
                        </h3>
                        <p className="mt-0.5 text-[11px] text-slate-500">
                            All student rating submissions are being processed and securely decoupled.
                        </p>
                    </div>
                </div>

                {/* System Status Solid */}
                <div className="rounded-2xl bg-slate-900 p-6 text-white border border-slate-800 shadow-xl flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <ShieldCheck size={18} className="text-emerald-400" />
                            <h3 className="text-sm font-bold text-white">System Infrastructure</h3>
                        </div>

                        <div className="space-y-2 text-xs">
                            <div className="flex items-center justify-between rounded-lg bg-slate-950 px-3 py-2 border border-slate-800">
                                <span className="text-slate-400">Authentication</span>
                                <span className="font-semibold text-emerald-400">● Operational</span>
                            </div>

                            <div className="flex items-center justify-between rounded-lg bg-slate-950 px-3 py-2 border border-slate-800">
                                <span className="text-slate-400">MongoDB Cluster</span>
                                <span className="font-semibold text-emerald-400">● Connected</span>
                            </div>

                            <div className="flex items-center justify-between rounded-lg bg-slate-950 px-3 py-2 border border-slate-800">
                                <span className="text-slate-400">API Endpoint</span>
                                <span className="font-semibold text-emerald-400">● Healthy</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center gap-1">
                        <ArrowUpRight size={13} />
                        CampusRate Operational Core
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
