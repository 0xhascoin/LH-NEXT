import { useRouter } from 'next/router';
import React from 'react';
import { withProtected } from '../../../hook/route';

const Room = () => {
    const router = useRouter()
    const { hostId, userId} = router.query;
    
    return (
        <div>
            {hostId}
            {userId}
        </div>
    )
};

export default withProtected(Room);