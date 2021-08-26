import useSWR from 'swr';

import fetcher from '../libs/fetcher';
import { todoTypes } from '../utils/defaultValues';

export default function Home() {
  const { data: tasks } = useSWR(`/api/todos`, fetcher);

  const summary = (type: any) => {
    let summaryObj: any = {
      total: 0,
      completed: 0,
    };
    const todosOfSameType: any = tasks.todos.filter(
      (todo: any) => todo.type.toLowerCase() === type.title.toLowerCase()
    );

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
        {todoTypes
          .sort((a: any, b: any) => a.type - b.type)
          .map((type: any) => {
            const summ: any = summary(type);
            return (
              <div
                key={type.id}
                className="w-1/6 h-40 border border-border-color m-2 rounded-lg hover:shadow-custom2"
              >
                <h2 className="text-center text-2xl bg-bg-other text-bg-light rounded-t-lg">
                  {type.title}
                </h2>
                <div className="py-2">{type.description}</div>
                <div className="text-center py-3 flex place-content-center px-3">
                  <span className="text-3xl">
                    {summ.total - summ.completed}
                  </span>{' '}
                  /<span>{summ.total}</span>
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
      {tasks && tasks.todos && renderTypes()}
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
