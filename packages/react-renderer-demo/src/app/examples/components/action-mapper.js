import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';

import TextField from '@data-driven-forms/pf4-component-mapper/dist/cjs/text-field';
import FormTemplate from '@data-driven-forms/pf4-component-mapper/dist/cjs/form-template';

const translateLabel = (id, locale = 'en') =>
  ({
    en: {
      name: 'User name',
      password: 'Password'
    },
    jp: {
      name: '名前',
      password: 'パスワード'
    }
  }[locale][id]);

const schema = {
  title: 'Action Mapper example (translated strings)',
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'name',
      actions: {
        label: ['translateLabel', 'name', 'jp']
      }
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'password',
      actions: {
        label: ['translateLabel', 'password', 'jp']
      }
    }
  ]
};

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField
};

const actionMapper = {
  translateLabel
};

const ActionMapper = () => (
  <div className="pf4">
    <FormRenderer FormTemplate={FormTemplate} actionMapper={actionMapper} componentMapper={componentMapper} schema={schema} onSubmit={console.log} />
  </div>
);

export default ActionMapper;
