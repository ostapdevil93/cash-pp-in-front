export enum UnusedFundsTableKey {
  docNumber = 'docNumber',
  docDate = 'docDate',
  amountFunds = 'amountFunds',
  cardNumber = 'cardNumber',
  registryCode = 'registryCode',
  orgName = 'orgName',
  inn = 'inn',
  kpp = 'kpp',
  personalAccount = 'personalAccount',
  tofkCode = 'tofkCode',
  tofkName = 'tofkName',
  docType = 'docType',
  budgetCode = 'budgetCode',
  operationType = 'operationType',
  operationTypeCode = 'operationTypeCode',
  isVerified = 'isVerified',
  exKey = 'exKey',
  objectCode = 'objectCode',
}

export const UnusedFundsVocabulary: Partial<Record<UnusedFundsTableKey, string>> = {
  [UnusedFundsTableKey.docNumber]: 'Номер документа',
  [UnusedFundsTableKey.docDate]: 'Дата документа',
  [UnusedFundsTableKey.amountFunds]: 'Сумма денежных средств',
  [UnusedFundsTableKey.cardNumber]: 'Номер банковской карты',
  [UnusedFundsTableKey.registryCode]: 'Код по сводному реестру клиента',
  [UnusedFundsTableKey.orgName]: 'Наименование клиента',
  [UnusedFundsTableKey.inn]: 'ИНН',
  [UnusedFundsTableKey.kpp]: 'КПП',
  [UnusedFundsTableKey.personalAccount]: 'Лицевой счет',
  [UnusedFundsTableKey.tofkCode]: 'Код ТОФК',
  [UnusedFundsTableKey.tofkName]: 'Наименование ТОФК',
  [UnusedFundsTableKey.docType]: 'Тип документа',
  [UnusedFundsTableKey.budgetCode]: 'Код бюджета',
  [UnusedFundsTableKey.operationType]: 'Вид операции',
  [UnusedFundsTableKey.operationTypeCode]: 'Код вида операции',
  [UnusedFundsTableKey.isVerified]: 'Выверен',
};
