import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Field } from "formik";
import AsyncSelect from 'react-select/async';
import Select from 'react-select';

const SelectField = ({
  as,
  md,
  controlId,
  label,
  name,
  groupClassName = '',
  loadOptions,
  ...other
}) => {

  const SelectComponent = loadOptions ? AsyncSelect : Select;

  return (
    <Field
      name={name}
      render={({ field, form }) => {
        const isValid = !form.errors[field.name];
        const isInvalid = form.touched[field.name] && !isValid;

        return (
          <Form.Group as={as} md={md} controlId={controlId} className={groupClassName}>
            <Form.Label>{label}</Form.Label>
            <InputGroup>
              <SelectComponent
                cacheOptions
                {...other}
                loadOptions={loadOptions}
                defaultOptions
                styles={{ 
                  container: (provided) => ({ ...provided, width: '100%' }),
                }}
                {...field}
                onChange={value => form.setFieldValue(name, value)}
              />
              {form.errors[field.name] && (
                <Form.Control.Feedback type="invalid" className="d-block">
                  {form.errors[field.name]}
                </Form.Control.Feedback>
              )}
            </InputGroup>
          </Form.Group>
        );
      }}
    />
  );
};

export default SelectField;