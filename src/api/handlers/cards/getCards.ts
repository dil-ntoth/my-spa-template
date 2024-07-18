import AppConfig from '../../../AppConfig';
import { Card } from '../../../types/Card';
import http from '../../http';
import { deserialize } from '../../serializer';

export default async function getCards(): Promise<Card[] | undefined> {
  const response = await http.get(`${AppConfig.apiEndpoint}/cards`);

  if (response.ok) {
    return deserialize('card', await response.json()) as Card[];
  } else {
    throw new Error(response.statusText);
  }
}
