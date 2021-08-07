export type ToDoProps = {
  title: string;
  body: number;
  author: number;
  assignedTo: string;
  createdAt: string;
  lastUpdatedAt: number;
  isCompleted: string;
  dueDate: string;
  completedDate: string;
};

export default function ToDo({
  title,
  body,
  author,
  assignedTo,
  createdAt,
  lastUpdatedAt,
  isCompleted,
  dueDate,
  completedDate,
}: ToDoProps) {
  return (
    <div className="md:flex bg-white rounded-lg p-24 justify-center">
      <div className="text-center md:text-left">
        <h2 className="text-lg">Title: {title}</h2>
        <div className="text-purple-500">Author: {author}</div>
        <div className="text-gray-600">
          Assign To: {assignedTo}
        </div>
        <div className="text-gray-600">Body: {body}</div>
        <div className="text-gray-600">Created At: {createdAt}</div>
        <div className="text-gray-600">Last Updated At: {lastUpdatedAt}</div>
        <div className="text-gray-600">Complete?: {isCompleted}</div>
        <div className="text-gray-600">Due Date: {dueDate}</div>
        <div className="text-gray-600">Completed Date: {completedDate}</div>
      </div>
    </div>
  );
}
