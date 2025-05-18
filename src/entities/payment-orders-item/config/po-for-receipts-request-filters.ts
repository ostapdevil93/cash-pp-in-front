import { CommonFilterTypes } from '@ebp/core';
import { PaymentOrderKey } from '../types';

export const getPoForReceiptsRequestFilters = (cardNumber?: string) => {
  const filters: CommonFilterTypes.FieldFilterItem[] = [
    {
      fieldName: PaymentOrderKey.status,
      value: 'UNCLASSIFIED',
      searchType: 'EQUALS',
    },
  ];
  if (cardNumber) {
    filters.push({
      fieldName: PaymentOrderKey.recipientCardNumber,
      value: cardNumber,
      searchType: 'EQUALS',
    });
  }
  return filters;
};
