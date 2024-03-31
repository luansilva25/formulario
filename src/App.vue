<template>
  <v-app>
    <v-main class="d-sm-flex justify-sm-center align-center">
          <showform v-if="islogged" />
          <div v-else>
            <login v-if="log" @criar="log = !log" />
            <createaccount v-else @login="log = !log" />
          </div>
    </v-main>
  </v-app>
</template>

<script setup>
import showform from "./components/showform.vue";
import createaccount from "./components/createaccount.vue";
import login from "./components/login.vue";
import { computed, ref } from "vue";
import { Login } from "./api/login";
const log = ref(true);
const store = Login();

const islogged = computed(() => {
  return store.loginuser;
});
</script>
