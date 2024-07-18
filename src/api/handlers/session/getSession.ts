import AppConfig from '../../../AppConfig';
import http from '../../http';
import { Session } from '../../../types/Session';

export default async function getSession(): Promise<Session | undefined> {
  const response = await http.get(`${AppConfig.apiEndpoint}/session`);

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(response.statusText);
  }
}
