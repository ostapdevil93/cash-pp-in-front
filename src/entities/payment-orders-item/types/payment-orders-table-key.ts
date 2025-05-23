export enum PaymentOrderKey {
  main = 'main',
  status = 'status',
  currentStatus = 'currentStatus',
  docNumber = 'docNumber',
  docDate = 'docDate',
  createdTs = 'createdTs',
  amount = 'amount',
  isOnRecord = 'isOnRecord',
  additionalInformation = 'additionalInformation',
  bankReport = 'bankReport',
  exKey = 'exKey',
  objectCode = 'objectCode',
  amountInText = 'amountInText',
  docType = 'docType',
  edNumber = 'edNumber',
  edType = 'edType',
  edDate = 'edDate',
  edId = 'edId',
  typeOfPayment = 'typeOfPayment',
  docOperationType = 'docOperationType',
  document = 'document',
  systemData = 'systemData',
  paymentOrder = 'paymentOrder',
  payer = 'payer',
  payerInn = 'payerInn',
  payerKpp = 'payerKpp',
  payerRegistryCode = 'payerRegistryCode',
  payerName = 'payerName',
  payerNameView = 'payerNameView',
  payerPersonalAccount = 'payerPersonalAccount',
  payerBudgetCode = 'payerBudgetCode',
  payerBudgetType = 'payerBudgetType',
  payerOktmoPpo = 'payerOktmoPpo',
  payerOrgName = 'payerOrgName',
  payerBankDetails = 'payerBankDetails',
  payerBankAccount = 'payerBankAccount',
  payerBankAccountView = 'payerBankAccountView',
  payerBik = 'payerBik',
  payerBankName = 'payerBankName',
  payerBankNameView = 'payerBankNameView',
  payerCorBankAccount = 'payerCorBankAccount',
  recipient = 'recipient',
  recipientCardNumber = 'recipientCardNumber',
  recipientRegistryCode = 'recipientRegistryCode',
  recipientName = 'recipientName',
  recipientInn = 'recipientInn',
  recipientKpp = 'recipientKpp',
  recipientPersonalAccount = 'recipientPersonalAccount',
  recipientPersonalAccountView = 'recipientPersonalAccountView',
  recipientTofkCode = 'recipientTofkCode',
  recipientTofkName = 'recipientTofkName',
  recipientBudgetCode = 'recipientBudgetCode',
  recipientBudgetCodeView = 'recipientBudgetCodeView',
  recipientBudgetType = 'recipientBudgetType',
  recipientOktmoPpo = 'recipientOktmoPpo',
  recipientOktmoPpoView = 'recipientOktmoPpoView',
  recipientOrgName = 'recipientOrgName',
  accountNumber = 'accountNumber',
  baTofkCode = 'baTofkCode',
  recipientBankDetails = 'recipientBankDetails',
  recipientBankAccount = 'recipientBankAccount',
  recipientBankAccountView = 'recipientBankAccountView',
  recipientBik = 'recipientBik',
  recipientBikView = 'recipientBikView',
  recipientBankName = 'recipientBankName',
  recipientBankNameView = 'recipientBankNameView',
  recipientCorBankAccount = 'recipientCorBankAccount',
  recipientCorBankAccountView = 'recipientCorBankAccountView',
  paymentInfo = 'paymentInfo',
  operationType = 'operationType',
  paymentPriority = 'paymentPriority',
  receiptDate = 'receiptDate',
  putInFileDate = 'putInFileDate',
  writtenOffDate = 'writtenOffDate',
  paymentTerm = 'paymentTerm',
  paymentPurpose = 'paymentPurpose',
  paymentSource = 'paymentSource',
  code = 'code',
  taxPayments = 'taxPayments',
  payerStatus = 'payerStatus',
  kbk = 'kbk',
  oktmoCode = 'oktmoCode',
  paymentReason = 'paymentReason',
  taxPeriod = 'taxPeriod',
  taxDocNumber = 'taxDocNumber',
  taxDocDate = 'taxDocDate',
  payoutCode = 'payoutCode',
  reserveField = 'reserveField',
  taxPurposeOfPayment = 'taxPurposeOfPayment',
  exAdditionalInformationKey = 'exAdditionalInformationKey',
  addDocCode = 'addDocCode',
  addDocument = 'addDocument',
  addAmount = 'addAmount',
  addPersonalAccount = 'addPersonalAccount',
  addCardNumber = 'addCardNumber',
  addRegistryCode = 'addRegistryCode',
  accountReflection = 'accountReflection',
  accountReflectionId = 'accountReflectionId',
  accountReflectionErrorTxt = 'accountReflectionErrorTxt',
  accountReflectionLight = 'accountReflectionLight',
  color = 'color',
  info = 'info',
  isBlocked = 'isBlocked',
  blockedReason = 'blockedReason',
  actions = 'actions',
  autoControlResult = 'autoControlResult',
}

export const PaymentOrdersVocabulary: Partial<Record<PaymentOrderKey, string>> = {
  [PaymentOrderKey.main]: 'Основная информация',
  [PaymentOrderKey.currentStatus]: 'Статус',
  [PaymentOrderKey.docNumber]: 'Номер',
  [PaymentOrderKey.docDate]: 'Дата',
  [PaymentOrderKey.createdTs]: 'Дата и время загрузки',
  [PaymentOrderKey.amount]: 'Сумма',
  [PaymentOrderKey.accountReflection]: 'Отражение в учете',
  [PaymentOrderKey.additionalInformation]: 'Связанный документ',
  [PaymentOrderKey.bankReport]: 'Выписка банка',
  [PaymentOrderKey.amountInText]: 'Сумма прописью',
  [PaymentOrderKey.docType]: 'Тип документа',
  [PaymentOrderKey.edNumber]: 'Номер ЭД в течение опер. дня',
  [PaymentOrderKey.edType]: 'Вид документа (Тип ED)',
  [PaymentOrderKey.edDate]: 'Дата составления ЭД',
  [PaymentOrderKey.edId]: 'Уникальный идентификатор составителя ЭД',
  [PaymentOrderKey.typeOfPayment]: 'Вид платежа',
  [PaymentOrderKey.docOperationType]: 'Тип операции',
  [PaymentOrderKey.paymentOrder]: 'Платежное поручение',
  [PaymentOrderKey.payer]: 'Плательщик',
  [PaymentOrderKey.payerInn]: 'ИНН',
  [PaymentOrderKey.payerKpp]: 'КПП',
  [PaymentOrderKey.payerRegistryCode]: 'Код по Сводному реестру',
  [PaymentOrderKey.payerName]: 'Наименование плательщика',
  [PaymentOrderKey.payerNameView]: 'Наименование',
  [PaymentOrderKey.payerPersonalAccount]: 'Лицевой счет плательщика',
  [PaymentOrderKey.payerBudgetCode]: 'Код бюджета л/с плательщика',
  [PaymentOrderKey.payerBudgetType]: 'Тип бюджета плательщика',
  [PaymentOrderKey.payerOktmoPpo]: 'ОКТМО ППО плательщика',
  [PaymentOrderKey.payerOrgName]: 'Наименование клиента',
  [PaymentOrderKey.payerBankDetails]: 'Реквизиты банка плательщика',
  [PaymentOrderKey.payerBankAccount]: 'Номер счёта плательщика',
  [PaymentOrderKey.payerBankAccountView]: 'Номер счёта',
  [PaymentOrderKey.payerBik]: 'БИК банка',
  [PaymentOrderKey.payerBankName]: 'Банк плательщика',
  [PaymentOrderKey.payerBankNameView]: 'Банк',
  [PaymentOrderKey.payerCorBankAccount]: 'Корреспондентский счёт банка',
  [PaymentOrderKey.recipient]: 'Получатель',
  [PaymentOrderKey.recipientName]: 'Наименование получателя',
  [PaymentOrderKey.recipientCardNumber]: 'Номер банковской карты',
  [PaymentOrderKey.recipientRegistryCode]: 'Код по Сводному реестру клиента',
  [PaymentOrderKey.recipientInn]: 'ИНН',
  [PaymentOrderKey.recipientKpp]: 'КПП',
  [PaymentOrderKey.recipientTofkCode]: 'Код ТОФК',
  [PaymentOrderKey.recipientTofkName]: 'Наименование ТОФК',
  [PaymentOrderKey.recipientPersonalAccount]: 'Лицевой счет получателя',
  [PaymentOrderKey.recipientPersonalAccountView]: 'Лицевой счет',
  [PaymentOrderKey.recipientBudgetCode]: 'Код бюджета л/с получателя',
  [PaymentOrderKey.recipientBudgetCodeView]: 'Код бюджета л/с',
  [PaymentOrderKey.recipientBudgetType]: 'Тип бюджета получателя',
  [PaymentOrderKey.recipientOktmoPpo]: 'ОКТМО ППО получателя',
  [PaymentOrderKey.recipientOktmoPpoView]: 'ОКТМО',
  [PaymentOrderKey.recipientOrgName]: 'Наименование клиента получателя',
  [PaymentOrderKey.accountNumber]: 'Учетный номер',
  [PaymentOrderKey.baTofkCode]: 'Код ТОФК БС',
  [PaymentOrderKey.recipientBankDetails]: 'Реквизиты банка получателя',
  [PaymentOrderKey.recipientBankAccount]: 'Номер счёта получателя',
  [PaymentOrderKey.recipientBankAccountView]: 'Номер счёта',
  [PaymentOrderKey.recipientBik]: 'БИК банка получателя',
  [PaymentOrderKey.recipientBikView]: 'БИК банка',
  [PaymentOrderKey.recipientBankName]: 'Банк получателя',
  [PaymentOrderKey.recipientBankNameView]: 'Банк',
  [PaymentOrderKey.recipientCorBankAccount]: 'Корреспондентский счёт банка получателя',
  [PaymentOrderKey.recipientCorBankAccountView]: 'Корреспондентский счёт банка',
  [PaymentOrderKey.paymentInfo]: 'Информация о платеже',
  [PaymentOrderKey.operationType]: 'Вид операции',
  [PaymentOrderKey.paymentPriority]: 'Очередность платежа',
  [PaymentOrderKey.receiptDate]: 'Дата поступления в банк п/п',
  [PaymentOrderKey.putInFileDate]: 'Дата помещения в картотеку',
  [PaymentOrderKey.writtenOffDate]: 'Дата списания со счёта плательщика',
  [PaymentOrderKey.paymentTerm]: 'Срок платежа',
  [PaymentOrderKey.paymentPurpose]: 'Назначение платежа',
  [PaymentOrderKey.paymentSource]: 'Источник оплаты',
  [PaymentOrderKey.code]: 'Код',
  [PaymentOrderKey.taxPayments]: 'Налоговые платежи',
  [PaymentOrderKey.payerStatus]: 'Статус плательщика',
  [PaymentOrderKey.kbk]: 'Код бюджетной классификации',
  [PaymentOrderKey.oktmoCode]: 'Код по ОКТМО',
  [PaymentOrderKey.paymentReason]: 'Основание платежа',
  [PaymentOrderKey.taxPeriod]: 'Налоговый период',
  [PaymentOrderKey.taxDocNumber]: 'Номер документа по налоговым платежам',
  [PaymentOrderKey.taxDocDate]: 'Дата документа по налоговым платежам',
  [PaymentOrderKey.payoutCode]: 'Код выплаты',
  [PaymentOrderKey.reserveField]: 'Резервное поле',
  [PaymentOrderKey.taxPurposeOfPayment]: 'Назначение платежа по налоговым платежам',
  [PaymentOrderKey.exAdditionalInformationKey]: 'Ключ логической ссылки на запись дополнительной информации',
  [PaymentOrderKey.addDocCode]: 'Код связного документа',
  [PaymentOrderKey.addDocument]: 'Связанный документ',
  [PaymentOrderKey.addAmount]: 'Сумма из связанного документа',
  [PaymentOrderKey.addPersonalAccount]: 'Номер ЛС из связанного документа',
  [PaymentOrderKey.addCardNumber]: 'Номер карты из связанного документа',
  [PaymentOrderKey.addRegistryCode]: 'Код по Сводному реестру из связанного документа',
};
