import {requests} from './api-utils';
import API from './api-types';
import {URI_CONTACTS} from '../configs';

export const getContacts = (): Promise<API.Response<API.Contact[]>> => {
  return requests.get(URI_CONTACTS, '');
}

export const getContactByName = (name: string): Promise<API.Response<API.Contact[]>> => {
  return requests.get(URI_CONTACTS, '/name?name=' + name);
}

export const deleteContactById = (id: number): Promise<API.Response<API.Message>> => {
  return requests.delete(URI_CONTACTS, '/' + id);
}

export const editContactById = (id: number, body: { name: string, contact: number }): Promise<API.Response<API.Message>> => {
  return requests.put(URI_CONTACTS, '/' + id, body);
}