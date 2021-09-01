const isAuthenticatedGuard = async (to, from, next) =>
  new Promise(() => {
    const random = Math.random() * 100;
    if (random > 50) {
      console.log('Is Authenticated');
      next();
    } else {
      console.log('Blocked by isAuthenticatedGuard', random);
      next({ name: 'pokemonHome' });
    }
  });

export default isAuthenticatedGuard;
