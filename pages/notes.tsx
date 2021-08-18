/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { mutate } from 'swr';

import { CustomButton, SelectPanel, Textarea, Modal } from '../components';

import { createTodo, updateTodo, deleteTodo } from '../libs/todos';
import { getRandomIntInclusive } from '../utils/helpers';

const todayDate = dayjs().format('YYYY-MM-DD');

const Notes = ({ tasks, mutateData }: any) => {
  const [state, setState] = useState<any>({
    selectionList: [
      { key: 5, label: 'All', value: 'all', selected: true },
      { key: 1, label: 'Today', value: 'today', selected: false },
      { key: 2, label: 'This Week', value: 'week', selected: false },
      { key: 3, label: 'This Month', value: 'month', selected: false },
      { key: 4, label: 'Future', value: 'future', selected: false },
    ],
    filteredNotes: tasks.filter((t: any) => !t.isCompleted),
    openNotes: tasks.filter((t: any) => !t.isCompleted),
    selectedIndex: 0,
    editingNote: {},
    editingId: '',
    colors: [],
    status: '',
    showConfirmation: false,
  });

  useEffect(() => {
    state.colors = state.filteredNotes.map((_note: any) => {
      return getRandomIntInclusive(1, 13);
    });
    setState({ ...state });
  }, []);

  const setEditingNote = (todo: any) => {
    state.editingNote = todo;
    state.editingId = todo.id;
    setState({ ...state });
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
        state.filteredNotes = state.openNotes.filter((t: any) =>
          dayjs(t.dueDate).isSame(todayDate)
        );
        break;
      case 'week':
        state.filteredNotes = state.openNotes.filter((t: any) =>
          dayjs(t.dueDate).isSame(todayDate, 'week')
        );
        break;
      case 'month':
        state.filteredNotes = state.openNotes.filter((t: any) =>
          dayjs(t.dueDate).isSame(dayjs(), 'month')
        );
        break;
      case 'future':
        state.filteredNotes = state.openNotes.filter((t: any) =>
          dayjs(t.dueDate).isAfter(dayjs())
        );
        break;
      case 'all':
        state.filteredNotes = state.openNotes;
        break;
    }
    setState({ ...state });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.editingNote[e.target.name] = e.target.value;
    setState({ ...state });
  };

  const closeAll = () => {
    state.editingId = null;
    state.editingNote = {};
    state.status = '';
    state.showConfirmation = false;
    setState({ ...state });
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data: any = {
      body: state.editingNote.body,
      completedDate: state.editingNote.isCompleted
        ? dayjs(state.editingNote.completedDate).format('YYYY-MM-DD')
        : '',
      isCompleted: state.editingNote.isCompleted,
      lastUpdatedAt: dayjs().format('YYYY-MM-DD'),
    };
    if (status === 'new') {
      data.createdAt = dayjs().format('YYYY-MM-DD');
    }
    console.log('data', data);
    let response: any = null;
    let message = '';
    if (state.status === 'new') {
      response = createTodo(data);
      message = `New Note Created!`;
    }
    if (state.status === 'edit') {
      response = updateTodo(state.editingNote.id, data);
      message = `Note with ID: ${state.editingNote.id} Updated successfully!`;
    }
    if (state.status === 'delete') {
      response = deleteTodo(state.editingNote.id);
      message = `Note with ID: ${state.editingNote.id} DELETED successfully!`;
    }

    response.then((resp: any) => {
      console.log('resp', resp);
      if (resp.success) {
        toast.success(message);
        mutateData('todos');
        // setTimeout(() => {
        //   // router.push('/notes');
        //   // window.location.reload();
        // }, 3000);
      } else {
        toast.error('Something went wrong. Please try again later.');
      }
    });
    closeAll();
  };

  const triggerConfirm = (type: string, note?: any) => {
    if (note) {
      state.editingNote = { ...state.editingNote, ...note };
      state.editingId = note.id;
    }
    if (type === 'done') {
      state.editingNote.isCompleted = true;
      state.editingNote.completedDate = dayjs();
    }
    state.status = type;
    state.showConfirmation = true;
    setState({ ...state });
  };

  const createNote = () => {
    const newNote = {
      body: '',
      createdAt: dayjs(),
      isCompleted: false,
    };
    state.filteredNotes.push(newNote);
    state.openNotes.push(newNote);
    state.status = 'new';
    state.editingNote = newNote;
    state.colors.push(getRandomIntInclusive(1, 13));
    setState({ ...state });
  };

  const ModalData = () => {
    let message = '';
    if (state.status === 'edit') {
      message = 'Are you sure you want to update the Note?';
    }
    if (state.status === 'delete') {
      message = 'Are you sure you want to DELETE the Note?';
    }
    if (state.status === 'done') {
      message = 'Are you sure you want to mark this Note as COMPLETE?';
    }
    return (
      <div className="">
        <div className="p-4">{message}</div>
        <div className="flex justify-between p-4">
          <CustomButton
            size="medium"
            style="danger"
            label="NO"
            onClick={closeAll}
            className="px-6 py-4"
          />
          <CustomButton
            size="medium"
            style="info"
            label="YES"
            onClick={onSubmit}
            className="px-5 py-4"
          />
        </div>
      </div>
    );
  };

  const renderNotes = (note: any, index: number) => {
    return (
      <div
        key={note.id ? note.id : index}
        className={`h-52 m-2 rounded-2xl shadow-custom1 hover:shadow-custom2 bg-notes-${state.colors[index]}`}
        onDoubleClick={() => setEditingNote(note)}
      >
        <div className="p-1 h-40 block">
          {state.status === 'new' ? (
            <Textarea
              fieldKey={index}
              field={{
                key: 'body',
                value: note.body,
                type: 'textarea',
                rows: 6,
              }}
              onChange={onChange}
              className={`border-0 bg-transparent`}
              noResize="noResize"
              onBlur={onSubmit}
            />
          ) : (
            <Textarea
              fieldKey={note.id}
              field={{
                key: 'body',
                value:
                  note.id === state.editingId
                    ? state.editingId.body
                    : note.body,
                type: 'textarea',
                rows: 6,
              }}
              onChange={onChange}
              disabled={note.id !== state.editingId}
              className={`border-0 bg-notes-${state.colors[index]}`}
              style={{ resize: 'none' }}
              noResize="noResize"
              onBlur={
                state.status !== '' ? () => triggerConfirm(state.status) : null
              }
            />
          )}
          {/* {note.body} */}
        </div>
        <div className="flex justify-between p-4">
          <span className="text-xs">
            {dayjs(note.createdAt).format("DD MMM 'YY")}
          </span>
          <div className="flex">
            <CustomButton
              size="small"
              style="ghost"
              label={
                <span className="material-icons text-sm text-green-dark">
                  done_all
                </span>
              }
              onClick={() => triggerConfirm('done', note)}
            />
            <CustomButton
              size="small"
              style="ghost"
              label={
                <span className="material-icons text-sm text-blue">edit</span>
              }
              onClick={() => setEditingNote(note)}
            />
            <CustomButton
              size="small"
              style="ghost"
              label={
                <span className="material-icons text-sm text-red">delete</span>
              }
              onClick={() => triggerConfirm('delete', note)}
            />
          </div>
        </div>
      </div>
    );
  };
  console.log('state', state);
  return (
    <div className="h-100 px-12 py-6">
      {/* <h2 className="text-center mb-4">NOTES</h2> */}
      <div className="mb-4 mx-2 flex justify-between">
        <SelectPanel list={state.selectionList} onSelect={onSelect} />
        <CustomButton
          size="large"
          style="warning"
          label={<span className="material-icons">add_box</span>}
          onClick={createNote}
        />
      </div>
      <div className="grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">
        {state.filteredNotes &&
          state.filteredNotes.map((t: any, index: number) =>
            renderNotes(t, index)
          )}
      </div>
      {state.showConfirmation && (
        <Modal
          title="Confirmation Required"
          show={state.showConfirmation}
          onHide={() => setState({ ...state, showConfirmation: false })}
          size="xs"
        >
          <ModalData />
        </Modal>
      )}
    </div>
  );
};

export default Notes;
