export const increase = state => {
  state.count++;
  state.lastMutation = "increase";
};
export const increaseBy = (state, val) => {
  state.count += val;
  state.lastMutation = `increase by: ${val}`;
  state.lastRandomInt = val;
};
export const toggleLoading = state => {
  state.loading = !state.loading;
  state.lastMutation = "toggleLoading";
};
