import { useEffect, useState, useMemo } from "react";
import {
    CheckCircle2,
    Clock,
    XCircle,
    Shield,
    ShieldCheck,
    Trash2,
    Search,
    UserCheck,
    UserX,
    Lock,
    Unlock,
    Users as UsersIcon,
    AlertCircle,
} from "lucide-react";
import Swal from "sweetalert2";

const API_URL = "http://localhost:3000";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // =========================
    // FETCH USERS
    // =========================
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/users`);
            const data = await res.json();
            setUsers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Fetch users error:", error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // =========================
    // UPDATE USER STATUS (APPROVE / REJECT / REVOKE)
    // =========================
    const handleUpdateStatus = async (user, newStatus) => {
        const actionLabel =
            newStatus === "approved"
                ? "grant full access permission to"
                : newStatus === "rejected"
                ? "reject registration for"
                : "revoke access from";

        const confirmResult = await Swal.fire({
            title:
                newStatus === "approved"
                    ? "Approve User?"
                    : newStatus === "rejected"
                    ? "Reject User?"
                    : "Revoke Access?",
            text: `Are you sure you want to ${actionLabel} ${user.name}?`,
            icon: newStatus === "approved" ? "question" : "warning",
            showCancelButton: true,
            confirmButtonColor: newStatus === "approved" ? "#10b981" : "#ef4444",
            cancelButtonColor: "#64748b",
            confirmButtonText:
                newStatus === "approved"
                    ? "Yes, Approve Access"
                    : newStatus === "rejected"
                    ? "Yes, Reject"
                    : "Yes, Revoke",
        });

        if (!confirmResult.isConfirmed) return;

        try {
            const res = await fetch(`${API_URL}/users/${user._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) {
                throw new Error("Failed to update user status");
            }

            setUsers((prev) =>
                prev.map((u) =>
                    u._id === user._id ? { ...u, status: newStatus } : u
                )
            );

            Swal.fire({
                icon: "success",
                title: "Status Updated!",
                text: `${user.name}'s status has been changed to ${newStatus}.`,
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error("Status update error:", error);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: error.message || "Could not update user status.",
            });
        }
    };

    // =========================
    // UPDATE USER ROLE (ADMIN / USER)
    // =========================
    const handleToggleRole = async (user) => {
        const newRole = user.role === "admin" ? "user" : "admin";

        const confirmResult = await Swal.fire({
            title: `Make ${newRole === "admin" ? "Admin" : "Regular User"}?`,
            text: `Change role for ${user.name} to ${newRole.toUpperCase()}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#4f46e5",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, Change Role",
        });

        if (!confirmResult.isConfirmed) return;

        try {
            const res = await fetch(`${API_URL}/users/${user._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role: newRole,
                    // If promoted to admin, also automatically approve
                    status: newRole === "admin" ? "approved" : user.status,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to update user role");
            }

            setUsers((prev) =>
                prev.map((u) =>
                    u._id === user._id
                        ? {
                              ...u,
                              role: newRole,
                              status:
                                  newRole === "admin" ? "approved" : u.status,
                          }
                        : u
                )
            );

            Swal.fire({
                icon: "success",
                title: "Role Updated!",
                text: `${user.name} is now a ${newRole}.`,
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error("Role update error:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message || "Failed to update role.",
            });
        }
    };

    // =========================
    // DELETE USER
    // =========================
    const handleDeleteUser = async (user) => {
        const confirmResult = await Swal.fire({
            title: "Delete User?",
            text: `This will permanently delete ${user.name} from CampusRate database.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, Delete User",
        });

        if (!confirmResult.isConfirmed) return;

        try {
            const res = await fetch(`${API_URL}/users/${user._id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete user");
            }

            setUsers((prev) => prev.filter((u) => u._id !== user._id));

            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "User has been removed from database.",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error("Delete user error:", error);
            Swal.fire({
                icon: "error",
                title: "Delete Failed",
                text: error.message || "Could not delete user.",
            });
        }
    };

    // =========================
    // FILTERED USERS & STATS
    // =========================
    const pendingCount = users.filter((u) => u.status === "pending").length;
    const approvedCount = users.filter(
        (u) => u.status === "approved" || (!u.status && u.role !== "admin")
    ).length;
    const adminCount = users.filter((u) => u.role === "admin").length;

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch =
                (user.name || "").toLowerCase().includes(search.toLowerCase()) ||
                (user.email || "").toLowerCase().includes(search.toLowerCase()) ||
                (user.department || "").toLowerCase().includes(search.toLowerCase()) ||
                (user.batch || "").toLowerCase().includes(search.toLowerCase());

            const effectiveStatus = user.status || "approved";

            const matchesStatus =
                statusFilter === "all"
                    ? true
                    : statusFilter === "pending"
                    ? effectiveStatus === "pending"
                    : statusFilter === "approved"
                    ? effectiveStatus === "approved"
                    : statusFilter === "rejected"
                    ? effectiveStatus === "rejected"
                    : statusFilter === "admin"
                    ? user.role === "admin"
                    : true;

            return matchesSearch && matchesStatus;
        });
    }, [users, search, statusFilter]);

    if (loading) {
        return (
            <div className="flex justify-center py-24">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
            </div>
        );
    }

    return (
        <div className="space-y-8 text-white animate-fade-in">
            {/* ================= HEADER ================= */}
            <div>
                <p className="text-sm font-semibold text-indigo-400">
                    User Management
                </p>
                <h1 className="mt-1 text-3xl font-extrabold text-white">
                    Manage Users & Permissions
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                    Review registered students, grant full access permission, or manage administrative roles.
                </p>
            </div>

            {/* ================= STATS CARDS ================= */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {/* Total */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Total Registered
                            </p>
                            <h2 className="mt-2 text-3xl font-extrabold text-white">
                                {users.length}
                            </h2>
                        </div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-slate-300">
                            <UsersIcon size={22} />
                        </div>
                    </div>
                </div>

                {/* Pending Approval */}
                <div
                    onClick={() => setStatusFilter("pending")}
                    className={`cursor-pointer rounded-2xl border p-5 shadow-xl transition hover:border-amber-400 ${
                        statusFilter === "pending"
                            ? "border-amber-400 bg-amber-500/10 ring-1 ring-amber-400"
                            : "border-slate-800 bg-slate-900"
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                Pending Permission
                            </p>
                            <h2 className="mt-2 text-3xl font-extrabold text-amber-400">
                                {pendingCount}
                            </h2>
                        </div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                            <Clock size={22} />
                        </div>
                    </div>
                </div>

                {/* Approved */}
                <div
                    onClick={() => setStatusFilter("approved")}
                    className={`cursor-pointer rounded-2xl border p-5 shadow-xl transition hover:border-emerald-400 ${
                        statusFilter === "approved"
                            ? "border-emerald-400 bg-emerald-500/10 ring-1 ring-emerald-400"
                            : "border-slate-800 bg-slate-900"
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                                Approved / Active
                            </p>
                            <h2 className="mt-2 text-3xl font-extrabold text-emerald-400">
                                {approvedCount}
                            </h2>
                        </div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                            <CheckCircle2 size={22} />
                        </div>
                    </div>
                </div>

                {/* Admins */}
                <div
                    onClick={() => setStatusFilter("admin")}
                    className={`cursor-pointer rounded-2xl border p-5 shadow-xl transition hover:border-purple-400 ${
                        statusFilter === "admin"
                            ? "border-purple-400 bg-purple-500/10 ring-1 ring-purple-400"
                            : "border-slate-800 bg-slate-900"
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                                Administrators
                            </p>
                            <h2 className="mt-2 text-3xl font-extrabold text-purple-400">
                                {adminCount}
                            </h2>
                        </div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                            <ShieldCheck size={22} />
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= SEARCH & TABS ================= */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Search */}
                <div className="relative w-full sm:max-w-xs">
                    <Search
                        size={17}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, email, batch..."
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2.5 pl-10 pr-4 text-xs font-medium text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
                    />
                </div>

                {/* Status Filter Tabs */}
                <div className="flex flex-wrap gap-2">
                    {[
                        { id: "all", label: "All Users" },
                        {
                            id: "pending",
                            label: "Pending",
                            badge: pendingCount,
                            badgeColor: "bg-amber-500 text-slate-950",
                        },
                        { id: "approved", label: "Approved" },
                        { id: "admin", label: "Admins" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setStatusFilter(tab.id)}
                            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition cursor-pointer ${
                                statusFilter === tab.id
                                    ? "bg-indigo-600 text-white shadow-xs"
                                    : "bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
                            }`}
                        >
                            <span>{tab.label}</span>
                            {tab.badge !== undefined && tab.badge > 0 && (
                                <span
                                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                                        tab.badgeColor || "bg-indigo-600 text-white"
                                    }`}
                                >
                                    {tab.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* ================= USERS TABLE ================= */}
            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px]">
                        <thead className="bg-slate-950/80 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                    #
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                    User Info
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Dept & Batch
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Role
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Permission Status
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Actions / Permission
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-800">
                            {filteredUsers.map((user, index) => {
                                const status = user.status || "approved";
                                const isPending = status === "pending";
                                const isApproved = status === "approved";
                                const isRejected = status === "rejected";
                                const isAdmin = user.role === "admin";

                                return (
                                    <tr
                                        key={user._id}
                                        className={`transition hover:bg-slate-800/50 ${
                                            isPending ? "bg-amber-500/5" : ""
                                        }`}
                                    >
                                        {/* Index */}
                                        <td className="px-6 py-5 text-sm font-semibold text-slate-500">
                                            {index + 1}
                                        </td>

                                        {/* User */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 font-bold text-white shadow-xs">
                                                    {(user.name || "U")
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <div>
                                                    <p className="font-bold text-white leading-tight">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-xs text-slate-400 leading-tight mt-0.5">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Dept & Batch */}
                                        <td className="px-6 py-5 text-sm font-medium text-slate-300">
                                            <div className="text-white font-semibold">
                                                {user.department || "N/A"}
                                            </div>
                                            <div className="text-xs text-slate-400">
                                                {user.batch || "N/A"}
                                            </div>
                                        </td>

                                        {/* Role */}
                                        <td className="px-6 py-5">
                                            {isAdmin ? (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-400 border border-purple-500/30">
                                                    <ShieldCheck size={13} />
                                                    Admin
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-400">
                                                    User
                                                </span>
                                            )}
                                        </td>

                                        {/* Permission Status */}
                                        <td className="px-6 py-5">
                                            {isPending ? (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30 animate-pulse">
                                                    <Clock size={13} />
                                                    Pending Approval
                                                </span>
                                            ) : isApproved ? (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                                                    <CheckCircle2 size={13} />
                                                    Approved
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400 border border-red-500/30">
                                                    <XCircle size={13} />
                                                    Rejected
                                                </span>
                                            )}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-5 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                {/* Approve Button */}
                                                {!isApproved && (
                                                    <button
                                                        onClick={() =>
                                                            handleUpdateStatus(
                                                                user,
                                                                "approved"
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-500 cursor-pointer"
                                                        title="Grant Full Access"
                                                    >
                                                        <CheckCircle2 size={14} />
                                                        <span>Approve</span>
                                                    </button>
                                                )}

                                                {/* Revoke Button */}
                                                {isApproved && !isAdmin && (
                                                    <button
                                                        onClick={() =>
                                                            handleUpdateStatus(
                                                                user,
                                                                "pending"
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-1 rounded-xl border border-amber-500/30 bg-amber-500/10 px-2.5 py-1.5 text-xs font-semibold text-amber-400 transition hover:bg-amber-500/20 cursor-pointer"
                                                        title="Revoke Permission"
                                                    >
                                                        <Lock size={13} />
                                                        <span>Revoke</span>
                                                    </button>
                                                )}

                                                {/* Reject Button (if pending) */}
                                                {isPending && (
                                                    <button
                                                        onClick={() =>
                                                            handleUpdateStatus(
                                                                user,
                                                                "rejected"
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-1 rounded-xl border border-red-500/30 bg-red-500/10 px-2.5 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/20 cursor-pointer"
                                                        title="Reject Request"
                                                    >
                                                        <XCircle size={14} />
                                                        <span>Reject</span>
                                                    </button>
                                                )}

                                                {/* Role Toggle */}
                                                <button
                                                    onClick={() =>
                                                        handleToggleRole(user)
                                                    }
                                                    className={`rounded-xl border p-2 transition cursor-pointer ${
                                                        isAdmin
                                                            ? "border-purple-500/30 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"
                                                            : "border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white"
                                                    }`}
                                                    title={
                                                        isAdmin
                                                            ? "Demote to regular user"
                                                            : "Promote to Admin"
                                                    }
                                                >
                                                    <Shield size={14} />
                                                </button>

                                                {/* Delete */}
                                                <button
                                                    onClick={() =>
                                                        handleDeleteUser(user)
                                                    }
                                                    className="rounded-xl p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
                                                    title="Delete user"
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="py-16 text-center">
                        <AlertCircle
                            size={32}
                            className="mx-auto text-slate-600"
                        />
                        <p className="mt-3 text-sm font-semibold text-slate-300">
                            No users found.
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            Try adjusting your filter or search query.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
