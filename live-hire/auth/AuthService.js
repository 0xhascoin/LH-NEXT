import { auth, provider } from '../firebaseConfig';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


export const AuthService = {
    loginWithGoogle: async () => {
        try {
            const { user } = await signInWithPopup(auth, provider);
            return { user: user }
        } catch (error) {
            return { error: `${error.code}: ${error.message}` }
        }
    },
    loginWithEmailAndPassword: async (email, password) => {
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password)
            return { user: user };
        } catch (error) {
            return { error: `${error.code}: ${error.message}` }
        }
    },
    signupWithEmailAndPassword: async (email, password) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            return { user: user };
        } catch (error) {
            return { error: `${error.code}: ${error.message}` }
        }
    },
    logout: async () => {
        await auth.signOut();
    }
}