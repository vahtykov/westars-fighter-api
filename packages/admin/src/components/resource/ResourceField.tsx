import {
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
  TextInput,
  DateInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
  required,
  email,
  minLength,
  maxLength,
  minValue,
  maxValue,
  regex,
} from 'react-admin';
import { FieldConfig, ValidationConfig } from '../../config/resources/types';

const getValidation = (validates: (string | ValidationConfig)[] = []) => {
  return validates.map(validate => {
    if (typeof validate === 'string') {
      switch (validate) {
        case 'required':
          return required();
        case 'email':
          return email();
        default:
          return undefined;
      }
    } else {
      switch (validate.type) {
        case 'minLength':
          return minLength(validate.value, validate.message);
        case 'maxLength':
          return maxLength(validate.value, validate.message);
        case 'min':
          return minValue(validate.value, validate.message);
        case 'max':
          return maxValue(validate.value, validate.message);
        case 'regex':
          return regex(validate.value, validate.message);
        default:
          return undefined;
      }
    }
  }).filter(Boolean);
};

export const ResourceListField = ({ field }: { field: FieldConfig }) => {
  switch (field.type) {
    case 'date':
      return <DateField source={field.source} label={field.label} />;
    case 'boolean':
      return <BooleanField source={field.source} label={field.label} />;
    case 'reference':
      return (
        <ReferenceField
          source={field.source}
          reference={field.reference!}
          label={field.label}
        >
          <TextField source="name" />
        </ReferenceField>
      );
    default:
      return <TextField source={field.source} label={field.label} />;
  }
};

export const ResourceFormField = ({ field }: { field: FieldConfig }) => {
  const validate = getValidation(field.validate);

  switch (field.type) {
    case 'date':
      return <DateInput source={field.source} label={field.label} validate={validate} />;
    case 'boolean':
      return (
        <BooleanInput
          source={field.source}
          label={field.label}
          defaultValue={field.defaultValue}
        />
      );
    case 'reference':
      return (
        <ReferenceInput source={field.source} reference={field.reference!} label={field.label}>
          <SelectInput optionText="name" validate={validate} />
        </ReferenceInput>
      );
    default:
      return (
        <TextInput
          source={field.source}
          label={field.label}
          multiline={field.multiline}
          validate={validate}
        />
      );
  }
};
