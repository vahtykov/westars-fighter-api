import { Resolver } from 'react-hook-form';
import * as yup from 'yup';
import { UserFormData } from './types';

const userSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().when('$isEdit', {
    is: true,
    then: (schema: yup.StringSchema) => schema.min(8, 'Password must be at least 8 characters'),
    otherwise: (schema: yup.StringSchema) => schema.required('Password is required').min(8),
  }),
  role: yup.string().oneOf(['admin', 'user', 'trainer']).required('Role is required'),
  isActive: yup.boolean(),
});

export const UserFormValidation: Resolver<UserFormData> = async (data) => {
  try {
    await userSchema.validate(data, { abortEarly: false });
    return { values: data, errors: {} };
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return {
        values: {},
        errors: err.inner.reduce(
          (errors, error) => ({
            ...errors,
            [error.path!]: { message: error.message, type: 'validation' },
          }),
          {}
        ),
      };
    }
    return { values: {}, errors: {} };
  }
};