import PropTypes from 'prop-types';
import React from 'react';
import { FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import { ErrorMessage } from 'formik';

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

InputField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
}

function InputField(props) {
  const {
    field, form,
    type, label, placeholder, disabled,
  } = props;
  const { name } = field;
  const { errors, touched, handleChange } = form;
  const showError = errors[name] && touched[name];

  return (
    <FormGroup onChange={handleChange}>
      <div  style = {{width: '80px', height: '26px'}}>
        {label && <Label  for={name}>{label}</Label>}

        <Input
          id={name}
          {...field}

          type={type}
          disabled={disabled}
          placeholder={placeholder}

          invalid={showError}
        />
      </div>

      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default InputField;