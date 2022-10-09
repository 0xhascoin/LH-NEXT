import React from 'react';
import { useRouter } from 'next/router'
import useAuth from '../../hook/auth';
import { withProtected } from '../../hook/route';

const Lobby = () => {
    const router = useRouter()
    const { id } = router.query
    const { user } = useAuth();
    return (
        <div className="lobby-container">
            Lobby
            {id}
        </div>
    )
}

export default withProtected(Lobby);