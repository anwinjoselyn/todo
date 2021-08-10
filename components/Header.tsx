import Link from 'next/link';
import useRequireAuth from '../hooks/useRequireAuth';

export default function Header() {
  const auth = useRequireAuth();

  return (
    <div className="py-3 bg-primary-text-color flex flex-row justify-between content-center items-center h-14 sticky top-0">
      <Link href="/" passHref>
        <h1 className="text-bg-other hover:text-muted-text-color ml-7 mb-1 text-sm">
          Manage Tasks, Notes, Ideas, Schedules, and general scribbles
        </h1>
      </Link>
      <div className="flex items-center">
        {/* <Link href="/dashboard" passHref>
          <span className="text-bg-light hover:text-secondary-text-color mr-7 self-center cursor-pointer">
            Dashboard
          </span>
        </Link> */}
        {auth.user ? (
          <>
          <span className="mr-3 text-bg-other">{auth.user.name}{`'`}s Workspace</span>
          <Link href="/profile" passHref>
            <span className="material-icons text-bg-light hover:text-secondary-text-color mr-7 self-center cursor-pointer">
              account_circle
            </span>
          </Link>
          </>
        ) : null}
      </div>
    </div>
  );
}
