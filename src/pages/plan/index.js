import React from 'react';
import dynamic from 'next/dynamic';
const ManagePlans = dynamic(import('components/Plan/ManagePlan'));

function DefaultPage() {
  return (
    <>
      <ManagePlans />
    </>
  );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
