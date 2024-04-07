<script setup>
import { useAuthStore } from "@/stores/authStore";
import { useAppStore } from "@/stores/appStore";
import { ref } from "vue";
import router from "@/router";

const authStore = useAuthStore();
const appStore = useAppStore();

const errorText = ref();
const checkForm = ref(false);
const form = ref({
  email: "",
  password: "",
});

async function onSubmit() {
  if (!checkForm.value) return;

  try {
    appStore.setLoading(true);
    errorText.value = null;

    await authStore.login(form.value);
    await authStore.getUser();
    router.push("/");
  } catch (e) {
    console.error(e);
    errorText.value = e.response?.data?.message;
  } finally {
    appStore.setLoading(false);
  }
}

function required(v) {
  return !!v || "Field is required";
}
</script>

<template>
  <v-container>
    <v-row class="py-10 justify-center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-5 pa-md-8">
          <h1 class="text-h4 font-weight-medium mb-4">Log In</h1>

          <v-form v-model="checkForm" @submit.prevent="onSubmit">
            <v-text-field
              v-model="form.email"
              :readonly="appStore.loading"
              :rules="[required]"
              id="email"
              type="email"
              class="mb-4"
              label="Email"
              variant="outlined"
              color="primary"
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              :readonly="appStore.loading"
              :rules="[required]"
              id="password"
              type="password"
              class="mb-4"
              label="Password"
              placeholder="Enter your password"
              variant="outlined"
              color="primary"
            ></v-text-field>

            <v-btn
              :disabled="!checkForm"
              :loading="appStore.loading"
              block
              color="primary"
              type="submit"
              size="large"
              class="text-body-1"
            >
              Sign In
            </v-btn>
          </v-form>

          <v-dialog v-model="errorText">
            <v-card>
              <v-alert
                type="error"
                title="Error"
                :text="errorText"
                variant="tonal"
              ></v-alert>
            </v-card>
          </v-dialog>

          <social-oauth />

          <v-divider class="mt-5"></v-divider>
          <v-btn
            :disabled="appStore.loading"
            color="primary"
            variant="text"
            type="submit"
            size="small"
            class="text-body-2 mt-4"
            @click="router.push('/signup')"
          >
            Create account
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
