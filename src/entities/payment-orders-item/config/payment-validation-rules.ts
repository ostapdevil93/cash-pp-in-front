import { getMaxLengthRule, rulesCreator } from '@/shared/lib/validation/validation.ts';
import { PaymentOrderKey } from '../types';

export const fieldNamesToValidate = [
  PaymentOrderKey.docNumber,
  PaymentOrderKey.amount,
];

export const fieldPayerNamesToValidate = [
  PaymentOrderKey.payerInn,
  PaymentOrderKey.payerKpp,
  PaymentOrderKey.payerName,
];

export const fieldPayerBankDetailsNamesToValidate = [
  PaymentOrderKey.payerBankAccount,
];

export const fieldRecipientBankDetailsNamesToValidate = [
  PaymentOrderKey.recipientBankAccount,
];

export const requiredFields: Array<PaymentOrderKey> = [
  PaymentOrderKey.docNumber,
  PaymentOrderKey.amount,
  PaymentOrderKey.payerName,
];

const MAX_LENGTH: Partial<Record<PaymentOrderKey, number>> = {
  [PaymentOrderKey.docNumber]: 9,
  [PaymentOrderKey.payerName]: 160,
};

const FIELD_LENGTH: Partial<Record<PaymentOrderKey, number>> = {
  [PaymentOrderKey.payerInn]: 12,
  [PaymentOrderKey.payerKpp]: 9,
  [PaymentOrderKey.payerBankAccount]: 20,
  [PaymentOrderKey.recipientBankAccount]: 20,
};

export const validationRule = (key: PaymentOrderKey) => {
  const rules = requiredFields.includes(key) ? [rulesCreator.nonNull()] : [];
  if (key === PaymentOrderKey.docNumber) {
    return {
      maxLength: MAX_LENGTH[key] as number,
      validator: (val: string | number | null) => {
        if (requiredFields.includes(key) && !val) {
          return false;
        }
        if (!requiredFields.includes(key) && !val) {
          return true;
        }
        return (val as string)?.length >= 3 && val;
      },
      rules: [
        getMaxLengthRule(MAX_LENGTH[key] as number),
        ...rules,
      ],
    };
  }
  if (key === PaymentOrderKey.amount) {
    return {
      maxLength: 18,
      validator: (val: string | number | null) => {
        if (requiredFields.includes(key) && !val) {
          return false;
        }
        if (!requiredFields.includes(key) && !val) {
          return true;
        }
        return `${val}`.split('.')[0].length <= 18 && val;
      },
      rules: [
        getMaxLengthRule(18),
        ...rules,
      ],
    };
  }
  if (key === PaymentOrderKey.payerInn) {
    return {
      mask: '#'.repeat(FIELD_LENGTH[key] as number),
      maxLength: FIELD_LENGTH[key] as number,
      validator: (val: string | number | null) => (val && ((val as string)?.length === 10 || (val as string)?.length === 12)) || !val,
      rules: [
        rulesCreator.lengthInPossibleValues([10, 12]),
        ...rules,
      ],
    };
  }

  if (key === PaymentOrderKey.recipientBankAccount) {
    return {
      mask: '#'.repeat(FIELD_LENGTH[key] as number),
      maxLength: FIELD_LENGTH[key] as number,
      validator: (val: string | number | null) => {
        if (requiredFields.includes(key) && !val) {
          return false;
        }
        if (!requiredFields.includes(key) && !val) {
          return true;
        }
        return (val as string)?.length === FIELD_LENGTH[key] && val;
      },
      rules: [
        rulesCreator.stringLength(FIELD_LENGTH[key] as number),
        ...rules,
      ],
    };
  }
  if (FIELD_LENGTH[key]) {
    return {
      mask: '#'.repeat(FIELD_LENGTH[key] as number),
      maxLength: FIELD_LENGTH[key] as number,
      validator: (val: string | number | null) => (val && (val as string)?.length === FIELD_LENGTH[key]) || !val,
      rules: [
        rulesCreator.stringLength(FIELD_LENGTH[key] as number),
        ...rules,
      ],
    };
  }
  return {
    maxLength: MAX_LENGTH[key] as number,
    validator: (val: string | number | null) => {
      if (requiredFields.includes(key) && !val) {
        return false;
      }
      if (!requiredFields.includes(key) && !val) {
        return true;
      }
      return (val as string)?.length <= (MAX_LENGTH[key] as number) && val;
    },
    rules: [
      getMaxLengthRule(MAX_LENGTH[key] as number),
      ...rules,
    ],
  };
};
