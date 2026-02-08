import React from 'react';
import DashboardLayout from '@/layout/DashboardLayout';
import UserLayout from '@/layout/UserLayout';



const MyConnectionsPage = () => {
    return (
        <UserLayout>
            <DashboardLayout>
                <h1>My Connections</h1>
            </DashboardLayout>
        </UserLayout>
    );
}

export default MyConnectionsPage;
