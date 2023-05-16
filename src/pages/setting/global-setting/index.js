import React from 'react';
import dynamic from 'next/dynamic';

const GlobalSetting = dynamic(import('components/Setting/GlobalSetting/GlobalSetting'));

function DefaultPage() {
  return (
    <>
      <GlobalSetting />
    </>
  );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
