import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

import { useAuth } from '../../hooks/useAuth';

import Button from '../elements/Button';

interface LoginData {
  email: string;
  password: string;
}
const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrors] = useState(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const auth = useAuth();
  const router = useRouter();

  const onSubmit = (data: LoginData) => {
    setIsLoading(true);
    setErrors(null);
    return auth.signIn(data).then((response) => {
      setIsLoading(false);
      response.error ? setErrors(response.error) : router.push('/dashboard');
    });
  };

  return (
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
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              Forgot your password?
            </a>
          </Link>
        </div>
      </div>
      <div className="mt-4">
        <span className="block w-full rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => {
              [
                {
                  type: 'manual',
                  name: 'email',
                  message: 'Triple Check This',
                },
                {
                  type: 'manual',
                  name: 'password',
                  message: 'Triple Check This',
                },
              ].forEach(({ name, type, message }) =>
                setError(name, { type, message })
              );
            }}
          >
            Trigger Name Errors
          </button>
          <Button
            title="Login"
            type="submit"
            isLoading={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
          />
          {/* <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Log in
          </button> */}
        </span>
        {error?.message && (
          <div className="mb-4 text-red-500 text-center border-dashed border border-red-600 p-2 rounded">
            <span>{error.message}</span>
          </div>
        )}
      </div>
    </form>
  );
};
export default LoginForm;
