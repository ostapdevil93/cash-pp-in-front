import { CellComponent, StatusFormatter, UniversalFormatter } from '@ebp/vue-ui-lib';
import { h } from 'vue';
import { DocumentStatus, STATUS_NAME, STATUS_COLOR } from '@/shared/config';
import { PaymentOrdersDocumentForTable } from '../model';

export const paymentStatusFormatter = (cell: CellComponent) => {
  const data = cell.getRow().getData() as PaymentOrdersDocumentForTable;
  if (!data.accountReflectionLight) {
    return UniversalFormatter(h(StatusFormatter, {
      title: STATUS_NAME[DocumentStatus.DRAFT],
      color: STATUS_COLOR.DRAFT,
    }));
  }
  return UniversalFormatter(h(StatusFormatter, {
    title: data.accountReflectionLight.info,
    color: data.accountReflectionLight.color,
  }));
};

export const paymentStatusNameFormatter = (cell: CellComponent) => {
  const data = cell.getRow().getData() as PaymentOrdersDocumentForTable;
  if (!data.status) {
    return STATUS_NAME[DocumentStatus.DRAFT];
  }
  return STATUS_NAME[data.status];
};
