import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBackIcon from '@material-ui/icons/NavigateBefore';
import Send from '@material-ui/icons/Send';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const SimpleNext = ({ next, valid, handleNext, submit }) => (
  <Button variant="contained" type="button" color="primary" onClick={() => (valid ? handleNext(next) : submit())}>
    Continue
    <NavigateNextIcon />
  </Button>
);

SimpleNext.propTypes = {
  next: PropTypes.string,
  valid: PropTypes.bool,
  handleNext: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired
};

const ConditionalNext = ({ nextStep, ...rest }) => {
  const {
    input: { value }
  } = useFieldApi({ name: nextStep.when, subscription: { value: true } });
  return <SimpleNext next={nextStep.stepMapper[value]} {...rest} />;
};

ConditionalNext.propTypes = {
  nextStep: PropTypes.shape({
    when: PropTypes.string.isRequired,
    stepMapper: PropTypes.object.isRequired
  }).isRequired
};

const submitButton = (handleSubmit) => (
  <Button type="button" variant="contained" color="primary" onClick={handleSubmit}>
    Submit <Send />
  </Button>
);

const renderNextButton = ({ nextStep, handleSubmit, ...rest }) =>
  !nextStep ? (
    submitButton(handleSubmit)
  ) : typeof nextStep === 'object' ? (
    <ConditionalNext nextStep={nextStep} {...rest} />
  ) : (
    <SimpleNext next={nextStep} {...rest} />
  );

const WizardStepButtons = ({ formOptions, disableBack, handlePrev, nextStep, handleNext }) => (
  <div>
    {formOptions.onCancel && (
      <Button type="button" variant="contained" color="secondary" onClick={formOptions.onCancel}>
        Cancel
      </Button>
    )}

    <Button type="button" variant="contained" disabled={disableBack} onClick={handlePrev}>
      <NavigateBackIcon />
      Back
    </Button>
    {renderNextButton({
      ...formOptions,
      handleNext,
      nextStep
    })}
  </div>
);

WizardStepButtons.propTypes = {
  formOptions: PropTypes.shape({
    onCancel: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired
  }).isRequired,
  disableBack: PropTypes.bool,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  nextStep: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      when: PropTypes.string.isRequired,
      stepMapper: PropTypes.object.isRequired
    })
  ])
};

export default WizardStepButtons;
