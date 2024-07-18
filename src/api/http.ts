import { JwtHighbondClient } from '@acl-services/jwt-highbond-client';
import AppConfig from '../AppConfig';

const jwtHighbondClient = new JwtHighbondClient({
  tokenRefreshUrl: AppConfig.tokenRefreshUrl,
  autoRedirect: true,
  loginUrl: AppConfig.loginUrl,
});

const CONTENT_TYPE = 'application/vnd.api+json';

async function highbondFetch(url: string, options: any = {}): Promise<Response> {
  const opts = {
    credentials: 'include',
    ...options,
  };
  opts.headers = {
    Accept: CONTENT_TYPE,
    ...(options.headers || {}),
  };
  if (opts.body) {
    if (typeof opts.body !== 'string') {
      opts.body = JSON.stringify(opts.body);
    }
    opts.headers['Content-Type'] = CONTENT_TYPE;
  }

  try {
    return await jwtHighbondClient.fetchWithTokenRefresh(url, opts);
  } catch (err) {
    return err as Response;
  }
}

const http = {
  get: (url: string): Promise<Response> => highbondFetch(url),
  post: (url: string, body: any, options: any = {}): Promise<Response> =>
    highbondFetch(url, {
      method: 'POST',
      body,
      ...options,
    }),
  put: (url: string, body: any): Promise<Response> =>
    highbondFetch(url, {
      method: 'PUT',
      body,
    }),
  patch: (url: string, body: any): Promise<Response> =>
    highbondFetch(url, {
      method: 'PATCH',
      body,
    }),
  delete: (url: string): Promise<Response> =>
    highbondFetch(url, {
      method: 'DELETE',
    }),
};

export default http;
