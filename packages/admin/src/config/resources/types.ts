export type FieldType = 'text' | 'number' | 'boolean' | 'date' | 'reference' | 'image' | 'file';

// Базовая конфигурация для всех полей
interface BaseConfig {
  source: string;
  label: string;
  disabled?: boolean;
  helperText?: string;
  placeholder?: string;
  required?: boolean;
}

// Базовая конфигурация для полей с reference
interface ReferenceConfig {
  reference: string;
  optionText?: string;
}

// Конфигурация для полей
export interface BaseFieldConfig extends BaseConfig {
  type: Exclude<FieldType, 'reference'>;
  validate?: Array<string>;
  defaultValue?: any;
  multiline?: boolean;
  format?: string;
}

export interface ReferenceFieldConfig extends BaseConfig, ReferenceConfig {
  type: 'reference';
  validate?: Array<string>;
  defaultValue?: any;
}

export type FieldConfig = BaseFieldConfig | ReferenceFieldConfig;

// Конфигурация для фильтров
export interface BaseFilterConfig extends BaseConfig {
  type: Exclude<FieldType, 'reference'>;
  alwaysOn?: boolean;
}

export interface ReferenceFilterConfig extends BaseConfig, ReferenceConfig {
  type: 'reference';
  alwaysOn?: boolean;
}

export type FilterConfig = BaseFilterConfig | ReferenceFilterConfig;

export interface ViewConfig {
  fields: FieldConfig[];
  filters?: FilterConfig[];
  actions?: string[];
  title?: string;
  aside?: boolean;
  redirect?: string;
}

export interface ResourceConfig {
  name: string;
  label: string;
  list: ViewConfig;
  create?: ViewConfig;
  edit?: ViewConfig;
  show?: ViewConfig;
  icon?: string;
  recordRepresentation?: string;
}
