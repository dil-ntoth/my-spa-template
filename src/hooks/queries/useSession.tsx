import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { getI18n, useTranslation } from 'react-i18next';
import { Session } from '../../types/Session';
import * as api from '../../api';

export function useSession(): UseQueryResult<Session> {
  const { t } = useTranslation();
  return useQuery(['session'], () => api.getSession(), {
    onSuccess: ({ locale }) => {
      const I18n = getI18n();

      // update <html> lang attribute
      document.documentElement.lang = locale;
      // update locale for i18next
      I18n.changeLanguage(locale);
      // update html <title>
      document.title = t('title');
    },
    cacheTime: Infinity,
    staleTime: Infinity,
  });
}
