import { rest } from 'msw';
import AppConfig from '../../AppConfig';

export default rest.get(`${AppConfig.apiEndpoint}/session`, (_req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      name: 'User Name',
      email: 'user.name@email.com',
      uid: 'uid',
      locale: 'en',
      dateFormat: '%m/%d/%Y',
    }),
  );
});
