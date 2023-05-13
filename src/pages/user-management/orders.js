import React from 'react';
import dynamic from 'next/dynamic';

const UserOrders = dynamic(import('components/UserManagement/Order/UserOrders'));

function DefaultPage() {
  return (
    <>
      <UserOrders />
    </>
  );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
