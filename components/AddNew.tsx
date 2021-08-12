import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Textarea, Select, Radio } from '.';
import CustomButton from './elements/Button/CustomButton';

const AddNew = ({ type, formData }: any) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    shouldUnregister: false,
    mode: 'onBlur',
  });
  console.log('formData', Object.keys(formData));
  useEffect(() => {
    Object.keys(formData).forEach((key: any) => {
      setValue(formData[key].key, formData[key].value);
    });
  });

  const onSubmit = (data: any) => {
    console.log('data', data);
  };
  console.log('errors', errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Object.keys(formData).map((key: any) => {
        if (formData[key].type === 'text' || formData[key].type === 'number') {
          return (
            <Input
              fieldKey={formData[key].key}
              field={formData[key]}
              error={`${
                errors[formData[key].key]
                  ? errors[formData[key].key]?.message
                  : ''
              }`}
              innerRef={() =>
                register(formData[key].key, {
                  required: formData[key].required,
                })
              }
            />
          );
        }
        if (formData[key].type === 'textarea') {
          return (
            <Textarea
              fieldKey={formData[key].key}
              field={formData[key]}
              error={`${
                errors[formData[key].key]
                  ? errors[formData[key].key]?.message
                  : ''
              }`}
              innerRef={() =>
                register(formData[key].key, {
                  required: formData[key].required,
                })
              }
            />
          );
        }
        if (formData[key].type === 'select') {
          return (
            <Select
              fieldKey={formData[key].key}
              field={formData[key]}
              error={`${
                errors[formData[key].key]
                  ? errors[formData[key].key]?.message
                  : ''
              }`}
              innerRef={() =>
                register(formData[key].key, {
                  required: formData[key].required,
                })
              }
            />
          );
        }
        if (formData[key].type === 'radio') {
          return (
            <Radio
              fieldKey={formData[key].key}
              field={formData[key]}
              error={`${
                errors[formData[key].key]
                  ? errors[formData[key].key]?.message
                  : ''
              }`}
              innerRef={() =>
                register(formData[key].key, {
                  required: formData[key].required,
                })
              }
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
        />
      </div>
    </form>
  );
};

export default AddNew;
