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
    const [loading, setLoading] = useState(true);

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
        return signOut(auth);
    };

    // Auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (currentUser) => {
                setUser(currentUser);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
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
