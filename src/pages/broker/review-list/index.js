import React from 'react';
import dynamic from 'next/dynamic';
const ReviewList = dynamic(import('components/Broker/Reviewlist/ReviewList'));

function DefaultPage() {
  return (
    <>
      <ReviewList />
    </>
  );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
