import getRandomInt from "../../helpers/getRandomInt";
export const increaseByRandomInt = async ({ commit }) => {
  commit("toggleLoading");
  const randomInt = await getRandomInt();
  commit("toggleLoading");

  commit("increaseBy", randomInt);
};
