import { useRouter } from 'next/router';
import React from 'react';
import Loading from '../components/loading';
import useAuth from './auth'

export const withPublic = (Component) => {
    return function withPublic(props) {
        const auth = useAuth();
        const router = useRouter();

        if(auth.user) {
            router.replace("/");
            return <Loading />;
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
            return <Loading />;
        }

        return <Component auth={auth} {...props} />;
    }
}