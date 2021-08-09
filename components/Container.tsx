import Header from './Header';
import Sidebar from './Sidebar';

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="w-1/6  h-screen">
        <Sidebar />
      </div>
      <div className="w-5/6 ...">
        <Header />
        {children}
      </div>
    </div>
  );
}
