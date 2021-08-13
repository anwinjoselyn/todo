import { useEffect, useState } from 'react';
import { CustomButton, SelectPanel, Drawer } from '../components';
import AddNew from '../components/AddNew';
import { todoFormData, todoTypes } from '../utils/defaultValues';

const Tasks = ({ tasks, people, user }: any) => {
  const [state, setState] = useState<any>({
    selectionList: [
      { key: 1, label: 'Today', value: 'today', selected: true },
      { key: 2, label: 'This Week', value: 'week', selected: false },
      { key: 3, label: 'This Month', value: 'month', selected: false },
      { key: 4, label: 'Future', value: 'future', selected: false },
    ],
    selectedIndex: 0,
    show: false,
    type: 'new',
  });

  useEffect(() => {
    if (people) {
      if (Object.keys(todoFormData).indexOf('assignedTo') > -1) {
        todoFormData['assignedTo'].options = people.map((person: any) => {
          return { key: person.uid, value: person.name };
        });
      }
    }
  });

  const onSelect = (index: number) => {
    state.selectionList[index].selected = true;
    state.selectionList[state.selectedIndex].selected = false;
    state.selectedIndex = index;
    setState({ ...state });
  };
  console.log('todoFormData', todoFormData);
  return (
    <div className="p-5">
      <div className="flex justify-between mb-5">
        <SelectPanel list={state.selectionList} onSelect={onSelect} />
        <CustomButton
          size="large"
          style="warning"
          label={<span className="material-icons">add_box</span>}
          onClick={() => setState({ ...state, show: !state.show })}
        />
      </div>
      <table className="border-separate table-fixed border-collapse rounded-lg">
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
            <th className="w-2/6 bg-gray rounded-md text-sm py-1 text-left px-2">
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
          {tasks &&
            tasks.map((task: any) => (
              <tr key={task.id}>
                <td className="px-2 text-sm py-1">
                  {task.title}
                </td>
                <td className="flex align-center px-2 text-sm py-1 ring-offset-0 ring-0">
                  {todoTypes.find(
                    (typ: any) =>
                      typ.title.toLowerCase() === task.type.toLowerCase()
                  ) && (
                    <span className="material-icons mr-2 text-sm text-blue">
                      {
                        todoTypes.find(
                          (typ: any) =>
                            typ.title.toLowerCase() === task.type.toLowerCase()
                        ).icon
                      }
                    </span>
                  )}
                  {task.type.toUpperCase()}
                </td>
                <td className="px-2 text-sm py-1">
                  {task.assignedTo &&
                  people &&
                  people.length > 0 &&
                  people.find((person: any) => person.uid === task.assignedTo)
                    ? people.find(
                        (person: any) => person.uid === task.assignedTo
                      ).name
                    : '---'}
                </td>
                <td className="px-2 text-sm py-1">
                  {task.body}
                </td>
                <td className="px-2 text-sm py-1">
                  {task.dueDate}
                </td>
                <td className="px-2 text-sm py-1">
                  {task.lastUpdatedAt}
                </td>
                <td className="px-2 text-sm py-1">
                  <div className="flex align-center justify-center">
                    <CustomButton
                      size="small"
                      style="outline-info"
                      label={<span className="material-icons small">edit</span>}
                      className="mr-2"
                    />
                    <CustomButton
                      size="small"
                      style="outline-danger"
                      label={
                        <span className="material-icons small">delete</span>
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
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
            type={state.type}
            formData={todoFormData}
            user={user}
            onHide={() => setState({ ...state, show: false })}
          />
        </Drawer>
      )}
    </div>
  );
};

export default Tasks;
