import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';

import Checkbox from '@data-driven-forms/pf4-component-mapper/dist/cjs/checkbox';
import TextField from '@data-driven-forms/pf4-component-mapper/dist/cjs/text-field';
import FormTemplate from '@data-driven-forms/pf4-component-mapper/dist/cjs/form-template';

const schema = {
  title: 'Set action',
  fields: [
    {
      component: componentTypes.CHECKBOX,
      name: 'useDefaultNickName',
      label: 'Do you want to use default nickname?',
      condition: {
        when: 'nickname',
        is: 'User123',
        notMatch: true,
        then: {
          set: { useDefaultNickName: false }
        },
        else: { visible: true, set: { useDefaultNickName: true } }
      },
      description: 'set: {} is used to reset the setter'
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'nickname',
      label: 'Nickname',
      condition: {
        when: 'useDefaultNickName',
        is: true,
        then: {
          set: { nickname: 'User123' }
        },
        else: { visible: true, set: {} }
      }
    }
  ]
};

const componentMapper = {
  [componentTypes.CHECKBOX]: Checkbox,
  [componentTypes.TEXT_FIELD]: TextField
};

const SetAction = () => (
  <div className="pf4">
    <FormRenderer FormTemplate={FormTemplate} componentMapper={componentMapper} schema={schema} onSubmit={console.log} />
  </div>
);

export default SetAction;
