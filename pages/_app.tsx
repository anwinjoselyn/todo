/* eslint-disable react-hooks/rules-of-hooks */
import '../styles/style.css';

import { AppProps } from 'next/app';

import useRequireAuth from '../hooks/useRequireAuth';

import Container from '../components/Container';

import { AuthProvider } from '../hooks/useAuth';

export default function MyApp({ Component, pageProps }: AppProps): any {

  return (
    <AuthProvider>
      <Container>
        <Component
          {...pageProps}
        />
      </Container>
    </AuthProvider>
  );
}
