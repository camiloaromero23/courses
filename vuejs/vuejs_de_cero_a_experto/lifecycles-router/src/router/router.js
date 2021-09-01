import { createRouter, createWebHistory } from 'vue-router';
import isAuthenticatedGuard from './auth-guard';

const routes = [
  {
    path: '/pokemon',
    name: 'pokemon',
    component: () =>
      import(
        /* webpackChunkName: "PokemonLayout" */ '../modules/pokemon/layouts/PokemonLayout'
      ),
    children: [
      {
        path: 'home',
        name: 'pokemonHome',
        component: () =>
          import(
            /* webpackChunkName: "ListPage" */ '../modules/pokemon/pages/ListPage'
          ),
      },
      {
        path: 'about',
        name: 'pokemonAbout',
        component: () =>
          import(
            /* webpackChunkName: "AboutPage"*/ '../modules/pokemon/pages/AboutPage'
          ),
      },
      {
        path: ':id',
        name: 'pokemonId',
        component: () =>
          import(
            /* webpackChunkName: "PokemonPage"*/ '../modules/pokemon/pages/PokemonPage'
          ),
        props: (route) => {
          const id = +route.params.id;
          return isNaN(id) ? { id: -1 } : { id };
        },
      },
      {
        path: '',
        redirect: { name: 'pokemonAbout' },
      },
    ],
  },
  //
  {
    path: '/dbz',
    name: 'dbz',
    beforeEnter: [isAuthenticatedGuard],
    component: () =>
      import(
        /* webpackChunkName: "DragonBallLayout"*/ '../modules/dbz/layouts/DragonBallLayout'
      ),

    children: [
      {
        path: 'characters',
        name: 'dbzCharacters',
        component: () =>
          import(
            /* webpackChunkName: "Characters"*/ '../modules/dbz/pages/Characters'
          ),
      },
      {
        path: 'about',
        name: 'dbzAbout',
        component: () =>
          import(/* webpackChunkName: "About"*/ '../modules/dbz/pages/About'),
      },
      {
        path: '',
        redirect: { name: 'dbzCharacters' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () =>
      import(
        /* webpackChunkName: "404NotFound"*/ '../modules/shared/pages/404'
      ),
  },
  {
    path: '',
    redirect: { name: 'pokemonAbout' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Synchronous global guard
// router.beforeEach((to, from, next) => {
//   const random = Math.random() * 100;
//   if (random > 50) {
//     console.log('Authenticated');
//     next();
//   } else {
//     console.log(random, 'Blocked by beforeEach guard');
//     next({ name: 'pokemonHome' });
//   }
// });

// Async global guard
// const canAccess = () =>
//   new Promise((resolve) => {
//     const random = Math.random() * 100;
//     if (random > 50) {
//       console.log('Authenticated');
//       resolve(true);
//     } else {
//       console.log(random, 'Blocked by beforeEach guard - canAccess');
//       resolve(false);
//     }
//   });
//
// router.beforeEach(async (to, from, next) => {
//   const authorized = await canAccess();
//
//   authorized ? next() : next({ name: 'pokemonHome' });
// });

export default router;
