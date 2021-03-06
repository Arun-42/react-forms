import React from 'react';

import FormRenderer from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import Validators from '@data-driven-forms/react-form-renderer/dist/cjs/validators';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import validatorTypes from '@data-driven-forms/react-form-renderer/dist/cjs/validator-types';
import FormTemplate from '@data-driven-forms/pf4-component-mapper/dist/cjs/form-template';
import TextField from '@data-driven-forms/pf4-component-mapper/dist/cjs/text-field';

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField
};

Validators.messages = {
  ...Validators.messages,
  required: 'Required'
};

const schema = {
  title: 'Try submitting empty form',
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'name',
      label: 'Name',
      isRequired: true,
      validate: [
        {
          type: validatorTypes.REQUIRED
        }
      ]
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'age',
      label: 'Age',
      tyope: 'number',
      isRequired: true,
      validate: [
        {
          type: validatorTypes.REQUIRED,
          message: 'Local validator message override'
        }
      ]
    }
  ]
};

const OverridingMessage = () => (
  <div className="pf4">
    <FormRenderer FormTemplate={FormTemplate} componentMapper={componentMapper} schema={schema} onSubmit={console.log} />
  </div>
);

export default OverridingMessage;
