import { getPrintFormFileQuery, getPrintFormDataQuery, PrintFormApi } from '@ebp/core';
import { createMutation } from '@ebp/mfe-utils';
import {
  createDataInfo,
  editDataInfo,
  getByExKeyQuery,
  getDataTableQuery,
  executeDataInfo,
  getDraft,
  uploadDataXML,
  getLinksByExKeyQuery,
  sendSvapRequest,
  downloadXLS,
  GetDataResponse, getJournalQuery,
} from '../base-api';
import { ActionExecutePayload, ActionExecuteResponse, Pagable } from '../types';
import { BASE_URLS } from '..';

const DATA_TABLE_URL_CASH_PP_IN = `${BASE_URLS.CBS}doc-cs-0004/search`;
export const DATA_INFO_BY_EX_KEY_URL_CASH_PP_IN = `${BASE_URLS.CBS}doc-cs-0004`;
export const DATA_LINKS_TABLE_BY_EX_KEY_URL = `${BASE_URLS.LINKS}search`;

export enum ActionCode {
  PREPARED = 'cs-poi-draft-to-prepared',
  MARKED = 'cs-poi-unclassified-to-marked-as-unclarified',
  UNCLASSIFIED = 'cs-poi-awaitingconfirm-to-unclassified',
  UNMARKED = 'cs-poi-marked-as-unclarified-to-unclassified',
  DELETED = 'cs-poi-draft-to-deleted',
}

export const search = async <TResponse extends Pagable<object>>(
  paginationParams: Record<string, any>,
  fieldFilters: any[],
  fastFilter: any[],
): Promise<TResponse['data']> => getDataTableQuery(DATA_TABLE_URL_CASH_PP_IN, paginationParams, [...fieldFilters, ...fastFilter]);

export const get = async <TResponse>(
  exKey: string,
): Promise<GetDataResponse<TResponse>> => getByExKeyQuery(`${DATA_INFO_BY_EX_KEY_URL_CASH_PP_IN}/${exKey}`, exKey);

export const draft = async <TResponse>(): Promise<GetDataResponse<TResponse>> => getDraft(`${DATA_INFO_BY_EX_KEY_URL_CASH_PP_IN}/draft`);

export const create = async <TData, TResponse>(
  document: TData,
): Promise<GetDataResponse<TResponse>> => createDataInfo(DATA_INFO_BY_EX_KEY_URL_CASH_PP_IN, document);

export const edit = async <TData, TResponse>(
  document: TData,
  exKey: string,
): Promise<GetDataResponse<TResponse>> => editDataInfo(`${DATA_INFO_BY_EX_KEY_URL_CASH_PP_IN}/${exKey}`, document, exKey);

export const execute = async <TResponse>(
  exKey: string,
  code: ActionCode,
): Promise<GetDataResponse<TResponse>> => executeDataInfo(`${DATA_INFO_BY_EX_KEY_URL_CASH_PP_IN}/${exKey}/execute/${code}`, exKey);

export const createPOReturn = async <TResponse>(
  exKey: string,
): Promise<GetDataResponse<TResponse>> => executeDataInfo(`${DATA_INFO_BY_EX_KEY_URL_CASH_PP_IN}/${exKey}/create-po-return`, exKey);

export const uploadXML = async <TData extends string | Blob>(
  value: TData,
): Promise<GetDataResponse<TData>> => uploadDataXML(`${DATA_INFO_BY_EX_KEY_URL_CASH_PP_IN}/import`, value);

export const getLinks = async <TData>(
  exKey: string,
  objectCode: string,
): Promise<TData> => getLinksByExKeyQuery(`${DATA_LINKS_TABLE_BY_EX_KEY_URL}?exKey=${exKey}&objectCode=${objectCode}`, exKey);

export const getPfData: PrintFormApi.GetPfData = async (exKey: string) => getPrintFormDataQuery({
  baseUrl: `${DATA_INFO_BY_EX_KEY_URL_CASH_PP_IN}`,
  exKey,
});

export const getPfFile: PrintFormApi.GetPfFile = async (params) => getPrintFormFileQuery({
  baseUrl: `${DATA_INFO_BY_EX_KEY_URL_CASH_PP_IN}`,
  ...params,
});

export const sendSVAP = async <TData>(
  exKey: string,
): Promise<GetDataResponse<TData>> => sendSvapRequest(
  `${DATA_INFO_BY_EX_KEY_URL_CASH_PP_IN}/${exKey}/send-svap-request`,
  exKey,
);

export const download = async <TResponse>(
  exKeys: string[],
): Promise<TResponse> => downloadXLS(`${DATA_INFO_BY_EX_KEY_URL_CASH_PP_IN}/xls`, exKeys);

export const searchJournal = async <TResponse extends Pagable<object>>(
  exKey: string | null | undefined,
  paginationParams: Record<string, any>,
  fieldFilters: any[],
): Promise<TResponse['data']> => getJournalQuery(`${DATA_INFO_BY_EX_KEY_URL_CASH_PP_IN}/${exKey}/journal`, paginationParams, fieldFilters);

export function actionMutation(
  { exKey, actionCode }: { exKey: string | number, actionCode: string},
) {
  return createMutation<ActionExecutePayload, ActionExecuteResponse>({
    url: `${DATA_INFO_BY_EX_KEY_URL_CASH_PP_IN}/${exKey}/execute/${actionCode}`,
    method: 'POST',
    // invalidateQueries: [[GET_CBS_QUERY_KEY]],
  });
}
