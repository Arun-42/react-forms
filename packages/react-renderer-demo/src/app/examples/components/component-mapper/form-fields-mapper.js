/* eslint react/prop-types: "off" */
import React, { useState } from 'react';
import FormRender from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import useFieldApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-field-api';
import useFormApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-form-api';

import './form-fields-mapper-docs.css';

const getButtonStyle = (variant) => ({
  color: 'White',
  backgroundColor: variant === 'primary' ? 'RebeccaPurple' : '#888',
  padding: '8px 16px',
  borderRadius: 4,
  cursor: 'pointer',
  border: 'none',
  marginRight: 4
});

const Button = ({ children, label, variant, ...props }) => (
  <button style={getButtonStyle(variant)} {...props}>
    {label}
  </button>
);

const FormTemplate = ({ formFields }) => {
  const { handleSubmit, onCancel } = useFormApi();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      {formFields}
      <Button type="submit" variant="primary" label="Submit" />
      <Button type="button" label="cancel" onClick={onCancel} />
    </form>
  );
};

const TextField = (props) => {
  const {
    customProp,
    label,
    input,
    isRequired,
    meta: { error, touched },
    FieldArrayProvider,
    dataType,
    ...rest
  } = useFieldApi(props);
  return (
    <div className={`ddorg__demo-formGroup ${isRequired ? 'required' : ''} ${error ? 'error' : ''}`}>
      <label htmlFor={input.name}>{label}</label>
      <input id={input.name} {...input} {...rest} />
      {touched && error && <p className="error-text">{error}</p>}
      {customProp && <p>This is a custom prop and has nothing to do with form schema</p>}
    </div>
  );
};

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  'custom-component-type': TextField
};

const ComponentMapper = () => {
  const [values, setValues] = useState({});
  const schema = {
    fields: [
      {
        component: componentTypes.TEXT_FIELD,
        name: 'first-name',
        label: 'First name',
        isRequired: true,
        validate: [(value) => (!value || value.lenght === 0 ? 'Required' : undefined)],
        customProp: true
      },
      {
        component: componentTypes.TEXT_FIELD,
        name: 'last-name',
        label: 'Last name',
        isRequired: true,
        validate: [(value) => (!value || value.lenght === 0 ? 'Required' : undefined)]
      },
      {
        component: componentTypes.TEXT_FIELD,
        name: 'age',
        label: 'Your age',
        type: 'number'
      },
      {
        component: 'custom-component-type',
        name: 'password',
        label: 'Your password',
        type: 'password'
      }
    ]
  };
  return (
    <div>
      <FormRender
        componentMapper={componentMapper}
        FormTemplate={FormTemplate}
        schema={schema}
        onSubmit={(values) => setValues(values)}
        onCancel={() => console.log('cancel action')}
      />
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
};

export default ComponentMapper;
