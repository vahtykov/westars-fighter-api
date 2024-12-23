import { ResourceConfig } from './types';

export const usersConfig: ResourceConfig = {
  name: 'users',
  label: 'Пользователи',
  list: {
    fields: [
      { source: 'email', type: 'text', label: 'Email' },
      { source: 'firstName', type: 'text', label: 'Имя' },
      { source: 'lastName', type: 'text', label: 'Фамилия' },
      { source: 'role', type: 'text', label: 'Роль' },
    ],
  },
  create: {
    fields: [
      {
        source: 'email',
        type: 'text',
        label: 'Email',
        validate: ['required', 'email'],
        fullWidth: true,
      },
      {
        source: 'password',
        type: 'text',
        label: 'Пароль',
        validate: [
          'required',
          { type: 'minLength', value: 8, message: 'Минимум 8 символов' },
        ],
      },
      {
        source: 'firstName',
        type: 'text',
        label: 'Имя',
        validate: ['required'],
      },
      {
        source: 'lastName',
        type: 'text',
        label: 'Фамилия',
        validate: ['required'],
      },
    ],
  },
  edit: {
    fields: [
      {
        source: 'email',
        type: 'text',
        label: 'Email',
        disabled: true,
      },
      {
        source: 'firstName',
        type: 'text',
        label: 'Имя',
        validate: ['required'],
      },
      {
        source: 'lastName',
        type: 'text',
        label: 'Фамилия',
        validate: ['required'],
      },
    ],
  },
};
