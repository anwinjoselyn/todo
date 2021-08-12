/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Input, Textarea, Select, Radio } from '.';
import CustomButton from './elements/Button/CustomButton';

const AddNew = ({ type, formData }: any) => {
  const [state, setState] = useState<{ [key: string]: any }>({ formData });
  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors },
  //   setValue,
  //   getValues,
  // } = useForm({
  //   shouldUnregister: false,
  //   mode: 'onBlur',
  // });
  console.log('formData', formData);
  // useEffect(() => {
  //   Object.keys(formData).forEach((key: any) => {
  //     setValue(formData[key].key, formData[key].value);
  //   });
  // }, []);

  // useEffect(() => {
  //   Object.keys(formData).forEach((key: any) => {
  //   register(formData[key].key, {
  //     validate: (value) => 'This is required.',
  //   });
  // })
  // }, [register]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.formData[e.target.name].value = e.target.value;
    setState({ ...state });
  };

  const onChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('e.target.checked', e.target.checked)
    state.formData[e.target.name].value = !state.formData[e.target.name].value;
    setState({ ...state });
  };

  const onSubmit = () => {
    // const data = getValues();
    // console.log('data', data);
  };
  console.log('state', state);
  return (
    <form onSubmit={onSubmit}>
      {Object.keys(state.formData).map((key: any) => {
        if (
          formData[key].type === 'text' ||
          formData[key].type === 'number' ||
          formData[key].type === 'date'
        ) {
          return (
            <Input
              fieldKey={formData[key].key}
              field={formData[key]}
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
        if (formData[key].type === 'textarea') {
          return (
            <Textarea
              fieldKey={formData[key].key}
              field={formData[key]}
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
        if (formData[key].type === 'select') {
          return (
            <Select
              fieldKey={formData[key].key}
              field={formData[key]}
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
        if (formData[key].type === 'radio') {
          return (
            <Radio
              fieldKey={formData[key].key}
              field={formData[key]}
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
      <div className=" border-t border-gray">
        <CustomButton
          className="float-right my-5"
          size="large"
          style="outline-warning"
          label="Submit"
          type="submit"
          onClick={onSubmit}
        />
      </div>
    </form>
  );
};

export default AddNew;
