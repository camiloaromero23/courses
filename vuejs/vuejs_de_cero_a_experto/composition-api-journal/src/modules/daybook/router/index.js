export default {
  name: 'daybook',
  component: () =>
    import(
      /* webpackChunkName: "daybook" */ '@/modules/daybook/layouts/DayBookLayout'
    ),
  children: [
    {
      path: '',
      name: 'noEntry',
      component: () =>
        import(
          /* webpackChunkName: "daybook-noEntry"*/ '../views/NoEntrySelected'
        ),
    },
    {
      path: ':id',
      name: 'entry',
      component: () =>
        import(/* webpackChunkName: "daybook-entry"*/ '../views/EntryView'),
      props: route => ({ id: route.params.id }),
    },
  ],
};
