<script setup>
import { useAppStore } from "@/stores/appStore";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const appStore = useAppStore();
</script>

<template>
  <v-bottom-navigation>
    <v-progress-linear
      :active="appStore.loading"
      indeterminate
      absolute
      bottom
      color="primary"
    ></v-progress-linear>

    <v-btn value="room" to="/">
      <v-icon size="24px">mdi-account-group</v-icon>
    </v-btn>

    <v-btn v-if="authStore.user" value="account" to="/account">
      <v-avatar size="28px">
        <v-icon icon="mdi-account-circle"></v-icon>
      </v-avatar>
    </v-btn>

    <v-btn v-else value="account" to="/login">
      <v-icon icon="mdi-account-circle"></v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
