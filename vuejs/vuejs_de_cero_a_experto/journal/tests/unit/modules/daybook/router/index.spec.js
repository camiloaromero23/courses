import daybookRouter from '@/modules/daybook/router';

describe('Daybook router module tests', () => {
  it('should have this config', async () => {
    expect(daybookRouter).toMatchObject({
      name: 'daybook',
      component: expect.any(Function),
      children: [
        {
          path: '',
          name: 'noEntry',
          component: expect.any(Function),
        },
        {
          path: ':id',
          name: 'entry',
          component: expect.any(Function),
          props: expect.any(Function),
        },
      ],
    });

    const promiseRoutes = daybookRouter.children.map(child =>
      child.component(),
    );

    const routes = (await Promise.all(promiseRoutes)).map(r => r.default.name);

    expect(routes).toContain('EntryView');
    expect(routes).toContain('NoEntrySelected');
  });

  it('should return routeId', () => {
    const route = {
      params: {
        id: 'ABC-123',
      },
    };

    const entryRoute = daybookRouter.children.find(
      route => route.name === 'entry',
    );
    expect(entryRoute.props(route)).toEqual({
      id: 'ABC-123',
    });
  });
});
