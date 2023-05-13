import '../../styles/globals.css';
import '../../styles/scss/_app.scss';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from 'components/Layouts';
import Head from 'next/head';
import { AuthProvider } from '_contexts/auth';
import 'react-toastify/dist/ReactToastify.css';

const layouts = {
  DashboardLayout: DashboardLayout,
  NoLayout: '',
};

function MyApp({ Component, pageProps }) {
  const Layout = layouts[Component.layout] || ((pageProps) => <Component>{pageProps}</Component>);
  return (
    <>
      {/* <Head>
        <title>Yuva Kabaddi</title>
      </Head>
      <ToastContainer />
      <AuthProvider> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* </AuthProvider> */}
    </>
  );
}

export default MyApp;
