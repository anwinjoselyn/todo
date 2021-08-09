import useSWR from 'swr';

import fetcher from '../libs/fetcher';
import useRequireAuth from '../hooks/useRequireAuth';

import Container from '../components/Container';
import ToDo from '../components/ToDo';
import LoginForm from '../components/forms/LoginForm';

export default function Home() {
  const auth = useRequireAuth();
  // console.log('auth', auth)
  const { data } = useSWR(`/api/todos`, fetcher);
  const { data: users } = useSWR(`/api/users`, fetcher);

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

  const { todos } = data;

  return (
    <Container>
      {todos && !data.error
        ? todos.map((todo: any) => (
            <ToDo
              key={todo.id}
              {...todo}
              users={
                users && users.users ? users.users : []
              }
            />
          ))
        : 'No To Dos available'}
    </Container>
  );
}
