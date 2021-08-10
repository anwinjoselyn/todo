import '../styles/style.css';

import Head from 'next/head';
import { AppProps } from 'next/app';

import Container from '../components/Container';

import { AuthProvider } from '../hooks/useAuth';

export default function MyApp({ Component, pageProps }: AppProps): any {
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
        <Component {...pageProps} />
      </Container>
    </AuthProvider>
  );
}
