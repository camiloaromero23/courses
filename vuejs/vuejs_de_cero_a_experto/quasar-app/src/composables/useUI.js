import { useStore } from 'vuex';
import { computed } from 'vue';

const useUI = () => {
  const store = useStore();
  const toggleSideMenu = () => store.commit('ui/toggleSideMenu');

  return {
    // sideMenuOpen: computed(() => store.getters['ui/isSideMenuOpen']),
    sideMenuOpen: computed({
      get() {
        return store.getters['ui/isSideMenuOpen'];
      },
      set(/*val*/) {
        toggleSideMenu();
      },
    }),
    toggleSideMenu,
  };
};
export default useUI;
