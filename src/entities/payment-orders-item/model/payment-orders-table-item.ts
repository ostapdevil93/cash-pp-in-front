import { StatusColors } from '@ebp/vue-ui-lib';
import { PrintFormApi } from '@ebp/core';
import { AutoControlApi } from '@ebp/auto-monitoring-results';
import { DocumentStatus } from '@/shared/config';
import { Action, ActionCode, ActionType } from '@/shared/api/types';
import { PaymentOrderKey } from '../types';

export type Payer = {
  [PaymentOrderKey.payerInn]: string,
  [PaymentOrderKey.payerKpp]: string,
  [PaymentOrderKey.payerRegistryCode]: string,
  [PaymentOrderKey.payerName]: string,
  [PaymentOrderKey.payerPersonalAccount]: string,
  [PaymentOrderKey.payerBudgetCode]: string,
  [PaymentOrderKey.payerBudgetType]: string,
  [PaymentOrderKey.payerOktmoPpo]: string,
  [PaymentOrderKey.payerOrgName]: string,
  [PaymentOrderKey.payerKpp]: string,
}

export type PayerBankDetails = {
  [PaymentOrderKey.payerBankAccount]: string,
  [PaymentOrderKey.payerBik]: string,
  [PaymentOrderKey.payerBankName]: string,
  [PaymentOrderKey.payerCorBankAccount]: string,
}

export type Recipient = {
  [PaymentOrderKey.recipientCardNumber]: string,
  [PaymentOrderKey.recipientRegistryCode]: string,
  [PaymentOrderKey.recipientName]: string,
  [PaymentOrderKey.recipientInn]: string,
  [PaymentOrderKey.recipientKpp]: string,
  [PaymentOrderKey.recipientPersonalAccount]: string,
  [PaymentOrderKey.recipientTofkCode]: string,
  [PaymentOrderKey.recipientTofkName]: string,
  [PaymentOrderKey.recipientBudgetCode]: string,
  [PaymentOrderKey.recipientBudgetType]: string,
  [PaymentOrderKey.recipientOktmoPpo]: string,
  [PaymentOrderKey.recipientOrgName]: string,
  [PaymentOrderKey.accountNumber]: string,
  [PaymentOrderKey.baTofkCode]: string,
}

export type RecipientBankDetails = {
  [PaymentOrderKey.recipientBankAccount]: string,
  [PaymentOrderKey.recipientBik]: string,
  [PaymentOrderKey.recipientBankName]: string,
  [PaymentOrderKey.recipientCorBankAccount]: string,
}

export type PaymentInfo = {
  [PaymentOrderKey.operationType]: string,
  [PaymentOrderKey.paymentPriority]: string,
  [PaymentOrderKey.receiptDate]: string,
  [PaymentOrderKey.recipientBankAccount]: string,
  [PaymentOrderKey.putInFileDate]: string,
  [PaymentOrderKey.writtenOffDate]: string,
  [PaymentOrderKey.paymentTerm]: string,
  [PaymentOrderKey.paymentPurpose]: string,
  [PaymentOrderKey.paymentSource]: string,
  [PaymentOrderKey.code]: string,
}

export type TaxPayments = {
  [PaymentOrderKey.payerStatus]: string,
  [PaymentOrderKey.kbk]: string,
  [PaymentOrderKey.oktmoCode]: string,
  [PaymentOrderKey.paymentReason]: string,
  [PaymentOrderKey.taxPeriod]: string,
  [PaymentOrderKey.taxDocNumber]: string,
  [PaymentOrderKey.taxDocDate]: string,
  [PaymentOrderKey.payoutCode]: string,
  [PaymentOrderKey.reserveField]: string,
  [PaymentOrderKey.taxPurposeOfPayment]: string,
}

export type AdditionalInformation = {
  [PaymentOrderKey.exAdditionalInformationKey]: string,
  [PaymentOrderKey.addDocCode]: string,
  [PaymentOrderKey.addDocument]: string,
  [PaymentOrderKey.addAmount]: number,
  [PaymentOrderKey.addPersonalAccount]: string,
  [PaymentOrderKey.addCardNumber]: string,
  [PaymentOrderKey.addRegistryCode]: string,
}

export type AccountReflection = {
  [PaymentOrderKey.accountReflectionId]: string,
  [PaymentOrderKey.accountReflectionErrorTxt]: string,
}

export type AccountReflectionLight = {
  [PaymentOrderKey.color]: StatusColors,
  [PaymentOrderKey.info]: string,
}

export type PaymentOrdersDocument = {
  [PaymentOrderKey.docNumber]: string,
  [PaymentOrderKey.docDate]: string,
  [PaymentOrderKey.amount]: number,
  [PaymentOrderKey.isOnRecord]: string,
  [PaymentOrderKey.additionalInformation]: AdditionalInformation[],
  [PaymentOrderKey.amountInText]: string,
  [PaymentOrderKey.docType]: string,
  [PaymentOrderKey.edNumber]: string,
  [PaymentOrderKey.edType]: string,
  [PaymentOrderKey.edDate]: string,
  [PaymentOrderKey.edId]: string,
  [PaymentOrderKey.typeOfPayment]: string,
  [PaymentOrderKey.docOperationType]: string,
  [PaymentOrderKey.paymentOrder]: {
    [PaymentOrderKey.payer]: Payer,
    [PaymentOrderKey.payerBankDetails]: PayerBankDetails,
    [PaymentOrderKey.recipient]: Recipient,
    [PaymentOrderKey.recipientBankDetails]: RecipientBankDetails,
    [PaymentOrderKey.paymentInfo]: PaymentInfo,
    [PaymentOrderKey.taxPayments]: TaxPayments,
  },
  [PaymentOrderKey.accountReflection]: AccountReflection,
  [PaymentOrderKey.accountReflectionLight]?: AccountReflectionLight,
}

export type PaymentOrdersTableItem = {
  [PaymentOrderKey.status]: DocumentStatus,
  [PaymentOrderKey.currentStatus]: DocumentStatus,
  [PaymentOrderKey.document]: PaymentOrdersDocument,
  [PaymentOrderKey.exKey]: string,
  [PaymentOrderKey.objectCode]: string,
  [PaymentOrderKey.isBlocked]: boolean,
  [PaymentOrderKey.blockedReason]: string,
  [PaymentOrderKey.actions]: Action<ActionCode, ActionType>[],
  [PaymentOrderKey.systemData]: {
    createdTs: string,
    updatedTs: string,
    isSystem: boolean,
    createdBy: {
      lastName: string,
      firstName: string,
      middleName: string,
    },
    printFormList: PrintFormApi.PrintFormListItem[],
    [PaymentOrderKey.autoControlResult]: AutoControlApi.Result | null,
  },
}

export type PaymentOrdersDocumentForTable = PaymentOrdersTableItem
& PaymentOrdersDocument
& { printFormList: PrintFormApi.PrintFormListItem[], createdTs: string };
