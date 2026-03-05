import * as yup from 'yup';

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email('Please provide a valid email address.')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

export const signupSchema = yup
  .object({
    name: yup.string().required('Name is required'),
    email: yup
      .string()
      .required('Email is required')
      .email('Please provide a valid email address.')
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address.'
      ),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
  })
  .required();

export const forgotPasswordSchema = yup
  .object({
    email: yup.string().email('Email must be a valid email').required('This field is required'),
  })
  .required();
