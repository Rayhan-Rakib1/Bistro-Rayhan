import React from 'react';
import UseAuth from '../../hooks/UseAuth';

const UserHome = () => {
    const {user} = UseAuth();
    return (
        <div>
            <h1 className='text-2xl'>
                <span>Hi, Welcome</span>
                {
                    user?.displayName ? user.displayName : 'back'
                }
            </h1>
        </div>
    );
};

export default UserHome;