import { ShowNotificationPayload } from '@ebp/mfe-utils';
import { CoreApi } from '@ebp/core';

export type Pagable<T> = {
  data: {
    content: T[],
    totalElements: number,
    number: 0,
    sort: {
      empty: true,
      unsorted: true,
      sorted: true,
    },
    first: true,
    last: true,
    numberOfElements: 0,
    pageable: {
      offset: 0,
      sort: {
        empty: true,
        unsorted: true,
        sorted: true,
      },
      unpaged: true,
      pageNumber: 0,
      pageSize: 0,
      paged: true,
    },
    empty: true,

  },
}
export type ErrorResponse = {
  errorCode?: string,
  details: {
    notification?: ShowNotificationPayload,
  },
}

export type JournalItem = {
  exEntityKey: string,
  action: {
    actionCode: string,
    actionTs: string,
    isSystem: false,
    description: string,
    actionStatusInfo: {
      statusBegin: string | null,
      statusEnd: string | null,
      comment: string | null,
    },
    userLastName: string | null,
    userFirstName: string | null,
    userMiddleName: string | null,
    userPosition: string | null,
    exPpaServiceRegistryOrganizationKey: string | null,
    exPpaServiceNsiOrganizationTypeKey: string | null,
    userOrganizationName: string | null,
    nsiOrganizationTypeCode: string | null,
    exPpaServiceUserKey: string | null,
  },
}

type CommonData = {
  exKey?: string,
  objectCode?: string,
}

export type ActionExecuteResponse = {
  data: CommonData,
  details: CoreApi.DetailsPayload,
}

export type ActionExecutePayload = {
  successComment: string | null,
}

export type OptionsFlags<Type> = {
  [Property in keyof Type]?: boolean;
};
