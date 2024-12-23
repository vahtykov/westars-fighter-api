import { Create, SimpleForm } from 'react-admin';
import { ResourceFormField } from './ResourceField';
import { ResourceConfig } from '../../config/resources/types';

export const ResourceCreate = ({ config }: { config: ResourceConfig }) => {
  if (!config.create) return null;

  return (
    <Create>
      <SimpleForm>
        {config.create.fields.map(field => (
          <ResourceFormField
            key={`create-${field.source}`}
            field={field}
          />
        ))}
      </SimpleForm>
    </Create>
  );
};
