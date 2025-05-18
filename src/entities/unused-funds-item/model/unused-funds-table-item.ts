import { UnusedFundsTableKey } from '../types';

export type UnusedFundsDocument = {
  [UnusedFundsTableKey.docNumber]: string,
  [UnusedFundsTableKey.docDate]: string,
  [UnusedFundsTableKey.amountFunds]: number,
  [UnusedFundsTableKey.cardNumber]: string,
  [UnusedFundsTableKey.registryCode]: string,
  [UnusedFundsTableKey.orgName]: string,
  [UnusedFundsTableKey.inn]: string,
  [UnusedFundsTableKey.kpp]: string,
  [UnusedFundsTableKey.personalAccount]: string,
  [UnusedFundsTableKey.tofkCode]: string,
  [UnusedFundsTableKey.tofkName]: string,
  [UnusedFundsTableKey.docType]: string,
  [UnusedFundsTableKey.budgetCode]: string,
  [UnusedFundsTableKey.operationType]: string,
  [UnusedFundsTableKey.operationTypeCode]: string,
  [UnusedFundsTableKey.isVerified]: string,
}

export type UnusedFundsTableItem = {
  [UnusedFundsTableKey.exKey]: string,
  [UnusedFundsTableKey.objectCode]: string,
  document: UnusedFundsDocument,
}

export type UnusedFundsDocumentForTable = UnusedFundsTableItem & UnusedFundsDocument;
