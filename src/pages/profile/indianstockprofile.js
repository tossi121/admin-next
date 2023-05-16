import React from 'react';
import dynamic from 'next/dynamic';
const IndianStockProfile = dynamic(import('components/Profiles/IndianStockProfile'));

function DefaultPage() {
  return (
    <>
      <IndianStockProfile />
    </>
  );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
