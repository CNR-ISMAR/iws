import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Field } from "formik";

const CheckField = ({
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
          <Form.Group as={as} md={md} controlId={controlId} className="mt-2">
            <Form.Check
              {...field}
              {...wrapped}
              type={type}
              isInvalid={isInvalid}
              as={controlAs}
              label={label}
            >
              {children}
            </Form.Check>

            {form.errors[field.name] && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {form.errors[field.name]}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        );
      }}
    </Field>
  );
};

CheckField.defaultProps = {
  type: "checkbox",
  inputGroupPrepend: null
};

export default CheckField;