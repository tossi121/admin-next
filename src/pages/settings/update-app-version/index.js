import React from 'react';
import dynamic from 'next/dynamic';

const AppVersion = dynamic(import('components/Setting/UpdateAppVersion/AppVersion'));

function DefaultPage() {
  return (
    <>
      <AppVersion />
    </>
  );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
