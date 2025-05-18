import { type ActiveFilterConfig } from '@ebp/vue-ui-lib';
import { GetUrlQueryStringConfig } from '@ebp/utils';
import { AppFilterVocabulary } from '../vocabulary';
import { OrderFilterKey, FilterType } from '../types';

export const filterConfig: ActiveFilterConfig<FilterType> = [
  { key: OrderFilterKey.docNumber, type: 'INPUT', label: AppFilterVocabulary.docNumber },
  { key: OrderFilterKey.docDateFrom, type: 'DATE', label: AppFilterVocabulary.dataPeriod },
  { key: OrderFilterKey.docDateTo, type: 'DATE', label: AppFilterVocabulary.dataPeriod },
  { key: OrderFilterKey.createdTsFrom, type: 'DATE', label: AppFilterVocabulary.createdTs },
  { key: OrderFilterKey.createdTsTo, type: 'DATE', label: AppFilterVocabulary.createdTs },
  { key: OrderFilterKey.amount, type: 'INPUT', label: AppFilterVocabulary.amount },
  { key: OrderFilterKey.docType, type: 'INPUT', label: AppFilterVocabulary.docType },
  { key: OrderFilterKey.recipientRegistryCode, type: 'INPUT', label: AppFilterVocabulary.recipientRegistryCode },
  { key: OrderFilterKey.recipientPersonalAccount, type: 'INPUT', label: AppFilterVocabulary.recipientPersonalAccount },
  { key: OrderFilterKey.recipientCardNumber, type: 'INPUT', label: AppFilterVocabulary.recipientCardNumber },
  { key: OrderFilterKey.recipientName, type: 'INPUT', label: AppFilterVocabulary.recipientName },
  { key: OrderFilterKey.recipientBankAccount, type: 'INPUT', label: AppFilterVocabulary.recipientBankAccount },
  { key: OrderFilterKey.recipientBankName, type: 'INPUT', label: AppFilterVocabulary.recipientBankName },
  { key: OrderFilterKey.payerName, type: 'INPUT', label: AppFilterVocabulary.payerName },
  { key: OrderFilterKey.payerBankAccount, type: 'INPUT', label: AppFilterVocabulary.payerBankAccount },
  { key: OrderFilterKey.payerBankName, type: 'INPUT', label: AppFilterVocabulary.payerBankName },
  { key: OrderFilterKey.status, type: 'MULTIPLE_SELECT', label: AppFilterVocabulary.status },
];

export const URL_CONFIG: GetUrlQueryStringConfig = { fields: { clientExKey: { include: ['label', 'value'] } } };
