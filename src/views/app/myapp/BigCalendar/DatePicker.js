import React from 'react';
  import { Formik } from 'formik';
  import { FormikDatePicker } from 'containers/form-validations/FormikFields';
import { FormGroup } from 'reactstrap';
import * as Yup from 'yup';

const DatePicker = () => {
    const SignupSchema = Yup.object().shape({
        date: Yup.date().nullable().required('Date required'),
      });
      
    const onSubmit = (values, { setSubmitting }) => {
        const payload = {
          ...values,
          reactSelect: values.reactSelect.map((t) => t.value),
        };
        setTimeout(() => {
          console.log(JSON.stringify(payload, null, 2));
          setSubmitting(false);
        }, 1000);
      };
  return (
    <div>
        <Formik
          initialValues={{
                
                date: null
              }}
              validationSchema={SignupSchema}
              onSubmit={onSubmit}
        >
    {({
           
                setFieldValue,
                setFieldTouched,
                
                values,
                errors,
                touched,
             
              }) => (
      <FormGroup className="error-l-100 ml-3">
                  
                    {/* <FormikDatePicker
                      name="date"
                    //   value={values && values.date}
                      selected={ values.date}
                    //   onChange={setFieldValue}
                    onChange={(date) => {
          setFieldValue("date", date instanceof Date ? date.toISOString() : date);
          setFieldTouched("date", true);
        }}
                    //   onBlur={setFieldTouched}
                    onBlur={() => {
          setFieldTouched("date", true);
        }}
                    /> */}
                    <FormikDatePicker
                      name="date"
                      value={values.date}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                    {errors.date && touched.date ? (
                      <div className="invalid-feedback d-block">
                        {errors.date}
                      </div>
                    ) : null}
              
                  </FormGroup> 
                 
                  
                  
              )}
              
    </Formik> 
  
    </div>
  );
}

export default DatePicker;
