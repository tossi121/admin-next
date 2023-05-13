import React from 'react';
import dynamic from 'next/dynamic';
import UserDetails from '../../../components/UserManagement/AllUser/userDetails/UserDetails';
import { useRouter } from 'next/router';
const ActiveUsers = dynamic(import('components/UserManagement/ActivePrimeUsers/ActiveUsers'));

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
