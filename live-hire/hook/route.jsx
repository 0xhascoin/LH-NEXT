import { useRouter } from 'next/router';
import React from 'react';
import useAuth from './auth'

export const withPublic = (Component) => {
    return function withPublic(props) {
        const auth = useAuth();
        const router = useRouter();

        if(auth.user) {
            router.replace("/");
            return <h2>Loading...</h2>;
        }

        return <Component auth={auth} {...props} />;
    }
}

export const withProtected = (Component) => {
    return function withProtected(props) {
        const auth = useAuth();
        const router = useRouter();

        if(!auth.user) {
            router.replace("/login");
            return <h2>Loading...</h2>;
        }

        return <Component auth={auth} {...props} />;
    }
}