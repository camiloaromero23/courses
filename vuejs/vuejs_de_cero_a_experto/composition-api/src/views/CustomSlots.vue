<template>
  <h1>Learning Slots</h1>
  <button @click="openModal">Open Modal</button>
  <Modal title="Hello world" v-if="isOpen" @on:close="closeModal">
    <!-- <h2>Hello world</h2> -->
    <!-- <p>Lorem ipsum dolor sit amet.</p> -->
    <!-- <button>exit</button> -->
    <template v-slot:header>
      <h2>Modal title</h2>
    </template>
    <template v-slot:body>
      <p>Lorem ipsum dolor sit amet.</p>
    </template>
    <template v-slot:footer>
      <button @click="closeModal">Exit</button>
    </template>
    <template v-slot:exposed="{ newTitle }">
      <h2>{{ newTitle }}</h2>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import useModal from "@/composables/useModal";

export default {
  components: { Modal },
  setup() {
    const { isOpen, openModal, closeModal } = useModal();
    return { isOpen, openModal, closeModal };
  },
};
</script>

<style scoped></style>
