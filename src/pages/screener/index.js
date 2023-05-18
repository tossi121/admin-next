import React from 'react';
import dynamic from 'next/dynamic';
const ScreenerGroup = dynamic(import('components/Screener/ScreenerGroup'));

function DefaultPage() {
  return (
    <>
      {/* <ScreenerGroup /> */}
    </>
  );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
