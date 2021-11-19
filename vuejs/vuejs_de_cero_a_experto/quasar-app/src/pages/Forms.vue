<template>
  <q-page class="q-ma-md">
    <span class="text-h3">Forms</span>

    <q-separator />
    <div class="row justify-center">
      <q-form
        @submit.prevent="onSubmit"
        @reset="onReset"
        class="q-gutter-xs col-xs-12 col-sm-12 col-md-6 q-pt-xl"
      >
        <q-input
          filled
          v-model="userForm.email"
          label="E-mail *"
          type="email"
          lazy-rules
          no-error-icon
          :rules="[
            (val) => (val && val.length > 0) || 'Please type something',
            isValidEmail,
          ]"
        />

        <q-input
          filled
          type="password"
          v-model="userForm.password"
          label="Password *"
          lazy-rules
          no-error-icon
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          type="password"
          v-model="userForm.confirmPassword"
          label="Confirm Password *"
          lazy-rules
          no-error-icon
          :rules="[
            (val) => (val && val.length > 0) || 'Please type something',
            isSamePassword,
          ]"
        />

        <q-checkbox
          v-model="userForm.conditions"
          label="Agree with terms and conditions"
          :style="[
            userForm.errorInConditions && !userForm.conditions && 'color:red',
          ]"
        />

        <div class="row justify-end">
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
          <q-btn unelevated label="Submit" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'Forms',
  setup() {
    const $q = useQuasar();
    const userForm = ref({
      email: '',
      password: '',
      confirmPassword: '',
      conditions: false,
      errorInConditions: false,
    });
    return {
      userForm,
      onSubmit() {
        userForm.value.errorInConditions = false;
        if (!userForm.value.conditions) {
          userForm.value.errorInConditions = true;
          console.log(userForm.value.errorInConditions);
          console.log('Conditions error');
          $q.notify({
            message: 'Conditions error',
            icon: 'las la-exclamation-circle',
          });
          return;
        }
        console.log(userForm.value);
      },
      onReset() {
        userForm.value = {
          email: '',
          password: '',
          confirmPassword: '',
          conditions: false,
          errorInConditions: false,
        };
      },
      isValidEmail(val) {
        const emailPattern =
          /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || 'Invalid E-mail';
      },
      isSamePassword(val) {
        return userForm.value.password === val || 'Passwords do not match';
      },
    };
  },
});
</script>
