import { useForm } from '../hooks/useForm';
import '../styles/styles.css';

interface RegisterData {
  name: string;
  email: string;
  password1: string;
  password2: string;
}
export const RegisterPage = () => {
  const {
    formData,
    resetForm,
    onChange,
    isValidEmail,
    name,
    email,
    password1,
    password2,
  } = useForm<RegisterData>({
    name: '',
    email: '',
    password1: '',
    password2: '',
  });

  // const { name, email, password1, password2 } = registerData;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <h1>Register Page</h1>
      <form noValidate onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
          className={`${name.trim().length <= 0 && 'has-error'}`}
        />
        {name.trim().length <= 0 && <span>This field is required</span>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          className={`${!isValidEmail(email) && 'has-error'}`}
        />
        {!isValidEmail(email) && <span>Invalid email</span>}
        <input
          type="password"
          name="password1"
          placeholder="Password"
          value={password1}
          onChange={onChange}
          className={`${password1.trim().length <= 0 && 'has-error'}`}
        />
        {password1.trim().length <= 0 && <span>This field is required</span>}
        {password1.trim().length < 6 && password1.trim().length > 0 && (
          <span>Password has to be greater than 6 character long</span>
        )}
        <input
          type="password"
          name="password2"
          placeholder="Repeat Password"
          value={password2}
          onChange={onChange}
          className={`${password2.trim().length <= 0 && 'has-error'}`}
        />
        {password2.trim().length <= 0 && <span>This field is required</span>}
        {password2.trim().length > 0 && password1 !== password2 && (
          <span>Passwords do not match</span>
        )}
        <button type="submit">Create</button>
        <button type="button" onClick={resetForm}>
          Reset Form
        </button>
      </form>
    </div>
  );
};
