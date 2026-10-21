import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth";

import { auth } from "../Firebase/firebase.config";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [dbUser, setDbUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDbUser = async (email) => {
        if (!email) {
            setDbUser(null);
            return null;
        }
        try {
            const res = await fetch(
                `http://localhost:3000/user?email=${encodeURIComponent(email)}`
            );
            if (res.ok) {
                const data = await res.json();
                setDbUser(data);
                return data;
            }
        } catch (error) {
            console.error("fetchDbUser error:", error);
        }
        return null;
    };

    // Register
    const createUser = async (email, password, name) => {
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        if (name) {
            await updateProfile(result.user, {
                displayName: name,
            });
        }

        return result;
    };

    // Login
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(
            auth,
            email,
            password
        );
    };

    // Logout
    const logoutUser = () => {
        setDbUser(null);
        return signOut(auth);
    };

    // Auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            async (currentUser) => {
                setUser(currentUser);
                if (currentUser?.email) {
                    await fetchDbUser(currentUser.email);
                } else {
                    setDbUser(null);
                }
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const isApproved =
        dbUser?.role === "admin" || dbUser?.status === "approved";

    const authInfo = {
        user,
        dbUser,
        isApproved,
        role: dbUser?.role || "user",
        status: dbUser?.status || "pending",
        fetchDbUser,
        loading,
        createUser,
        loginUser,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
