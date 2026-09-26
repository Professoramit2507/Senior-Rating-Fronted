import { useEffect, useState } from "react";


const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <p className="text-sm font-semibold text-indigo-600">
                    User Management
                </p>

                <h1 className="mt-1 text-3xl font-extrabold text-slate-900">
                    Manage Users
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    View all registered CampusRate users.
                </p>
            </div>

            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                                    #
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                                    User
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                                    Department
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                                    Batch
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                                    Role
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {users.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className="transition hover:bg-slate-50"
                                >
                                    <td className="px-6 py-5 text-sm text-slate-400">
                                        {index + 1}
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 font-bold text-white">
                                                {user.name
                                                    ?.charAt(0)
                                                    .toUpperCase()}
                                            </div>

                                            <div>
                                                <p className="font-bold text-slate-800">
                                                    {user.name}
                                                </p>

                                                <p className="text-xs text-slate-400">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-5 text-sm font-medium text-slate-600">
                                        {user.department}
                                    </td>

                                    <td className="px-6 py-5 text-sm text-slate-600">
                                        {user.batch}
                                    </td>

                                    <td className="px-6 py-5">
                                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                                            {user.role || "user"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && (
                    <div className="py-16 text-center">
                        <p className="text-slate-400">
                            No users found.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
