import React from 'react';
import dynamic from 'next/dynamic';
const UserReview = dynamic(import('components/UserManagement/Review/UserReview'));

function DefaultPage() {
  return (
    <>
      <UserReview />
    </>
  );
}
DefaultPage.layout = 'DashboardLayout';
export default DefaultPage;
