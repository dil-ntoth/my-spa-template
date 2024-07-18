import { rest } from 'msw';
import AppConfig from '../../AppConfig';

export default rest.get(`${AppConfig.apiEndpoint}/cards`, (_req, res, ctx) => {
  return res(
    ctx.delay(process.env.NODE_ENV === 'test' ? 0 : 1500),
    ctx.status(200),
    ctx.json({
      data: [
        {
          attributes: {
            title: 'Card 1 title',
            content: 'Card 1 content',
          },
          id: '1',
          type: 'card',
        },
        {
          attributes: {
            title: 'Card 2 title',
            content: 'Card 2 content',
          },
          id: '2',
          type: 'card',
        },
      ],
    }),
  );
});
