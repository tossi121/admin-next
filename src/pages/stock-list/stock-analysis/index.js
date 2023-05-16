import React from 'react';
import dynamic from 'next/dynamic';
const StockAnalysis = dynamic(import('components/StockList/StockAnalysis/StockAnalysis'));

function DefaultPage() {
  return (
    <>
      <StockAnalysis />
    </>
  );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
