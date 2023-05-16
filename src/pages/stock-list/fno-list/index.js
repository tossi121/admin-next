import React from 'react';
import dynamic from 'next/dynamic';
const FnoStock = dynamic(import('components/StockList/Fno-stock/FnoStock'));

function DefaultPage() {
  return (
    <>
      <FnoStock />
    </>
  );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
