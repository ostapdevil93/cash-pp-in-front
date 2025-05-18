import {
  ColumnDefinition,
  DateTimeFormatter,
  FormatterParams,
  LinkFormatter,
  LongTextFormatter,
  MoneyFormatter,
  ContextMenuFormatter, CellComponent,
} from '@ebp/vue-ui-lib';
import { Router } from 'vue-router';
import { formatDateInTimeZone } from '@ebp/utils';
import { _paths } from '@/shared/config';
import { VLongTextWrapper } from '@/shared/ui/formatters';
import { PaymentOrderKey, PaymentOrdersVocabulary } from '../types';
import { paymentStatusFormatter, paymentStatusNameFormatter } from '../formatters';
import { PaymentOrdersTableItem } from '../model';

const sep = (xs: string, s: number): string[] => (xs.length ? [xs.slice(0, s), ...sep(xs.slice(s), s)] : []);

interface PaymentOrdersTableColumns extends ColumnDefinition {
  formatterParams?: FormatterParams & {items?: any[]},
}

export const getPaymentOrdersTableColumns = (router: Router, contextMenuItems: Array<Record<string, any>> = []) => [
  {
    title: PaymentOrdersVocabulary[PaymentOrderKey.currentStatus],
    field: PaymentOrderKey.status,
    formatter: paymentStatusNameFormatter,
    width: 200,
  },
  {
    title: PaymentOrdersVocabulary[PaymentOrderKey.docNumber],
    field: PaymentOrderKey.docNumber,
    formatter: (cell) => LinkFormatter({
      to: { path: _paths.PAYMENT_ORDER_FORM, params: { exKey: (cell.getData() as Record<string, any>).exKey } },
      text: (cell.getData() as Record<string, any>).docNumber,
      router,
    }),
    width: 200,
  },
  {
    title: PaymentOrdersVocabulary[PaymentOrderKey.docDate],
    field: PaymentOrderKey.docDate,
    width: 100,
    formatter: DateTimeFormatter,
    formatterParams: {
      inputFormat: 'iso',
      outputFormat: 'dd.MM.yyyy',
    },
    minWidth: 100,
  },
  {
    title: PaymentOrdersVocabulary[PaymentOrderKey.createdTs],
    field: PaymentOrderKey.createdTs,
    width: 200,
    formatter: (cell: CellComponent) => formatDateInTimeZone(cell.getValue(), { view: 'dateTimeSec' }) || '',
    minWidth: 200,
  },
  {
    title: PaymentOrdersVocabulary[PaymentOrderKey.amount],
    field: PaymentOrderKey.amount,
    formatter: MoneyFormatter({ maxDots: 2, minDots: 2, separator: '.' }),
    hozAlign: 'right',
    width: 150,
  },
  {
    title: PaymentOrdersVocabulary[PaymentOrderKey.docType],
    field: PaymentOrderKey.docType,
    width: 140,
  },
  {
    title: PaymentOrdersVocabulary[PaymentOrderKey.recipientRegistryCode],
    field: `${PaymentOrderKey.paymentOrder}.${PaymentOrderKey.recipient}.${PaymentOrderKey.recipientRegistryCode}`,
    width: 140,
  },
  {
    title: PaymentOrdersVocabulary[PaymentOrderKey.recipientPersonalAccount],
    field: `${PaymentOrderKey.paymentOrder}.${PaymentOrderKey.recipient}.${PaymentOrderKey.recipientPersonalAccount}`,
    width: 180,
  },
  {
    title: PaymentOrdersVocabulary[PaymentOrderKey.recipientCardNumber],
    field: `${PaymentOrderKey.paymentOrder}.${PaymentOrderKey.recipient}.${PaymentOrderKey.recipientCardNumber}`,
    formatter: (cell: CellComponent) => {
      const value = cell.getData() as PaymentOrdersTableItem;

      return sep((value.document?.paymentOrder?.recipient?.recipientCardNumber ?? ''), 4).join(' ');
    },
    width: 180,
  },
  {
    title: PaymentOrdersVocabulary[PaymentOrderKey.recipientName],
    field: `${PaymentOrderKey.paymentOrder}.${PaymentOrderKey.recipient}.${PaymentOrderKey.recipientName}`,
    formatter: VLongTextWrapper,
    width: 140,
  },
  {
    title: PaymentOrdersVocabulary[PaymentOrderKey.recipientBankAccount],
    field: `${PaymentOrderKey.paymentOrder}.${PaymentOrderKey.recipient}.${PaymentOrderKey.recipientBankDetails}.${PaymentOrderKey.recipientBankAccount}`,
    width: 170,
  },
  {
    title: PaymentOrdersVocabulary[PaymentOrderKey.recipientBankName],
    field: `${PaymentOrderKey.paymentOrder}.${PaymentOrderKey.recipient}.${PaymentOrderKey.recipientBankDetails}.${PaymentOrderKey.recipientBankName}`,
    formatter: VLongTextWrapper,
    width: 140,
  },
  {
    title: PaymentOrdersVocabulary[PaymentOrderKey.payerName],
    field: `${PaymentOrderKey.paymentOrder}.${PaymentOrderKey.payer}.${PaymentOrderKey.payerBankDetails}.${PaymentOrderKey.payerName}`,
    formatter: LongTextFormatter,
    width: 220,
  },
  {
    title: PaymentOrdersVocabulary[PaymentOrderKey.payerBankAccount],
    field: `${PaymentOrderKey.paymentOrder}.${PaymentOrderKey.payer}.${PaymentOrderKey.payerBankDetails}.${PaymentOrderKey.payerBankAccount}`,
    width: 170,
  },
  {
    title: PaymentOrdersVocabulary[PaymentOrderKey.payerBankName],
    field: `${PaymentOrderKey.paymentOrder}.${PaymentOrderKey.payer}.${PaymentOrderKey.payerBankDetails}.${PaymentOrderKey.payerBankName}`,
    formatter: VLongTextWrapper,
    width: 210,
  },
  {
    title: PaymentOrdersVocabulary[PaymentOrderKey.accountReflection],
    field: PaymentOrderKey.accountReflectionLight,
    formatter: paymentStatusFormatter,
    headerSort: false,
    hozAlign: 'center',
    width: 150,
  },
  {
    title: PaymentOrdersVocabulary[PaymentOrderKey.additionalInformation],
    field: PaymentOrderKey.additionalInformation,
    headerSort: false,
    width: 180,
  },
  {
    title: '',
    formatter: ContextMenuFormatter,
    formatterParams: {
      items: contextMenuItems,
    },
    frozen: true,
    headerSort: false,
    width: 50,
  },
] as PaymentOrdersTableColumns[];
