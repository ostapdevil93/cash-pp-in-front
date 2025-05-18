import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { EventLogApi, showServerNotification } from '@ebp/core';
import { AutoControlApi } from '@ebp/auto-monitoring-results';
import {
  PaymentOrderKey,
  PaymentOrdersTableItem,
  PaymentOrdersDocument,
  Payer,
  PayerBankDetails,
  RecipientBankDetails,
  fieldNamesToValidate,
  fieldPayerNamesToValidate,
  fieldPayerBankDetailsNamesToValidate,
  fieldRecipientBankDetailsNamesToValidate,
  validationRule,
} from '@/entities/payment-orders-item';
import { Action, ActionType, ActionCode, OptionsFlags } from '@/shared/api/types';
import { create, draft, edit, get, searchJournal } from '@/shared/api/info-api';
import { JournalItem, Pagable } from '@/shared/api/';
import { _routeNames, DocumentStatus, STATUS_NAME } from '@/shared/config';
import { notifyDefaultError } from '@/shared/lib';

export type NullableItem<T> = { [P in keyof T]: T[P] extends object ? NullableItem<T[P]> : T[P] | null };

export const usePaymentOrderItemStore = defineStore('paymentOrderItemStore', () => {
  const data = ref<PaymentOrdersTableItem>();
  const actions = computed(() => (data.value?.actions as Action<ActionCode, ActionType>[] | null) ?? []);
  const isEditMode = ref(false);
  const isImportDrawerOpen = ref(false);

  const getActionByActionCode = (code: ActionCode): Action | undefined => actions.value.find((action) => action.actionCode === code);

  const setData = (value: PaymentOrdersTableItem) => {
    data.value = {
      ...value,
    };
  };

  const setEditMode = (value: boolean) => {
    isEditMode.value = value;
  };

  const document = computed(() => data.value!.document);
  const systemData = computed(() => data.value!.systemData);
  const payer = computed(() => data.value!.document.paymentOrder.payer);
  const payerBankDetails = computed(() => data.value!.document.paymentOrder.payerBankDetails);
  const recipient = computed(() => data.value!.document.paymentOrder.recipient);
  const recipientBankDetails = computed(() => data.value!.document.paymentOrder.recipientBankDetails);
  const paymentInfo = computed(() => data.value!.document.paymentOrder.paymentInfo);
  const taxPayments = computed(() => data.value!.document.paymentOrder.taxPayments);
  const additionalInformation = computed(() => data.value!.document.additionalInformation);
  const isInCreateMode = computed(() => !data.value?.exKey);
  const printFormList = computed(() => data.value!.systemData.printFormList || []);
  const autoControlResult = computed<AutoControlApi.Result | null>(() => data.value?.systemData?.autoControlResult ?? null);

  const toggleImportDrawerState = () => {
    isImportDrawerOpen.value = !isImportDrawerOpen.value;
  };

  const currentErrors = computed(() => {
    const errors: OptionsFlags<PaymentOrdersDocument> & { hasError?: boolean } = {};
    if (!document.value) {
      return errors;
    }
    fieldNamesToValidate.forEach((key: PaymentOrderKey) => {
      const currentValue = (document.value as NullableItem<PaymentOrdersDocument>)[key as keyof PaymentOrdersDocument] as string | null;
      const currentRule = validationRule(key);
      if (currentRule?.validator) {
        errors[key as keyof PaymentOrdersDocument] = !currentRule.validator(currentValue);
      }
    });
    return errors;
  });

  const currentPayerErrors = computed(() => {
    const errors: OptionsFlags<Payer> & { hasError?: boolean } = {};
    if (!payer.value) {
      return errors;
    }
    fieldPayerNamesToValidate.forEach((key: PaymentOrderKey) => {
      const currentValue = (payer.value as NullableItem<Payer>)[key as keyof Payer] as string | null;
      const currentRule = validationRule(key);
      if (currentRule?.validator) {
        errors[key as keyof Payer] = !currentRule.validator(currentValue);
      }
    });
    return errors;
  });

  const currentPayerBankDetailsErrors = computed(() => {
    const errors: OptionsFlags<PayerBankDetails> & { hasError?: boolean } = {};
    if (!payerBankDetails.value) {
      return errors;
    }
    fieldPayerBankDetailsNamesToValidate.forEach((key: PaymentOrderKey) => {
      const currentValue = (payerBankDetails.value as NullableItem<PayerBankDetails>)[key as keyof PayerBankDetails] as string | null;
      const currentRule = validationRule(key);
      if (currentRule?.validator) {
        errors[key as keyof PayerBankDetails] = !currentRule.validator(currentValue);
      }
    });
    return errors;
  });

  const currentRecipientBankDetailsErrors = computed(() => {
    const errors: OptionsFlags<RecipientBankDetails> & { hasError?: boolean } = {};
    if (!recipientBankDetails.value) {
      return errors;
    }
    fieldRecipientBankDetailsNamesToValidate.forEach((key: PaymentOrderKey) => {
      const currentValue = (
        recipientBankDetails.value as NullableItem<RecipientBankDetails>
      )[key as keyof RecipientBankDetails] as string | null;
      const currentRule = validationRule(key);
      if (currentRule?.validator) {
        errors[key as keyof RecipientBankDetails] = !currentRule.validator(currentValue);
      }
    });
    return errors;
  });

  const hasFormErrors = computed(() => Object.values(currentErrors.value).includes(true)
      || Object.values(currentPayerErrors.value).includes(true)
      || Object.values(currentPayerBankDetailsErrors.value).includes(true)
      || Object.values(currentRecipientBankDetailsErrors.value).includes(true));

  const getValue = async (exKey?: string) => {
    if (!exKey) {
      try {
        setEditMode(true);
        const { data } = await draft<PaymentOrdersTableItem>();
        setData(data);
      } catch (e) {
        notifyDefaultError(e);
      }
      return;
    }
    try {
      const { data } = await get<PaymentOrdersTableItem>(exKey);
      setEditMode(data.currentStatus === DocumentStatus.DRAFT);
      setData(data);
    } catch (e) {
      notifyDefaultError(e);
    }
  };

  const trimFields = () => {
    const cardNumber = document.value?.paymentOrder?.recipient?.recipientCardNumber;
    if (cardNumber) {
      document.value.paymentOrder.recipient.recipientCardNumber = cardNumber.replace(/\s+/g, '');
    }
  };

  const router = useRouter();

  const saveValue = async () => {
    trimFields();
    try {
      const response = isInCreateMode.value
        ? await create<PaymentOrdersDocument, PaymentOrdersTableItem>(document.value)
        : await edit<PaymentOrdersDocument, PaymentOrdersTableItem>(document.value, data.value?.exKey as string);

      if (isInCreateMode.value && response?.data?.exKey) {
        await router.push({ name: _routeNames.PAYMENT_ORDER_FORM, params: { exKey: response.data.exKey } });
        await getValue(response.data.exKey);
      }

      showServerNotification(response);
    } catch (e) {
      notifyDefaultError(e);
    }
  };

  const getEventLogData: EventLogApi.GetEventLogData = ({ paginationParams }) => searchJournal<Pagable<JournalItem>>(
    data.value?.exKey,
    paginationParams,
    [],
  ).then((response) => ({
    items: response.content.map((item) => {
      const newItem: EventLogApi.Item = {
        ...item,
        exKey: item.exEntityKey,
        action: {
          ...item.action,
          actionTzCode: '',
          actionStatusInfo: item.action.actionStatusInfo && {
            ...item.action.actionStatusInfo,
            statusEndName: STATUS_NAME[item.action.actionStatusInfo.statusEnd as keyof typeof DocumentStatus] ?? '',
          },
        },
      };
      return newItem;
    }),
    totalElements: response.totalElements,
  }));

  return {
    setData,
    getActionByActionCode,
    data,
    document,
    actions,
    autoControlResult,
    systemData,
    payer,
    payerBankDetails,
    recipient,
    recipientBankDetails,
    paymentInfo,
    taxPayments,
    additionalInformation,
    isInCreateMode,
    isEditMode,
    setEditMode,
    isImportDrawerOpen,
    toggleImportDrawerState,
    printFormList,
    currentErrors,
    currentPayerErrors,
    currentPayerBankDetailsErrors,
    currentRecipientBankDetailsErrors,
    hasFormErrors,
    getEventLogData,
    getValue,
    saveValue,
  };
});
