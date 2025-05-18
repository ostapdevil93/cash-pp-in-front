import { createQuery, createMutation } from '@ebp/mfe-utils';
import { MaybeRef } from 'vue';
import { CoreApi } from '@ebp/core';
import { Action, Pagable } from '../types';

export interface GetDataResponse<TResponse> {
  actions: Action[],
  data: TResponse,
  details: CoreApi.DetailsPayload | null,
}

export const getDataTableQuery = async <TResponse extends Pagable<object>>(
  url: string,
  paginationParams: Record<string, any>,
  fieldFilters: any[],
): Promise<TResponse['data']> => {
  const res = await createQuery<typeof paginationParams, TResponse>({
    url,
    method: 'POST',
    data: {
      fieldFilters,
    },
    params: paginationParams,
    queryKey: `GET_DATA_TABLE_QUERY_KEY_${JSON.stringify(fieldFilters)}_${JSON.stringify(paginationParams)}`,
  });
  return res.data;
};

export const getByExKeyQuery = async <TResponse>(
  url: string,
  exKey: string,
): Promise<GetDataResponse<TResponse>> => createQuery<null, GetDataResponse<TResponse>>({
  url,
  queryKey: `GET_BY_EX_KEY_QUERY_KEY_${exKey}`,
});

export const getDraft = async <TResponse>(
  url: string,
): Promise<GetDataResponse<TResponse>> => createQuery<null, GetDataResponse<TResponse>>({
  url,
  queryKey: 'GET_DRAFT',
});

export const createDataInfo = async <TData, TResponse>(
  url: string,
  value: TData,
): Promise<GetDataResponse<TResponse>> => createQuery<null, GetDataResponse<TResponse>>({
  url,
  method: 'POST',
  data: {
    document: value,
  },
  queryKey: `POST_CREATE_DATA_INFO_QUERY_KEY_${JSON.stringify(document)}`,
});

export const editDataInfo = async <TData, TResponse>(
  url: string,
  value: TData,
  exKey: string,
): Promise<GetDataResponse<TResponse>> => createQuery<null, GetDataResponse<TResponse>>({
  url,
  method: 'PUT',
  data: {
    document: value,
  },
  queryKey: `PUT_EDIT_DATA_INFO_QUERY_KEY_${exKey}_${JSON.stringify(document)}`,
});

export const executeDataInfo = async <TData>(
  url: string,
  exKey: string,
): Promise<TData> => createQuery<null, TData>({
  url,
  method: 'POST',
  queryKey: `POST_EXECUTE_DATA_INFO_QUERY_KEY_${exKey}`,
});

export const uploadDataXML = async <TData extends string | Blob>(
  url: string,
  value: TData,
): Promise<GetDataResponse<TData>> => {
  const formData = new FormData();
  formData.append('file', value);

  return createMutation<FormData, GetDataResponse<TData>>(
    {
      url,
      method: 'POST',
    },
  )(formData);
};

export const dictionaryQuery = async <TData>(url: string): Promise<TData> => createQuery<null, TData>({
  url,
  method: 'POST',
  queryKey: 'POST_DICTIONARY_QUERY_KEY',
});

export const classifyQuery = async <TData>(
  url: string,
  value: TData,
): Promise<boolean> => createQuery<null, boolean>({
  url,
  method: 'POST',
  data: {
    ...value,
  } as MaybeRef<Record<string, any>>,
  queryKey: `POST_CLASSIFY_KEY_${JSON.stringify(value)}`,
});

export const getLinksByExKeyQuery = async <TResponse>(
  url: string,
  exKey: string,
): Promise<TResponse> => createQuery<null, TResponse>({
  url,
  queryKey: `GET_LINKS_BY_EX_KEY_QUERY_KEY_${exKey}`,
});

export const sendSvapRequest = async <TData>(
  url: string,
  exKey: string,
): Promise<GetDataResponse<TData>> => createQuery<null, GetDataResponse<TData>>({
  url,
  method: 'POST',
  queryKey: `POST_SEND_SVAP_REQUEST_QUERY_KEY_${exKey}`,
});

export const downloadXLS = async <TResponse>(
  url: string,
  value: string[],
): Promise<TResponse> => createQuery<null, TResponse>({
  url,
  method: 'POST',
  data: {
    value,
  },
  queryKey: 'POST_DOWNLOAD_XLS',
});

export const getJournalQuery = async <TResponse extends Pagable<object>>(
  url: string,
  paginationParams: Record<string, any>,
  fieldFilters: any[],
): Promise<TResponse['data']> => {
  const res = await createQuery<typeof paginationParams, TResponse>({
    url,
    method: 'GET',
    params: paginationParams,
    queryKey: `HISTORY_TABLE_QUERY_KEY_${JSON.stringify(fieldFilters)}_${JSON.stringify(paginationParams)}`,
  });
  return res.data;
};
