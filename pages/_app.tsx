/* eslint-disable react-hooks/rules-of-hooks */
import '../styles/style.css';

import { AppProps } from 'next/app';

import Container from '../components/Container';

import { AuthProvider } from '../hooks/useAuth';

function MyApp({ Component, pageProps }: AppProps): any {
    return (
      <AuthProvider>
        <Container>
          <Component {...pageProps} />
        </Container>
      </AuthProvider>
    );
}

export default MyApp;
