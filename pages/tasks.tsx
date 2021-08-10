const Tasks = ({ tasks, people }: any) => {
  return (
    <table className="table-fixed border-collapse border border-green-800">
      <thead>
        <tr>
          <th className="w-1/6 border border-green-600">Title</th>
          <th className="w-1/6 border border-green-600">Type</th>
          <th className="w-1/6 border border-green-600">Owner</th>
          <th className="w-1/6 border border-green-600">Content</th>
          <th className="w-1/6 border border-green-600">Due Date</th>
          <th className="w-1/6 border border-green-600">Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {tasks &&
          tasks.map((task: any) => (
            <tr key={task.id}>
              <td className="border border-green-600">{task.title}</td>
              <td className="border border-green-600">{task.type}</td>
              <td className="border border-green-600">{task.assignedTo}</td>
              <td className="border border-green-600">{task.body}</td>
              <td className="border border-green-600">{task.dueDate}</td>
              <td className="border border-green-600">{task.lastUpdatedAt}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Tasks;
