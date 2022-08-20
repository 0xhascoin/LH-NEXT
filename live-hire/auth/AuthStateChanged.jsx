import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import useAuth from '../hook/auth';

const AuthStateChanged = ({ children}) => {
    const [loading, setLoading] = useState(true);
    const { setUser } = useAuth();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });
    }, []);

    if(loading) {
        return <h2>Loading...</h2>;
    }

    return children;
}

export default AuthStateChanged;