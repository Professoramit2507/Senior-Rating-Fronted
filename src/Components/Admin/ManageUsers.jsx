import { useEffect, useState } from "react";
import {
    Search,
    Trash2,
    User,
    Mail,
    Users,
} from "lucide-react";
import Swal from "sweetalert2";

const API_URL = "http://localhost:3000";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchUsers = async () => {
        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/users`);

            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }

            const data = await response.json();

            setUsers(data);
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Failed!",
                text: "Users load করা যায়নি।",
                confirmButtonColor: "#4f46e5",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Delete User?",
            text: "এই user permanently delete হয়ে যাবে!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {
            const response = await fetch(
                `${API_URL}/users/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Delete failed");
            }

            setUsers((prev) =>
                prev.filter((user) => user._id !== id)
            );

            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "User successfully deleted.",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Delete Failed!",
                text: "User delete করা যায়নি।",
                confirmButtonColor: "#4f46e5",
            });
        }
    };

    const filteredUsers = users.filter((user) => {
        const value = search.toLowerCase();

        return (
            user.name?.toLowerCase().includes(value) ||
            user.email?.toLowerCase().includes(value) ||
            user.department?.toLowerCase().includes(value) ||
            user.batch?.toLowerCase().includes(value)
        );
    });

    return (
        <div>

            {/* Header */}
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div>
                    <p className="text-sm font-semibold text-indigo-600">
                        Management
                    </p>

                    <h1 className="mt-1 text-3xl font-extrabold text-slate-900">
                        Manage Users
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        View and manage registered users.
                    </p>
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-3">
                    <Users
                        size={18}
                        className="text-indigo-600"
                    />

                    <span className="text-sm font-bold text-indigo-700">
                        {users.length} Users
                    </span>
                </div>

            </div>

            {/* Search */}
            <div className="mb-5 rounded-2xl bg-white p-4 shadow-sm">

                <div className="relative max-w-md">

                    <Search
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search users..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                    />

                </div>

            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

                {loading ? (
                    <div className="flex min-h-[300px] items-center justify-center">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="p-12 text-center">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                            <Users size={28} />
                        </div>

                        <h3 className="mt-4 font-bold text-slate-800">
                            No Users Found
                        </h3>

                        <p className="mt-1 text-sm text-slate-400">
                            No registered users match your search.
                        </p>

                    </div>
                ) : (
                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[800px]">

                            <thead className="bg-slate-50">
                                <tr>

                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                                        User
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                                        Department
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                                        Batch
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                                        Email
                                    </th>

                                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                                        Action
                                    </th>

                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">

                                {filteredUsers.map((item) => (

                                    <tr
                                        key={item._id}
                                        className="transition hover:bg-slate-50"
                                    >

                                        {/* User */}
                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                                                    <User size={19} />
                                                </div>

                                                <div>
                                                    <p className="font-bold text-slate-800">
                                                        {item.name || "Unknown User"}
                                                    </p>

                                                    <p className="text-xs text-slate-400">
                                                        User
                                                    </p>
                                                </div>

                                            </div>

                                        </td>

                                        {/* Department */}
                                        <td className="px-6 py-4">

                                            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                                                {item.department || "N/A"}
                                            </span>

                                        </td>

                                        {/* Batch */}
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {item.batch || "N/A"}
                                        </td>

                                        {/* Email */}
                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Mail
                                                    size={15}
                                                    className="text-slate-400"
                                                />

                                                {item.email}
                                            </div>

                                        </td>

                                        {/* Action */}
                                        <td className="px-6 py-4">

                                            <div className="flex justify-end">

                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            item._id
                                                        )
                                                    }
                                                    className="rounded-xl bg-red-50 p-2.5 text-red-600 transition hover:bg-red-100"
                                                    title="Delete user"
                                                >
                                                    <Trash2 size={17} />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>

        </div>
    );
};

export default ManageUsers;
