import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const TrainingList = () => (
  <List>
    <Datagrid>
      <TextField source="name" />
      <TextField source="title" />
      <TextField source="levelId" />
      <BooleanField source="isPublished" />
      <DateField source="createdAt" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);