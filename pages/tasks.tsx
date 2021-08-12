import { useEffect, useState } from 'react';
import { CustomButton, SelectPanel, Drawer } from '../components';
import AddNew from '../components/AddNew';
import { todoFormData } from '../utils/defaultValues';

const Tasks = ({ tasks, people }: any) => {
  const [state, setState] = useState<any>({
    selectionList: [
      { key: 1, label: 'Today', value: 'today', selected: true },
      { key: 2, label: 'This Week', value: 'week', selected: false },
      { key: 3, label: 'This Month', value: 'month', selected: false },
      { key: 4, label: 'Future', value: 'future', selected: false },
    ],
    selectedIndex: 0,
    show: false,
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
                <td className="border border-green-600">
                  {task.assignedTo &&
                  people &&
                  people.length > 0 &&
                  people.find((person: any) => person.uid === task.assignedTo)
                    ? people.find(
                        (person: any) => person.uid === task.assignedTo
                      ).name
                    : '---'}
                </td>
                <td className="border border-green-600">{task.body}</td>
                <td className="border border-green-600">{task.dueDate}</td>
                <td className="border border-green-600">
                  {task.lastUpdatedAt}
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
          <AddNew type="new" formData={todoFormData} />
        </Drawer>
      )}
    </div>
  );
};

export default Tasks;
