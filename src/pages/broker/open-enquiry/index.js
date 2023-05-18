import React from 'react';
import dynamic from 'next/dynamic';
const OpenEnquiry = dynamic(import('components/Broker/LatestOpenenquiry/OpenEnquiry'));

function DefaultPage() {
  return (
    <>
      {/* <OpenEnquiry /> */}
    </>
  );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
