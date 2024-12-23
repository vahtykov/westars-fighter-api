import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  BooleanInput,
  PasswordInput,
  required,
  email,
  minLength,
} from 'react-admin';
import { UserFormData } from '../types';

export const UserCreate = () => (
  <Create>
    <SimpleForm defaultValues={{} as UserFormData}>
      <TextInput source="firstName" validate={[required()]} />
      <TextInput source="lastName" validate={[required()]} />
      <TextInput source="email" validate={[required(), email()]} />
      <PasswordInput source="password" validate={[required(), minLength(8)]} />
      <SelectInput
        source="role"
        choices={[
          { id: 'admin', name: 'Admin' },
          { id: 'user', name: 'User' },
          { id: 'trainer', name: 'Trainer' },
        ]}
        validate={[required()]}
      />
      <BooleanInput source="isActive" defaultValue={true} />
    </SimpleForm>
  </Create>
);