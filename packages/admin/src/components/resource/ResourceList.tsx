import {
  List,
  Datagrid,
  EditButton,
  DeleteButton,
  TextInput,
  SelectInput,
  BooleanInput,
  DateInput,
  ReferenceInput,
  FilterProps
} from 'react-admin';
import { ReactElement } from 'react';
import { ResourceListField } from './ResourceField';
import {
  ResourceConfig,
  FilterConfig,
  ReferenceFilterConfig
} from '../../config/resources/types';
import React from 'react';

const isReferenceFilter = (filter: FilterConfig): filter is ReferenceFilterConfig => {
  return filter.type === 'reference';
};

const getFilterComponent = (filter: FilterConfig): ReactElement => {
  const commonProps = {
    source: filter.source,
    label: filter.label,
    alwaysOn: filter.alwaysOn
  };

  switch (filter.type) {
    case 'text':
      return <TextInput {...commonProps} />;
    case 'reference':
      if (isReferenceFilter(filter)) {
        return (
          <ReferenceInput
            source={filter.source}
            reference={filter.reference}
            label={filter.label}
            alwaysOn={filter.alwaysOn}
          >
            <SelectInput optionText={filter.optionText || "name"} />
          </ReferenceInput>
        );
      }
      return <TextInput {...commonProps} />;
    case 'boolean':
      return <BooleanInput {...commonProps} />;
    case 'date':
      return <DateInput {...commonProps} />;
    default:
      return <TextInput {...commonProps} />;
  }
};

export const ResourceList = ({ config }: { config: ResourceConfig }) => {
  const filters = React.useMemo(() =>
    config.list.filters?.map(filter => getFilterComponent(filter)) || []
    , [config.list.filters]);

  return (
    <List filters={filters}>
      <Datagrid rowClick="edit">
        {config.list.fields.map(field => (
          <ResourceListField
            key={`field-${config.name}-${field.source}`}
            field={field}
          />
        ))}
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};
