import React from 'react';
import dynamic from 'next/dynamic';

const Terms = dynamic(import('components/Terms/Terms'));

function DefaultPage() {
  return (
    <>
      <Terms />
    </>
  );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
