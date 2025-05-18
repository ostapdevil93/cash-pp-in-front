import { CommonFilterTypes } from '@ebp/core';
import { DocumentStatus } from '@/shared/config';
import { PaymentOrderKey } from '../types';

export const getPaymentOrdersRequestFilters = (fastFilterOption: string) => {
  const filters: CommonFilterTypes.FieldFilterItem[] = [];
  if (fastFilterOption !== 'all') {
    switch (fastFilterOption) {
      case 'classified':
        filters.push({
          fieldName: PaymentOrderKey.status,
          value: [
            DocumentStatus.AWAITING_CONFIRM,
            DocumentStatus.CLASSIFIED,
            DocumentStatus.TOFK_EXECUTED,
          ],
          searchType: 'IN',
        });
        break;
      case 'unclassified':
        filters.push({
          fieldName: PaymentOrderKey.status,
          value: DocumentStatus.UNCLASSIFIED,
          searchType: 'EQUALS',
        });
        break;
      case 'unknown':
        filters.push({
          fieldName: PaymentOrderKey.status,
          value: [
            DocumentStatus.MARKED_AS_UNCLARIFIED,
            DocumentStatus.RETURNED_TO_PAYER,
            DocumentStatus.PREPARED_TO_RETURN,
            DocumentStatus.REJECTED_BANK,
          ],
          searchType: 'IN',
        });
        break;
      default:
        break;
    }
  }
  return filters;
};
