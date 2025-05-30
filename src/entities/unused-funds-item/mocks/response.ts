import { unusedFundsTableItemsMock } from './data';

export const unusedFundsTableResponseMock = {
  data: {
    content: unusedFundsTableItemsMock,
    totalElements: unusedFundsTableItemsMock.length,
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
};
