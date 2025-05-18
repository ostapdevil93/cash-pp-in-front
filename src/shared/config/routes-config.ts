import { getRoutesConfig } from '@ebp/mfe-utils';

/**
 * Внутренние пути МФЕ
 *
 * Путь не должен начинаться со слэша - он встраивается в getRoutePaths
 */
const relativePaths = {
  PAYMENT_ORDERS_LIST: '',
  PAYMENT_ORDER_FORM: ':exKey?',
  VERIFICATION: 'verification',
} as const;

/**
 * Названия роутов приложения
 */
const routeNames = {
  PAYMENT_ORDERS_LIST: 'ppin:paymentOrdersList',
  PAYMENT_ORDER_FORM: 'ppin:paymentOrderForm',
  VERIFICATION: 'ppin:verification',
} as const;

export const {
  getRoutePaths,
  getRouteNames,
  _paths,
  _routeNames,
} = getRoutesConfig({ paths: relativePaths, routeNames });
