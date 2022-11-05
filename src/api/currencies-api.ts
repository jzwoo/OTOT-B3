import {requests} from './api-utils';
import API from './api-types';
import {URI_CURRENCIES} from '../configs';

export const getCurrencies = (): Promise<API.Response<any>> => {
  return requests.get(URI_CURRENCIES, '');
}