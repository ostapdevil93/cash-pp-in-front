import { createQuery } from '@ebp/mfe-utils';
import { Pagable } from '../types';
import { BASE_URLS } from '../base-urls';
import { Dictionary } from '../../config/dictionary-type.ts';

export const getDictionary = async <TResponse>(
  dictionary: Dictionary,
  data?: Record<string, any>,
): Promise<TResponse[]> => {
  switch (dictionary) {
    case Dictionary.CARD_NUMBER: {
      const response = await createQuery({
        url: `${BASE_URLS.CBS}dictionary/${dictionary}`,
        method: 'POST',
        data,
        queryKey: 'POST_DICTIONARY_QUERY_KEY',
      });
      if ((response as any).cardNumbers) {
        return ((response as any).cardNumbers as string[]).map((cardNumber) => ({
          cardNumber,
        })) as TResponse[];
      }
      return [response] as TResponse[];
    }
    case Dictionary.PARTNER_NAME: {
      const response = await createQuery({
        url: `${BASE_URLS.CBS}dictionary/${dictionary}`,
        method: 'POST',
        data,
        queryKey: 'POST_DICTIONARY_QUERY_KEY',
      });
      return [response] as TResponse[];
    }
    case Dictionary.REGISTRY_CODE: {
      const response = await createQuery({
        url: `${BASE_URLS.ORGANIZATIONS}search/summary`,
        method: 'POST',
        data,
        queryKey: 'POST_DICTIONARY_QUERY_KEY',
      });
      return (response as Pagable<TResponse>['data']).content;
    }
    default:
      return createQuery({
        url: `${BASE_URLS.CBS}dictionary/${dictionary}`,
        method: 'POST',
        data,
        queryKey: 'POST_DICTIONARY_QUERY_KEY',
      });
  }
};
