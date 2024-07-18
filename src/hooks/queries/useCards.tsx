import { UseQueryResult, useQuery } from '@tanstack/react-query';
import * as api from '../../api';
import { Card } from '../../types/Card';

export function useCards(): UseQueryResult<Card[]> {
  return useQuery(['cards'], () => api.getCards(), {
    cacheTime: Infinity,
    staleTime: Infinity,
  });
}
