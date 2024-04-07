<script setup>
import { useAppStore } from "@/stores/appStore";
import { useAuthStore } from "@/stores/authStore";
import router from "@/router";

const authStore = useAuthStore();
const appStore = useAppStore();

async function logoutUser() {
  try {
    appStore.setLoading(true);

    await authStore.logout();
    router.push("/login");
  } catch (e) {
    console.error(e);
  } finally {
    appStore.setLoading(false);
  }
}
</script>

<template>
  <div>
    <v-container>
      <v-row class="py-5 justify-center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="pa-5 pa-md-8" v-if="authStore.user">
            <h1 class="text-h4 font-weight-medium mb-4">Account</h1>

            <v-text-field
              v-model="authStore.user.name"
              :readonly="true"
              type="text"
              class="mb-4"
              label="Name"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              v-model="authStore.user.email"
              :readonly="true"
              type="email"
              class="mb-4"
              label="Email"
              variant="outlined"
            ></v-text-field>

            <v-btn
              :loading="appStore.loading"
              @click="logoutUser()"
              block
              color="primary"
              class="text-body-1"
              >Log Out</v-btn
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
