import React from 'react';
import dynamic from 'next/dynamic';

const NiftyAlert = dynamic(import('components/Setting/Alert/NiftyAlert'));

function DefaultPage() {
  return (
    <>
      <NiftyAlert />
    </>
  );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
