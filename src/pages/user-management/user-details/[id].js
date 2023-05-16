import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
const UserDetails = dynamic(import('../../../components/UserManagement/AllUser/userDetails/UserDetails'));

function DefaultPage() {
    const router = useRouter()
    const id = router.query.id
    return (
        <>
            <UserDetails userId={id} />
        </>
    );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
