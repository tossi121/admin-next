import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/_context/authContext';
import Loader from '@/components/Loader';

// Hoc for Private Routes

const withAuth = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    //checking if user is authenticated
    const { isLoggedIn, isContextLoaded } = useAuth();
    // Loading State
    const [loading, setLoading] = useState(true);

    // If user is not logged in, redirecting to Home Page
    useEffect(() => {
      setLoading(true);
      if (isContextLoaded && !isLoggedIn) {
        return router.push('/login');
      }
      const timer = setTimeout(() => {
        setLoading(false);
      }, 100);
      return () => clearTimeout(timer);
    }, [isContextLoaded, isLoggedIn]);

    // If user is logged in, return original component
    return (loading && <Loader />) || <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
