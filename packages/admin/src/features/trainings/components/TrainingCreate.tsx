import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
} from 'react-admin';

export const TrainingCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="title" />
      <TextInput multiline source="description" />
      <ReferenceInput source="levelId" reference="training-levels">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <BooleanInput source="isPublished" defaultValue={false} />
    </SimpleForm>
  </Create>
);