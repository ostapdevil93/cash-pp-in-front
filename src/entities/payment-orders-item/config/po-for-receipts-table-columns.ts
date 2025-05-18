import {
  CellComponent,
  ColumnDefinition,
  ContextMenuFormatter,
  DateTimeFormatter,
  FormatterParams,
  MoneyFormatter,
  LongTextFormatter, moneyColumnCreator,
} from '@ebp/vue-ui-lib';
import { PaymentOrderKey, PaymentOrdersVocabulary } from '../types';
import { Recipient } from '../model';

const sep = (xs: string, s: number): string[] => (xs.length ? [xs.slice(0, s), ...sep(xs.slice(s), s)] : []);

interface PoForReceiptsTableColumns extends ColumnDefinition {
  formatterParams?: FormatterParams & {items?: any[]},
}

export const getPoForReceipts40116TableColumns = (contextMenuItems: Array<Record<string, any>> = []) => [
  {
    title: PaymentOrdersVocabulary[PaymentOrderKey.docNumber],
    field: PaymentOrderKey.docNumber,
    width: 150,
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
    title: PaymentOrdersVocabulary[PaymentOrderKey.recipientRegistryCode],
    field: `${PaymentOrderKey.paymentOrder}.${PaymentOrderKey.recipient}.${PaymentOrderKey.recipientRegistryCode}`,
    width: 150,
  },
  {
    title: PaymentOrdersVocabulary[PaymentOrderKey.recipientName],
    field: `${PaymentOrderKey.paymentOrder}.${PaymentOrderKey.recipient}.${PaymentOrderKey.recipientName}`,
    formatter: LongTextFormatter,
    width: 150,
  },
  {
    title: PaymentOrdersVocabulary[PaymentOrderKey.recipientPersonalAccount],
    field: `${PaymentOrderKey.paymentOrder}.${PaymentOrderKey.recipient}.${PaymentOrderKey.recipientPersonalAccount}`,
    formatter: LongTextFormatter,
    width: 150,
  },
  {
    title: PaymentOrdersVocabulary[PaymentOrderKey.recipientCardNumber],
    field: `${PaymentOrderKey.paymentOrder}.${PaymentOrderKey.recipient}.${PaymentOrderKey.recipientCardNumber}`,
    formatter: (cell: CellComponent) => {
      const value = cell.getData() as Recipient;

      return sep((value[PaymentOrderKey.recipientCardNumber] ?? ''), 4).join(' ');
    },
    width: 180,
  },
  moneyColumnCreator({
    title: PaymentOrdersVocabulary[PaymentOrderKey.amount] as string,
    field: PaymentOrderKey.amount,
    formatter: MoneyFormatter({ maxDots: 2, minDots: 2, separator: '.' }),
    hozAlign: 'right',
    width: 150,
  }),
  {
    title: PaymentOrdersVocabulary[PaymentOrderKey.recipientTofkCode],
    field: `${PaymentOrderKey.paymentOrder}.${PaymentOrderKey.recipient}.${PaymentOrderKey.recipientTofkCode}`,
    width: 80,
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
] as PoForReceiptsTableColumns[];
