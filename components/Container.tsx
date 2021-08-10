import Header from './Header';
import Sidebar from './Sidebar';

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-bg-light">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6 ...">
        <Header />
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}
