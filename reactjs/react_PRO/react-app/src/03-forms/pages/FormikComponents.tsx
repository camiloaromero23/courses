import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../styles/styles.css';

export const FormikComponents = () => {
  return (
    <div>
      <h1>Formik Components</h1>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          terms: false,
          jobType: '',
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(10, 'Must be 10 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          terms: Yup.boolean().oneOf(
            [true],
            'Should accept terms & conditions',
          ),
          jobType: Yup.string()
            .notOneOf(['it-junior'], 'Should not be IT Junior')
            .required('Required'),
        })}
      >
        {(formik) => (
          <Form>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" type="text" placeholder="First Name" />
            <ErrorMessage name="firstName" component="span" />
            <br />
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" type="text" />
            <ErrorMessage name="lastName" component="span" />
            <br />
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="span" />
            <br />
            <label htmlFor="jobType">Job</label>
            <Field name="jobType" as="select">
              <option value="">Select Job Type</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="it-senior">IT-SENIOR</option>
              <option value="it-junior">IT-JUNIOR</option>
            </Field>
            <ErrorMessage name="jobType" component="span" />
            <br />
            <label>
              Terms & Conditions
              <Field name="terms" type="checkbox" />
            </label>
            <ErrorMessage name="terms" component="span" />
            <br />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
