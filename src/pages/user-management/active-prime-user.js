import React from 'react';
import dynamic from 'next/dynamic';
const ActiveUsers = dynamic(import('components/UserManagement/ActivePrimeUsers/ActiveUsers'));

function DefaultPage() {
  return (
    <>
      <ActiveUsers />
    </>
  );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
