import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { MyTextInput } from '../components';
import '../styles/styles.css';

export const RegisterFormikPage = () => {
  return (
    <div>
      <h1>Register Formik</h1>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, 'Name must be at least 2 characters')
            .max(15, 'Name must be 15 characters or less')
            .required('Name is required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
        })}
      >
        {({ handleReset }) => (
          <Form>
            <MyTextInput label={'Name'} name={'name'} placeholder="Name" />
            <MyTextInput
              label={'Email'}
              name={'email'}
              type="email"
              placeholder="Email"
            />
            <MyTextInput
              label={'Password'}
              name={'password'}
              type="password"
              placeholder="******"
            />
            <MyTextInput
              label={'Confirm Password'}
              name={'confirmPassword'}
              type="password"
              placeholder="******"
            />
            <button type="submit">Create</button>
            <button type="button" onClick={handleReset}>
              Reset Form
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
