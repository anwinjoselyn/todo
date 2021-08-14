/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
import { useState } from 'react';
import dayjs from 'dayjs';

import { Input, Textarea, Select, Radio } from '.';
import CustomButton from './elements/Button/CustomButton';

import { createTodo, updateTodo } from '../libs/todos';
import toast from 'react-hot-toast';

import { useAuth } from '../hooks/useAuth';

const AddNew = ({ type, formData, onHide, id }: any) => {
  const [state, setState] = useState<{ [key: string]: any }>({ formData });
  const { user } = useAuth();

  // console.log('user', user);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.formData[e.target.name].value = e.target.value;
    setState({ ...state });
  };

  const onChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.formData[e.target.name].value = !state.formData[e.target.name].value;
    setState({ ...state });
  };

  const validateFields = () => {
    return (
      state.formData.title.value &&
      state.formData.title.value.length > 2 &&
      state.formData.body.value &&
      state.formData.body.value.length > 3 &&
      state.formData.dueDate.value &&
      dayjs(state.formData.dueDate.value).isValid() &&
      state.formData.assignedTo.value &&
      state.formData.assignedTo.value !== -1 &&
      state.formData.type.value &&
      state.formData.type.value !== -1 &&
      user &&
      user.uid
    );
  };

  const showToast = () => {
    toast.error(
      'Please fill all required fields - Title, Type, Assigned To & Content are mandatory!',
      { duration: 5000 }
    );
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data: any = {
      title: state.formData.title.value,
      type: state.formData.type.value,
      assignedTo: state.formData.assignedTo.value,
      authorId: user && user.uid ? user.uid : '',
      body: state.formData.body.value,
      completedDate: state.formData.completedDate.value
        ? dayjs(state.formData.completedDate.value).format('YYYY-MM-DD')
        : '',
      dueDate: dayjs(state.formData.dueDate.value).format('YYYY-MM-DD'),
      isCompleted: state.formData.isCompleted.value,
      lastUpdatedAt: type === 'edit' ? dayjs().format('YYYY-MM-DD') : '',
    };
    if (type === 'new' || type === '') {
      data.createdAt = dayjs().format('YYYY-MM-DD');
    }
    console.log('data', data);
    const response = type === 'edit' ? updateTodo(id, data) : createTodo(data);
    response.then((resp: any) => {
      console.log('resp', resp);
      if (resp.success) {
        onHide();
      } else {
        toast.error('Something went wrong. Please try again later.');
      }
    });
  };

  return (
    <form onSubmit={onSubmit}>
      {Object.keys(state.formData).map((key: any) => {
        if (
          state.formData[key].type === 'text' ||
          state.formData[key].type === 'number' ||
          state.formData[key].type === 'date'
        ) {
          console.log(
            "'state.formData['isCompleted']'",
            state.formData['isCompleted']
          );
          if (
            state.formData[key].type === 'date' &&
            state.formData[key].key === 'completedDate' &&
            !state.formData['isCompleted'].value
          ) {
            return;
          }
          return (
            <Input
              fieldKey={state.formData[key].key}
              field={state.formData[key]}
              onChange={onChange}
              // error={`${
              //   errors[formData[key].key]
              //     ? errors[formData[key].key]?.message
              //     : ''
              // }`}
              // innerRef={() =>
              //   register(formData[key].key, {
              //     required: formData[key].required,
              //   })
              // }
            />
          );
        }
        if (state.formData[key].type === 'textarea') {
          return (
            <Textarea
              fieldKey={state.formData[key].key}
              field={state.formData[key]}
              onChange={onChange}
              // error={`${
              //   errors[formData[key].key]
              //     ? errors[formData[key].key]?.message
              //     : ''
              // }`}
              // innerRef={() =>
              //   register(formData[key].key, {
              //     required: formData[key].required,
              //   })
              // }
            />
          );
        }
        if (state.formData[key].type === 'select') {
          return (
            <Select
              fieldKey={state.formData[key].key}
              field={state.formData[key]}
              onChange={onChange}
              // error={`${
              //   errors[formData[key].key]
              //     ? errors[formData[key].key]?.message
              //     : ''
              // }`}
              // innerRef={() =>
              //   register(formData[key].key, {
              //     required: formData[key].required,
              //   })
              // }
            />
          );
        }
        if (state.formData[key].type === 'radio') {
          return (
            <Radio
              fieldKey={state.formData[key].key}
              field={state.formData[key]}
              onChange={onChangeRadio}
              // error={`${
              //   errors[formData[key].key]
              //     ? errors[formData[key].key]?.message
              //     : ''
              // }`}
              // innerRef={() =>
              //   register(formData[key].key, {
              //     required: formData[key].required,
              //   })
              // }
            />
          );
        }
      })}
      <div className="flex justify-end py-4">
        <CustomButton
          className="px-10"
          size="large"
          style="info"
          label="Submit"
          type="submit"
          onClick={!validateFields() ? showToast : onSubmit}
        />
      </div>
    </form>
  );
};

export default AddNew;
