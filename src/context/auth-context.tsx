import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
    onAuthStateChanged,
    User,
    signOut as firebaseSignOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

type UserRole = "farmer" | "customer" | null;

interface AuthContextType {
    user: User | null;
    userRole: UserRole;
    loading: boolean;
    signOut: () => Promise<void>;
    setUserRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userRole: null,
    loading: true,
    signOut: async () => { },
    setUserRole: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userRole, setUserRoleState] = useState<UserRole>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            try {
                setUser(currentUser);
                if (currentUser) {
                    // Fetch user role from Firestore
                    const userDocRef = doc(db, "users", currentUser.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setUserRoleState(userDoc.data().role as UserRole);
                    } else {
                        // If no role logic is handled here, it might be handled during signup
                        setUserRoleState(null);
                    }
                } else {
                    setUserRoleState(null);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                // Handle offline or other errors gracefully
                // We might want to keep the user as null or handle it differently depending on requirements
                // For now, ensuring we don't crash is key.
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const signOut = async () => {
        await firebaseSignOut(auth);
        setUserRoleState(null);
    };

    const setUserRole = (role: UserRole) => {
        setUserRoleState(role);
    }

    return (
        <AuthContext.Provider value={{ user, userRole, loading, signOut, setUserRole }}>
            {children}
        </AuthContext.Provider>
    );
};
