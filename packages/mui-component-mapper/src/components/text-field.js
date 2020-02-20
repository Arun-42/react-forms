import React from 'react';
import PropTypes from 'prop-types';
import MuiTextField from '@material-ui/core/TextField';

import FormFieldGrid from '../common/form-field-grid';
import { validationError } from '../common/helpers';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';

const TextField = ({ input, isReadOnly, isDisabled, placeholder, isRequired, label, helperText, description, validateOnMount, meta, ...rest }) => {
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormFieldGrid>
      <MuiTextField
        {...input}
        fullWidth
        error={!!invalid}
        helperText={invalid || helperText || description}
        disabled={isDisabled}
        label={label}
        placeholder={placeholder}
        required={isRequired}
        inputProps={{
          readOnly: isReadOnly
        }}
        {...rest}
      />
    </FormFieldGrid>
  );
};

TextField.propTypes = {
  input,
  meta,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.node,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  description: PropTypes.node
};

export default TextField;