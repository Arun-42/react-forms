import React from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, DatePicker as MUIDatePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

import FormFieldGrid from '../common/form-field-grid';
import { validationError } from '../common/helpers';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';

const DatePicker = ({
  input,
  isReadOnly,
  isDisabled,
  placeholder,
  isRequired,
  label,
  helperText,
  description,
  validateOnMount,
  meta,
  locale = 'en'
}) => {
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormFieldGrid>
      <MuiPickersUtilsProvider locale={locale} utils={MomentUtils}>
        <MUIDatePicker
          fullWidth
          margin="normal"
          label={label}
          helperText={invalid || helperText || description}
          disabled={isDisabled || isReadOnly}
          placeholder={placeholder}
          required={isRequired}
          error={!!invalid}
          readOnly={isReadOnly}
          {...input}
          value={input.value || null}
        />
      </MuiPickersUtilsProvider>
    </FormFieldGrid>
  );
};

DatePicker.propTypes = {
  input,
  meta,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.node,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  locale: PropTypes.string,
  description: PropTypes.node
};

export default DatePicker;