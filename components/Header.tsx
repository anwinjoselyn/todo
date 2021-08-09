import Link from 'next/link';
import useRequireAuth from '../hooks/useRequireAuth';

export default function Header() {
  const auth = useRequireAuth();

  return (
    <div className="py-5 bg-soft-red flex flex-row justify-between content-center">
      <Link href="/" passHref>
        <h1 className="hover:text-gray-200 ml-7 font-bold mb-1 cursor-pointer">
          To Dos
        </h1>
      </Link>
      {auth.user ? (
        <Link href="/profile" passHref>
          <span className="material-icons hover:text-gray-200 text-3xl lg:text-4xl mr-7 self-center cursor-pointer">
            account_circle
          </span>
        </Link>
      ) : null}
    </div>
  );
}
