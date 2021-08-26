import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useAuth } from '../../hooks/useAuth';

import { CustomButton } from '../';

interface LoginData {
  email: string;
  password: string;
}
const LoginForm: React.FC = () => {
  const [error, setErrors] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const auth = useAuth();
  if (auth.user) {
    if (auth.user.name) {
      toast.success(`You are already logged in as ${auth.user.name}`);
      toast.success('Redirecting to Homepage...');
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }

  const onSubmit = (data: LoginData) => {
    return auth.signIn(data).then((response: any) => {
      response.error ? setErrors(response.error) : router.push('/');
    });
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 rounded-md">
                <input
                  id="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 shadow-sm"
                  type="email"
                  name="email"
                  {...register('email')}
                />
                {errors.email && (
                  <div className="mt-2 text-xs text-red-600">
                    {errors.email.message}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 rounded-md">
                <input
                  id="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 shadow-sm"
                  type="password"
                  name="password"
                  {...register('password')}
                />
                {errors.password && (
                  <div className="mt-2 text-xs text-red-600">
                    {errors.password.message}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 flex items-end">
              <div className="text-sm leading-5">
                <Link href="/reset-password">
                  <a
                    href="#"
                    className="font-medium text-blue focus:outline-none focus:underline transition ease-in-out duration-150"
                  >
                    Forgot your password?
                  </a>
                </Link>
              </div>
            </div>
            <div className="mt-4">
              <span className="block w-full rounded-md shadow-sm">
                <CustomButton
                  size="large"
                  style="info"
                  label="Submit"
                  type="submit"
                />
              </span>
              {error?.message && (
                <div className="mb-4 text-red-500 text-center border-dashed border border-red-600 p-2 rounded">
                  <span>{error.message}</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
