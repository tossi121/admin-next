import React from 'react';
import dynamic from 'next/dynamic';
const UserQueries = dynamic(import('components/UserManagement/UserQueries/UserQueries'));

function DefaultPage() {
    return (
        <>
            <UserQueries />
        </>
    );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
