import useSWR from 'swr';

import fetcher from '../libs/fetcher';
import useRequireAuth from '../hooks/useRequireAuth';

import Container from '../components/Container';
import ToDo from '../components/ToDo';
import LoginForm from '../components/forms/LoginForm';

export default function Home() {
  const auth = useRequireAuth();

  const { data } = useSWR(
    auth && auth.user ? `/api/todos/${auth.user.uId}` : null,
    fetcher
  );
console.log('data', data)
  if (!auth.user) {
    return (
      <Container>
        <LoginForm />
      </Container>
    );
  }

  if (!data || data.error) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      {data && !data.error ? data.map((todo: any) => (
        <ToDo key={todo.id} {...todo} />
      )) : "No To Dos available"}
    </Container>
  );
}
