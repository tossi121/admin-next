import dynamic from 'next/dynamic';
import React from 'react';

// const Login = dynamic(import('components/Dashboard/Authentication/Login'));

function DefaultPage() {
  return (
    <>
      {/* <Login /> */}
    </>
  );
}
DefaultPage.layout = '';

export default DefaultPage;


// import React from 'react';
// import dynamic from 'next/dynamic';

// const Dashboard = dynamic(import('components/Dashboard/DashboardHome/Dashboard'));

// function DefaultPage() {
//   return (
//     <>
//       <Dashboard />
//     </>
//   );
// }
// DefaultPage.layout = 'DashboardLayout';
// export default DefaultPage;
