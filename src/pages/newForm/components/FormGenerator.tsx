import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, SelectPicker, DatePicker, Text, Input, VStack } from "rsuite";

interface FieldProps {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  component?: "input" | "select" | "date";
  options?: { label: string; value: any }[]; // For SelectPicker
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
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form>
          <VStack alignItems="stretch" spacing={30}>
            <VStack alignItems="stretch" spacing={10}>
              {fields.map((field, i) => (
                <React.Fragment key={i}>
                  <VStack alignItems="stretch" spacing={0}>
                    <Text as="label">{field.label}</Text>
                    {field.component === "select" ? (
                      <SelectPicker
                        name={field.name}
                        placeholder={field.placeholder}
                        data={field.options || []}
                        searchable={false}
                        closable={false}
                        block
                        value={values[field.name]}
                        onChange={(value) => setFieldValue(field.name, value)}
                      />
                    ) : field.component === "date" ? (
                      <DatePicker
                        name={field.name}
                        cleanable={false}
                        oneTap
                        block
                        format="dd.MM.yyyy"
                        placeholder={field.placeholder}
                        value={values[field.name]}
                        onChange={(value) => setFieldValue(field.name, value)}
                      />
                    ) : (
                      <Input
                        name={field.name}
                        placeholder={field.placeholder}
                        value={values[field.name]}
                        onChange={(value) => setFieldValue(field.name, value)}
                      />
                    )}
                    {errors[field.name] && touched[field.name] ? (
                      <Text color="red">{errors[field.name]}</Text>
                    ) : null}
                  </VStack>
                </React.Fragment>
              ))}
            </VStack>

            <Button appearance="primary" type="submit" block size="lg">
              Crear
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default FormGenerator;
