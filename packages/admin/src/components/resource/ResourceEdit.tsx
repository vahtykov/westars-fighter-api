import { Edit, SimpleForm } from 'react-admin';
import { ResourceFormField } from './ResourceField';
import { ResourceConfig } from '../../config/resources/types';

export const ResourceEdit = ({ config }: { config: ResourceConfig }) => {
  if (!config.edit) return null;

  return (
    <Edit>
      <SimpleForm>
        {config.edit.fields.map(field => (
          <ResourceFormField
            key={`edit-${field.source}`}
            field={field}
          />
        ))}
      </SimpleForm>
    </Edit>
  );
};
