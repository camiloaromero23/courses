import { lazy, LazyExoticComponent } from 'react';
// import { NoLazyLayout } from '../01-lazyload/layout/NoLazyLayout';
import { About, Users } from '../01-lazyload/pages';
import { ShoppingPage } from '../02-component-patterns/pages/ShoppingPage';
import {
  FormikAbstraction,
  FormikBasicPage,
  FormikComponents,
  FormikYupPage,
  RegisterPage,
  RegisterFormikPage,
  DynamicForm,
} from '../03-forms/pages';
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
  // {
  //   path: '/',
  //   to: '/',
  //   Component: Home,
  //   name: 'Home',
  // },
  {
    path: '/',
    to: '/',
    Component: ShoppingPage,
    name: 'ShoppingPage',
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
  {
    path: '/register',
    to: '/register',
    Component: RegisterPage,
    name: 'Register',
  },
  {
    path: '/formik-basic',
    to: '/formik-basic',
    Component: FormikBasicPage,
    name: 'Formik Basic',
  },
  {
    path: '/formik-yup',
    to: '/formik-yup',
    Component: FormikYupPage,
    name: 'Formik Yup',
  },
  {
    path: '/formik-components',
    to: '/formik-components',
    Component: FormikComponents,
    name: 'Formik Components',
  },
  {
    path: '/formik-abstraction',
    to: '/formik-abstraction',
    Component: FormikAbstraction,
    name: 'Formik Abstraction',
  },
  {
    path: '/register-formik',
    to: '/register-formik',
    Component: RegisterFormikPage,
    name: 'Register Formik',
  },
  {
    path: '/dynamic-form',
    to: '/dynamic-form',
    Component: DynamicForm,
    name: 'Dynamic Form',
  },
];
