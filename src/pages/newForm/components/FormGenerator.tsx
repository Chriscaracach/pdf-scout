import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Form as RSForm, ButtonToolbar, Button } from "rsuite";

interface FieldProps {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
}

interface FormGeneratorProps {
  fields: FieldProps[];
  initialValues: { [key: string]: any };
  validationSchema: Yup.ObjectSchema;
  onSubmit: (values: { [key: string]: any }) => void;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({
  fields,
  initialValues,
  validationSchema,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <RSForm fluid>
            {fields.map((field) => (
              <RSForm.Group key={field.name}>
                <RSForm.ControlLabel>{field.label}</RSForm.ControlLabel>
                <Field
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  as={RSForm.Control}
                />
                {errors[field.name] && touched[field.name] ? (
                  <RSForm.HelpText>{errors[field.name]}</RSForm.HelpText>
                ) : null}
              </RSForm.Group>
            ))}
            <ButtonToolbar>
              <Button appearance="primary" type="submit">
                Submit
              </Button>
            </ButtonToolbar>
          </RSForm>
        </Form>
      )}
    </Formik>
  );
};

export default FormGenerator;
