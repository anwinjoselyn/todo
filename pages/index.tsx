import { todoTypes } from '../utils/defaultValues';

export default function Home({tasks}: any) {

  const summary = (type: any) => {
    let summaryObj: any = {
      total: 0,
      completed: 0,
    };
    const todosOfSameType: any = tasks.filter(
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
        {todoTypes.map((type: any) => {
          const summ: any = summary(type);
          return (
            <div
              key={type.id}
              className="w-1/4 h-40 border border-border-color m-2 rounded-lg hover:shadow-md"
            >
              <h2 className="text-center py-2 text-2xl bg-bg-other text-bg-light rounded-t-lg">{type.title}</h2>
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
      {tasks && renderTypes()}
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
