import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Field } from "formik";
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";


const DateField = ({
  as,
  md,
  controlId,
  label,
  name,
}) => {
  return (
    <Field
      name={name}
    >{({ field, form }) => {
        const isValid = !form.errors[field.name];
        const isInvalid = form.touched[field.name] && !isValid;

        return (
          <Form.Group as={as} md={md} controlId={controlId} className="mt-2">
            <Form.Label>{label}</Form.Label>
            
            <div>
              <DatePicker
                showTimeSelect
                dateFormat="dd/MM/yyyy HH:mm"
                {...field}
                selected={(field.value && new Date(field.value)) || null}
                value={(field.value && new Date(field.value)) || null}
                onChange={(val) => form.setFieldValue(field.name, val)}
              />
            </div>
            

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

DateField.defaultProps = {
  type: "checkbox",
  inputGroupPrepend: null
};

export default DateField;