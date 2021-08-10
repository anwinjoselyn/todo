import useSWR from 'swr';

import fetcher from '../libs/fetcher';
import useRequireAuth from '../hooks/useRequireAuth';

import Container from '../components/Container';
// import ToDo from '../components/ToDo';
import LoginForm from '../components/forms/LoginForm';

import { todoTypes } from '../utils/defaultValues';

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

  const summary = (type: any) => {
    console.log('type', type);
    let summaryObj: any = {
      total: 0,
      completed: 0,
    };
    const todosOfSameType: any = todos.filter(
      (todo: any) => todo.type === type.title
    );
    console.log('todosOfSameType', todosOfSameType)
    if (todosOfSameType.length > 0) {
      todosOfSameType.forEach((td: any) => {
        summaryObj.total += 1;
        summaryObj.completed = td.isCompleted
          ? summaryObj.completed + 1
          : summaryObj.completed;
      });
    }
    return summaryObj;
  };

  const renderTypes = () => {
    return (
      <div className="flex flex-wrap justify-center">
        {todoTypes.map((type: any) => {
          const summ: any = summary(type);
          return (
            <div
              key={type.id}
              className="w-1/4 h-40 p-2 border border-border-color m-2 rounded-md bg-bg-other text-bg-light"
            >
              <h2 className="text-center py-2 text-2xl">{type.title}</h2>
              <div className="py-2">{type.description}</div>
              <div className="text-center py-3 flex place-content-between px-3">
              <span>Open: {summ.total - summ.completed}</span>
              <span>Total: {summ.total}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-center my-7 text-3xl">Overview of Task Types</h1>
      {todos && !data.error && renderTypes()}
      {/* {todos &&
        !data.error &&
        todos.map((todo: any) => (
          <ToDo
            key={todo.id}
            {...todo}
            users={users && users.users ? users.users : []}
          />
        ))} */}
    </div>
  );
}
