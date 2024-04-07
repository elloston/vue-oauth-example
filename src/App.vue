<script setup>
import { useAuthStore } from "@/stores/authStore";
import { onBeforeMount } from "vue";
import api from "./api";

const authStore = useAuthStore();

onBeforeMount(async () => {
  await api.get(`${import.meta.env.VITE_LARAVEL_URL}/sanctum/csrf-cookie`);

  await authStore.getUser();
});
</script>

<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>

    <bottom-navigation />
  </v-app>
</template>
