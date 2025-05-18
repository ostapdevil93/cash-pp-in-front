import { AxiosError } from '@ebp/mfe-utils';
import { CoreApi, showDefaultError, showServerNotification } from '@ebp/core';
import { AutoControlApi } from '@ebp/auto-monitoring-results';
import { Action, ActionExecuteResponse } from '@/shared/api/types';
import { actionMutation } from '@/shared/api/info-api';
import { AUTO_CONTROLS_ERROR_CODE } from '@/shared/config';
import { ConfirmationModalSubmitPayload, openConfirmModal } from '../ui/confirmation-modal/open-confirm-modal.ts';

type ActionsExecutingOptions = {
  exKey: string,
  /** Перечень доступных действий */
  actions: Action[],
  /**
   * Кб на перезапрос после обновления статусов
   *
   * @param newExKey - новый exKey документа после перевода по статусам при наличии
   */
  refetch: (newExKey?: string) => void,
  /** Кастомная пост обработка действий */
  executePostProcessing?: (action: Action, res: ActionExecuteResponse) => void,
  /** Кб на заполнение и открытие автоконтролей */
  autoControlsCb?: (autoControlResult: AutoControlApi.Result) => void,
}

export class ActionsExecutingModel {
  exKey: string;
  actions: ActionsExecutingOptions['actions'];

  refetch: ActionsExecutingOptions['refetch'];
  private executePostProcessing?: ActionsExecutingOptions['executePostProcessing'];
  private autoControlsCb?: ActionsExecutingOptions['autoControlsCb'];

  constructor(options: ActionsExecutingOptions) {
    this.actions = options.actions;
    this.exKey = options.exKey;
    this.refetch = options.refetch;
    this.executePostProcessing = options.executePostProcessing;
    this.autoControlsCb = options.autoControlsCb;
  }

  async executeAction(
    action: Action,
    payload?: ConfirmationModalSubmitPayload,
  ) {
    // url в мутации создаем с нуля, т.к. actionUrl с бэка приходит некорректный
    const executeActionMutation = actionMutation({
      exKey: this.exKey,
      actionCode: action.actionCode,
    });

    // eslint-disable-next-line consistent-return
    return executeActionMutation({ successComment: payload?.comment || null })
      .then(async (res) => {
        showServerNotification(res);

        // осуществляем постобработку по действиям (чтобы задавать разные действия для карточки и реестра)
        this.executePostProcessing?.(action, res);

        // в процессе перевод статусов может быть заменен exKey документа, обновляем его каждый раз
        this.exKey = res.data.exKey || '';
      })
      .catch((err: AxiosError<CoreApi.ErrorResponse>) => {
        if (err.response?.status === AUTO_CONTROLS_ERROR_CODE && err.response.data.autoControlResult) {
          this?.autoControlsCb?.(err.response.data.autoControlResult);
        } else if (err.response?.data.details) {
          showServerNotification(err.response.data);
        } else {
          showDefaultError();
        }
      })
      .finally(() => {
        this.refetch(this.exKey);
      });
  }

  /**
   * Формирование функции, которая отработает на клик для действия
   *
   * - Если требуется подтверждение - открываем МО перевода статуса, в сабмит передаем действие
   * - Если не требуется подтверждение - выполняем действие
   * @param action - само действие
   */
  setOnClick(action: Action): () => void {
    if (action.isConfirmation) {
      return () => {
        openConfirmModal({
          onSubmit: (payload: ConfirmationModalSubmitPayload) => this.executeAction(action, payload),
          isRequiredComment: action.isRequiredComment,
        });
      };
    }
    return () => this.executeAction(action);
  }
}
