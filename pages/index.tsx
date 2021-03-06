import useRequireAuth from '../hooks/useRequireAuth';

import { CustomButton } from '../components';

const DashBoardPage: React.FC = () => {
  const auth = useRequireAuth();

  if (!auth.user) return null;
  return (
    <div className="min-h-screen flex bg-gray-200">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mt-6 flex flex-col">
          <h2 className="text-3xl font-extrabold text-gray-900 w-full">
            {`Welcome ${auth.user.name}!`}
          </h2>
          <p className="my-3 text-center text-md text-gray-600">
            {`You are logged in with ${auth.user.email}`}
          </p>
          <CustomButton onClick={() => auth.signOut()} size="large" label="Sign Out" style="info" />
          {/* <button
            onClick={() => auth.signOut()}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Sign out
          </button> */}
        </div>
      </div>
    </div>
  );
};
export default DashBoardPage;
