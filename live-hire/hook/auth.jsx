import { createContext, useState, useContext, useEffect } from 'react';
import { AuthService } from '../auth/AuthService';
import { db } from '../firebaseConfig';
import { arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

const authContext = createContext();

export default function useAuth() {
    return useContext(authContext);
}

export function AuthProvider(props) {
    const [user, setUser] = useState(null);
    const [usersJobs, setUsersJobs] = useState([]);
    const [error, setError] = useState("");
    const router = useRouter();

    const loginWithGoogle = async () => {
        const { user, error } = await AuthService.loginWithGoogle();
        console.log("User: ", user)
        console.log("Error: ", error)
        if (error === "" || error === undefined) {
            const data = {
                userId: user.uid,
                userName: user.displayName,
                email: user.email
            }

            await addNewUserToDB(user, data);

            setUser(user ?? null);
            setError(error ?? "");
            // await getUsersJobs(user)
        }
    }

    const loginWithEmailAndPassword = async (email, password) => {
        const { user, error } = await AuthService.loginWithEmailAndPassword(email, password);
        console.log("USER: ", user);
        console.log("Error: ", error);
        if (error === "" || error === undefined) {
            const data = {
                userId: user.uid,
                userName: user.email,
                email: user.email
            }
            await addNewUserToDB(user, data);
            setUser(user ?? null);
            setError(error ?? "");
            // await getUsersJobs(user)
        }
    }

    const signupWithEmailAndPassword = async (username, email, password) => {
        const { user, error } = await AuthService.signupWithEmailAndPassword(email, password);
        if (error === "" || error === undefined) {
            const data = {
                userId: user.uid,
                userName: username,
                email: user.email
            }
            await addNewUserToDB(user, data);
            setUser(user ?? null);
            setError(error ?? "");
            // await getUsersJobs(user)
        }
    }

    const logout = async () => {
        await AuthService.logout();
        setUser(null);
        setUsersJobs([])
        router.push("/")
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




    const value = { user, usersJobs, error, loginWithGoogle, logout, setUser, loginWithEmailAndPassword, signupWithEmailAndPassword };

    return <authContext.Provider value={value} {...props} />

};

