import { createContext, useState, useContext } from 'react';
import { AuthService } from '../auth/AuthService';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';

const authContext = createContext();

export default function useAuth() {
    return useContext(authContext);
}

export function AuthProvider(props) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    const loginWithGoogle = async () => {
        const { user, error } = await AuthService.loginWithGoogle();
        const data = {
            userId: user.uid,
            userName: user.displayName,
            email: user.email
        }

        await addNewUserToDB(user, data);

        setUser(user ?? null);
        setError(error ?? "");
    };

    const loginWithEmailAndPassword = async (email, password) => {
        // console.log("USER: ", user);
        const { user, error } = await AuthService.loginWithEmailAndPassword(email, password);
        const data = {
            userId: user.uid,
            userName: user.email,
            email: user.email
        }
        await addNewUserToDB(user, data);
        setUser(user ?? null);
        setError(error ?? "");
    }

    const signupWithEmailAndPassword = async (username, email, password) => {
        const { user, error } = await AuthService.signupWithEmailAndPassword(email, password);
        const data = {
            userId: user.uid,
            userName: username,
            email: user.email
        }
        await addNewUserToDB(user, data);
        setUser(user ?? null);
        setError(error ?? "");
    }

    const logout = async () => {
        await AuthService.logout();
        setUser(null);
    }

    const addNewUserToDB = async (user, data) => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            console.log("No such document!");
            await setDoc(doc(db, "users", user.uid), data);
        }
    }

    const value = { user, error, loginWithGoogle, logout, setUser, loginWithEmailAndPassword, signupWithEmailAndPassword };

    return <authContext.Provider value={value} {...props} />

};

