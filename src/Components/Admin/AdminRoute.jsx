import { Navigate, Outlet } from "react-router";
import useAuth from "../context/useAuth";

const AdminRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // এখানে নিজের admin email দাও
    if (user.email !== "admin@gmail.com") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
