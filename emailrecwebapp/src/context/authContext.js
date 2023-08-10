"use client";
import React, { useContext, useState, useRef, useEffect } from 'react'
import { auth } from '../utils/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'


const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser ] = useState(null);
    const [loading, setLoading] = useState(false);
    const userInfo = useRef();

    function signUp(email, password){
        createUserWithEmailAndPassword(auth, email, password)
        return
    }

    function logIn(email, password) {
        signInWithEmailAndPassword(auth, email, password)
        return
    }

    function logOut() {
        signOut(auth)
        return
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    })

    const value = {
        currentUser,
        logIn,
        signUp,
        logOut,
        userInfo
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
