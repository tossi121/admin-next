import React from 'react';
import dynamic from 'next/dynamic';
const CompareBroker = dynamic(import('components/Broker/CompareBroker/CompareBroker'));

function DefaultPage() {
  return (
    <>
      {/* <CompareBroker /> */}
    </>
  );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
