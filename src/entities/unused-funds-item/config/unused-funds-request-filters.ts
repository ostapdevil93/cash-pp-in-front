import { CommonFilterTypes } from '@ebp/core';
import { UnusedFundsTableKey } from '../types';

export const getUnusedFundsRequestFilters = (recipientCardNumber?: string) => {
  const filters: CommonFilterTypes.FieldFilterItem[] = [
    {
      fieldName: UnusedFundsTableKey.isVerified,
      value: 'false',
      searchType: 'EQUALS',
    },
    {
      fieldName: UnusedFundsTableKey.operationTypeCode,
      value: '1',
      searchType: 'EQUALS',
    },
  ];
  if (recipientCardNumber) {
    filters.push({
      fieldName: UnusedFundsTableKey.cardNumber,
      value: recipientCardNumber,
      searchType: 'EQUALS',
    });
  }
  return filters;
};
