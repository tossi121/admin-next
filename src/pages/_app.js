import '../../styles/scss/_app.scss';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from 'components/Layouts';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '_context/authContext';

const layouts = {
  DashboardLayout: DashboardLayout,
  NoLayout: '',
};

function MyApp({ Component, pageProps }) {
  const Layout = layouts[Component.layout] || ((pageProps) => <Component>{pageProps}</Component>);
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
}

export default MyApp;
