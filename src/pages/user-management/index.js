import React from 'react';
import dynamic from 'next/dynamic';

const AllUserData = dynamic(import('components/UserManagement/AllUser/AllUserData'));

function DefaultPage() {
  return (
    <>
      <AllUserData />
    </>
  );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
