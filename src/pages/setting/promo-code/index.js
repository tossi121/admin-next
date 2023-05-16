import React from 'react';
import dynamic from 'next/dynamic';

const PromoCode = dynamic(import('components/Setting/PromoCode/PromoCode'));

function DefaultPage() {
  return (
    <>
      <PromoCode />
    </>
  );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
