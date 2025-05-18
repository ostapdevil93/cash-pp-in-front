import { classifyQuery, getDataTableQuery } from '../base-api/base-api';
import { BASE_URLS, Pagable } from '..';

export const DATA_TABLE_URL_PO_FOR_RECEIPTS = `${BASE_URLS.CBS}doc-cs-0004/search`;
export const DATA_TABLE_URL_UNUSED_FUNDS = `${BASE_URLS.CBS}doc-cs-0001/search`;
export const CLASSIFY = `${BASE_URLS.CBS}doc-cs-0004/classification-form/classify`;

export const searchUnusedFunds = async <TResponse extends Pagable<object>>(
  paginationParams: Record<string, any>,
  fieldFilters: any[],
): Promise<TResponse['data']> => getDataTableQuery(DATA_TABLE_URL_UNUSED_FUNDS, paginationParams, fieldFilters);

export const searchPoForReceipts40116 = async <TResponse extends Pagable<object>>(
  paginationParams: Record<string, any>,
  fieldFilters: any[],
): Promise<TResponse['data']> => getDataTableQuery(DATA_TABLE_URL_PO_FOR_RECEIPTS, paginationParams, fieldFilters);

export const classify = async (
  params: Record<string, any>,
): Promise<boolean> => classifyQuery(CLASSIFY, params);
