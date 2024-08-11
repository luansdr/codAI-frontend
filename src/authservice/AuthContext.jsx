'use client'
import React, { useEffect, createContext, useState } from 'react';
import {
    onAuthStateChanged,
    getAuth,
    signOut,
} from 'firebase/auth';
import firebase_app from '../firebase/config';
import Loading from '../app/loading';

const auth = getAuth(firebase_app);

export const AuthContext = createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, handleLogout }}>
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    );
};
