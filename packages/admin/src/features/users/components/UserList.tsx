import {
  List,
  Datagrid,
  TextField,
  EmailField,
  BooleanField,
  DateField,
  SearchInput,
  SelectInput,
  Filter,
} from 'react-admin';
import { UserRole } from '../types';

const userFilters = [
  <SearchInput source="q" alwaysOn />,
  <SelectInput
    source="role"
    choices={[
      { id: 'admin', name: 'Admin' },
      { id: 'user', name: 'User' },
      { id: 'trainer', name: 'Trainer' },
    ]}
  />,
  <SelectInput
    source="isActive"
    choices={[
      { id: true, name: 'Active' },
      { id: false, name: 'Inactive' },
    ]}
  />,
];

export const UserList = () => (
  <List filters={userFilters}>
    <Datagrid rowClick="edit">
      <TextField source="firstName" />
      <TextField source="lastName" />
      <EmailField source="email" />
      <TextField source="role" />
      <BooleanField source="isActive" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);
