import Link from 'next/link';
import useRequireAuth from '../hooks/useRequireAuth';

export default function Header() {
  const auth = useRequireAuth();

  return (
    <div className="py-3 bg-orange flex flex-row justify-between content-center items-center">
      <Link href="/" passHref>
        <h1 className="text-primary-text-color hover:text-secondary-text-color ml-7 font-bold mb-1">
          To Do App
        </h1>
      </Link>
      <div className="flex items-center">
        <Link href="/dashboard" passHref>
          <span className="hover:text-secondary-text-color mr-7 self-center cursor-pointer">
            Dashboard
          </span>
        </Link>
        {auth.user ? (
          <Link href="/profile" passHref>
            <span className="material-icons hover:text-secondary-text-color text-3xl lg:text-4xl mr-7 self-center cursor-pointer">
              account_circle
            </span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
