import useSWR from 'swr';

import fetcher from '../libs/fetcher';
import useRequireAuth from '../hooks/useRequireAuth';

import Container from '../components/Container';
import ToDo from '../components/ToDo';
import LoginForm from '../components/forms/LoginForm';

export default function Home() {
  const auth = useRequireAuth();

  if (!auth.user) {
    return (
      <Container>
        <LoginForm />
      </Container>
    );
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useSWR(
    auth.user ? `/api/todos/${auth.user.uId}` : null,
    fetcher
  );
  if (!data) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      {data.map((todo: any) => (
        <ToDo key={todo.id} {...todo} />
      ))}
    </Container>
  );
}
