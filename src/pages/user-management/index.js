import React from 'react';
import dynamic from 'next/dynamic';

const UserManagement = dynamic(import('components/UserManagement/UserManagement'));

function DefaultPage() {
  return (
    <>
      <UserManagement />
    </>
  );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
