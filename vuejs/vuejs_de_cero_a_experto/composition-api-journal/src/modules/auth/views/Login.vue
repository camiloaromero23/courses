<template>
  <span class="login100-form-title p-b-41">
    Login
  </span>
  <form
    @submit.prevent="onSubmit"
    class="login100-form validate-form p-b-33 p-t-5"
  >
    <div class="wrap-input100 validate-input" data-validate="Enter username">
      <input
        v-model="loginForm.email"
        class="input100"
        type="text"
        placeholder="Email"
        required
      />
      <span class="focus-input100" data-placeholder="&#xe82a;"></span>
    </div>

    <div class="wrap-input100 validate-input" data-validate="Enter password">
      <input
        v-model="loginForm.password"
        class="input100"
        type="password"
        placeholder="Password"
        required
      />
      <span class="focus-input100" data-placeholder="&#xe80f;"></span>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <button type="submit" class="login100-form-btn">
        Login
      </button>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <router-link :to="{ name: 'register' }"
        >Don't have an account?</router-link
      >
    </div>
  </form>
</template>

<script>
import Swal from 'sweetalert2';

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuth from '../composables/useAuth';

export default {
  setup() {
    const router = useRouter();
    const { loginUser } = useAuth();

    const loginForm = ref({ email: 'test@test.com', password: '123456' });
    return {
      loginForm,
      onSubmit: async () => {
        const { ok, message } = await loginUser(loginForm.value);
        if (ok) {
          router.push({ name: 'noEntry' });
        } else {
          Swal.fire('Error', message, 'error');
        }
      },
    };
  },
};
</script>

<style></style>
