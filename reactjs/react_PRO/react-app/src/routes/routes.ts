import { lazy, LazyExoticComponent } from 'react';
// import { NoLazyLayout } from '../01-lazyload/layout/NoLazyLayout';
import { About, Home, Users } from '../01-lazyload/pages';
// import { LazyPage1, LazyPage2, LazyPage3 } from '../01-lazyload/pages';

type JSXComponent = () => JSX.Element;

interface Route {
  to: string;
  path: string;
  Component: LazyExoticComponent<JSXComponent> | JSXComponent;
  name: string;
}

const LazyLayout = lazy(
  () =>
    import(
      /*webpackChunkName:"LazyLayout"*/ '../01-lazyload/layout/LazyLayout'
    ),
);

export const routes: Route[] = [
  {
    path: '/lazyload/*',
    to: '/lazyload/',
    Component: LazyLayout,
    name: 'Lazy Layout - Dash',
  },
  // {
  //   path: '/no-lazy/*',
  //   to: '/no-lazy/',
  //   Component: NoLazyLayout,
  //   name: 'No Lazy',
  // },
  {
    path: '/',
    to: '/',
    Component: Home,
    name: 'Home',
  },
  {
    path: '/about',
    to: '/about',
    Component: About,
    name: 'About',
  },
  {
    path: '/users',
    to: '/users',
    Component: Users,
    name: 'Users',
  },
];
