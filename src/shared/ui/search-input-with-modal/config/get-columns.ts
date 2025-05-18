import { ColumnDefinition, LongTextFormatter } from '@ebp/vue-ui-lib';
import { Dictionary } from '@/shared/config';

export function getColumns(dictionary: Dictionary): ColumnDefinition[] {
  if (dictionary === Dictionary.BANK_ACCOUNT) {
    return [
      {
        title: 'Номер счета',
        field: 'accountNumber',
        headerSort: false,
        maxWidth: 200,
      },
      {
        title: 'БИК',
        field: 'bankBIK',
        headerSort: false,
        maxWidth: 150,
      },
      {
        title: 'Наименование',
        field: 'bankFullName',
        headerSort: false,
        formatter: LongTextFormatter,
      },
    ];
  }
  if (dictionary === Dictionary.PARTNER_NAME) {
    return [
      {
        title: 'Наименование контрагента',
        field: 'partnerName',
        headerSort: false,
      },
    ];
  }
  if (dictionary === Dictionary.CARD_NUMBER) {
    return [
      {
        title: 'Номер карты',
        field: 'cardNumber',
        headerSort: false,
      },
    ];
  }
  if (dictionary === Dictionary.REGISTRY_CODE) {
    return [
      {
        title: 'Полное название',
        field: 'orgFullName',
        headerSort: false,
      },
      {
        title: 'ИНН',
        field: 'orgINN',
        headerSort: false,
      },
      {
        title: 'КПП',
        field: 'orgKPP',
        headerSort: false,
      },
      {
        title: 'ОГРН',
        field: 'orgOGRN',
        headerSort: false,
      },
      {
        title: 'Код по Сводному реестру',
        field: 'orgCode',
        headerSort: false,
      },
    ];
  }
  return [];
}
