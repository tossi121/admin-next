import React from 'react';
import dynamic from 'next/dynamic';

const GeneralPromoCode = dynamic(import('components/Setting/GeneralPromoCode/GeneralPromoCode'));

function DefaultPage() {
  return (
    <>
      <GeneralPromoCode />
    </>
  );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
