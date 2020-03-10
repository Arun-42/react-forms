import React from 'react';
import PropTypes from 'prop-types';
import MultipleChoiceList from '../common/multiple-choice-list';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormGroup from '../common/form-group';
import { Checkbox as Pf4Checkbox } from '@patternfly/react-core/dist/js/components/Checkbox/Checkbox';
import IsRequired from '../common/is-required';

const SingleCheckbox = (props) => {
  const { label, isRequired, helperText, meta, description, input, isReadOnly, isDisabled, id, ...rest } = useFieldApi(props);
  return (
    <FormGroup isRequired={isRequired} helperText={helperText} meta={meta} description={description} hideLabel id={id || input.name}>
      <Pf4Checkbox
        isChecked={input.checked}
        {...input}
        id={id || input.name}
        label={isRequired ? <IsRequired>{label}</IsRequired> : label}
        aria-label={rest.name}
        {...rest}
        isDisabled={isDisabled || isReadOnly}
      />
    </FormGroup>
  );
};

SingleCheckbox.propTypes = {
  label: PropTypes.string,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.string,
  description: PropTypes.string,
  isDisabled: PropTypes.bool,
  id: PropTypes.string
};

const Checkbox = ({ options, ...props }) => (options ? <MultipleChoiceList options={options} {...props} /> : <SingleCheckbox {...props} />);

Checkbox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any }))
};

export default Checkbox;