import React from 'react';
import NavBarComponent from '@/components/Navbar';

const UserLayout = ({children}) => {
    return (
        <div>
            <NavBarComponent />
            {children}
        </div>
    );
}

export default UserLayout;
