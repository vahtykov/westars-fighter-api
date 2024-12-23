import {
  Edit,
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

export const UserEdit = () => (
  <Edit>
    <SimpleForm defaultValues={{} as UserFormData}>
      <TextInput source="firstName" validate={[required()]} />
      <TextInput source="lastName" validate={[required()]} />
      <TextInput source="email" validate={[required(), email()]} disabled />
      <PasswordInput
        source="password"
        validate={[minLength(8)]}
        helperText="Leave empty to keep current password"
      />
      <SelectInput
        source="role"
        choices={[
          { id: 'admin', name: 'Admin' },
          { id: 'user', name: 'User' },
          { id: 'trainer', name: 'Trainer' },
        ]}
        validate={[required()]}
      />
      <BooleanInput source="isActive" />
    </SimpleForm>
  </Edit>
);