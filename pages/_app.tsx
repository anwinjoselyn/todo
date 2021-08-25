/* eslint-disable react-hooks/rules-of-hooks */
import '../styles/style.css';

import { AppProps } from 'next/app';

import useRequireAuth from '../hooks/useRequireAuth';

import Container from '../components/Container';

import { AuthProvider } from '../hooks/useAuth';

function MyApp({ Component, pageProps }: AppProps): any {
  const auth = useRequireAuth();
  console.log('auth', auth);

    return (
      <AuthProvider>
        <Container>
          <Component {...pageProps} appAuth={auth} />
        </Container>
      </AuthProvider>
    );
}

export default MyApp;
