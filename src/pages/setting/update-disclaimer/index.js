import React from 'react';
import dynamic from 'next/dynamic';

const Disclaimer = dynamic(import('components/Setting/UpdateDisclaimer/Disclaimer'));

function DefaultPage() {
  return (
    <>
      <Disclaimer />
    </>
  );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
