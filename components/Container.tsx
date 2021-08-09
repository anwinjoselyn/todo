import Header from './Header';

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <Header />
      {children}
    </div>
  );
}
