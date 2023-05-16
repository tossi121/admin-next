import { useAuth } from '_context/authContext';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { getUserData, isContextLoaded, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/user-management');
    } else {
      router.push('/login');
    }
  }, [isContextLoaded, isLoggedIn]);

  return (
    <>

    </>
  );
}
