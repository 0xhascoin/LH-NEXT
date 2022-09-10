import React from 'react';
import { withProtected } from '../hook/route';
import Header from '../components/header';

const Account = () => {
    return (
        <div className="account-page">
            <Header />
            <div className="account-container">
                
            </div>
        </div>
    )
};

export default withProtected(Account);