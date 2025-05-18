import { RouteRecordRaw } from 'vue-router';
import { getRouteNames, getRoutePaths } from '@/shared/config';
import { PaymentOrdersList } from '@/widgets/base-orders-list';
import { PaymentOrderForm } from '@/features/payment-order-form';
import { VerificationPage } from '@/pages/verification';

/**
 * Динамическое формирование роутов в зависимости от префиксов при встраивании мфе в хост
 * @param prefix - префикс передается принудительно для правильного формирования роутов в хосте
 */
export default function getRoutes(prefix: string) {
  const appPaths = getRoutePaths(prefix);
  const appNames = getRouteNames(prefix);

  return [
    {
      path: appPaths.PAYMENT_ORDERS_LIST,
      name: appNames.PAYMENT_ORDERS_LIST,
      component: PaymentOrdersList,
    },
    {
      path: appPaths.PAYMENT_ORDER_FORM,
      name: appNames.PAYMENT_ORDER_FORM,
      component: PaymentOrderForm,
    },
    {
      path: appPaths.VERIFICATION,
      name: appNames.VERIFICATION,
      component: VerificationPage,
    },
  ] as RouteRecordRaw[];
}

export const routes = getRoutes('');
