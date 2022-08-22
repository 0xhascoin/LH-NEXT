import React, { useEffect, useState } from 'react';
import Loading from '../components/loading';
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
        return <Loading />;
    }

    return children;
}

export default AuthStateChanged;