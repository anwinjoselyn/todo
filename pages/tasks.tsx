/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import {
  CustomButton,
  SelectPanel,
  Drawer,
  Modal,
  Loading,
} from '../components';
import AddNew from '../components/AddNew';

import { getAllTodos } from '../libs/todos';
import { getAllUsers, getUser } from '../libs/users';
import { todoFormData, todoTypes } from '../utils/defaultValues';
import useRequireAuth from '../hooks/useRequireAuth';

const todayDate = dayjs().format('YYYY-MM-DD');

const Tasks = () => {
  const auth = useRequireAuth();

  const [state, setState] = useState<any>({
    selectionList: [
      { key: 5, label: 'All', value: 'all', selected: true },
      { key: 1, label: 'Today', value: 'today', selected: false },
      { key: 2, label: 'This Week', value: 'week', selected: false },
      { key: 3, label: 'This Month', value: 'month', selected: false },
      { key: 4, label: 'Future', value: 'future', selected: false },
    ],
    selectedIndex: 0,
    show: false,
    type: 'new',
    showModal: false,
    editingTodo: {},
    editingId: '',
    filteredTasks: [],
    allTasks: [],
    allOpenTasks: [],
    isLoading: true,
    users: {},
  });

  useEffect(() => {
    Promise.all([getAllTodos(), getAllUsers()]).then((res) => {
      console.log('res', res);
      if (res[0]) {
        const filtered = res[0].filter((t: any) => !t.isCompleted);
        state.filteredTasks = filtered;
        state.allOpenTasks = filtered;
        state.allTasks = res[0];
        state.isLoading = false;
        setState({ ...state });
      }
    });
  }, []);

  useEffect(() => {
    if (auth.user?.uid) {
      getUser(auth.user?.uid).then((res) => {
        console.log('res', res);
        if (res && res[0]) {
          setState({ ...state, user: res[0] });
        }
      });
    }
  }, [auth.user?.uid]);

  const setEditingTodo = (todo: any) => {
    let editingTodo = {};
    Object.keys(JSON.parse(JSON.stringify(todoFormData))).forEach(
      (key: any) => {
        editingTodo[key] = todoFormData[key];
        editingTodo[key].value = todo[key];
      }
    );
    setState({
      ...state,
      editingTodo,
      showModal: true,
      type: 'edit',
      editingId: todo.id,
    });
  };

  const onSelect = (index: number) => {
    state.selectionList[index].selected = true;
    state.selectionList[state.selectedIndex].selected = false;
    state.selectedIndex = index;
    const selectedValue = state.selectionList[index].value;

    switch (selectedValue) {
      default:
        break;
      case 'today':
        state.filteredTasks = state.allOpenTasks.filter((t: any) =>
          dayjs(t.dueDate).isSame(todayDate)
        );
        break;
      case 'week':
        state.filteredTasks = state.allOpenTasks.filter((t: any) =>
          dayjs(t.dueDate).isSame(todayDate, 'week')
        );
        break;
      case 'month':
        state.filteredTasks = state.allOpenTasks.filter((t: any) =>
          dayjs(t.dueDate).isSame(dayjs(), 'month')
        );
        break;
      case 'future':
        state.filteredTasks = state.allOpenTasks.filter((t: any) =>
          dayjs(t.dueDate).isAfter(dayjs())
        );
        break;
      case 'all':
        state.filteredTasks = state.allOpenTasks;
        break;
    }
    setState({ ...state });
  };

  return (
    <div className="p-5">
      {state.isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-between mb-5">
            <SelectPanel list={state.selectionList} onSelect={onSelect} />
            <CustomButton
              size="large"
              style="warning"
              label={<span className="material-icons">add_box</span>}
              onClick={() => setState({ ...state, show: !state.show })}
            />
          </div>
          <table className="border-separate table-fixed border-collapse rounded-lg shadow-custom1 p-3">
            <thead>
              <tr className="rounded-lg">
                <th className="w-1/6 text-sm py-1 text-left px-2 rounded-md bg-gray">
                  Title
                </th>
                <th className="w-1/12 rounded-md bg-gray text-sm py-1 text-left px-2">
                  Type
                </th>
                <th className="w-1/12 bg-gray rounded-md text-sm py-1 text-left px-2">
                  Owner
                </th>
                <th className="w-2/6 max-w-6xl bg-gray rounded-md text-sm py-1 text-left px-2">
                  Content
                </th>
                <th className="w-1/12 bg-gray rounded-md text-sm py-1 text-left px-2">
                  Due On
                </th>
                <th className="w-1/12 bg-gray rounded-md text-sm py-1 text-left px-2">
                  Updated
                </th>
                <th className="w-1/12 bg-gray rounded-md text-sm py-1 px-2">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {state.filteredTasks &&
                state.filteredTasks
                  .sort((a: any, b: any) => b.createdAt - a.createdAt)
                  .map((task: any) => (
                    <tr key={task.id} className="hover:bg-gray-light h-10">
                      <td className="px-2 text-sm py-1">{task.title}</td>
                      <td className="px-2 text-sm py-1">
                        <div className="flex align-center">
                          {todoTypes.find(
                            (typ: any) =>
                              typ.title.toLowerCase() ===
                              task.type.toLowerCase()
                          ) && (
                            <span className="material-icons mr-2 text-sm text-blue">
                              {
                                todoTypes.find(
                                  (typ: any) =>
                                    typ.title.toLowerCase() ===
                                    task.type.toLowerCase()
                                ).icon
                              }
                            </span>
                          )}
                          {task.type.toUpperCase()}
                        </div>
                      </td>
                      <td className="px-2 text-sm py-1">
                        {task.assignedTo &&
                        state.users &&
                        state.users.length > 0 &&
                        state.users.find(
                          (person: any) => person.uid === task.assignedTo
                        )
                          ? state.users.find(
                              (person: any) => person.uid === task.assignedTo
                            ).name
                          : '---'}
                      </td>
                      <td className="px-2 text-sm py-1">{task.body}</td>
                      <td className="px-2 text-sm py-1">
                        {dayjs(task.dueDate).format("DD MMM 'YY")}
                      </td>
                      <td className="px-2 text-sm py-1">
                        {dayjs(task.lastUpdatedAt).isValid()
                          ? dayjs(task.lastUpdatedAt).format("DD MMM 'YY")
                          : '---'}
                      </td>
                      <td className="px-2 text-sm py-1">
                        <div className="flex align-center justify-center">
                          <CustomButton
                            size="small"
                            style="outline-info"
                            label={
                              <span className="material-icons small">edit</span>
                            }
                            className="mr-2"
                            onClick={() => setEditingTodo(task)}
                          />
                          <CustomButton
                            size="small"
                            style="outline-danger"
                            label={
                              <span className="material-icons small">
                                delete
                              </span>
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </>
      )}
      {state.show && (
        <Drawer
          show={state.show}
          onHide={() => setState({ ...state, show: false })}
          title="Add New"
          closable
          width="w40"
          closeIcon={<span className="material-icons">cancel</span>}
        >
          <AddNew
            type="new"
            formData={todoFormData}
            user={state.user}
            onHide={() => setState({ ...state, show: false })}
          />
        </Drawer>
      )}
      {state.showModal && (
        <Modal
          show={state.showModal}
          onHide={() =>
            setState({ ...state, showModal: false, editingTodo: {} })
          }
          title="Edit Task"
          closable
          size="lg"
          closeIcon={<span className="material-icons">cancel</span>}
        >
          <AddNew
            type="edit"
            formData={state.editingTodo}
            user={state.user}
            onHide={() =>
              setState({ ...state, showModal: false, editingTodo: {} })
            }
            id={state.editingId}
          />
        </Modal>
      )}
    </div>
  );
};

export default Tasks;
