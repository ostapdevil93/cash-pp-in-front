export interface Action<TCode = string, TType = string> {
  actionCode: TCode,
  label: TType,
  actionUrl: string,
  isConfirmation?: boolean,
  isRequiredComment?: boolean,
  isRegistry?: boolean,
  isPriority?: boolean,
}

export enum ActionCode {
  IMPORT = 'cs-poo-importing-doc',
  CHECK = 'cs-poo-draft-to-prepared',
  TO_APPROVE = 'cs-poo-prepared-to-toapprove',
  SIGNED = 'cs-poo-toapprove-to-signed',
  SEND_TO_BANK = 'cs-poo-signed-to-sentbank',
  EXECUTE_BANK = 'cs-poo-sentbank-to-executed',
  REJECTED_BANK = 'cs-poo-sentbank-to-rejectedbank',
  AWAITING_CONFIRM = 'cs-poo-draft-to-awaitingconfirm',
  CANCEL = 'cs-poo-draft-to-canceled',
  EDIT = 'cs-poo-canceled-to-draft',
  DELETE = 'cs-poo-draft-to-deleted',
  CONFIRM = 'cs-poo-awaitingconfirm-to-confirmed',
  EXECUTE = 'cs-poo-confirmed-to-executed',
  IMPORTED_AWAITING_CONFIRM = 'cs-poo-imported-to-awaitingconfirm',
}

export enum ActionType {
  TOWAIT = 'ui.action.towait',
  TODRAFT = 'ui.action.todraft',
  DELETE = 'ui.action.delete',
}

export const ActionTypeLabels: Record<ActionType, string> = {
  [ActionType.TOWAIT]: 'В ожидание подтверждения',
  [ActionType.TODRAFT]: 'На редактирование',
  [ActionType.DELETE]: 'Удалить',
};

export const ActionCodeLabels: Record<ActionCode, string> = {
  [ActionCode.IMPORT]: 'Импорт',
  [ActionCode.CHECK]: 'Проверить',
  [ActionCode.IMPORTED_AWAITING_CONFIRM]: 'Проверить',
  [ActionCode.TO_APPROVE]: 'На утверждение',
  [ActionCode.SIGNED]: 'Подписать',
  [ActionCode.SEND_TO_BANK]: 'Отправить в банк',
  [ActionCode.EXECUTE_BANK]: 'Исполнить',
  [ActionCode.REJECTED_BANK]: 'Отклонить',
  [ActionCode.AWAITING_CONFIRM]: 'В ожидание подтверждения',
  [ActionCode.CANCEL]: 'Отменить',
  [ActionCode.EDIT]: 'Редактировать',
  [ActionCode.DELETE]: 'Удалить',
  [ActionCode.CONFIRM]: 'Подтвердить',
  [ActionCode.EXECUTE]: 'Исполнить',
};

export const mapActionTypeToLabel = (action: Action<ActionCode, ActionType>): string => ActionTypeLabels[action.label]
  || ActionCodeLabels[action.actionCode]
  || 'Неизвестное действие';

export type ActionableTableItem = {
  exKey: string,
  actions: Action<ActionCode, ActionType>[],
};
