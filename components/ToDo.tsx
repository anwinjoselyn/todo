import React, { useEffect, useState } from 'react';

export type ToDoProps = {
  title: string;
  body: number;
  authorId: string;
  assignedTo: string;
  createdAt: string;
  lastUpdatedAt: string;
  isCompleted: boolean;
  dueDate: string;
  completedDate: string;
  type: string;
  users: any;
};

export default function ToDo({
  title,
  body,
  authorId,
  assignedTo,
  createdAt,
  lastUpdatedAt,
  isCompleted,
  dueDate,
  completedDate,
  type,
  users,
}: ToDoProps) {
  const [state, setState] = useState<any>({
    isLoading: true,
    users: [],
    author: '',
    assignedUser: '',
  });

  useEffect(() => {
    if (users && users.length > 0) {
      state.users = users;
      state.author = users.find((u: any) => u.uid === authorId)
        ? users.find((u: any) => u.uid === authorId).name
        : '---';
      state.assignedUser = users.find((u: any) => u.uid === assignedTo)
        ? users.find((u: any) => u.uid === assignedTo).name
        : '---';
      state.isLoading = false;
      setState({ ...state });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('state', state);
  // const author = users ? users.find((u: any) => u.uid === authorId): "---";
  // const assignedUser = users ? users.find((u: any) => u.uid === assignedTo): "---";

  return (
    <div className="md:flex bg-white rounded-lg p-24 justify-center">
      {!state.isLoading && (
        <div className="text-center md:text-left">
          <h2 className="text-lg">Title: {title}</h2>
          <div className="text-purple-500">Author: {state.author}</div>
          <div className="text-gray-600">Assign To: {state.assignedUser}</div>
          <div className="text-gray-600">Body: {body}</div>
          <div className="text-gray-600">Type: {type}</div>
          <div className="text-gray-600">
            Created At: {createdAt.toString()}
          </div>
          <div className="text-gray-600">
            Last Updated At: {lastUpdatedAt.toString()}
          </div>
          <div className="text-gray-600">
            Completed?: {isCompleted ? 'YES' : 'NO'}
          </div>
          <div className="text-gray-600">Due Date: {dueDate.toString()}</div>
          <div className="text-gray-600">
            Completed Date: {completedDate.toString()}
          </div>
        </div>
      )}
    </div>
  );
}
