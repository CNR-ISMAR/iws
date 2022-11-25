import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Field } from "formik";

const FormTextField = ({
  as,
  md,
  controlId,
  label,
  name,
  type,
  inputGroupPrepend,
  controlAs,
  wrapped = {},
  children,
}) => {
  return (
    <Field
      name={name}
    >{({ field, form }) => {
        const isValid = !form.errors[field.name];
        const isInvalid = form.touched[field.name] && !isValid;

        return (
          <Form.Group as={as} md={md} controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <InputGroup>
              {inputGroupPrepend}
              <Form.Control
                {...field}
                {...wrapped}
                type={type}
                isValid={form.touched[field.name] && isValid}
                isInvalid={isInvalid}
                as={controlAs}
              >
                {children}
              </Form.Control>

              {form.errors[field.name] && (
                <Form.Control.Feedback type="invalid" className="d-block">
                  {form.errors[field.name]}
                </Form.Control.Feedback>
              )}
            </InputGroup>
          </Form.Group>
        );
      }}
    </Field>
  );
};

FormTextField.defaultProps = {
  type: "text",
  inputGroupPrepend: null
};

export default FormTextField;