import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { MyCheckbox, MySelect, MyTextInput } from '../components';
import '../styles/styles.css';

export const FormikAbstraction = () => {
  return (
    <div>
      <h1>Formik Abstraction</h1>

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
            <MyTextInput
              label="First Name"
              name="firstName"
              placeholder="First Name"
            />

            <MyTextInput
              label="Last Name"
              name="lastName"
              placeholder="last Name"
            />

            <MyTextInput
              label="Email"
              name="email"
              placeholder="Email"
              type="email"
            />

            <MySelect label="Job" name="jobType">
              <option value="">Select Job Type</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="it-senior">IT-SENIOR</option>
              <option value="it-junior">IT-JUNIOR</option>
            </MySelect>
            <MyCheckbox label="Terms & Conditions" name="terms" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
