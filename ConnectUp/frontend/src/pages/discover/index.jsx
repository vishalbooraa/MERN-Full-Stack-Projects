import React from 'react';
import UserLayout from '@/layout/UserLayout';
import DashboardLayout from '@/layout/DashboardLayout';


const DiscoverPage = () => {
    return (
         <UserLayout>
            <DashboardLayout>
                <h1>Discover Page</h1>
            </DashboardLayout>
        </UserLayout>
    );
}

export default DiscoverPage;
