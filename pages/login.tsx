import Link from 'next/link';
import toast from 'react-hot-toast';

import useRequireAuth from '../hooks/useRequireAuth';

import LoginForm from '../components/forms/LoginForm';
import router from 'next/router';

const LoginPage = () => {
  const auth = useRequireAuth();

  if (auth.user) {
    if (auth.user.name) {
      toast.success(`You are already logged in as ${auth.user.name}`);
      toast.success('Redirecting to Homepage...');
      setTimeout(() => {
        router.push('/');
      }, 5000);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-200">
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mt-24">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in
          </h2>
          <p className="mt-2 text-center text-md text-gray-600">
            {"Don't have an account? "}
            <Link href="/signup">
              <a href="#" className="text-blue">
                Sign Up
              </a>
            </Link>
          </p>
        </div>
        <div className="mt-2 bg-white px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
