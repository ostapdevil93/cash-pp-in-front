import {
  CellComponent,
  ColumnDefinition, ContextMenuFormatter,
  DateTimeFormatter,
  FormatterParams, moneyColumnCreator, MoneyFormatter,
} from '@ebp/vue-ui-lib';
import { UnusedFundsTableKey, UnusedFundsVocabulary } from '../types';
import { UnusedFundsDocument } from '../model';

const sep = (xs: string, s: number): string[] => (xs.length ? [xs.slice(0, s), ...sep(xs.slice(s), s)] : []);

interface UnusedFundsTableColumns extends ColumnDefinition {
  formatterParams?: FormatterParams & {items?: any[]},
}

export const getUnusedFundsTableColumns = (contextMenuItems: Array<Record<string, any>> = []) => [
  {
    title: UnusedFundsVocabulary[UnusedFundsTableKey.docNumber],
    field: UnusedFundsTableKey.docNumber,
    width: 150,
  },
  {
    title: UnusedFundsVocabulary[UnusedFundsTableKey.docDate],
    field: UnusedFundsTableKey.docDate,
    width: 100,
    formatter: DateTimeFormatter,
    formatterParams: {
      inputFormat: 'iso',
      outputFormat: 'dd.MM.yyyy',
    },
    minWidth: 100,
  },
  {
    title: UnusedFundsVocabulary[UnusedFundsTableKey.registryCode],
    field: UnusedFundsTableKey.registryCode,
    width: 150,
  },
  {
    title: UnusedFundsVocabulary[UnusedFundsTableKey.cardNumber],
    field: UnusedFundsTableKey.cardNumber,
    formatter: (cell: CellComponent) => {
      const value = cell.getData() as UnusedFundsDocument;

      return sep((value[UnusedFundsTableKey.cardNumber] ?? ''), 4).join(' ');
    },
    width: 180,
  },
  {
    title: UnusedFundsVocabulary[UnusedFundsTableKey.personalAccount],
    field: UnusedFundsTableKey.personalAccount,
    width: 150,
  },
  moneyColumnCreator({
    title: UnusedFundsVocabulary[UnusedFundsTableKey.amountFunds] as string,
    field: UnusedFundsTableKey.amountFunds,
    formatter: MoneyFormatter({ maxDots: 2, minDots: 2, separator: '.' }),
    hozAlign: 'right',
    width: 100,
  }),
  {
    title: UnusedFundsVocabulary[UnusedFundsTableKey.tofkCode],
    field: UnusedFundsTableKey.tofkCode,
    width: 80,
  },
  {
    title: UnusedFundsVocabulary[UnusedFundsTableKey.orgName],
    field: UnusedFundsTableKey.orgName,
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
] as UnusedFundsTableColumns[];
