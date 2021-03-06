import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import validatorTypes from '@data-driven-forms/react-form-renderer/dist/cjs/validator-types';
import FormTemplate from '@data-driven-forms/pf4-component-mapper/dist/cjs/form-template';
import TextField from '@data-driven-forms/pf4-component-mapper/dist/cjs/text-field';

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField
};
const schema = {
  title: 'Start typing',
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'number-size',
      label: 'Number value validator',
      helperText: 'Value of the number must be between 1.36 and 33.3',
      type: 'number',
      validate: [
        {
          type: validatorTypes.MIN_NUMBER_VALUE,
          includeThreshold: true,
          value: 1.36
        },
        {
          type: validatorTypes.MAX_NUMBER_VALUE,
          includeThreshold: false,
          value: 33.3
        }
      ]
    }
  ]
};

const NumberValueValidators = () => (
  <div className="pf4">
    <FormRenderer FormTemplate={FormTemplate} componentMapper={componentMapper} schema={schema} onSubmit={console.log} />
  </div>
);

export default NumberValueValidators;
