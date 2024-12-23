import { ResourceConfig } from './types';

export const trainingsConfig: ResourceConfig = {
  name: 'trainings',
  label: 'Тренировки',
  list: {
    fields: [
      {
        source: 'name',
        type: 'text',
        label: 'Название',
      },
      {
        source: 'title',
        type: 'text',
        label: 'Заголовок',
      },
      {
        source: 'levelId',
        type: 'reference',
        reference: 'training/levels',
        label: 'Уровень',
        optionText: 'name'
      },
      {
        source: 'isPublished',
        type: 'boolean',
        label: 'Опубликовано',
      },
      {
        source: 'createdAt',
        type: 'date',
        label: 'Дата создания',
      },
    ],
    filters: [
      {
        source: 'levelId',
        type: 'reference',
        reference: 'training-levels',
        label: 'Уровень',
        optionText: 'name',
        alwaysOn: true
      },
      {
        source: 'isPublished',
        type: 'boolean',
        label: 'Опубликовано',
        alwaysOn: true
      },
    ],
  },
  create: {
    fields: [
      {
        source: 'name',
        type: 'text',
        label: 'Название',
        validate: ['required'],
      },
      {
        source: 'title',
        type: 'text',
        label: 'Заголовок',
      },
      {
        source: 'description',
        type: 'text',
        multiline: true,
        label: 'Описание',
      },
      {
        source: 'levelId',
        type: 'reference',
        reference: 'training-levels',
        label: 'Уровень',
      },
      {
        source: 'isPublished',
        type: 'boolean',
        label: 'Опубликовано',
        defaultValue: false,
      },
    ],
  },
  edit: {
    fields: [
      {
        source: 'name',
        type: 'text',
        label: 'Название',
        validate: ['required'],
      },
      {
        source: 'title',
        type: 'text',
        label: 'Заголовок',
      },
      {
        source: 'description',
        type: 'text',
        multiline: true,
        label: 'Описание',
      },
      {
        source: 'levelId',
        type: 'reference',
        reference: 'training-levels',
        label: 'Уровень',
      },
      {
        source: 'isPublished',
        type: 'boolean',
        label: 'Опубликовано',
      },
    ],
  },
};
