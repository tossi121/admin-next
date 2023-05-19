import React from 'react';
import dynamic from 'next/dynamic';
import Terms from 'components/Terms/Terms';

function DefaultPage() {
  return (
    <>
      <Terms/>
    </>
  );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
