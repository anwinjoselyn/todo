/* eslint-disable react-hooks/rules-of-hooks */
import '../styles/style.css';

import { AppProps } from 'next/app';
import useSWR from 'swr';
import { Toaster } from 'react-hot-toast';

import fetcher from '../libs/fetcher';
import useRequireAuth from '../hooks/useRequireAuth';

import Container from '../components/Container';
import LoginForm from '../components/forms/LoginForm';

import { AuthProvider } from '../hooks/useAuth';
import { useEffect } from 'react';
import router from 'next/router';

export default function MyApp({ Component, pageProps }: AppProps): any {
  const auth = useRequireAuth();

  console.log('auth', auth);

  useEffect(() => {
    if (!auth.user) {
      router.push('/login');
    }
  }, [auth]);

  const { data, mutate: mutateTodos } = useSWR(`/api/todos`, fetcher);
  const { data: users, mutate: mutateUsers } = useSWR(`/api/users`, fetcher);

  const mutateData = (type: string) => {
    if (type === 'todos') {
      mutateTodos(`/api/todos`, true);
    }
    if (type === 'users') {
      mutateUsers(`/api/users`, true);
    }
  };

  if (!data || data.error) {
    return <Container>Loading...</Container>;
  }
  console.log('auth', auth);
  return (
    <AuthProvider>
      <Container>
        <Component
          {...pageProps}
          tasks={data && data.todos ? data.todos : []}
          people={users && users.users ? users.users : []}
          mutateData={mutateData}
        />
        <Toaster />
      </Container>
    </AuthProvider>
  );
}
