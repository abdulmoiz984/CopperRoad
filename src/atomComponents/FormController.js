import React from 'react';
import { Formik } from 'formik';

const FormController = ({
  initialValues, validationSchema, validate,
  validateOnChange = true, validateOnBlur = true, enableReinitialize = false,
  onSubmit, children,
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    validate={validate}
    validateOnChange={validateOnChange}
    validateOnBlur={validateOnBlur}
    enableReinitialize={enableReinitialize}
    onSubmit={onSubmit}
  >
    {formikProps => {
      const enhanced = {
        ...formikProps,
        errors: Object.keys(formikProps?.errors || {}).reduce((acc, field) => {
          if (formikProps.touched[field] || formikProps.submitCount > 0) acc[field] = formikProps.errors[field];
          return acc;
        }, {}),
      };
      return <>{children(enhanced)}</>;
    }}
  </Formik>
);

export default FormController;
