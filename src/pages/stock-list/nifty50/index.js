import React from 'react';
import dynamic from 'next/dynamic';
const NiftyStocks = dynamic(import('components/StockList/Nifty50/NiftyStocks'));

function DefaultPage() {
  return (
    <>
      <NiftyStocks />
    </>
  );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
