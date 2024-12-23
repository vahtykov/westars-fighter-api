import { 
  DataProvider,
  fetchUtils,
  RaRecord,
  GetListParams,
  GetOneParams,
  GetManyParams,
  GetManyReferenceParams,
  CreateParams,
  UpdateParams,
  UpdateManyParams,
  DeleteParams,
  DeleteManyParams
} from 'react-admin';
import { stringify } from 'query-string';
import { storage } from '../utils/storage';
import config from '../config';
import { trainingsMapper } from '../features/trainings/mapper';

const apiUrl = `${config.api.host}${config.api.baseUrl}`;

const httpClient = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = storage.getItem('authTokenKey');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const getPaginationQuery = async (page: number, perPage: number) => {
  if (page === 1) return { limit: perPage };
  const offset = (page - 1) * perPage;
  return { offset, limit: perPage };
};

const resourceMappers: Record<string, any> = {
  trainings: trainingsMapper
};

const mapResponse = (resource: string, method: string, json: any) => {
  const mapper = resourceMappers[resource];
  if (mapper && mapper[method]) {
    return mapper[method](json);
  }
  
  // Default mapping if no specific mapper exists
  return {
    data: Array.isArray(json) ? json : (json.items || json),
    total: json.total || 0
  };
};

export const dataProvider: DataProvider = {
  getList: async <RecordType extends RaRecord>(
    resource: string,
    params: GetListParams
  ) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    
    const query = {
      ...await getPaginationQuery(page, perPage),
      sort: JSON.stringify([field, order]),
      filter: JSON.stringify(params.filter),
    };

    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url);

    return mapResponse(resource, 'getList', json);
  },

  getOne: async <RecordType extends RaRecord>(
    resource: string,
    params: GetOneParams<RecordType>
  ) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`);
    return mapResponse(resource, 'getOne', json);
  },

  getMany: async <RecordType extends RaRecord>(
    resource: string,
    params: GetManyParams
  ) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url);
    return mapResponse(resource, 'getMany', json);
  },

  getManyReference: async <RecordType extends RaRecord>(
    resource: string,
    params: GetManyReferenceParams
  ) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    
    const query = {
      ...await getPaginationQuery(page, perPage),
      sort: JSON.stringify([field, order]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };

    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url);

    return {
      data: json.items as RecordType[],
      total: json.total,
    };
  },

  create: async <RecordType extends RaRecord>(
    resource: string,
    params: CreateParams<RecordType>
  ) => {
    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    });
    return { data: json as RecordType };
  },

  update: async <RecordType extends RaRecord>(
    resource: string,
    params: UpdateParams<RecordType>
  ) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    });
    return { data: json as RecordType };
  },

  updateMany: async <RecordType extends RaRecord>(
    resource: string,
    params: UpdateManyParams<RecordType>
  ) => {
    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: 'PUT',
      body: JSON.stringify({ ids: params.ids, data: params.data }),
    });
    return { data: params.ids };
  },

  delete: async <RecordType extends RaRecord>(
    resource: string,
    params: DeleteParams<RecordType>
  ) => {
    await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    });
    return { data: params.previousData as RecordType };
  },

  deleteMany: async <RecordType extends RaRecord>(
    resource: string,
    params: DeleteManyParams<RecordType>
  ) => {
    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: 'DELETE',
      body: JSON.stringify({ ids: params.ids }),
    });
    return { data: params.ids };
  },
};