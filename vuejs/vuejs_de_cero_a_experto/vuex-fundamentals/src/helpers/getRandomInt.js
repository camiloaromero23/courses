const getRandomInt = () =>
  new Promise(resolve => {
    const randomInt = Math.floor(Math.random() * 20 + 1);
    setTimeout(() => {
      resolve(randomInt);
    }, 2000);
  });
export default getRandomInt;
