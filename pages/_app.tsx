import '../styles/style.css';

import { AppProps } from 'next/app';
import useSWR from 'swr';
import { Toaster } from 'react-hot-toast';

import fetcher from '../libs/fetcher';
import useRequireAuth from '../hooks/useRequireAuth';

import Container from '../components/Container';
import LoginForm from '../components/forms/LoginForm';

import { AuthProvider } from '../hooks/useAuth';

export default function MyApp({ Component, pageProps }: AppProps): any {
  const auth = useRequireAuth();

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

  if (!auth.user) {
    return (
      <Container>
        <LoginForm />
      </Container>
    );
  }

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
