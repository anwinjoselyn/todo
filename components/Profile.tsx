import useRequireAuth from '../hooks/useRequireAuth';

export default function Profile() {
  const auth = useRequireAuth();

  return (
    <div className="md:flex bg-white rounded-lg p-24 justify-center">
      <div className="text-center md:text-left">
        <h2 className="text-lg">{auth && auth.user && auth.user.name}</h2>
        <div className="text-purple-500">Frontend developer</div>
        <div className="text-gray-600">
          Email: {auth && auth.user && auth.user.email}
        </div>
        <div className="text-gray-600">www.nowebsiteatall.com</div>
      </div>
    </div>
  );
}
