import { ref } from "vue";

const useModal = () => {
  const isOpen = ref(false);
  return {
    isOpen,
    openModal: () => (isOpen.value = true),
    closeModal: () => (isOpen.value = false),
  };
};
export default useModal;
