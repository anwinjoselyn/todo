import '../styles/style.css';

import Head from 'next/head';
import { AppProps } from 'next/app';
import useSWR from 'swr';

import fetcher from '../libs/fetcher';
import useRequireAuth from '../hooks/useRequireAuth';

import Container from '../components/Container';
import LoginForm from '../components/forms/LoginForm';

import { AuthProvider } from '../hooks/useAuth';

export default function MyApp({ Component, pageProps }: AppProps): any {
  const auth = useRequireAuth();

  const { data } = useSWR(`/api/todos`, fetcher);
  const { data: users } = useSWR(`/api/users`, fetcher);

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

  return (
    <AuthProvider>
      <Container>
        <Head>
          <title>To Do App with Next.js, Firebase {`&`} Tailwind CSS</title>
          <meta
            property="og:title"
            content={`To Do App with Next.js, Firebase & Tailwind CSS`}
            key="title"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          ></link>
        </Head>
        <Component
          {...pageProps}
          tasks={data && data.todos ? data.todos : []}
          people={users && users.users ? users.users : []}
        />
      </Container>
    </AuthProvider>
  );
}
